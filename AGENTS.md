# Project context
Task management app: Laravel (PHP 8.3+) REST API with PostgreSQL, and a Vue 3 (Composition API + TypeScript + Vite) SPA frontend.
3-hour technical test: prioritize a working, simple, well-tested solution that follows Laravel and Vue best practices.

## Functional requirements
- Task: id, title (string, 1-120), status ("pending" | "in_progress" | "done"), assignee (string, 1-60), due_date (nullable date), timestamps.
- REST API:
  - GET /api/tasks with filters ?status= and ?assignee=, search ?q= (title), pagination (?page=, ?per_page=, default 10, max 50)
  - POST /api/tasks
  - GET /api/tasks/{task}
  - PUT|PATCH /api/tasks/{task} (edit)
  - PATCH /api/tasks/{task}/status (change status only)
  - GET /api/health
- Validation with Form Requests (use Rule::enum for status). Never use $request->all(); use validated().
- HTTP status codes: 200 ok, 201 created, 404 not found, 422 validation error, 500 unexpected. Always JSON for /api/*.
- Responses through API Resources; the list endpoint returns the standard paginated shape (data, links, meta).
- Frontend: task list with status/assignee filters and title search (debounced), pagination, validated form to create AND edit a task,
  button to change status, visible loading and error states, field-level validation errors (including 422 errors from the API).

## Architecture rules (Laravel)
- Thin controllers: validation in Form Requests, query building in the model (scopes such as scopeFilter) or a small query class, serialization in API Resources.
- Status is a backed PHP enum cast on the model. Use $fillable explicitly (no $guarded = []).
- Migrations with proper column types and indexes (status, assignee, due_date). Factory and seeder included.
- Escape LIKE wildcards in search input and use parameterized queries only.

## Architecture rules (Vue)
- Composition API with <script setup lang="ts">. No Options API.
- Server state lives in composables (useTasks); components stay presentational. No state management library.
- A single typed API client; abort in-flight requests when filters/search change to avoid race conditions.
- The same TaskForm component is used for creating and editing.

## Design
- The visual guide is DESIGN.md (project root) and is the source of truth for colors, typography, spacing, radii, shadows and components.
- Translate it into CSS variables in frontend/src/styles/tokens.css and use only those variables; no hand-picked colors or sizes.
- Cover the states it describes (hover, visible focus, disabled, error) and keep contrast accessible.
- Adapt it to a task app: do not copy logos, brand names, images or copy from the original brand.
- If something is not covered by DESIGN.md, choose the simplest consistent option and note it in docs/FUTURE.md.

## General rules
- Strict TypeScript on the frontend, no `any`. Laravel code formatted with Pint; use strict types where reasonable.
- No over-engineering (no auth, soft deletes, queues, caching). Anything left out is documented as a future improvement.
- Code, comments and commit messages in English; README and UI texts in Spanish.
- Everything runs with Laravel Sail (Laravel + PostgreSQL) plus a `frontend` service added to Sail's docker-compose.yml.
  Do not run php, composer or artisan on the host: use `./vendor/bin/sail ...` from backend/ or the root npm scripts.
  Start everything with `scripts/setup.sh` (or `npm run dev`).
  Tests run inside the containers (`npm run test:backend`, `npm run test:frontend`).
- After every change: run tests and typecheck/lint, and fix failures before moving on.
- Make a small git commit after each completed step with a clear message (conventional commits: feat:, fix:, test:, chore:, docs:).
- If you leave something unfinished or deliberately simplified, mark it with `// TODO(future): ...` and add it to docs/FUTURE.md.
- Do not invent endpoints or fields beyond the specification.
