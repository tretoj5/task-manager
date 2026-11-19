import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { listTasks } from '../api/tasks'
import { useTasks } from './useTasks'
import type { Paginated, Task } from '../types'

const apiMocks = vi.hoisted(() => ({
  listTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  updateTaskStatus: vi.fn(),
}))

vi.mock('../api/tasks', () => apiMocks)

let activeState: ReturnType<typeof useTasks> | null = null
let cleanup: (() => void) | null = null

const Harness = defineComponent({
  setup() {
    activeState = useTasks()

    return () => h('div')
  },
})

function getState(): ReturnType<typeof useTasks> {
  if (activeState === null) {
    throw new Error('The task composable has not been mounted.')
  }

  return activeState
}

function emptyPage(): Paginated<Task> {
  return {
    data: [],
    links: { first: null, last: null, prev: null, next: null },
    meta: {
      current_page: 1,
      from: null,
      last_page: 1,
      links: [],
      path: '/api/tasks',
      per_page: 10,
      to: null,
      total: 0,
    },
  }
}

function deferred<T>(): {
  promise: Promise<T>
  resolve: (value: T) => void
} {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}

async function mountTasks() {
  const wrapper = mount(Harness)
  cleanup = () => wrapper.unmount()
  await flushPromises()

  return wrapper
}

beforeEach(() => {
  vi.mocked(listTasks).mockReset().mockResolvedValue(emptyPage())
})

afterEach(() => {
  cleanup?.()
  cleanup = null
  activeState = null
  vi.useRealTimers()
})

describe('useTasks', () => {
  it('debounces search changes and reloads the first page', async () => {
    await mountTasks()
    const state = getState()

    expect(listTasks).toHaveBeenCalledTimes(1)

    vi.useFakeTimers()
    state.setSearchQuery('informe')
    expect(state.loading.value).toBe(true)
    expect(listTasks).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(299)
    expect(listTasks).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1)
    await Promise.resolve()

    expect(listTasks).toHaveBeenCalledTimes(2)
    expect(listTasks).toHaveBeenLastCalledWith(
      { status: '', assignee: '', q: 'informe', page: 1, per_page: 10 },
      expect.any(AbortSignal),
    )
    expect(state.loading.value).toBe(false)
  })

  it('aborts superseded requests and ignores their late responses', async () => {
    const pending = deferred<Paginated<Task>>()
    vi.mocked(listTasks)
      .mockReturnValueOnce(pending.promise)
      .mockResolvedValueOnce(emptyPage())

    const wrapper = mount(Harness)
    cleanup = () => wrapper.unmount()
    const initialRequest = vi.mocked(listTasks).mock.calls[0]
    const state = getState()

    state.setStatusFilter('pending')
    expect(initialRequest?.[1]?.aborted).toBe(true)

    await flushPromises()
    const lateTask: Task = {
      id: 2,
      title: 'Respuesta antigua',
      status: 'pending',
      assignee: 'María',
      due_date: null,
      created_at: '2025-01-01T00:00:00.000000Z',
      updated_at: '2025-01-01T00:00:00.000000Z',
    }
    pending.resolve({
      ...emptyPage(),
      data: [lateTask],
      meta: { ...emptyPage().meta, from: 1, to: 1, total: 1 },
    })
    await flushPromises()

    expect(state.tasks.value).toEqual([])
  })
})
