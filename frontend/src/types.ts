export const TASK_STATUSES = ['pending', 'in_progress', 'done'] as const

export type TaskStatus = typeof TASK_STATUSES[number]

export interface Task {
  id: number
  title: string
  status: TaskStatus
  assignee: string
  due_date: string | null
  created_at: string
  updated_at: string
}

export type TaskFormData = Pick<Task, 'title' | 'status' | 'assignee' | 'due_date'>

export interface PaginationLink {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

export interface PageLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface TaskMeta {
  current_page: number
  from: number | null
  last_page: number
  links: PaginationLink[]
  path: string
  per_page: number
  to: number | null
  total: number
}

export interface Paginated<T> {
  data: T[]
  links: PageLinks
  meta: TaskMeta
}

export type ApiValidationErrors = Record<string, string[]>

export interface TaskFilters {
  status: TaskStatus | ''
  assignee: string
  q: string
  page: number
  per_page: number
}
