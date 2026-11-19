<script setup lang="ts">
defineProps<{ modelValue: string }>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event): void {
  if (event.currentTarget instanceof HTMLInputElement) {
    emit('update:modelValue', event.currentTarget.value)
  }
}
</script>

<template>
  <label class="filter-control">
    <span class="filter-control__label">Responsable</span>
    <input
      :value="modelValue"
      type="text"
      name="assignee"
      maxlength="60"
      autocomplete="off"
      placeholder="Filtrar por nombre"
      @input="updateValue"
    />
  </label>
</template>
