<script setup lang="ts">
import type { TaskMeta } from '../types'

defineProps<{
  meta: TaskMeta | null
  loading: boolean
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()
</script>

<template>
  <nav v-if="meta" class="pagination" aria-label="Paginación de tareas">
    <p class="pagination__summary">
      Mostrando {{ meta.from ?? 0 }}–{{ meta.to ?? 0 }} de {{ meta.total }} tareas
    </p>
    <div v-if="meta.last_page > 1" class="pagination__controls">
      <button
        class="compact-button compact-button--quiet"
        type="button"
        :disabled="loading || meta.current_page <= 1"
        @click="emit('page-change', meta.current_page - 1)"
      >
        Anterior
      </button>
      <span class="pagination__page">
        Página {{ meta.current_page }} de {{ meta.last_page }}
      </span>
      <button
        class="compact-button compact-button--quiet"
        type="button"
        :disabled="loading || meta.current_page >= meta.last_page"
        @click="emit('page-change', meta.current_page + 1)"
      >
        Siguiente
      </button>
    </div>
  </nav>
</template>
