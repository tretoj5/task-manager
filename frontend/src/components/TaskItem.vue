<script setup lang="ts">
import { computed } from 'vue'
import type { Task, TaskStatus } from '../types'

const props = defineProps<{
  task: Task
  statusChanging: boolean
}>()

const emit = defineEmits<{
  edit: [task: Task]
  'change-status': [id: number, status: TaskStatus]
}>()

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En curso',
  done: 'Hecha',
}

const nextStatus: Partial<Record<TaskStatus, TaskStatus>> = {
  pending: 'in_progress',
  in_progress: 'done',
}

const isOverdue = computed(() => {
  if (props.task.due_date === null || props.task.status === 'done') {
    return false
  }

  const now = new Date()
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  return props.task.due_date < today
})

const formattedDueDate = computed(() => {
  if (props.task.due_date === null) {
    return 'Sin fecha límite'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${props.task.due_date}T12:00:00`))
})
</script>

<template>
  <li class="task-card" :class="{ 'task-card--overdue': isOverdue }">
    <div class="task-card__main">
      <div class="task-card__heading">
        <h3>{{ task.title }}</h3>
        <span class="status-tag" :class="`status-tag--${task.status}`">
          {{ statusLabels[task.status] }}
        </span>
      </div>
      <div class="task-card__details">
        <span class="task-card__assignee">Responsable: {{ task.assignee }}</span>
        <span class="task-card__due-date" :class="{ 'task-card__due-date--overdue': isOverdue }">
          Fecha límite:
          <time v-if="task.due_date" :datetime="task.due_date">{{ formattedDueDate }}</time>
          <span v-else>{{ formattedDueDate }}</span>
          <span v-if="isOverdue" class="task-card__overdue-note">· Vencida</span>
        </span>
      </div>
    </div>

    <div class="task-card__actions">
      <button class="compact-button compact-button--quiet" type="button" @click="emit('edit', task)">
        Editar
      </button>
      <button
        v-if="nextStatus[task.status]"
        class="compact-button"
        type="button"
        :disabled="statusChanging"
        :aria-label="`Avanzar «${task.title}» a ${statusLabels[nextStatus[task.status]!]}`"
        @click="emit('change-status', task.id, nextStatus[task.status]!)"
      >
        {{ statusChanging ? 'Guardando…' : 'Avanzar estado' }}
      </button>
    </div>
  </li>
</template>
