<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiValidationErrors, Task, TaskFormData, TaskStatus } from '../types'

type TaskField = keyof TaskFormData
type ClientErrors = Partial<Record<TaskField, string>>

const props = defineProps<{
  task: Task | null
  submitting: boolean
  serverErrors: ApiValidationErrors
  submissionError: string
}>()

const emit = defineEmits<{
  submit: [data: TaskFormData]
  cancel: []
  'field-change': []
}>()

const title = ref('')
const assignee = ref('')
const status = ref<TaskStatus>('pending')
const dueDate = ref('')
const clientErrors = ref<ClientErrors>({})

watch(
  () => props.task,
  (task) => {
    title.value = task?.title ?? ''
    assignee.value = task?.assignee ?? ''
    status.value = task?.status ?? 'pending'
    dueDate.value = task?.due_date ?? ''
    clientErrors.value = {}
  },
  { immediate: true },
)

function fieldError(field: TaskField): string {
  return clientErrors.value[field] ?? props.serverErrors[field]?.[0] ?? ''
}

function clearErrors(): void {
  clientErrors.value = {}
  emit('field-change')
}

function todayAsDateInput(): string {
  const today = new Date()

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
}

function submitForm(): void {
  const data: TaskFormData = {
    title: title.value.trim(),
    assignee: assignee.value.trim(),
    status: status.value,
    due_date: dueDate.value === '' ? null : dueDate.value,
  }
  const errors: ClientErrors = {}

  if (data.title.length === 0) {
    errors.title = 'Escribe un título para la tarea.'
  } else if (data.title.length > 120) {
    errors.title = 'El título no puede superar los 120 caracteres.'
  }

  if (data.assignee.length === 0) {
    errors.assignee = 'Escribe el nombre de la persona responsable.'
  } else if (data.assignee.length > 60) {
    errors.assignee = 'El nombre no puede superar los 60 caracteres.'
  }

  if (
    data.due_date !== null
    && data.due_date < todayAsDateInput()
    && data.due_date !== (props.task?.due_date ?? null)
  ) {
    errors.due_date = 'La fecha nueva no puede estar en el pasado.'
  }

  clientErrors.value = errors

  if (Object.keys(errors).length > 0) {
    return
  }

  emit('submit', data)
}
</script>

<template>
  <form class="task-form" novalidate @submit.prevent="submitForm">
    <header class="task-form__header">
      <div>
        <p class="eyebrow">{{ task ? 'Actualiza los detalles' : 'Añade una tarea' }}</p>
        <h2 id="task-form-title">{{ task ? 'Editar tarea' : 'Nueva tarea' }}</h2>
      </div>
      <button
        class="icon-button"
        type="button"
        aria-label="Cerrar formulario"
        :disabled="submitting"
        @click="emit('cancel')"
      >
        ×
      </button>
    </header>

    <p v-if="submissionError" class="field-error form-error" role="alert">
      {{ submissionError }}
    </p>

    <label class="form-field" for="task-title">
      <span>Título</span>
      <input
        id="task-title"
        v-model="title"
        type="text"
        name="title"
        maxlength="120"
        required
        autofocus
        :aria-invalid="Boolean(fieldError('title'))"
        :aria-describedby="fieldError('title') ? 'task-title-error' : undefined"
        @input="clearErrors"
      />
      <span v-if="fieldError('title')" id="task-title-error" class="field-error">
        {{ fieldError('title') }}
      </span>
    </label>

    <label class="form-field" for="task-assignee">
      <span>Responsable</span>
      <input
        id="task-assignee"
        v-model="assignee"
        type="text"
        name="assignee"
        maxlength="60"
        required
        :aria-invalid="Boolean(fieldError('assignee'))"
        :aria-describedby="fieldError('assignee') ? 'task-assignee-error' : undefined"
        @input="clearErrors"
      />
      <span v-if="fieldError('assignee')" id="task-assignee-error" class="field-error">
        {{ fieldError('assignee') }}
      </span>
    </label>

    <div class="task-form__row">
      <label class="form-field" for="task-status">
        <span>Estado</span>
        <select
          id="task-status"
          v-model="status"
          name="status"
          :aria-invalid="Boolean(fieldError('status'))"
          :aria-describedby="fieldError('status') ? 'task-status-error' : undefined"
          @change="clearErrors"
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En curso</option>
          <option value="done">Completada</option>
        </select>
        <span v-if="fieldError('status')" id="task-status-error" class="field-error">
          {{ fieldError('status') }}
        </span>
      </label>

      <label class="form-field" for="task-due-date">
        <span>Fecha límite <span class="form-field__optional">(opcional)</span></span>
        <input
          id="task-due-date"
          v-model="dueDate"
          type="date"
          name="due_date"
          :aria-invalid="Boolean(fieldError('due_date'))"
          :aria-describedby="fieldError('due_date') ? 'task-due-date-error' : undefined"
          @input="clearErrors"
        />
        <span v-if="fieldError('due_date')" id="task-due-date-error" class="field-error">
          {{ fieldError('due_date') }}
        </span>
      </label>
    </div>

    <footer class="task-form__actions">
      <button
        class="compact-button compact-button--quiet"
        type="button"
        :disabled="submitting"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
      <button class="compact-button" type="submit" :disabled="submitting">
        {{ submitting ? 'Guardando…' : task ? 'Guardar cambios' : 'Crear tarea' }}
      </button>
    </footer>
  </form>
</template>
