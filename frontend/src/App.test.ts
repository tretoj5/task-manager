import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import App from './App.vue'
import { ApiError } from './api/client'
import { createTask, listTasks } from './api/tasks'
import type { Paginated, Task } from './types'

const apiMocks = vi.hoisted(() => ({
  listTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  updateTaskStatus: vi.fn(),
}))

vi.mock('./api/tasks', () => apiMocks)

let cleanup: (() => void) | null = null

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

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value(this: HTMLDialogElement): void {
      this.setAttribute('open', '')
    },
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value(this: HTMLDialogElement): void {
      this.removeAttribute('open')
    },
  })
})

afterEach(() => {
  cleanup?.()
  cleanup = null
  vi.resetAllMocks()
})

describe('App', () => {
  it('maps API 422 validation errors to the matching form field', async () => {
    vi.mocked(listTasks).mockResolvedValue(emptyPage())
    vi.mocked(createTask).mockRejectedValueOnce(new ApiError(
      'Los datos enviados no son válidos.',
      422,
      { title: ['El título ya está en uso.'] },
    ))

    const wrapper = mount(App)
    cleanup = () => wrapper.unmount()
    await flushPromises()

    await wrapper.get('button.primary-action').trigger('click')
    await flushPromises()
    expect(wrapper.get('dialog').attributes('aria-labelledby')).toBe('task-form-title')
    expect(wrapper.get('#task-form-title').text()).toBe('Nueva tarea')
    await wrapper.get('#task-title').setValue('Revisar informe')
    await wrapper.get('#task-assignee').setValue('María')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(createTask).toHaveBeenCalledWith({
      title: 'Revisar informe',
      assignee: 'María',
      status: 'pending',
      due_date: null,
    })
    expect(wrapper.get('#task-title').attributes('aria-invalid')).toBe('true')
    expect(wrapper.text()).toContain('El título ya está en uso.')
    expect(wrapper.find('dialog').exists()).toBe(true)

    await wrapper.get('#task-title').setValue('Revisar informe actualizado')
    expect(wrapper.text()).not.toContain('El título ya está en uso.')
  })
})
