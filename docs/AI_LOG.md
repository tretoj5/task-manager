# AI usage log

Record significant requests, accepted decisions, and corrections actually made here.

## Initial scaffold

- Request: create the Laravel/Pest and Vue 3/TypeScript/Vite/Vitest skeleton following the project guide.
- Accepted decisions: Laravel 13 with Sail and Pest; Vue 3 with TypeScript, Vite, Vitest, and Vue Test Utils.
- Corrections or rejected output: removed generic generated instruction files under `backend/` because they recommended installing Boost and using PHP/Composer on the host, contrary to project scope and constraints.

## Sail environment

- Request: configure Sail with PostgreSQL and a Node frontend service, an idempotent setup command, and a minimal API health screen.
- Accepted decisions: keep Sail's PostgreSQL testing-database initialization, use a named volume for frontend dependencies, and wait for PostgreSQL, the API, and Vite to respond before reporting setup complete.
- Corrections: repeated setup exposed Laravel's generated seeder inserting the same fixed user on every run; removed that unrelated fixture so setup remains idempotent. Host port 8000 was already occupied during verification, so the ignored local `.env` uses port 8001; `.env.example` retains the documented default 8000.

## Tasks API

- Request: implement the specified task schema, enum cast, validation requests, secure filters, paginated API resources, routes, factory, and seeder.
- Accepted decisions: keep query filtering in `Task::scopeFilter`, use parameterized PostgreSQL `ILIKE` with escaped `%` and `_`, and make the task seeder skip an already-populated table.
- Correction: the first create smoke test found that PostgreSQL's column default was not present on the in-memory Eloquent model before resource serialization; set the model's `pending` default as well as the migration default.
- Verification: created, edited, searched, changed status, tested literal wildcard searches, checked unchanged versus changed past dates, and confirmed 201/422/404 responses using temporary data that was removed afterward.

## Backend feature tests

- Request: cover the API contract with Pest feature tests and isolate each test against PostgreSQL's `testing` database.
- Accepted decisions: configure `RefreshDatabase` for feature tests and explicitly set the PostgreSQL test connection in `phpunit.xml`.
- Verification: all 12 backend tests passed, including pagination, combined filters, wildcard escaping, create/update/status, past-date behavior, and JSON errors.

## Vue task interface

- Request: replace the temporary health screen with the task management interface, including search and filters, pagination, create/edit, status changes, and API error states.
- Accepted decisions: keep server state in `useTasks`, share one validated `TaskForm` for creation and editing, and use native modal dialog behavior with focus restoration.
- Design decisions: use the guide's blue link color for visible focus, 48px form controls, a 650px dialog maximum, and a translucent ink-derived backdrop where the guide is silent; see `docs/FUTURE.md`.
- Correction: Vue component events pass multiple arguments separately; forward status-change arguments through a typed handler instead of indexing `$event`.

## Frontend tests

- Request: cover local form validation and API 422 field errors, list loading/empty/error/retry states, task actions, search debounce, and request cancellation.
- Accepted decisions: test components with Vue Test Utils and exercise `useTasks` through a mounted harness while mocking the API boundary.
- Verification: all 10 Vitest tests passed; the frontend typecheck and production build passed.

## Clean-clone verification

- Request: verify setup, test-database isolation, CORS, API/UI flows, persistence, and repository hygiene from a fresh local clone.
- Accepted decisions: used a distinct Docker project and temporary host-port overrides so the existing development services remained untouched; all overrides stayed in the disposable clone.
- Verification: repeated setup completed with migrations current; all 12 backend and 10 frontend tests passed; health and task-list requests returned 200; CORS allowed the clone's origin; browser create, edit, status, filters, search, and pagination worked; the edited task persisted after setup and reload; no `.env`, dependency, or guide files were tracked.
