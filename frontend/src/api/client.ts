import type { ApiValidationErrors } from '../types'

export class ApiError extends Error {
  readonly status: number
  readonly errors?: ApiValidationErrors

  constructor(message: string, status: number, errors?: ApiValidationErrors) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseValidationErrors(value: unknown): ApiValidationErrors | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const entries = Object.entries(value).flatMap(([field, messages]) => {
    if (!Array.isArray(messages) || !messages.every((message) => typeof message === 'string')) {
      return []
    }

    return [[field, messages]]
  })

  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function errorFromResponse(payload: unknown, status: number): ApiError {
  const message = isRecord(payload) && typeof payload.message === 'string'
    ? payload.message
    : `La API respondió con HTTP ${status}.`
  const errors = isRecord(payload) ? parseValidationErrors(payload.errors) : undefined

  return new ApiError(message, status, errors)
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH'
  body?: unknown
  signal?: AbortSignal
}

export async function apiRequest<T>(
  path: string,
  parse: (value: unknown) => T,
  options: ApiRequestOptions = {},
): Promise<T> {
  const apiBaseUrl = import.meta.env.VITE_API_URL

  if (!apiBaseUrl) {
    throw new ApiError('Falta configurar VITE_API_URL.', 0)
  }

  const headers = new Headers({ Accept: 'application/json' })

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  let response: Response

  try {
    response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal,
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }

    throw new ApiError('No se pudo conectar con la API. Comprueba la conexión e inténtalo de nuevo.', 0)
  }

  let payload: unknown

  try {
    payload = await response.json()
  } catch {
    throw new ApiError(
      response.ok
        ? 'La API devolvió una respuesta que no es JSON válida.'
        : `La API respondió con HTTP ${response.status}.`,
      response.status,
    )
  }

  if (!response.ok) {
    throw errorFromResponse(payload, response.status)
  }

  return parse(payload)
}
