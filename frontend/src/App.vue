<script setup lang="ts">
import { onMounted, ref } from 'vue'

type HealthStatus = 'checking' | 'available' | 'unavailable'

const healthStatus = ref<HealthStatus>('checking')
const errorMessage = ref('')

function isHealthResponse(value: unknown): value is { status: string } {
  return typeof value === 'object'
    && value !== null
    && 'status' in value
    && typeof value.status === 'string'
}

async function checkHealth(): Promise<void> {
  healthStatus.value = 'checking'
  errorMessage.value = ''

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/health`, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`El servidor respondió con HTTP ${response.status}.`)
    }

    const result: unknown = await response.json()

    if (!isHealthResponse(result) || result.status !== 'ok') {
      throw new Error('La respuesta del servicio no es válida.')
    }

    healthStatus.value = 'available'
  } catch (error: unknown) {
    healthStatus.value = 'unavailable'
    errorMessage.value = error instanceof Error ? error.message : 'No se pudo conectar con el servicio.'
  }
}

onMounted(checkHealth)
</script>

<template>
  <main>
    <h1>Gestor de tareas</h1>
    <p>Comprobación de la API y la base de datos</p>

    <p v-if="healthStatus === 'checking'" role="status">
      Conectando con el servicio…
    </p>
    <p v-else-if="healthStatus === 'available'" role="status">
      La API y la base de datos están disponibles.
    </p>
    <div v-else role="alert">
      <p>No se pudo comprobar el servicio: {{ errorMessage }}</p>
    </div>

    <button type="button" :disabled="healthStatus === 'checking'" @click="checkHealth">
      {{ healthStatus === 'unavailable' ? 'Reintentar' : 'Comprobar de nuevo' }}
    </button>
  </main>
</template>
