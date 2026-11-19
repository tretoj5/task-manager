import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ApiError } from '../api/client'
import {
  createTask as createTaskRequest,
  listTasks,
  updateTask as updateTaskRequest,
  updateTaskStatus,
} from '../api/tasks'
import type { Task, TaskFilters, TaskFormData, TaskMeta, TaskStatus } from '../types'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 300

export function useTasks() {
  const tasks = ref<Task[]>([])
  const meta = ref<TaskMeta | null>(null)
  const loading = ref(false)
  const error = ref('')
  const statusFilter = ref<TaskStatus | ''>('')
  const assigneeFilter = ref('')
  const searchQuery = ref('')
  const page = ref(1)
  const statusChangingId = ref<number | null>(null)

  let activeController: AbortController | null = null
  let searchTimer: ReturnType<typeof setTimeout> | null = null
  let requestVersion = 0

  function cancelSearchTimer(): void {
    if (searchTimer !== null) {
      clearTimeout(searchTimer)
      searchTimer = null
    }
  }

  async function loadTasks(): Promise<void> {
    cancelSearchTimer()
    activeController?.abort()

    const controller = new AbortController()
    const version = ++requestVersion
    activeController = controller
    loading.value = true
    error.value = ''

    const filters: TaskFilters = {
      status: statusFilter.value,
      assignee: assigneeFilter.value,
      q: searchQuery.value,
      page: page.value,
      per_page: PAGE_SIZE,
    }

    try {
      const result = await listTasks(filters, controller.signal)

      if (version !== requestVersion) {
        return
      }

      tasks.value = result.data
      meta.value = result.meta
    } catch (reason: unknown) {
      if (controller.signal.aborted || version !== requestVersion) {
        return
      }

      error.value = reason instanceof Error
        ? reason.message
        : 'No se pudieron cargar las tareas.'
    } finally {
      if (version === requestVersion) {
        loading.value = false
        activeController = null
      }
    }
  }

  function setStatusFilter(value: TaskStatus | ''): void {
    if (statusFilter.value === value) {
      return
    }

    statusFilter.value = value
    page.value = 1
    void loadTasks()
  }

  function setAssigneeFilter(value: string): void {
    if (assigneeFilter.value === value) {
      return
    }

    assigneeFilter.value = value
    page.value = 1
    void loadTasks()
  }

  function setSearchQuery(value: string): void {
    if (searchQuery.value === value) {
      return
    }

    searchQuery.value = value
    page.value = 1
    cancelSearchTimer()
    activeController?.abort()
    activeController = null
    requestVersion += 1
    loading.value = true
    error.value = ''

    searchTimer = setTimeout(() => {
      searchTimer = null
      void loadTasks()
    }, SEARCH_DEBOUNCE_MS)
  }

  function goToPage(value: number): void {
    if (value < 1 || (meta.value !== null && value > meta.value.last_page) || page.value === value) {
      return
    }

    page.value = value
    void loadTasks()
  }

  async function create(data: TaskFormData): Promise<void> {
    await createTaskRequest(data)
    await loadTasks()
  }

  async function update(id: number, data: TaskFormData): Promise<void> {
    await updateTaskRequest(id, data)
    await loadTasks()
  }

  async function changeStatus(id: number, status: TaskStatus): Promise<void> {
    if (statusChangingId.value !== null) {
      return
    }

    statusChangingId.value = id
    error.value = ''

    try {
      await updateTaskStatus(id, status)
      await loadTasks()
    } catch (reason: unknown) {
      error.value = reason instanceof ApiError
        ? reason.message
        : reason instanceof Error
          ? reason.message
          : 'No se pudo cambiar el estado de la tarea.'
    } finally {
      statusChangingId.value = null
    }
  }

  onMounted(() => {
    void loadTasks()
  })

  onBeforeUnmount(() => {
    cancelSearchTimer()
    activeController?.abort()
  })

  return {
    tasks,
    meta,
    loading,
    error,
    statusFilter,
    assigneeFilter,
    searchQuery,
    page,
    statusChangingId,
    setStatusFilter,
    setAssigneeFilter,
    setSearchQuery,
    goToPage,
    reload: loadTasks,
    create,
    update,
    changeStatus,
  }
}
