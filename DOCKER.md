# 🐳 Docker — Local Development Guide

This guide explains how to spin up the full **COC-Admin** stack (COC API + Admin Backend + Admin Frontend) locally using Docker Compose.

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Docker Compose Stack                      │
│                                                                 │
│  ┌───────────────┐    ┌───────────────┐    ┌────────────────┐   │
│  │   coc-api     │◄───│    server     │◄───│      web       │   │
│  │ (COC API)     │    │ (Admin Back.) │    │ (Admin Front.) │   │
│  │  port: 3000   │    │  port: 8000   │    │  port: 5173    │   │
│  └───────────────┘    └───────────────┘    └────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

| Service    | Image / Build                              | Port   | Description                         |
| ---------- | ------------------------------------------ | ------ | ----------------------------------- |
| `coc-api`  | `callofcode07/coc-api:latest` (pulled)     | `3000` | The external COC platform API       |
| `server`   | Built from `docker/Dockerfile.backend`     | `8000` | COC-Admin Express/Bun backend       |
| `web`      | Built from `docker/Dockerfile.frontend`    | `5173` | COC-Admin React/Vite frontend       |

> **Startup order enforced by health-checks:**  
> `coc-api` must be healthy → `server` starts → `server` must be healthy → `web` starts.

---

## ✅ Prerequisites

| Tool           | Minimum version | Install link                           |
| -------------- | --------------- | -------------------------------------- |
| Docker         | 24+             | https://docs.docker.com/get-docker/    |
| Docker Compose | v2 (plugin)     | bundled with Docker Desktop / `docker compose` command |

> **No Bun, Node, or npm required** on the host machine — everything runs inside containers.

---

## 📁 File Reference

```
COC-Admin/
├── docker-compose.yml              # Orchestrates all three services
└── docker/
    ├── Dockerfile.backend          # Multi-stage: deps → build → development → production
    ├── Dockerfile.frontend         # Multi-stage: deps → build → development → production
    ├── .env.example.coc-api        # Template for COC API env vars — copy and fill in values
    ├── .env.local.backend          # Backend env vars (edit before running)
    ├── .env.local.coc-api          # COC API env vars (edit before running, gitignored)
    └── .env.local.frontend         # Frontend env vars (edit before running)
```

> **`.gitignore` note:** `docker/.env.local.coc-api` is excluded from version control.  
> Use `docker/.env.example.coc-api` as the starting template. All other `docker/.env.local.*` files  
> are tracked in the repo pre-filled with safe local defaults — review and adjust them before running.

---

## ⚙️ Environment Setup

The `docker/` directory ships with environment files for each service. Review each before starting the stack.

### 1. COC API (`docker/.env.local.coc-api`)

Controls the `coc-api` container (the external COC platform API). This file is **gitignored** — copy from the example template first:

```bash
cp docker/.env.example.coc-api docker/.env.local.coc-api
```

Then fill in the values:

```env
# Supabase Postgres (connection pooler — used at runtime)
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/postgres"

# Direct connection (session-mode pooler — used for Prisma migrations on container start)
DIRECT_URL="postgresql://<user>:<password>@<host>:5432/postgres"

# Supabase project details
SUPABASE_URL="https://<project-ref>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-key>"

NODE_ENV='Production'
```

### 2. Admin Backend (`docker/.env.local.backend`)

Controls the `server` (COC-Admin backend) container:

```env
# Internal Docker network URL — do not change this
API_URL=http://coc-api:3000
PORT=8000

# Auth secrets — change these to something random and strong
JWT_SECRET=COC_ADMIN_JWT_SECRET
REFRESH_SECRET=COC_ADMIN_REFRESH_SECRET

# Token lifetimes
ACCESS_TTL=15           # minutes
REFRESH_TTL=7           # days

# Rate limiting
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=100

# Password hashing cost factor
SALTING=8

# Email service (Resend)
EMAIL_ID="your-sender@example.com"
CONTACT_EMAIL_ID="callofcode07@gmail.com"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxx"

# CORS — must match the frontend URL visible to your browser
ALLOWED_ORIGINS=http://localhost:5173

# Community links injected into email templates
WHATSAPP_LINK=https://chat.whatsapp.com/your-group
DISCORD_LINK=https://discord.gg/your-server

# Keep this set to 'production' — refresh tokens (HTTP-only cookies) require it
NODE_ENV='production'
```

> ⚠️ **Important:** `NODE_ENV` **must** be set to `'production'` even in the local Docker environment.  
> This is required for refresh tokens to work correctly (they rely on `secure` cookie flags that only activate in production mode).

### 3. Admin Frontend (`docker/.env.local.frontend`)

Controls the `web` (COC-Admin frontend) container:

```env
# Must be reachable from the browser (not the Docker network)
VITE_API_URL="http://localhost:8000"

# Optional — loading GIF shown on auth pages
VITE_GIF_URL=https://media.tenor.com/WqfUsqUQWRsAAAAC/chala-ja.gif
```

> **Note:** `VITE_API_URL` is also passed as a Docker build-arg in `docker-compose.yml`.  
> The default value `http://localhost:8000` works for local development without changes.

---

## 🚀 Starting the Stack

```bash
# From the repository root — build images and start all services
docker compose up --build
```

| Flag        | Purpose                                            |
| ----------- | -------------------------------------------------- |
| `--build`   | Rebuild the `server` and `web` images from source  |
| `-d`        | Run in detached (background) mode                  |
| `--watch`   | Enable live file sync + auto-rebuild (see below)   |

Once all three services are healthy you can access:

- **Admin Frontend** → http://localhost:5173
- **Admin Backend API** → http://localhost:8000
- **COC API** → http://localhost:3000

---

## 🔥 Hot-Reload with `--watch`

Docker Compose Watch keeps your running containers in sync with local source changes — no manual rebuilds needed during development.

```bash
# Build images and start the stack with file watching enabled
docker compose up --build --watch
```

### What happens on each change

| You change…                              | Action                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| `backend/src/**`                         | Files are **synced** into the container; Bun (`bun --watch`) picks up the change automatically |
| `frontend/src/**`                        | Files are **synced** into the container; Vite HMR reloads the browser           |
| `frontend/public/**`                     | Static assets are **synced** into the container                                 |
| `backend/package.json` or `bun.lock`     | Image is **rebuilt** (`bun install` re-runs)                                    |
| `frontend/package.json` or `bun.lock`    | Image is **rebuilt** (`bun install` re-runs)                                    |

> **Note:** The `coc-api` service is a pre-built image and is not watched — changes to the external API require re-pulling the image manually (see [Pull the latest COC API image](#pull-the-latest-coc-api-image)).

---

## 🛑 Stopping the Stack

```bash
# Stop and remove containers (keeps images and volumes)
docker compose down

# Stop, remove containers AND local images built by Compose
docker compose down --rmi local
```

---

## 🔄 Common Workflows

### Rebuild a single service after code changes

```bash
docker compose up --build server   # rebuild & restart backend only
docker compose up --build web      # rebuild & restart frontend only
```

### Enable watch mode (hot-reload during development)

```bash
# Start fresh with watch mode — file changes sync automatically
docker compose up --build --watch

# If the stack is already running, enable watch in a separate terminal
docker compose watch
```

### View logs

```bash
docker compose logs -f             # tail all services
docker compose logs -f server      # tail backend only
docker compose logs -f web         # tail frontend only
docker compose logs -f coc-api     # tail the COC API only
```

### Open a shell inside a running container

```bash
docker compose exec server sh      # backend shell
docker compose exec web sh         # frontend shell
docker compose exec coc-api sh     # COC API shell
```

### Pull the latest COC API image

The `coc-api` service uses `pull_policy: missing`, meaning Docker will only pull it once (when not already present locally). To update it manually:

```bash
docker compose pull coc-api
docker compose up coc-api -d
```

---

## 🤖 CI/CD — Automated Image Publishing

The workflow at `.github/workflows/docker-image.yml` (**Docker Image CI**) automatically builds and pushes both the backend and frontend **development** images to Docker Hub on every push to `main`.

| Event              | Build | Push to Docker Hub |
| ------------------ | ----- | ------------------ |
| Push → `main`      | ✅    | ✅                 |
| Pull Request → `main` | ✅ | ❌ (build-only)    |

### Images published

| Image                                   | Registry tag                             |
| --------------------------------------- | ---------------------------------------- |
| `callofcode07/coc-admin-backend:latest` | Built from `docker/Dockerfile.backend` (`production` target) |
| `callofcode07/coc-admin-frontend:latest`| Built from `docker/Dockerfile.frontend` (`production` target) |

### Required repository secrets

Go to **Settings → Secrets and variables → Actions** in the GitHub repo and add:

| Secret             | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `DOCKER_USERNAME`  | Docker Hub username (`callofcode07`)                           |
| `DOCKER_PASSWORD`  | Docker Hub access token (generate at hub.docker.com → Security) |
| `VITE_API_URL`     | Production backend URL injected as a build-arg into the frontend image (e.g. `https://api.example.com`) |

> **Note:** The `coc-api` image (`callofcode07/coc-api:latest`) is managed by a separate upstream repository and workflow — it is only **consumed** here via `docker compose pull`.

---

## 🐛 Troubleshooting

### `server` or `web` container exits immediately

Check the logs for the failing service:

```bash
docker compose logs server
docker compose logs web
```

Common causes:
- Missing or malformed env variables in `docker/.env.local.backend` or `docker/.env.local.frontend`
- The `coc-api` health-check is failing (bad `DATABASE_URL` or `SUPABASE_*` credentials)
- `NODE_ENV` is not set to `'production'` in `docker/.env.local.backend` (breaks refresh tokens)

### Port already in use

```bash
# Find and kill the process using the port (example: 8000)
sudo lsof -ti:8000 | xargs kill -9
```

Or change the host-side port mappings in `docker-compose.yml`:

```yaml
ports:
    - "8001:8000"   # map host 8001 → container 8000
```

### `coc-api` health-check keeps failing

The health-check hits `http://localhost:3000/health` inside the container. If it never passes:
1. Verify `DATABASE_URL` and `DIRECT_URL` in `docker/.env.local.coc-api` are correct.
2. Ensure your Supabase project is reachable from your machine.
3. Manually inspect the container:

```bash
docker compose exec coc-api sh
wget -qO- http://localhost:3000/health
```

### Images are stale after code changes

Force a clean rebuild:

```bash
docker compose build --no-cache
docker compose up
```

### Bun watch mode not picking up changes

If `bun --watch` inside the `server` container stops reacting to file syncs, restart the service:

```bash
docker compose restart server
```

---

## 📝 Notes

- The `development` build target in both Dockerfiles runs the source directly — the backend uses `bun --watch src/server.ts` for hot-reloading, and the frontend uses Vite's built-in HMR dev server. No production build step is needed for local development.
- The `production` build targets produce optimised, minimal images suitable for pushing to a registry; they are **not** used by the default `docker-compose.yml`.
- `NODE_ENV` must be `'production'` in `docker/.env.local.backend` for HTTP-only cookie-based refresh tokens to function correctly — this is intentional and not a mistake.
- All secrets in `docker/.env.local.*` should never be committed with real credentials. The `.env.local.coc-api` file is gitignored; the others contain safe placeholder defaults.
