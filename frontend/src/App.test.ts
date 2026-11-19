import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import App from './App.vue'
import { ApiError } from './api/client'
import { createTask, listTasks, updateTask, updateTaskStatus } from './api/tasks'
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

function task(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    title: 'Revisar informe',
    status: 'pending',
    assignee: 'María',
    due_date: null,
    created_at: '2025-01-01T00:00:00.000000Z',
    updated_at: '2025-01-01T00:00:00.000000Z',
    ...overrides,
  }
}

function pageWithTask(item: Task): Paginated<Task> {
  return {
    ...emptyPage(),
    data: [item],
    meta: {
      ...emptyPage().meta,
      from: 1,
      to: 1,
      total: 1,
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
  it('shows and dismisses a success toast after creating a task', async () => {
    const createdTask = task({ id: 2 })
    vi.mocked(listTasks).mockResolvedValue(emptyPage())
    vi.mocked(createTask).mockResolvedValue(createdTask)

    const wrapper = mount(App)
    cleanup = () => wrapper.unmount()
    await flushPromises()

    await wrapper.get('button.primary-action').trigger('click')
    await flushPromises()
    await wrapper.get('#task-title').setValue(createdTask.title)
    await wrapper.get('#task-assignee').setValue(createdTask.assignee)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(createTask).toHaveBeenCalledOnce()
    expect(wrapper.get('.toast-notification[role="status"]').text())
      .toContain('La tarea se creó correctamente.')

    await wrapper.get('button[aria-label="Cerrar aviso"]').trigger('click')
    expect(wrapper.find('.toast-notification').exists()).toBe(false)
  })

  it('shows a success toast after updating a task', async () => {
    const existingTask = task()
    vi.mocked(listTasks).mockResolvedValue(pageWithTask(existingTask))
    vi.mocked(updateTask).mockResolvedValue(task({ title: 'Informe actualizado' }))

    const wrapper = mount(App)
    cleanup = () => wrapper.unmount()
    await flushPromises()

    await wrapper.get('.task-card .compact-button--quiet').trigger('click')
    await flushPromises()
    await wrapper.get('#task-title').setValue('Informe actualizado')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(updateTask).toHaveBeenCalledWith(existingTask.id, {
      title: 'Informe actualizado',
      assignee: existingTask.assignee,
      status: existingTask.status,
      due_date: null,
    })
    expect(wrapper.get('.toast-notification[role="status"]').text())
      .toContain('La tarea se actualizó correctamente.')
  })

  it('shows a success toast after changing a task status', async () => {
    const existingTask = task()
    vi.mocked(listTasks).mockResolvedValue(pageWithTask(existingTask))
    vi.mocked(updateTaskStatus).mockResolvedValue(task({ status: 'in_progress' }))

    const wrapper = mount(App)
    cleanup = () => wrapper.unmount()
    await flushPromises()

    await wrapper.get('button[aria-label^="Avanzar"]').trigger('click')
    await flushPromises()

    expect(updateTaskStatus).toHaveBeenCalledWith(existingTask.id, 'in_progress')
    expect(wrapper.get('.toast-notification[role="status"]').text())
      .toContain('La tarea pasó a «En curso».')
  })

  it('does not show a success toast when changing a task status fails', async () => {
    vi.mocked(listTasks).mockResolvedValue(pageWithTask(task()))
    vi.mocked(updateTaskStatus).mockRejectedValue(new ApiError('No se pudo guardar.', 500))

    const wrapper = mount(App)
    cleanup = () => wrapper.unmount()
    await flushPromises()

    await wrapper.get('button[aria-label^="Avanzar"]').trigger('click')
    await flushPromises()

    expect(wrapper.find('.toast-notification').exists()).toBe(false)
    expect(wrapper.get('[role="alert"]').text()).toContain('No se pudo guardar.')
  })

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
