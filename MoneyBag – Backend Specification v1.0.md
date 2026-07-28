# MoneyBag – Backend Specification v1.0

**Document ID:** BACKEND-MB-001
**Date:** 2026-07-29
**Version:** 1.0
**Target Audience:** Backend Developers, API Consumers

---

## 1. Introduction

This document contains the complete backend technical specification for MoneyBag. It covers the database schema (Prisma), every API endpoint with request/response examples, security protocols, environment configuration, and scheduled jobs. All implementation must conform to this specification.

---

## 2. Database Schema (Prisma)

### 2.1 Full Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

enum WalletType {
  BANK
  CASH
  MOBILE_BANKING
  CREDIT_CARD
  INVESTMENT
}

enum TxnType {
  INCOME
  EXPENSE
}

enum RecurringRule {
  DAILY
  WEEKLY
  MONTHLY
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  TRIALING
  LIFETIME
}

enum SplitType {
  EQUAL
  PERCENTAGE
  EXACT
}

model User {
  id                String    @id @default(uuid()) @db.Uuid
  name              String
  email             String    @unique
  passwordHash      String?
  avatarUrl         String?
  currency          String    @default("USD")
  theme             String    @default("system")
  role              Role      @default(USER)
  isActive          Boolean   @default(true)
  trialEndsAt       DateTime?
  stripeCustomerId  String?   @unique
  lastLoginAt       DateTime?
  preferences       Json?     // e.g., { "budgetAlertEmail": true, "budgetAlertInApp": true, "recurringReminderEmail": true, "marketingEmail": false }
  createdAt         DateTime  @default(now()) @db.Timestamptz
  updatedAt         DateTime  @updatedAt @db.Timestamptz

  wallets           Wallet[]
  categories        Category[]
  transactions      Transaction[]
  budgets           Budget[]
  savingsGoals      SavingsGoal[]
  refreshTokens     RefreshToken[]
  passwordResets    PasswordResetToken[]
  subscription      Subscription?
  ownedFamilyGroups FamilyGroup[]         @relation("FamilyOwner")
  familyMemberships FamilyMember[]
  auditLogs         AuditLog[]
}

model RefreshToken {
  id        String   @id @default(uuid()) @db.Uuid
  token     String   @unique
  userId    String   @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime @db.Timestamptz
  revoked   Boolean  @default(false)
}

model PasswordResetToken {
  id        String   @id @default(uuid()) @db.Uuid
  token     String   @unique
  userId    String   @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime @db.Timestamptz
  used      Boolean  @default(false)
}

model Wallet {
  id        String     @id @default(uuid()) @db.Uuid
  userId    String     @db.Uuid
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  name      String
  type      WalletType
  balance   Decimal    @default(0.00) @db.Decimal(12,2)
  currency  String     @default("USD")
  icon      String?
  color     String?
  isDefault Boolean    @default(false)
  createdAt DateTime   @default(now()) @db.Timestamptz
  updatedAt DateTime   @updatedAt @db.Timestamptz

  transactions Transaction[]
}

model Category {
  id           String        @id @default(uuid()) @db.Uuid
  userId       String?       @db.Uuid
  user         User?         @relation(fields: [userId], references: [id], onDelete: Cascade)
  name         String
  type         TxnType
  icon         String?
  color        String?
  transactions Transaction[]
  budgets      Budget[]
}

model Transaction {
  id            String        @id @default(uuid()) @db.Uuid
  userId        String        @db.Uuid
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  walletId      String        @db.Uuid
  wallet        Wallet        @relation(fields: [walletId], references: [id])
  categoryId    String        @db.Uuid
  category      Category      @relation(fields: [categoryId], references: [id])
  amount        Decimal       @db.Decimal(12,2)
  type          TxnType
  date          DateTime      @db.Date
  note          String?       @db.VarChar(500)
  tags          String[]      @default([])
  receiptUrl    String?
  isRecurring   Boolean       @default(false)
  recurringRule RecurringRule?
  createdAt     DateTime      @default(now()) @db.Timestamptz
  updatedAt     DateTime      @updatedAt @db.Timestamptz
}

model Budget {
  id             String   @id @default(uuid()) @db.Uuid
  userId         String   @db.Uuid
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  categoryId     String?  @db.Uuid
  category       Category? @relation(fields: [categoryId], references: [id])
  limit          Decimal  @db.Decimal(12,2)
  alertThreshold Int      @default(80)
  month          Int
  year           Int
  rollover       Boolean  @default(false)
  createdAt      DateTime @default(now()) @db.Timestamptz
  updatedAt      DateTime @updatedAt @db.Timestamptz
}

model SavingsGoal {
  id            String                @id @default(uuid()) @db.Uuid
  userId        String                @db.Uuid
  user          User                  @relation(fields: [userId], references: [id], onDelete: Cascade)
  title         String
  targetAmount  Decimal               @db.Decimal(12,2)
  currentAmount Decimal               @default(0) @db.Decimal(12,2)
  deadline      DateTime              @db.Date
  createdAt     DateTime              @default(now()) @db.Timestamptz
  contributions SavingsContribution[]
}

model SavingsContribution {
  id        String       @id @default(uuid()) @db.Uuid
  goalId    String       @db.Uuid
  goal      SavingsGoal  @relation(fields: [goalId], references: [id], onDelete: Cascade)
  amount    Decimal      @db.Decimal(12,2)
  date      DateTime     @db.Date
  note      String?
}

model FamilyGroup {
  id      String         @id @default(uuid()) @db.Uuid
  ownerId String         @db.Uuid
  owner   User           @relation("FamilyOwner", fields: [ownerId], references: [id])
  name    String
  members FamilyMember[]
  wallets FamilySharedWallet[]
  budgets FamilyBudget[]
}

model FamilyMember {
  id      String      @id @default(uuid()) @db.Uuid
  groupId String      @db.Uuid
  group   FamilyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  userId  String      @db.Uuid
  user    User        @relation(fields: [userId], references: [id])
  role    String      @default("viewer") // "viewer" or "editor"
}

model FamilySharedWallet {
  id        String                 @id @default(uuid()) @db.Uuid
  groupId   String                 @db.Uuid
  group     FamilyGroup            @relation(fields: [groupId], references: [id], onDelete: Cascade)
  name      String
  type      WalletType
  balance   Decimal                @default(0.00) @db.Decimal(12,2)
  currency  String
  transactions FamilyTransaction[]
}

model FamilyTransaction {
  id          String              @id @default(uuid()) @db.Uuid
  walletId    String              @db.Uuid
  wallet      FamilySharedWallet  @relation(fields: [walletId], references: [id], onDelete: Cascade)
  categoryId  String              @db.Uuid
  category    Category            @relation(fields: [categoryId], references: [id])
  amount      Decimal             @db.Decimal(12,2)
  type        TxnType
  date        DateTime            @db.Date
  note        String?             @db.VarChar(500)
  paidBy      String              @db.Uuid   // user ID who paid
  splitType   SplitType
  createdAt   DateTime            @default(now()) @db.Timestamptz
  splits      FamilyTransactionSplit[]
}

model FamilyTransactionSplit {
  id                String            @id @default(uuid()) @db.Uuid
  transactionId     String            @db.Uuid
  transaction       FamilyTransaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)
  userId            String            @db.Uuid
  amount            Decimal           @db.Decimal(12,2) // the share this user owes
}

model FamilyBudget {
  id             String            @id @default(uuid()) @db.Uuid
  groupId        String            @db.Uuid
  group          FamilyGroup       @relation(fields: [groupId], references: [id], onDelete: Cascade)
  walletId       String?           @db.Uuid
  wallet         FamilySharedWallet? @relation(fields: [walletId], references: [id])
  categoryId     String?           @db.Uuid
  category       Category?         @relation(fields: [categoryId], references: [id])
  limit          Decimal           @db.Decimal(12,2)
  alertThreshold Int               @default(80)
  month          Int
  year           Int
  rollover       Boolean           @default(false)
}

model Settlement {
  id        String   @id @default(uuid()) @db.Uuid
  groupId   String   @db.Uuid
  group     FamilyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  fromUserId String  @db.Uuid
  toUserId   String  @db.Uuid
  amount     Decimal @db.Decimal(12,2)
  date       DateTime @db.Date
  note       String?
  createdAt DateTime @default(now()) @db.Timestamptz
}

model Subscription {
  id                   String             @id @default(uuid()) @db.Uuid
  userId               String             @unique @db.Uuid
  user                 User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  planId               String             @db.Uuid
  plan                 Plan               @relation(fields: [planId], references: [id])
  stripeSubscriptionId String?            @unique
  status               SubscriptionStatus
  currentPeriodStart   DateTime           @db.Timestamptz
  currentPeriodEnd     DateTime?          @db.Timestamptz
  cancelAtPeriodEnd    Boolean            @default(false)
  appliedCouponId      String?            @db.Uuid
  coupon               Coupon?            @relation(fields: [appliedCouponId], references: [id])
  createdAt            DateTime           @default(now()) @db.Timestamptz
}

model Plan {
  id            String          @id @default(uuid()) @db.Uuid
  name          String
  slug          String          @unique
  price         Decimal         @db.Decimal(10,2)
  interval      String          // monthly, yearly, lifetime
  limits        Json
  isActive      Boolean         @default(true)
  subscriptions Subscription[]
}

model Coupon {
  id                 String         @id @default(uuid()) @db.Uuid
  code               String         @unique
  discountPercent    Int?
  discountAmount     Decimal?       @db.Decimal(10,2)
  expiresAt          DateTime?      @db.Timestamptz
  maxRedemptions     Int?
  currentRedemptions Int            @default(0)
  isActive           Boolean        @default(true)
  subscriptions      Subscription[]
}

model AuditLog {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String?  @db.Uuid
  user      User?    @relation(fields: [userId], references: [id])
  action    String
  details   Json?
  createdAt DateTime @default(now()) @db.Timestamptz
}

model EmailTemplate {
  id      String @id @default(uuid()) @db.Uuid
  name    String @unique
  subject String
  body    String @db.Text
}

model GlobalSetting {
  key   String @id
  value Json
}
```

### 2.2 Important Notes

- All monetary values use `Decimal(12,2)` for precision.
- User model now includes a JSON `preferences` field for notification settings.
- FamilyTransactionSplit's `userId` is not a DB foreign key; membership validation is performed at the application level.
- Delete operations cascade as defined: deleting a user removes their personal data and owned family groups (with all group data). Deleting a group removes all related records (members, wallets, transactions, budgets, settlements).

---

## 3. API Specification

Base URL: `/api`. All endpoints return a standard JSON envelope: `{ success, message, data?, meta?, errors? }`. Pagination uses `page` (default 1) and `limit` (default 20, max 100). CSRF protection applies to all state‑changing methods except auth routes and `/api/billing/webhook`. Access token expected via cookie or `Authorization: Bearer` header.

### 3.1 Auth Endpoints

**POST /api/auth/register**

- Body: `{ name, email, password, currency? }`
- Response 201: user object (without tokens), sets cookies.

**POST /api/auth/login**

- Body: `{ email, password }`
- Response 200: user object, sets cookies.

**POST /api/auth/google**

- Body: `{ credential }` (Google ID token)
- Response 200: user object (creates if new), sets cookies.

**POST /api/auth/refresh**

- Token from cookie or body `{ refreshToken }`
- Response 200: new cookies.

**POST /api/auth/logout**

- CSRF required. Token from cookie or body. Revokes token, clears cookies.

**POST /api/auth/forgot-password**

- Body: `{ email }`
- Response 200 always.

**POST /api/auth/reset-password**

- Body: `{ token, password }`
- Response 200: resets password, revokes all refresh tokens.

### 3.2 User Endpoints

**GET /api/users/me**

- Response 200: full user object including `preferences` JSON.

**PATCH /api/users/me**

- Body: `{ name?, avatarUrl?, currency?, theme? }`
- Response 200: updated user.

**PATCH /api/users/me/preferences**

- Body: `{ budgetAlertEmail?, budgetAlertInApp?, recurringReminderEmail?, marketingEmail? }`
- Response 200: updated user with new preferences.

**PATCH /api/users/me/password**

- Body: `{ currentPassword, newPassword }`
- Response 200.

### 3.3 Wallet Endpoints

**GET /api/wallets** – list owned wallets.
**POST /api/wallets** – create wallet (Free: max 1).
**PATCH /api/wallets/:id** – update name, icon, color, isDefault.
**POST /api/wallets/transfer** – `{ sourceWalletId, targetWalletId, amount, date?, note? }`, returns two transactions.

### 3.4 Category Endpoints

**GET /api/categories?type=&page=&limit=**
**POST /api/categories** – `{ name, type, icon?, color? }`
**PATCH /api/categories/:id**
**DELETE /api/categories/:id** (409 if referenced)

### 3.5 Transaction Endpoints

**GET /api/transactions** – query params: walletId, type, categoryId, fromDate, toDate, tags, search, sortBy, order, page, limit.
**POST /api/transactions** – body: walletId, categoryId, amount, type, date, note?, tags[], isRecurring?, recurringRule?. Plan limit enforced.
**GET /api/transactions/tags** – returns distinct tags for user.
**POST /api/transactions/import** (Pro only) – multipart with file (CSV) + walletId. Atomic: all rows succeed or rollback. Wallet balance recalculated after import.
**PATCH /api/transactions/:id** – update fields except walletId/type.
**DELETE /api/transactions/:id** – reverses wallet balance: if expense, add amount back; if income, subtract. Invalidates report cache.

### 3.6 Budget Endpoints

**GET /api/budgets?month=&year=&page=&limit=** – returns budgets with `spent` and `effectiveLimit` (limit + rollover).
**POST /api/budgets** – `{ categoryId?, limit, month, year, alertThreshold?, rollover? }`. Free max 2.
**GET /api/budgets/alerts** – current month thresholds crossed.
**PATCH /api/budgets/:id**
**DELETE /api/budgets/:id**

### 3.7 Savings Goal Endpoints

**GET /api/savings-goals?search=&page=&limit=**
**POST /api/savings-goals** – `{ title, targetAmount, deadline }` (Free max 1).
**PATCH /api/savings-goals/:id/contribute** – `{ amount, date, note? }` (increment).
**PATCH /api/savings-goals/:id/withdraw** – `{ amount, date, note? }` (decrement, cannot go below 0).
**DELETE /api/savings-goals/:id**

### 3.8 Report Endpoints

**GET /api/reports/monthly?month=&year=** – `{ totalIncome, totalExpense, netSavings }`.
**GET /api/reports/yearly?year=**
**GET /api/reports/category-breakdown?month=&year=** – array of `{ category, total }`.
**GET /api/reports/trend?from=&to=** – array of `{ date, income, expense }`.
**GET /api/reports/export?type=csv|pdf&month=&year=** – file download.
All cached per user for 5 min; invalidated on transaction mutation.

### 3.9 Family Endpoints (Pro only)

**POST /api/family/groups** – `{ name }`
**GET /api/family/groups** – list user’s groups.
**PATCH /api/family/groups/:id** – update name (owner).
**DELETE /api/family/groups/:id** – delete group (owner); emails all members.
**POST /api/family/groups/:id/invite** – `{ email, role }`
**DELETE /api/family/groups/:id/members/:userId** – remove member (owner).
**DELETE /api/family/groups/:id/members/me** – self‑leave (non‑owner).
**PATCH /api/family/groups/:id/members/:userId** – change role (owner).
**GET /api/family/groups/:id/wallets**
**POST /api/family/groups/:id/wallets** – `{ name, type, currency? }` (owner).
**GET /api/family/groups/:id/transactions** – family transactions with split info.
**POST /api/family/groups/:id/transactions** – `{ walletId, categoryId, amount, type, date, note?, paidBy, splitType, splits[] }` (editor). Split sum must equal amount.
**GET /api/family/groups/:id/balances** – pairwise net balances.
**POST /api/family/groups/:id/settlements** – `{ fromUserId, toUserId, amount, date?, note? }` (editor). Settlement amount must be ≤ net balance.
**GET /api/family/groups/:id/budgets**
**POST /api/family/groups/:id/budgets** – `{ walletId?, categoryId?, limit, month, year, alertThreshold?, rollover? }` (owner).
**GET /api/family/groups/:id/categories**
**POST /api/family/groups/:id/categories** – `{ name, type, icon?, color? }` (owner).
**PATCH /api/family/groups/:id/categories/:categoryId**
**DELETE /api/family/groups/:id/categories/:categoryId**
**GET /api/family/groups/:id/reports/monthly** – same as personal but aggregated.
**GET /api/family/groups/:id/reports/export** – owner only.

### 3.10 Billing Endpoints

**GET /api/billing/plans**
**GET /api/billing/subscription** – current user subscription.
**POST /api/billing/checkout** – `{ planSlug, couponCode? }` returns `{ url }`.
**POST /api/billing/portal** – returns `{ url }`.
**POST /api/billing/webhook** – Stripe events; exempt from CSRF/rate limit.

### 3.11 Admin Endpoints (prefix /api/admin, ADMIN role)

**GET /stats** – platform KPIs.
**GET /users** – list/search users.
**PATCH /users/:id/status** – `{ isActive }`
**POST /users/:id/impersonate** – returns temporary token (10 min, single‑use).
**PATCH /users/:id/plan** – `{ planSlug }`
**GET /subscriptions** – list all.
**POST /subscriptions/:id/refund**
**POST /subscriptions/:id/cancel**
**GET /plans** – list plans.
**POST /plans** – create plan.
**PATCH /plans/:id**
**DELETE /plans/:id**
**GET /coupons**
**POST /coupons**
**PATCH /coupons/:id**
**DELETE /coupons/:id**
**GET /family-groups** – list/search all groups.
**GET /family-groups/:id** – group details.
**DELETE /family-groups/:id** – delete group (admin).
**PATCH /family-groups/:id/status** – activate/deactivate group.
**GET /email-templates**
**PATCH /email-templates/:id**
**GET /audit-logs** – searchable.
**GET /settings**
**PATCH /settings**

---

## 4. Security & Compliance

### 4.1 Token Handling

- Access token: JWT, signed with `JWT_ACCESS_SECRET`, expires 15 min.
- Refresh token: opaque, stored in DB, single‑use. Rotation revokes old token; replay of revoked token revokes all user tokens.
- Both tokens delivered as HttpOnly, Secure (production), SameSite=Lax cookies.
- Refresh token expiry stored in DB matches `JWT_REFRESH_EXPIRES_IN` (env variable).

### 4.2 CSRF

- Non‑HttpOnly `XSRF-TOKEN` cookie set by server. Client sends value in `X-XSRF-TOKEN` header for mutations.
- Exempt: `/api/auth/*`, `/api/billing/webhook`.

### 4.3 Rate Limiting

- Global: 200 req/15 min per IP.
- Auth routes: 20 req/15 min per IP.
- Webhook endpoint exempt.

### 4.4 Data Protection

- Passwords bcrypt hashed (12 rounds).
- Monetary values Decimal(12,2).
- GDPR: data export and account deletion (cascade owned groups). Audit logs retained but user‑identifiable data anonymized on deletion.
- Sensitive data never logged.

### 4.5 Stripe Webhook

- Signature verified using `STRIPE_WEBHOOK_SECRET`. Events handle subscription lifecycle.

---

## 5. Environment Variables

| Variable                                              | Required         | Default                | Description                         |
| ----------------------------------------------------- | ---------------- | ---------------------- | ----------------------------------- |
| DATABASE_URL                                          | Yes              | –                      | PostgreSQL connection string        |
| REDIS_URL                                             | No               | redis://localhost:6379 | Redis connection string             |
| JWT_ACCESS_SECRET                                     | Yes              | –                      | Min 32 chars                        |
| JWT_REFRESH_SECRET                                    | Yes              | –                      | Min 32 chars, different from access |
| JWT_ACCESS_EXPIRES_IN                                 | No               | 15m                    |                                     |
| JWT_REFRESH_EXPIRES_IN                                | No               | 7d                     | Also controls DB record expiry      |
| PORT                                                  | No               | 5000                   |                                     |
| NODE_ENV                                              | No               | development            |                                     |
| CORS_ORIGIN                                           | No               | http://localhost:3000  |                                     |
| COOKIE_DOMAIN                                         | No               | –                      |                                     |
| TRUST_PROXY                                           | No               | 1                      |                                     |
| STRIPE_SECRET_KEY                                     | Yes (if billing) | –                      |                                     |
| STRIPE_WEBHOOK_SECRET                                 | Yes (if billing) | –                      |                                     |
| SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM | No               | –                      | Email optional                      |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET                | No               | –                      | For OAuth                           |
| FRONTEND_URL                                          | No               | http://localhost:3000  | For email links                     |

---

## 6. Cron Jobs

Three cron jobs run in a designated worker (ENABLE_CRON=true):

- **Recurring transactions** – daily 00:05 UTC. Creates non‑recurring copies where rule matches.
- **Budget alerts** – daily 08:00 UTC. Emails users with crossed thresholds.
- **Trial ending reminder** – daily 10:00 UTC. Emails users whose trial ends in 3 days.

---

**End of Backend Specification**
