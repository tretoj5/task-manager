import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import TaskList from './TaskList.vue'
import type { Task } from '../types'

let cleanup: (() => void) | null = null

function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 4,
    title: 'Preparar la entrega',
    status: 'pending',
    assignee: 'María',
    due_date: null,
    created_at: '2025-01-01T00:00:00.000000Z',
    updated_at: '2025-01-01T00:00:00.000000Z',
    ...overrides,
  }
}

function mountList(props: {
  tasks?: Task[]
  loading?: boolean
  error?: string
  statusChangingId?: number | null
} = {}) {
  const wrapper = mount(TaskList, {
    props: {
      tasks: props.tasks ?? [],
      loading: props.loading ?? false,
      error: props.error ?? '',
      statusChangingId: props.statusChangingId ?? null,
    },
  })
  cleanup = () => wrapper.unmount()

  return wrapper
}

afterEach(() => {
  cleanup?.()
  cleanup = null
})

describe('TaskList', () => {
  it('shows loading and empty states without presenting stale empty content', () => {
    const wrapper = mountList({ loading: true })

    expect(wrapper.get('[role="status"]').text()).toContain('Cargando tareas')
    expect(wrapper.get('[aria-busy="true"]')).toBeTruthy()
    expect(wrapper.find('.empty-state').exists()).toBe(false)
  })

  it('shows an empty state when loading succeeds without tasks', () => {
    const wrapper = mountList()

    expect(wrapper.text()).toContain('No hay tareas que coincidan con estos filtros.')
  })

  it('offers retry when the API reports a list error', async () => {
    const wrapper = mountList({ error: 'No se pudo conectar con la API.' })

    expect(wrapper.get('[role="alert"]').text()).toContain('No se pudo conectar')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('renders task details and forwards edit and status actions', async () => {
    const task = createTask()
    const wrapper = mountList({ tasks: [task] })

    expect(wrapper.text()).toContain(task.title)
    expect(wrapper.text()).toContain('Responsable: María')
    expect(wrapper.text()).toContain('Sin fecha límite')

    await wrapper.get('button[aria-label^="Avanzar"]').trigger('click')
    await wrapper.get('.compact-button--quiet').trigger('click')

    expect(wrapper.emitted('change-status')).toEqual([[task.id, 'in_progress']])
    expect(wrapper.emitted('edit')).toEqual([[task]])
  })
})
