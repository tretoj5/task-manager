<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  dismiss: []
}>()
</script>

<template>
  <div v-if="message" class="toast-notification" role="status" aria-live="polite">
    <p>{{ message }}</p>
    <button
      class="compact-button compact-button--quiet"
      type="button"
      aria-label="Cerrar aviso"
      @click="emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>
