import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import TaskForm from './TaskForm.vue'
import type { Task, TaskFormData } from '../types'

let cleanup: (() => void) | null = null

function mountForm(task: Task | null = null) {
  const wrapper = mount(TaskForm, {
    props: {
      task,
      submitting: false,
      serverErrors: {},
      submissionError: '',
    },
  })
  cleanup = () => wrapper.unmount()

  return wrapper
}

function existingTask(): Task {
  return {
    id: 8,
    title: 'Revisar informe',
    status: 'in_progress',
    assignee: 'María',
    due_date: '2020-01-01',
    created_at: '2025-01-01T00:00:00.000000Z',
    updated_at: '2025-01-01T00:00:00.000000Z',
  }
}

afterEach(() => {
  cleanup?.()
  cleanup = null
})

describe('TaskForm', () => {
  it('validates required fields before emitting a submission', async () => {
    const wrapper = mountForm()

    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('#task-title').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('#task-assignee').attributes('aria-invalid')).toBe('true')
    expect(wrapper.text()).toContain('Escribe un título para la tarea.')
    expect(wrapper.text()).toContain('Escribe el nombre de la persona responsable.')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('trims text and represents an empty due date as null', async () => {
    const wrapper = mountForm()
    await wrapper.get('#task-title').setValue('  Preparar la entrega  ')
    await wrapper.get('#task-assignee').setValue('  María  ')
    await wrapper.get('form').trigger('submit')

    const submissions = wrapper.emitted('submit')
    expect(submissions).toHaveLength(1)
    expect(submissions?.[0]?.[0]).toEqual({
      title: 'Preparar la entrega',
      assignee: 'María',
      status: 'pending',
      due_date: null,
    } satisfies TaskFormData)
  })

  it('allows an unchanged past due date while editing', async () => {
    const task = existingTask()
    const wrapper = mountForm(task)

    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).not.toContain('La fecha nueva no puede estar en el pasado.')
    expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
      title: task.title,
      assignee: task.assignee,
      status: task.status,
      due_date: task.due_date,
    } satisfies TaskFormData)
  })
})
