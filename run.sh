#!/usr/bin/env bash
set -Eeuo pipefail

# Run from repo root regardless of where invoked
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

have() { command -v "$1" >/dev/null 2>&1; }

pm_for_dir() {
	local dir="$1"
	if [ -f "$dir/bun.lock" ] || [ -f "$dir/bun.lockb" ]; then
		if have bun; then echo bun; return; fi
	fi
	if [ -f "$dir/pnpm-lock.yaml" ]; then
		if have pnpm; then echo pnpm; return; fi
	fi
	if [ -f "$dir/yarn.lock" ]; then
		if have yarn; then echo yarn; return; fi
	fi
	if [ -f "$dir/package-lock.json" ]; then
		if have npm; then echo npm; return; fi
	fi
	# Fallback by availability
	for c in bun pnpm npm yarn; do if have "$c"; then echo "$c"; return; fi; done
	echo "" # none
}

copy_env_into_api() {
	local root_env="$SCRIPT_DIR/.env"
	local api_env="$SCRIPT_DIR/api/.env"
	if [ -f "$root_env" ]; then
		if [ -f "$api_env" ] && [ -z "${FORCE_COPY_ENV:-}" ]; then
			echo "[env] api/.env already exists (set FORCE_COPY_ENV=1 to overwrite)"
		else
			cp "$root_env" "$api_env"
			echo "[env] Copied .env -> api/.env"
		fi
	else
		if [ ! -f "$api_env" ]; then
			echo "[env] No root .env found; creating api/.env with defaults"
			printf "DB_FILE_NAME=file:local.db\n" > "$api_env"
		fi
	fi
}

install_if_needed() {
	local dir="$1"; local pm="$2"
	if [ ! -d "$dir/node_modules" ]; then
		echo "[install] Installing dependencies in $dir using $pm..."
		case "$pm" in
			bun)  (cd "$dir" && bun install) ;;
			pnpm) (cd "$dir" && pnpm install) ;;
			npm)  (cd "$dir" && npm ci || npm install) ;;
			yarn) (cd "$dir" && yarn install) ;;
			*) echo "No supported package manager found. Install bun, pnpm, npm or yarn."; exit 1 ;;
		esac
	else
		echo "[install] Skipping $dir (node_modules found)"
	fi
}

drizzle_push() {
	local dir="$1"; local pm="$2"
	echo "[db] Running drizzle-kit push in $dir..."
	case "$pm" in
		bun)  (cd "$dir" && bunx drizzle-kit push) ;;
		pnpm) (cd "$dir" && pnpm exec drizzle-kit push) ;;
		npm)  (cd "$dir" && npx drizzle-kit push) ;;
		yarn) (cd "$dir" && npx drizzle-kit push) ;;
		*) echo "[db] Could not determine how to run drizzle-kit" ;;
	esac
}

start_api() {
	local dir="$1"; local pm="$2"
	echo "[api] Starting API with $pm..."
	case "$pm" in
		bun)  (cd "$dir" && bunx tsx src/Program.ts) & ;;
		pnpm) (cd "$dir" && pnpm exec tsx src/Program.ts) & ;;
		npm)  (cd "$dir" && npx tsx src/Program.ts) & ;;
		yarn) (cd "$dir" && npx tsx src/Program.ts) & ;;
		*) echo "[api] Unknown package manager"; exit 1 ;;
	esac
	API_PID=$!
	echo "[api] PID $API_PID"
}

start_web() {
	local dir="$1"; local pm="$2"
	echo "[web] Starting Web with $pm..."
	case "$pm" in
		bun)  (cd "$dir" && bun run dev) & ;;
		pnpm) (cd "$dir" && pnpm dev) & ;;
		npm)  (cd "$dir" && npm run dev) & ;;
		yarn) (cd "$dir" && yarn dev) & ;;
		*) echo "[web] Unknown package manager"; exit 1 ;;
	esac
	WEB_PID=$!
	echo "[web] PID $WEB_PID"
}

cleanup() {
	echo "\n[cleanup] Shutting down..."
	if [ -n "${WEB_PID:-}" ] && kill -0 "$WEB_PID" 2>/dev/null; then
		kill "$WEB_PID" 2>/dev/null || true
	fi
	if [ -n "${API_PID:-}" ] && kill -0 "$API_PID" 2>/dev/null; then
		kill "$API_PID" 2>/dev/null || true
	fi
}
trap cleanup EXIT INT TERM

copy_env_into_api

# API
API_DIR="$SCRIPT_DIR/api"
API_PM="$(pm_for_dir "$API_DIR")"
if [ -z "$API_PM" ]; then echo "Could not detect package manager for API"; exit 1; fi
install_if_needed "$API_DIR" "$API_PM"
drizzle_push "$API_DIR" "$API_PM"

# Web
WEB_DIR="$SCRIPT_DIR/web"
WEB_PM="$(pm_for_dir "$WEB_DIR")"
if [ -z "$WEB_PM" ]; then echo "Could not detect package manager for Web"; exit 1; fi
install_if_needed "$WEB_DIR" "$WEB_PM"

# Start both
start_api "$API_DIR" "$API_PM"
start_web "$WEB_DIR" "$WEB_PM"

echo "\n➡ API on http://localhost:3000"
echo "➡ Web dev server on http://localhost:5173"
echo "Press Ctrl+C to stop both."

# Wait for both to finish
wait "$API_PID" "$WEB_PID"