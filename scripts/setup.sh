#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
COMPOSE_FILE="$BACKEND_DIR/compose.yaml"

if ! command -v docker >/dev/null 2>&1; then
    printf 'Docker is required to start this project.\n' >&2
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    printf 'The Docker daemon is not available.\n' >&2
    exit 1
fi

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
fi

if [[ ! -f "$ROOT_DIR/frontend/.env" ]]; then
    cp "$ROOT_DIR/frontend/.env.example" "$ROOT_DIR/frontend/.env"
fi

if [[ ! -d "$BACKEND_DIR/vendor" ]]; then
    docker run --rm \
        -u "$(id -u):$(id -g)" \
        -v "$BACKEND_DIR:/opt" \
        -w /opt \
        laravelsail/php83-composer:latest \
        composer install
fi

run_sail() {
    (cd "$BACKEND_DIR" && ./vendor/bin/sail "$@")
}

run_compose() {
    docker compose --project-directory "$BACKEND_DIR" -f "$COMPOSE_FILE" "$@"
}

run_sail up -d

database_ready=false
for ((attempt = 1; attempt <= 60; attempt++)); do
    if run_compose exec -T pgsql sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"' >/dev/null 2>&1; then
        database_ready=true
        break
    fi

    sleep 2
done

if [[ "$database_ready" != true ]]; then
    printf 'PostgreSQL did not become ready in time. Recent database logs:\n' >&2
    run_compose logs --no-color --tail=50 pgsql >&2
    exit 1
fi

if ! grep -Eq '^APP_KEY=.+$' "$BACKEND_DIR/.env"; then
    run_sail artisan key:generate --force
fi

run_sail artisan migrate --seed --force

api_ready=false
for ((attempt = 1; attempt <= 60; attempt++)); do
    if run_compose exec -T laravel.test curl --fail --silent http://127.0.0.1/api/health >/dev/null 2>&1; then
        api_ready=true
        break
    fi

    sleep 2
done

if [[ "$api_ready" != true ]]; then
    printf 'The API health check did not become ready in time. Recent application logs:\n' >&2
    run_compose logs --no-color --tail=50 laravel.test >&2
    exit 1
fi

frontend_ready=false
for ((attempt = 1; attempt <= 60; attempt++)); do
    if run_compose exec -T frontend wget -q --spider http://127.0.0.1:5173 >/dev/null 2>&1; then
        frontend_ready=true
        break
    fi

    sleep 2
done

if [[ "$frontend_ready" != true ]]; then
    printf 'The frontend did not become ready in time. Recent frontend logs:\n' >&2
    run_compose logs --no-color --tail=50 frontend >&2
    exit 1
fi

app_port="$(sed -n 's/^APP_PORT=//p' "$BACKEND_DIR/.env" | head -n 1)"
app_port="${app_port:-8000}"

printf '\nServices are ready:\n'
printf '  API:      http://localhost:%s/api\n' "$app_port"
printf '  Frontend: http://localhost:5173\n'
