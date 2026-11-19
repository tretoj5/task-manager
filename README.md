# Gestor de tareas

Aplicación web para crear tareas, asignarles un responsable, filtrar por
estado y avanzar su flujo (`pending` → `in_progress` → `done`). Está construida
con Laravel, PostgreSQL y Pest en el backend, y Vue 3, TypeScript y Vite en el
frontend. Todo se ejecuta con Laravel Sail y Docker Compose.

## Requisitos

- Docker Engine con Docker Compose v2 y el servicio Docker activo.
- Node.js y npm para ejecutar los comandos del proyecto desde la raíz.
- Bash.

PHP, Composer, Artisan y las dependencias de Node se ejecutan dentro de los
contenedores. No es necesario instalar PHP ni Composer en el equipo anfitrión.

## Configuración

El aprovisionamiento crea la configuración local a partir de los ejemplos
cuando aún no existen:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`APP_KEY` se genera automáticamente. En `backend/.env` se pueden ajustar
`APP_PORT` y `APP_URL`, junto con las credenciales de PostgreSQL
(`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`,
`DB_PASSWORD`). El frontend usa `VITE_API_URL`, que por defecto apunta a
`http://localhost:8000/api`.

Si el puerto 8000 está ocupado, cambia `APP_PORT` y `APP_URL` en
`backend/.env`, y actualiza `VITE_API_URL` en `frontend/.env` para que apunte al
mismo puerto, por ejemplo `http://localhost:8001/api`. Si PostgreSQL no puede
publicar el puerto 5432, configura `FORWARD_DB_PORT` en `backend/.env`.

## Ejecución

### Desarrollo

Desde la raíz del proyecto:

```bash
npm run dev
```

Este comando ejecuta `scripts/setup.sh`, instala las dependencias que falten
dentro de Docker, genera `APP_KEY` si hace falta, inicia Sail con PostgreSQL y
el servicio `frontend`, aplica migraciones y datos de ejemplo, y espera a que la
API y Vite estén disponibles. Después muestra los registros de los servicios en
primer plano.

También se puede ejecutar solo el aprovisionamiento, que deja los servicios en
segundo plano:

```bash
scripts/setup.sh
```

El seeder crea 25 tareas de ejemplo únicamente cuando la tabla está vacía;
repetir el inicio no vuelve a insertar los datos de muestra.

Servicios con los puertos predeterminados:

- Frontend: <http://localhost:5173>
- API: <http://localhost:8000/api>
- Comprobación de servicio: <http://localhost:8000/api/health>
- PostgreSQL desde los contenedores: `pgsql:5432`

Comandos disponibles desde la raíz:

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

### Build de producción

Con los servicios iniciados, genera el bundle del frontend:

```bash
docker compose -f backend/compose.yaml exec frontend npm run build
```

Sail está pensado para desarrollo; el proyecto no incluye imágenes de entrega
con nginx ni PHP-FPM.

### Detener los servicios

```bash
npm run down
```

El comando conserva el volumen de PostgreSQL y los datos. No añadas `-v` si
quieres mantenerlos.

## API

Todas las rutas están bajo `/api`, responden en JSON y aceptan
`Accept: application/json`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba la API y su conexión con PostgreSQL. Devuelve `200`. |
| `GET` | `/api/tasks` | Lista tareas con filtros y paginación. Devuelve `200`. |
| `POST` | `/api/tasks` | Crea una tarea; el estado se puede omitir y usa `pending`. Devuelve `201`. |
| `GET` | `/api/tasks/{id}` | Consulta una tarea. Devuelve `200` o `404`. |
| `PUT` | `/api/tasks/{id}` | Actualiza los campos enviados. Devuelve `200` o `404`. |
| `PATCH` | `/api/tasks/{id}` | Actualiza parcialmente una tarea. Devuelve `200` o `404`. |
| `PATCH` | `/api/tasks/{id}/status` | Cambia únicamente el estado. Devuelve `200` o `404`. |

Los errores de validación devuelven `422` con `message` y los errores por campo.
Las tareas inexistentes devuelven `404` en JSON aunque la petición no incluya
`Accept: application/json`.

### Autenticación y seguridad

La API es pública: ninguna ruta exige token, sesión ni usuario. La prueba
técnica no define cuentas ni roles y la interfaz es un tablero compartido, así
que se decidió no añadir autenticación en lugar de simularla a medias. Las
razones están también en [docs/FUTURE.md](./docs/FUTURE.md).

**Por qué no hay token.** Un token fijo enviado desde el frontend (por ejemplo
`VITE_API_TOKEN`) acabaría en el bundle de Vite y sería visible para cualquiera
desde el navegador: no protege nada y da una falsa sensación de seguridad. Un
esquema real implica usuarios, migraciones, inicio de sesión, manejo del `401`
en el cliente y sus pruebas, un alcance que la prueba no pide y que competiría
con el resto de requisitos.

**Qué sí está cubierto:**

- CORS limitado al origen del frontend (`http://localhost:5173`) y sin
  credenciales, en `backend/config/cors.php`.
- Validación en Form Requests con `validated()`; nunca `$request->all()`.
- Consultas parametrizadas y comodines de `LIKE` escapados en la búsqueda.
- Respuestas de error en JSON para `/api/*`, sin exponer detalles internos.
- `APP_DEBUG=true` es solo el valor de desarrollo de `.env.example`; en un
  entorno real debe ser `false` para no devolver trazas ni datos de conexión.

**Qué queda fuera y está en [docs/FUTURE.md](./docs/FUTURE.md):** Laravel
Sanctum con tokens personales o cookies SPA, policies para que cada persona
edite solo sus tareas, y limitación de peticiones por usuario con `throttle`
(hoy ninguna ruta lo aplica).

### Filtros y paginación

`GET /api/tasks` admite estos parámetros:

| Parámetro | Comportamiento |
| --- | --- |
| `status` | Filtra por `pending`, `in_progress` o `done`. |
| `assignee` | Filtra por coincidencia exacta del nombre; admite hasta 60 caracteres. |
| `q` | Busca texto parcial en el título, sin distinguir mayúsculas; los comodines se tratan como texto literal. |
| `page` | Número de página, desde 1. |
| `per_page` | Elementos por página; predeterminado 10, mínimo 1 y máximo 50. |

Los filtros se pueden combinar. El listado se ordena por fecha límite
ascendente (las tareas sin fecha van al final) y después por id descendente. La
respuesta mantiene la forma paginada de Laravel: `data`, `links` y `meta`
(`current_page`, `last_page`, `per_page`, `total`).

```bash
curl -H 'Accept: application/json' \
  'http://localhost:8000/api/tasks?status=pending&assignee=Ana&q=propuesta&page=1&per_page=10'
```

### Campos y validación

Una tarea contiene `id`, `title`, `status`, `assignee`, `due_date`,
`created_at` y `updated_at`.

- `title`: obligatorio al crear; texto de 1 a 120 caracteres.
- `status`: `pending`, `in_progress` o `done`; al crear se puede omitir y se usa
  `pending`.
- `assignee`: obligatorio al crear; texto de 1 a 60 caracteres.
- `due_date`: fecha `YYYY-MM-DD` o `null`; al crear no puede estar en el pasado.
- En una actualización se pueden enviar solo los campos que cambian. Una fecha
  pasada ya existente puede conservarse; no se puede asignar una nueva fecha
  pasada.
- El endpoint de cambio de estado requiere únicamente `status`.

Crear una tarea:

```bash
curl -i -X POST http://localhost:8000/api/tasks \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Preparar propuesta","assignee":"Ana","due_date":null}'
```

Filtrar y paginar:

```bash
curl 'http://localhost:8000/api/tasks?status=pending&page=1&per_page=10'
```

Avanzar el estado:

```bash
curl -i -X PATCH http://localhost:8000/api/tasks/1/status \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"status":"in_progress"}'
```

## Pruebas y comprobaciones

Con los servicios de desarrollo levantados, ejecuta las pruebas dentro de sus
contenedores:

```bash
npm run test:backend    # Pest, feature tests de la API
npm run test:frontend   # Vitest con jsdom
npm run test            # ambas suites
```

Typecheck y formato:

```bash
npm run typecheck
npm run lint:backend
```

Las pruebas del backend usan la base `testing` configurada en
`backend/phpunit.xml` y `RefreshDatabase`, así que recrean el esquema y no
tocan los datos de desarrollo. Cubren paginación, filtros combinados, búsqueda
con comodines literales, creación, edición, cambio de estado, fechas pasadas y
respuestas JSON de error. Las pruebas del frontend cubren el cliente de API, la
validación del formulario y los errores `422`, los estados de carga, vacío y
error de la lista, la búsqueda con debounce, la cancelación de peticiones y los
avisos de creación, edición y cambio de estado.

## Estructura del proyecto

```text
backend/
  app/
    Enums/          # TaskStatus
    Http/
      Controllers/  # Controlador de tareas
      Requests/     # Form Requests de listado, creación, edición y estado
      Resources/    # TaskResource
    Models/         # Task con casts, $fillable y scopeFilter
  database/
    migrations/     # Esquema de tareas
    factories/      # TaskFactory
    seeders/        # TaskSeeder
  tests/            # Pruebas Pest (Unit y Feature)
  compose.yaml      # Sail con Laravel, PostgreSQL y frontend
frontend/
  src/
    api/            # Cliente HTTP tipado y operaciones de tareas
    composables/    # useTasks: estado del servidor y filtros
    components/     # Filtros, listado, paginación y formulario
    styles/         # Tokens y estilos de controles
docs/
  FUTURE.md         # Mejoras y limitaciones conocidas
  AI_LOG.md         # Pedidos, decisiones y correcciones
scripts/setup.sh
DESIGN.md
```

## Decisiones de implementación

- **Laravel y PostgreSQL:** controladores delgados; la validación vive en Form
  Requests, la consulta en `Task::scopeFilter` y la serialización en
  `TaskResource`. El estado es un enum respaldado (`TaskStatus`) casteado en el
  modelo, con `$fillable` explícito.
- **Migraciones e índices:** la tabla `tasks` define los tipos de columna y
  añade índices sobre `status`, `assignee` y `due_date`; el seeder solo inserta
  datos cuando la tabla está vacía.
- **Validación:** los Form Requests usan `Rule::enum` para el estado y exponen
  solo los datos validados con `validated()`. Los campos de texto se recortan
  antes de validar.
- **Búsqueda segura:** `q` se aplica con `ILIKE` parametrizado y con `%` y `_`
  escapados, por lo que los comodines se buscan como texto literal.
- **Frontend:** Vue 3 con Composition API y `<script setup lang="ts">`. El
  estado del servidor vive en `useTasks`; los componentes son presentacionales.
  Un único cliente de API tipado cancela las peticiones en vuelo cuando cambian
  los filtros o la búsqueda, y el mismo `TaskForm` se usa para crear y editar.
- **Diseño:** [DESIGN.md](./DESIGN.md) es la fuente visual. Sus colores,
  tipografía, espaciado, radios y sombras se expresan como variables CSS en
  `frontend/src/styles/tokens.css`, y los estados de foco, hover, deshabilitado
  y error se implementan en `frontend/src/styles/app.css`. Las decisiones no
  especificadas por la guía están descritas en
  [docs/FUTURE.md](./docs/FUTURE.md).
- **Entorno:** Sail levanta la API y PostgreSQL; un servicio `frontend` con
  Node ejecuta Vite. `scripts/setup.sh` es idempotente y espera a que la base,
  la API y Vite respondan antes de informar que todo está listo.

## Qué haría con más tiempo

Estas mejoras no forman parte de la entrega actual; el detalle y las
limitaciones están en [docs/FUTURE.md](./docs/FUTURE.md).

**Backend**

- Añadir autenticación real con Laravel Sanctum (tokens personales o cookies
  SPA) y un seeder con un usuario de demostración; hoy la API es pública y la
  interfaz es un tablero compartido sin cuentas. Se descartó un token fijo en el
  frontend porque quedaría expuesto en el bundle y no aportaría seguridad.
- Añadir policies para que cada responsable solo vea y edite sus tareas.
- Exponer la eliminación de tareas, que queda fuera del contrato de la API.
- Versionar la API (`/v1`) y aplicar `throttle` por usuario y ruta, que hoy no
  está configurado.
- Incorporar colas, caché y borrado lógico solo cuando el alcance lo requiera.
- Añadir logging estructurado con request-id y métricas y health checks más
  completos.
- Ejecutar las migraciones como paso explícito de release y aislar las pruebas
  con una base efímera en vez de la base `testing` de Compose.
- Endurecer la operación de PostgreSQL con TLS, backups y configuración del
  pool; restringir CORS.

**Frontend**

- Añadir pruebas e2e de navegador y ampliar la revisión de accesibilidad.
- Valorar actualizaciones optimistas o caché de datos si crecen los requisitos;
  hoy el composable recarga la lista tras cada cambio.
- Valorar un sistema visual propio o Nuxt cuando se necesiten varias páginas o
  renderizado en servidor.

**Calidad y entrega**

- Automatizar Pint, typecheck, pruebas y build en CI.
- Publicar imágenes versionadas de entrega (nginx para el frontend y PHP-FPM
  con usuario no root para la API), con migraciones como paso de release.

## Uso de IA

El historial de pedidos, decisiones y correcciones está en
[docs/AI_LOG.md](./docs/AI_LOG.md).

- **Pedidos registrados:** scaffold de Laravel con Sail, PostgreSQL y un
  servicio frontend; API de tareas con enum, Form Requests, recursos paginados
  y pruebas Pest; interfaz Vue con tokens de `DESIGN.md`, filtros, búsqueda,
  paginación, formulario de creación y edición y cambio de estado.
- **Decisiones aceptadas registradas:** mantener el filtrado en
  `Task::scopeFilter`, usar `ILIKE` parametrizado con comodines escapados, un
  único `TaskForm` para crear y editar, y diálogos nativos con restauración del
  foco.
- **Correcciones registradas:** se eliminó el seeder de usuarios generado para
  que el aprovisionamiento fuese idempotente; se fijó el estado `pending` por
  defecto también en el modelo; se corrigió el reenvío de argumentos de eventos
  de estado en Vue y se ajustó el alcance del indicador de cambio de estado a
  la tarea pulsada.
- **Verificación anotada:** pruebas, typecheck, Pint, build, llamadas a la API,
  comprobaciones del navegador y arranque desde un clon limpio.
