import { ApiError, apiRequest, isRecord } from './client'
import type {
  ApiValidationErrors,
  PageLinks,
  Paginated,
  PaginationLink,
  Task,
  TaskFilters,
  TaskFormData,
  TaskMeta,
  TaskStatus,
} from '../types'

function isTaskStatus(value: unknown): value is TaskStatus {
  return value === 'pending' || value === 'in_progress' || value === 'done'
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || typeof value === 'number'
}

function invalidResponse(): never {
  throw new ApiError('La API devolvió datos de tareas con un formato inesperado.', 502)
}

function parseTask(value: unknown): Task {
  if (
    !isRecord(value)
    || typeof value.id !== 'number'
    || typeof value.title !== 'string'
    || !isTaskStatus(value.status)
    || typeof value.assignee !== 'string'
    || !isNullableString(value.due_date)
    || typeof value.created_at !== 'string'
    || typeof value.updated_at !== 'string'
  ) {
    return invalidResponse()
  }

  return {
    id: value.id,
    title: value.title,
    status: value.status,
    assignee: value.assignee,
    due_date: value.due_date,
    created_at: value.created_at,
    updated_at: value.updated_at,
  }
}

function parsePageLinks(value: unknown): PageLinks {
  if (
    !isRecord(value)
    || !isNullableString(value.first)
    || !isNullableString(value.last)
    || !isNullableString(value.prev)
    || !isNullableString(value.next)
  ) {
    return invalidResponse()
  }

  return {
    first: value.first,
    last: value.last,
    prev: value.prev,
    next: value.next,
  }
}

function parsePaginationLink(value: unknown): PaginationLink {
  if (
    !isRecord(value)
    || !isNullableString(value.url)
    || typeof value.label !== 'string'
    || !isNullableNumber(value.page)
    || typeof value.active !== 'boolean'
  ) {
    return invalidResponse()
  }

  return {
    url: value.url,
    label: value.label,
    page: value.page,
    active: value.active,
  }
}

function parseTaskMeta(value: unknown): TaskMeta {
  if (
    !isRecord(value)
    || typeof value.current_page !== 'number'
    || !isNullableNumber(value.from)
    || typeof value.last_page !== 'number'
    || !Array.isArray(value.links)
    || typeof value.path !== 'string'
    || typeof value.per_page !== 'number'
    || !isNullableNumber(value.to)
    || typeof value.total !== 'number'
  ) {
    return invalidResponse()
  }

  return {
    current_page: value.current_page,
    from: value.from,
    last_page: value.last_page,
    links: value.links.map(parsePaginationLink),
    path: value.path,
    per_page: value.per_page,
    to: value.to,
    total: value.total,
  }
}

function parseTaskPage(value: unknown): Paginated<Task> {
  if (!isRecord(value) || !Array.isArray(value.data)) {
    return invalidResponse()
  }

  return {
    data: value.data.map(parseTask),
    links: parsePageLinks(value.links),
    meta: parseTaskMeta(value.meta),
  }
}

function parseTaskResponse(value: unknown): Task {
  if (!isRecord(value)) {
    return invalidResponse()
  }

  return parseTask(value.data)
}

export function listTasks(filters: TaskFilters, signal?: AbortSignal): Promise<Paginated<Task>> {
  const query = new URLSearchParams({
    page: String(filters.page),
    per_page: String(filters.per_page),
  })

  if (filters.status !== '') {
    query.set('status', filters.status)
  }
  if (filters.assignee.trim() !== '') {
    query.set('assignee', filters.assignee.trim())
  }
  if (filters.q.trim() !== '') {
    query.set('q', filters.q.trim())
  }

  return apiRequest(`/tasks?${query}`, parseTaskPage, { signal })
}

export function createTask(data: TaskFormData): Promise<Task> {
  return apiRequest('/tasks', parseTaskResponse, { method: 'POST', body: data })
}

export function updateTask(id: number, data: TaskFormData): Promise<Task> {
  return apiRequest(`/tasks/${encodeURIComponent(id)}`, parseTaskResponse, {
    method: 'PUT',
    body: data,
  })
}

export function updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  return apiRequest(`/tasks/${encodeURIComponent(id)}/status`, parseTaskResponse, {
    method: 'PATCH',
    body: { status },
  })
}

export type { ApiValidationErrors }
