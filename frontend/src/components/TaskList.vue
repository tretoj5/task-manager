<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task, TaskStatus } from '../types'

defineProps<{
  tasks: Task[]
  loading: boolean
  error: string
  statusChangingId: number | null
}>()

const emit = defineEmits<{
  edit: [task: Task]
  'change-status': [id: number, status: TaskStatus]
  retry: []
}>()

function handleStatusChange(id: number, status: TaskStatus): void {
  emit('change-status', id, status)
}
</script>

<template>
  <section class="task-results" aria-label="Resultados de tareas" :aria-busy="loading">
    <p v-if="loading" class="loading-message" role="status">Cargando tareas…</p>

    <div v-if="error" class="error-banner" role="alert">
      <p>{{ error }}</p>
      <button class="compact-button compact-button--quiet" type="button" @click="emit('retry')">
        Reintentar
      </button>
    </div>

    <p v-if="!loading && !error && tasks.length === 0" class="empty-state">
      No hay tareas que coincidan con estos filtros.
    </p>

    <ul v-if="tasks.length > 0" class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :status-changing="statusChangingId !== null"
        @edit="emit('edit', $event)"
        @change-status="handleStatusChange"
      />
    </ul>
  </section>
</template>
