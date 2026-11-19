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
