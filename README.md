# Gestor de tareas

Aplicación local para organizar tareas por estado, responsable y fecha límite. La interfaz está hecha con Vue 3 y TypeScript; la API REST usa Laravel y PostgreSQL.

## Requisitos

- Docker Engine con Docker Compose v2 y el servicio Docker activo.
- Node.js y npm para ejecutar los comandos del proyecto desde la raíz.
- Bash.

PHP, Composer, Artisan y las dependencias de Node se ejecutan dentro de los contenedores. No es necesario instalar PHP ni Composer en el equipo anfitrión.

## Inicio rápido

Desde la raíz del proyecto:

```bash
npm run dev
```

Este comando ejecuta `scripts/setup.sh`, instala las dependencias que falten dentro de Docker, genera `APP_KEY` si hace falta, inicia Laravel, PostgreSQL y Vue, aplica migraciones y datos de ejemplo, y espera a que la API y Vite estén disponibles. Después muestra los registros de los servicios en primer plano.

También se puede ejecutar solo el aprovisionamiento:

```bash
scripts/setup.sh
```

La configuración local se crea desde `backend/.env.example` y `frontend/.env.example` cuando esos archivos aún no existen. `APP_KEY` se genera automáticamente. El seeder crea 25 tareas de ejemplo únicamente cuando la tabla está vacía; repetir el inicio no vuelve a insertar los datos de muestra.

Con los puertos predeterminados:

- Interfaz: <http://localhost:5173>
- API: <http://localhost:8000/api>
- Comprobación de servicio: <http://localhost:8000/api/health>

Si el puerto 8000 está ocupado, cambia `APP_PORT` y `APP_URL` en `backend/.env`, y actualiza `VITE_API_URL` en `frontend/.env` para que apunte al mismo puerto, por ejemplo `http://localhost:8001/api`. Si PostgreSQL no puede publicar el puerto 5432, configura `FORWARD_DB_PORT` en `backend/.env`.

Para detener los contenedores:

```bash
npm run down
```

Este comando conserva el volumen de PostgreSQL y los datos. No añadas `-v` si quieres mantenerlos.

## Comandos

Ejecuta estos comandos desde la raíz:

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Prepara el entorno y sigue los registros de Sail. |
| `scripts/setup.sh` | Prepara e inicia los servicios en segundo plano. |
| `npm run down` | Detiene los servicios sin borrar los datos. |
| `npm run test` | Ejecuta las pruebas de backend y frontend. |
| `npm run test:backend` | Ejecuta las pruebas Pest dentro de Sail. |
| `npm run test:frontend` | Ejecuta Vitest en el servicio frontend. |
| `npm run typecheck` | Ejecuta `vue-tsc` en el servicio frontend. |
| `npm run lint:backend` | Comprueba el formato PHP con Pint. |

Para generar el bundle de producción del frontend:

```bash
docker compose -f backend/compose.yaml exec frontend npm run build
```

Los comandos de pruebas, typecheck, Pint y build requieren que los servicios estén iniciados.

## API

Todas las rutas están bajo `/api`, responden en JSON y usan `Accept: application/json`.

| Método y ruta | Descripción | Respuesta habitual |
| --- | --- | --- |
| `GET /api/health` | Comprueba la disponibilidad de la API y PostgreSQL. | `200` |
| `GET /api/tasks` | Lista tareas con filtros y paginación. | `200` |
| `POST /api/tasks` | Crea una tarea. | `201` |
| `GET /api/tasks/{id}` | Consulta una tarea. | `200`, `404` |
| `PUT /api/tasks/{id}` | Actualiza los campos enviados. | `200`, `404` |
| `PATCH /api/tasks/{id}` | Actualiza parcialmente una tarea. | `200`, `404` |
| `PATCH /api/tasks/{id}/status` | Cambia únicamente el estado. | `200`, `404` |

Los errores de validación devuelven `422` con `message` y errores por campo. Las tareas inexistentes devuelven `404` en JSON.

### Lista, filtros y paginación

`GET /api/tasks` admite estos parámetros:

| Parámetro | Comportamiento |
| --- | --- |
| `status` | Filtra por `pending`, `in_progress` o `done`. |
| `assignee` | Filtra por coincidencia exacta del nombre; admite hasta 60 caracteres. |
| `q` | Busca texto parcial de hasta 100 caracteres en el título, sin distinguir mayúsculas; los comodines se tratan como texto literal. |
| `page` | Número de página, desde 1. |
| `per_page` | Elementos por página; predeterminado 10, mínimo 1 y máximo 50. |

Los filtros se pueden combinar. La respuesta mantiene la forma paginada de Laravel: `data`, `links` y `meta`.

```bash
curl -H 'Accept: application/json' \
  'http://localhost:8000/api/tasks?status=pending&assignee=Ana&q=propuesta&page=1&per_page=10'
```

### Campos y validación

Una tarea contiene `id`, `title`, `status`, `assignee`, `due_date`, `created_at` y `updated_at`.

- `title`: obligatorio al crear; texto de 1 a 120 caracteres.
- `status`: `pending`, `in_progress` o `done`; al crear se puede omitir y se usa `pending`.
- `assignee`: obligatorio al crear; texto de 1 a 60 caracteres.
- `due_date`: fecha `YYYY-MM-DD` o `null`; al crear no puede estar en el pasado.
- En una actualización se pueden enviar solo los campos que cambian. Una fecha pasada ya existente puede conservarse; no se puede asignar una nueva fecha pasada.
- El endpoint de cambio de estado requiere únicamente `status`.

Ejemplo de creación:

```bash
curl --request POST 'http://localhost:8000/api/tasks' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Preparar propuesta",
    "status": "pending",
    "assignee": "Ana",
    "due_date": null
  }'
```

Ejemplo de cambio de estado:

```bash
curl --request PATCH 'http://localhost:8000/api/tasks/1/status' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{"status":"in_progress"}'
```

## Diseño y estructura

`DESIGN.md` es la referencia visual. Sus colores, tipografía, espaciado y radios se centralizan en `frontend/src/styles/tokens.css`; la interfaz y los estados de foco, hover, deshabilitado y error se implementan en `frontend/src/styles/app.css`. Las decisiones que la guía no especifica están anotadas en [`docs/FUTURE.md`](./docs/FUTURE.md).

- `backend/`: API Laravel, recursos, solicitudes de validación, migraciones, factory, seeder y pruebas Pest.
- `frontend/src/api/`: cliente HTTP tipado y operaciones de tareas.
- `frontend/src/composables/useTasks.ts`: estado del servidor, filtros, búsqueda con debounce, cancelación de peticiones y paginación.
- `frontend/src/components/`: filtros, lista, paginación y formulario reutilizable para crear y editar.
- `docs/AI_LOG.md`: decisiones y verificaciones realizadas durante la implementación.

## Alcance actual

La API no incluye autenticación ni eliminación de tareas; tampoco se añadieron colas, caché ni borrado lógico. Estas exclusiones mantienen el alcance de la prueba técnica. Las mejoras y decisiones pendientes se registran en [`docs/FUTURE.md`](./docs/FUTURE.md).
