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
  <label class="filter-control search-control">
    <span class="filter-control__label">Buscar tarea</span>
    <input
      :value="modelValue"
      type="search"
      name="q"
      autocomplete="off"
      placeholder="Buscar por título"
      @input="updateValue"
    />
  </label>
</template>
