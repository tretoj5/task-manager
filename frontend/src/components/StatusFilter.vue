<script setup lang="ts">
import type { TaskStatus } from '../types'

defineProps<{ modelValue: TaskStatus | '' }>()

const emit = defineEmits<{
  'update:modelValue': [value: TaskStatus | '']
}>()

function isTaskStatus(value: string): value is TaskStatus {
  return value === 'pending' || value === 'in_progress' || value === 'done'
}

function updateValue(event: Event): void {
  if (!(event.currentTarget instanceof HTMLSelectElement)) {
    return
  }

  const value = event.currentTarget.value
  if (value === '' || isTaskStatus(value)) {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <label class="filter-control">
    <span class="filter-control__label">Estado</span>
    <select :value="modelValue" name="status" @change="updateValue">
      <option value="">Todos los estados</option>
      <option value="pending">Pendiente</option>
      <option value="in_progress">En curso</option>
      <option value="done">Completada</option>
    </select>
  </label>
</template>
