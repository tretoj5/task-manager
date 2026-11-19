<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import AssigneeFilter from './components/AssigneeFilter.vue'
import Pagination from './components/Pagination.vue'
import SearchBox from './components/SearchBox.vue'
import StatusFilter from './components/StatusFilter.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { ApiError } from './api/client'
import { useTasks } from './composables/useTasks'
import type { ApiValidationErrors, Task, TaskFormData } from './types'

const {
  tasks,
  meta,
  loading,
  error,
  statusFilter,
  assigneeFilter,
  searchQuery,
  statusChangingId,
  setStatusFilter,
  setAssigneeFilter,
  setSearchQuery,
  goToPage,
  reload,
  create,
  update,
  changeStatus,
} = useTasks()

const formDialog = ref<HTMLDialogElement | null>(null)
const createButton = ref<HTMLButtonElement | null>(null)
const isFormOpen = ref(false)
const editingTask = ref<Task | null>(null)
const formSubmitting = ref(false)
const formServerErrors = ref<ApiValidationErrors>({})
const submissionError = ref('')

watch(isFormOpen, async (open) => {
  await nextTick()

  if (open && formDialog.value && !formDialog.value.open) {
    formDialog.value.showModal()
  } else if (!open) {
    if (formDialog.value?.open) {
      formDialog.value.close()
    }

    createButton.value?.focus()
  }
})

function resetFormErrors(): void {
  formServerErrors.value = {}
  submissionError.value = ''
}

function openCreateForm(): void {
  editingTask.value = null
  resetFormErrors()
  isFormOpen.value = true
}

function openEditForm(task: Task): void {
  editingTask.value = task
  resetFormErrors()
  isFormOpen.value = true
}

function closeForm(): void {
  if (!formSubmitting.value) {
    isFormOpen.value = false
  }
}

function handleDialogCancel(event: Event): void {
  event.preventDefault()
  closeForm()
}

function handleDialogClick(event: MouseEvent): void {
  if (event.target === formDialog.value) {
    closeForm()
  }
}

async function submitForm(data: TaskFormData): Promise<void> {
  formSubmitting.value = true
  resetFormErrors()

  try {
    if (editingTask.value) {
      await update(editingTask.value.id, data)
    } else {
      await create(data)
    }

    isFormOpen.value = false
  } catch (reason: unknown) {
    if (reason instanceof ApiError && reason.status === 422 && reason.errors) {
      formServerErrors.value = reason.errors
      submissionError.value = Object.keys(reason.errors).length === 0 ? reason.message : ''
    } else {
      submissionError.value = reason instanceof Error
        ? reason.message
        : 'No se pudo guardar la tarea.'
    }
  } finally {
    formSubmitting.value = false
  }
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="app-header__inner">
        <a class="app-brand" href="#inicio">Tareas</a>
        <p class="app-header__note">Un paso a la vez</p>
        <button ref="createButton" class="primary-action" type="button" @click="openCreateForm">
          <span class="primary-action__base" aria-hidden="true" />
          <span class="primary-action__face">Nueva tarea</span>
        </button>
      </div>
    </header>

    <main id="inicio" class="page-main">
      <section class="page-intro" aria-labelledby="page-title">
        <p class="eyebrow">Tu espacio de trabajo</p>
        <h1 id="page-title">Organiza lo que sigue.</h1>
        <p class="page-intro__description">
          Revisa prioridades, responsables y fechas desde un solo lugar.
        </p>
      </section>

      <section class="task-toolbar" aria-label="Filtros de tareas">
        <SearchBox :model-value="searchQuery" @update:model-value="setSearchQuery" />
        <StatusFilter :model-value="statusFilter" @update:model-value="setStatusFilter" />
        <AssigneeFilter :model-value="assigneeFilter" @update:model-value="setAssigneeFilter" />
      </section>

      <TaskList
        :tasks="tasks"
        :loading="loading"
        :error="error"
        :status-changing-id="statusChangingId"
        @retry="reload"
        @edit="openEditForm"
        @change-status="changeStatus"
      />

      <Pagination :meta="meta" :loading="loading" @page-change="goToPage" />
    </main>

    <dialog
      v-if="isFormOpen"
      ref="formDialog"
      class="task-dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
      @cancel="handleDialogCancel"
      @click="handleDialogClick"
    >
      <TaskForm
        :task="editingTask"
        :submitting="formSubmitting"
        :server-errors="formServerErrors"
        :submission-error="submissionError"
        @submit="submitForm"
        @cancel="closeForm"
        @field-change="resetFormErrors"
      />
    </dialog>
  </div>
</template>
