# MoneyBag – Operations Manual v1.0

**Document ID:** OPS-MB-001
**Date:** 2026-07-29
**Version:** 1.0
**Target Audience:** Developers, DevOps Engineers, QA

---

## 1. Introduction

This manual covers everything needed to set up, develop, test, and deploy the MoneyBag application. It combines the local development environment setup, testing strategy and guidelines, and the CI/CD pipeline with deployment instructions.

---

## 2. Development Setup Guide

### 2.1 Prerequisites

| Tool    | Minimum Version | Purpose                               |
| ------- | --------------- | ------------------------------------- |
| Node.js | 20 LTS          | Runtime                               |
| pnpm    | 9               | Package manager                       |
| Docker  | 24+             | PostgreSQL & Redis via Docker Compose |
| Git     | 2.40+           | Source control                        |

### 2.2 Clone and Start Dependencies

Clone the repository and start PostgreSQL and Redis using Docker Compose (from the repository root):

```
git clone https://github.com/your-org/moneybag.git
cd moneybag
docker compose up -d
```

PostgreSQL runs on port 5432 (user: postgres, password: postgres, db: moneybag). Redis runs on port 6379.

### 2.3 Backend Setup

```
cd backend
pnpm install
cp .env.example .env   # fill JWT secrets, optional SMTP/Stripe keys
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma db seed     # creates plans, admin user, default categories
pnpm dev                # starts API on http://localhost:5000
```

Verify: `GET http://localhost:5000/health` returns `{ "status": "ok" }`. API docs at `/api/docs`.

### 2.4 Frontend Setup

In a new terminal:

```
cd frontend
pnpm install
cp .env.local.example .env.local  # set NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Theme Setup:** Your custom `globals.css` must be placed at `frontend/app/globals.css`. Load fonts using `next/font` in the root layout as documented in the Frontend Specification.

Start the dev server:

```
pnpm dev   # starts on http://localhost:3000
```

### 2.5 Stripe Local Testing (Optional)

Install Stripe CLI, login, and forward webhooks:

```
stripe login
stripe listen --forward-to localhost:5000/api/billing/webhook
```

Copy the webhook signing secret into your backend `.env` as `STRIPE_WEBHOOK_SECRET`.

---

## 3. Testing Strategy & Guidelines

### 3.1 Testing Tiers

| Tier        | Scope                                       | Tools                               | Speed     |
| ----------- | ------------------------------------------- | ----------------------------------- | --------- |
| Unit        | Services, utilities, validation schemas     | Vitest                              | Very fast |
| Integration | API endpoints (full request‑response cycle) | Vitest + Supertest + Testcontainers | Moderate  |
| End‑to‑End  | Critical user journeys (future)             | Playwright                          | Slow      |

### 3.2 Test File Organization

```
backend/
├── src/
│   └── modules/
│       └── <domain>/
│           └── __tests__/
│               └── *.test.ts          # Unit tests
├── tests/
│   ├── integration/
│   │   ├── setup.ts                  # Global hooks, containers
│   │   └── *.test.ts                 # Integration tests
│   └── helpers/
│       ├── seed.ts                   # Test data factories
│       └── auth.ts                   # JWT generation helpers
```

### 3.3 Unit Tests

- Test business logic, utilities, and validation schemas.
- Mock Prisma client and external services.
- Example:

```ts
// src/modules/transactions/__tests__/transaction.service.test.ts
import { describe, it, expect, vi } from 'vitest'
describe('TransactionService', () => {
  it('should create a transaction and update wallet balance', async () => {
    // mock prisma, call service.create, verify balance update
  })
})
```

### 3.4 Integration Tests

Integration tests use Testcontainers to spin up isolated PostgreSQL and Redis instances. Before each test, all tables are truncated.

Example workflow:

```ts
// tests/integration/transactions.test.ts
import request from 'supertest'
import { app } from '@/app'
import { createTestUser, getAuthCookie } from '../helpers/auth'

describe('Transactions API', () => {
  let cookies: string[]
  beforeAll(async () => {
    const user = await createTestUser()
    cookies = await getAuthCookie(user)
  })

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Cookie', cookies)
      .send({
        walletId,
        categoryId,
        amount: 100,
        type: 'INCOME',
        date: '2026-07-28',
      })
      .expect(201)
    expect(res.body.data.amount).toBe('100.00')
  })
})
```

Stripe and email are mocked in integration tests.

### 3.5 Running Tests

```
# Unit tests
pnpm test

# Integration tests (require Docker)
pnpm test:integration

# With coverage
pnpm test:coverage
```

### 3.6 Coverage Targets

- Services and utilities: ≥ 80% line coverage.
- All critical API endpoints have at least one happy‑path and one error‑case integration test.

---

## 4. CI/CD & Deployment Guide

### 4.1 CI Pipeline (GitHub Actions)

The pipeline triggers on push/PR to `main`:

1. Checkout code
2. Setup Node.js 20, pnpm
3. Install dependencies (backend + frontend)
4. Lint (`pnpm lint`)
5. Type check (`pnpm typecheck`)
6. Unit tests (`pnpm test`)
7. Integration tests (services for PostgreSQL & Redis)
8. Build backend (`pnpm build`)
9. Build frontend (`pnpm build`)

### 4.2 Docker Build (Backend)

Multi‑stage Dockerfile:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY backend/pnpm-lock.yaml backend/package.json ./
RUN pnpm install --frozen-lockfile --prod=false
COPY backend/ .
RUN pnpm prisma generate && pnpm build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

Build and push:

```
docker build -t ghcr.io/your-org/moneybag-api:latest -f backend/Dockerfile .
docker push ghcr.io/your-org/moneybag-api:latest
```

### 4.3 Deployment

**Frontend (Vercel):**

- Root directory: `frontend`
- Build command: `pnpm build`
- Environment variables set in Vercel dashboard (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, etc.)

**Backend (Railway or AWS ECS):**

- Deploy Docker image.
- Set all backend environment variables (database URL, Redis URL, JWT secrets, Stripe keys, SMTP, etc.).
- Ensure only one instance has `ENABLE_CRON=true`.
- Run database migrations as a separate step (e.g., `npx prisma migrate deploy`) before deploying new code.

**Stripe Webhook:**

- Configure Stripe dashboard to point to `https://api.moneybag.example.com/api/billing/webhook`.
- Set the webhook signing secret in production environment.

### 4.4 Environment‑Specific Config

| Environment | Stripe Keys | SMTP      | Database      | Cron                       |
| ----------- | ----------- | --------- | ------------- | -------------------------- |
| Development | Test keys   | Optional  | Local Docker  | All instances (if enabled) |
| Staging     | Test keys   | Test SMTP | Staging DB    | One worker                 |
| Production  | Live keys   | Live SMTP | Production DB | One worker                 |

### 4.5 Monitoring & Logging

- Structured JSON logs via `pino`. Scrubbed of PII.
- Health endpoint at `/health` checks DB and Redis.
- Error tracking via Sentry (future).
- Database backups are performed regularly (managed by cloud provider or manual).

### 4.6 Rollback Strategy

- Backend: redeploy previous Docker image tag.
- Frontend: instant rollback via Vercel.
- Database: restore from backup if migration fails; always test migrations in staging first.

---

**End of Operations Manual**
