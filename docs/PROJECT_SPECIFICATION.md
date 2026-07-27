# 💰 MoneyBag – Personal Finance Manager

## Complete Project Specification v3.0 (Production-Ready)

---

### 1. Executive Summary

MoneyBag is a multi-tenant, subscription-based personal finance management application engineered for modern individuals, families, and power users. Beyond standard income and expense tracking, MoneyBag provides multi-wallet balance management (Bank, Cash, Mobile Banking), automated recurring transactions, budget rollover capabilities, savings goals, and family group financial aggregation. 

The system features an enterprise-grade Administration Panel for platform metric analysis, user impersonation, system health monitoring, subscription lifecycle handling, and custom promotional coupon distribution. Built with a modern, scalable architecture, MoneyBag follows strict security standards including 2FA (TOTP + Backup Codes), single-use refresh token rotation, and Edge proxy RBAC guards.

---

### 2. Product Features

#### 2.1 User Capabilities

- **Authentication & Security**
  - Email/Password authentication and OAuth 2.0 (Google Login).
  - Enforced / Optional **Two-Factor Authentication (2FA)** via TOTP Authenticator Apps (Google Authenticator, Authy).
  - Emergency 2FA Backup Code generation and recovery login system.
- **Multi-Wallet & Account Management**
  - Create and manage multiple financial accounts (Bank Accounts, Cash Wallets, Mobile Banking like bKash/Nagad, Credit/Debit Cards).
  - Execute internal wallet-to-wallet funds transfers with automatic transaction logging.
- **Dashboard & Overview**
  - Real-time total net-worth and individual wallet balances summary.
  - Interactive visual widgets for active monthly budgets, savings goals progress, and upcoming recurring bills.
- **Categories & Transactions**
  - CRUD operations for Personal Categories with custom icons and hex colors.
  - Transactions lifecycle: Create, Edit, Delete, Filter (by Wallet, Type, Category, Date range, Tags), Search, Paginate, and Sort.
  - **Bulk CSV Import** with schema validation and preview drawer.
  - **Receipt Uploads**: Attach image/PDF receipts via direct presigned Cloudinary/S3 uploads.
  - **Automated Recurring Payments**: Schedule daily, weekly, or monthly recurring income/expense logs.
- **Budgets & Thresholds**
  - Category-specific or global monthly/yearly budget caps.
  - Roll-over options for unspent budget allocations into the next cycle.
  - Configurable threshold alerts (e.g., alert when 80% or 90% spent) sent via In-App and Email notifications.
- **Savings Goals**
  - Target-oriented savings goals with deadline tracking and progress percentage.
  - Log step-by-step contributions towards target goals.
- **Interactive Analytics & Reports**
  - High-performance, responsive charts powered by **Apache ECharts** (Grouped Bar, Donut Category Breakdown, Daily Income vs. Expense Trend, Budget Gauges).
  - Export monthly/yearly financial summaries in PDF or CSV formats.
- **Family Group Sharing (Pro Feature)**
  - Invite up to 5 family members to a group workspace.
  - Granular role permission assignment (Viewer vs Editor).
  - Aggregated family financial breakdown and shared budget monitoring.
- **Settings & Data Ownership**
  - Personal profile management, preferred base currency setup, dark/light theme switching, and localization settings.
  - Full GDPR Compliance: One-click personal data export (JSON/CSV) and automated permanent account self-deletion.
- **Support Ticket System**
  - Create and track technical or billing support tickets directly in-app.

#### 2.2 Admin Capabilities

- **Platform Dashboard & KPIs**
  - Track critical financial metrics: Monthly Recurring Revenue (MRR), Churn Rate, Active Daily Users, Subscription conversion metrics, and Trial conversions.
- **User Management & Impersonation**
  - Paginated user directory with search/filter by status, plan, and registration date.
  - Admin Impersonation token generation for debugging user issues.
  - Account suspension/activation toggles and manual plan overriding.
- **Subscription & Coupon Management**
  - Full subscription oversight with manual refund processing via Stripe SDK and instant cancellation/reactivation.
  - **Promotional Coupon Configurator**: Create discount percentage or flat amount codes with expiry dates and usage caps.
- **Plan Configurator**
  - Dynamic JSON limit configuration for Free, Pro Monthly, Pro Yearly, and Lifetime Unlimited plans.
- **Support Ticket Queue**
  - Centralized support ticketing dashboard to assign, reply to, and resolve customer support threads.
- **Broadcasts & System Announcements**
  - Publish system-wide top notification banners and maintenance warning alerts.
- **System Health & Audit Logs**
  - Monitoring metrics for Redis cache health, PostgreSQL database connection pool, Cron Job execution logs, and background worker queues.
  - Comprehensive Audit Trail logging all high-privilege administrative actions and critical user security updates.
- **Global Settings & Infrastructure Config**
  - Configurator for SMTP Email Gateways, Google OAuth credentials, Payment Gateway webhooks, Storage Keys (Cloudinary/AWS S3), Admin IP Whitelisting, and dynamic legal page contents (Terms & Privacy Policy).

---

### 2.3 Subscription Model & Pricing

| Plan | Price | Limits & Feature Capabilities |
| :--- | :--- | :--- |
| **Free** | $0 | 1 Wallet, 50 transactions/month, 2 budgets, 1 savings goal, basic reports, no CSV import, no receipt upload, no family sharing. |
| **Pro Monthly** | $4.99 / month | Unlimited Wallets, unlimited transactions, unlimited budgets/goals, CSV import, receipt storage, family sharing (up to 5 members), priority support. |
| **Pro Yearly** | $49.99 / year | All Pro features billed annually (~$4.17/month savings). |
| **Unlimited** | $99.99 / lifetime | Permanent lifetime access to all current and future Pro features. Single one-time payment. |

* **14-Day Free Trial**: Automatic Pro trial granted upon registration without requiring credit card upfront.
* **Coupon Codes**: Redeemable at checkout for percentage (%) or flat amount discounts.

---

### 3. Technology Stack

| Architecture Layer | Chosen Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router, React Server Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling & UI Components** | Tailwind CSS, Shadcn UI, Lucide Icons |
| **State Management** | Redux Toolkit & RTK Query (Server Caching & Tag Invalidation) |
| **Data Visualization** | Apache ECharts (Tree-shakable Dynamic Imports) |
| **Form Validation** | React Hook Form, Zod |
| **Backend Runtime** | Node.js / Express or Next.js 16 API Route Handlers |
| **Database & ORM** | PostgreSQL with Prisma ORM |
| **Cache & Session** | Redis |
| **Authentication** | JWT (HttpOnly Cookies), Single-Use Refresh Token Rotation, TOTP (2FA) |
| **Payments** | Stripe Checkout SDK & Webhooks Integration |
| **Storage** | Cloudinary / AWS S3 (Presigned direct client uploads) |
| **Email Gateway** | Nodemailer (SMTP) with Handlebars HTML templates |
| **Scheduler** | node-cron / Redis BullMQ for automated recurring txns & threshold alerts |

---

### 4. Database Schema (Prisma Representation)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum WalletType {
  BANK
  CASH
  MOBILE_BANKING
  INVESTMENT
  CREDIT_CARD
}

enum TxnType {
  INCOME
  EXPENSE
  TRANSFER
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
  INCOMPLETE
  LIFETIME
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

model User {
  id                   String               @id @default(uuid()) @db.Uuid
  name                 String
  email                String               @unique
  passwordHash         String?
  avatarUrl            String?
  currency             String               @default("USD")
  theme                String               @default("system")
  role                 Role                 @default(USER)
  isActive             Boolean              @default(true)
  isTwoFactorEnabled   Boolean              @default(false)
  twoFactorSecret      String?
  trialEndsAt          DateTime?
  stripeCustomerId     String?              @unique
  lastLoginAt          DateTime?
  createdAt            DateTime             @default(now()) @db.Timestamptz
  updatedAt            DateTime             @updatedAt @db.Timestamptz

  wallets              Wallet[]
  categories           Category[]
  transactions         Transaction[]
  budgets              Budget[]
  savingsGoals         SavingsGoal[]
  refreshTokens        RefreshToken[]
  passwordResets       PasswordResetToken[]
  backupCodes          TwoFactorBackupCode[]
  subscription         Subscription?
  ownedFamilyGroups    FamilyGroup[]
  familyMemberships    FamilyMember[]
  supportTickets       SupportTicket[]
  auditLogs            AuditLog[]
}

model TwoFactorBackupCode {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  code      String   @unique
  used      Boolean  @default(false)
  createdAt DateTime @default(now()) @db.Timestamptz
}

model Wallet {
  id               String           @id @default(uuid()) @db.Uuid
  userId           String           @db.Uuid
  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  name             String
  type             WalletType       @default(CASH)
  balance          Decimal          @default(0.00) @db.Decimal(12,2)
  currency         String           @default("USD")
  icon             String?
  color            String?
  isDefault        Boolean          @default(false)
  createdAt        DateTime         @default(now()) @db.Timestamptz
  updatedAt        DateTime         @updatedAt @db.Timestamptz

  transactions     Transaction[]
  outgoingTransfers WalletTransfer[] @relation("SourceWallet")
  incomingTransfers WalletTransfer[] @relation("TargetWallet")
}

model WalletTransfer {
  id             String   @id @default(uuid()) @db.Uuid
  sourceWalletId String   @db.Uuid
  sourceWallet   Wallet   @relation("SourceWallet", fields: [sourceWalletId], references: [id])
  targetWalletId String   @db.Uuid
  targetWallet   Wallet   @relation("TargetWallet", fields: [targetWalletId], references: [id])
  amount         Decimal  @db.Decimal(12,2)
  date           DateTime @db.Date
  note           String?
  createdAt      DateTime @default(now()) @db.Timestamptz
}

model Subscription {
  id                   String             @id @default(uuid()) @db.Uuid
  userId               String             @unique @db.Uuid
  user                 User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  planId               String             @db.Uuid
  plan                 Plan               @relation(fields: [planId], references: [id])
  stripeSubscriptionId String?            @unique
  status               SubscriptionStatus @default(TRIALING)
  currentPeriodStart   DateTime           @db.Timestamptz
  currentPeriodEnd     DateTime?          @db.Timestamptz
  cancelAtPeriodEnd    Boolean            @default(false)
  appliedCouponId      String?            @db.Uuid
  coupon               Coupon?            @relation(fields: [appliedCouponId], references: [id])
  createdAt            DateTime           @default(now()) @db.Timestamptz
}

model Plan {
  id            String         @id @default(uuid()) @db.Uuid
  name          String
  slug          String         @unique
  description   String?
  price         Decimal        @db.Decimal(10,2)
  interval      String         // "monthly", "yearly", "lifetime"
  limits        Json
  isActive      Boolean        @default(true)
  createdAt     DateTime       @default(now()) @db.Timestamptz
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
  createdAt          DateTime       @default(now()) @db.Timestamptz
  subscriptions      Subscription[]
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
  id            String         @id @default(uuid()) @db.Uuid
  userId        String         @db.Uuid
  user          User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  walletId      String         @db.Uuid
  wallet        Wallet         @relation(fields: [walletId], references: [id], onDelete: Cascade)
  categoryId    String         @db.Uuid
  category      Category       @relation(fields: [categoryId], references: [id])
  amount        Decimal        @db.Decimal(12,2)
  type          TxnType
  date          DateTime       @db.Date
  note          String?        @db.VarChar(500)
  tags          String[]       @default([])
  receiptUrl    String?
  isRecurring   Boolean        @default(false)
  recurringRule RecurringRule?
  createdAt     DateTime       @default(now()) @db.Timestamptz
  updatedAt     DateTime       @updatedAt @db.Timestamptz
}

model Budget {
  id             String    @id @default(uuid()) @db.Uuid
  userId         String    @db.Uuid
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  categoryId     String?   @db.Uuid
  category       Category? @relation(fields: [categoryId], references: [id])
  limit          Decimal   @db.Decimal(12,2)
  alertThreshold Int       @default(80)
  month          Int
  year           Int
  rollover       Boolean   @default(false)
  createdAt      DateTime  @default(now()) @db.Timestamptz
  updatedAt      DateTime  @updatedAt @db.Timestamptz
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
  id        String      @id @default(uuid()) @db.Uuid
  goalId    String      @db.Uuid
  goal      SavingsGoal @relation(fields: [goalId], references: [id], onDelete: Cascade)
  amount    Decimal     @db.Decimal(12,2)
  date      DateTime    @db.Date
  note      String?
}

model FamilyGroup {
  id      String         @id @default(uuid()) @db.Uuid
  ownerId String         @db.Uuid
  owner   User           @relation(fields: [ownerId], references: [id])
  name    String
  members FamilyMember[]
}

model FamilyMember {
  id      String      @id @default(uuid()) @db.Uuid
  groupId String      @db.Uuid
  group   FamilyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  userId  String      @db.Uuid
  user    User        @relation(fields: [userId], references: [id])
  role    String      @default("viewer")
}

model SupportTicket {
  id        String          @id @default(uuid()) @db.Uuid
  userId    String          @db.Uuid
  user      User            @relation(fields: [userId], references: [id])
  subject   String
  status    TicketStatus    @default(OPEN)
  priority  String          @default("medium")
  messages  TicketMessage[]
  createdAt DateTime        @default(now()) @db.Timestamptz
  updatedAt DateTime        @updatedAt @db.Timestamptz
}

model TicketMessage {
  id        String        @id @default(uuid()) @db.Uuid
  ticketId  String        @db.Uuid
  ticket    SupportTicket @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  senderId  String        @db.Uuid
  message   String        @db.Text
  createdAt DateTime      @default(now()) @db.Timestamptz
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

model AuditLog {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String?  @db.Uuid
  user      User?    @relation(fields: [userId], references: [id])
  action    String
  details   Json?
  createdAt DateTime @default(now()) @db.Timestamptz
}

model Announcement {
  id        String   @id @default(uuid()) @db.Uuid
  title     String
  message   String   @db.Text
  type      String   @default("info") // "info", "warning", "critical"
  isActive  Boolean  @default(true)
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

---

### 5. API Design Summary

All endpoints follow the standardized response envelope:
```json
{
  "success": true,
  "message": "Operation response message",
  "data": { ... },
  "meta": { "total": 100, "page": 1, "limit": 20, "pages": 5 }
}
```

#### 5.1 Authentication & 2FA Modules
* `POST /api/auth/register` – Create account & initialize 14-day Pro trial.
* `POST /api/auth/login` – Validate credentials (returns 2FA challenge if active).
* `POST /api/auth/2fa/setup` – Generate 2FA QR code & TOTP secret.
* `POST /api/auth/2fa/verify` – Verify TOTP code and finalize 2FA activation.
* `POST /api/auth/2fa/recovery` – Login using an emergency 2FA backup code.
* `POST /api/auth/refresh` – Rotate refresh token (Strict single-use policy).
* `POST /api/auth/logout` – Revoke current session tokens.

#### 5.2 Wallets & Account Management
* `GET /api/wallets` – Retrieve user's configured bank, cash, and mobile accounts.
* `POST /api/wallets` – Create new wallet account.
* `PATCH /api/wallets/:id` – Update wallet details / default flag.
* `POST /api/wallets/transfer` – Execute internal fund transfers between wallets.

#### 5.3 Transactions & CSV Import
* `GET /api/transactions` – Paginated list with multi-parameter filter queries.
* `POST /api/transactions` – Create entry (enforces plan limit checks).
* `POST /api/transactions/import` – Bulk upload CSV file validation engine.
* `POST /api/transactions/:id/receipt` – Get presigned URL / upload receipt attachment.

#### 5.4 Coupons, Billing & Admin Control
* `POST /api/billing/apply-coupon` – Validate and apply a promotional discount.
* `GET /api/admin/system-health` – Redis latency, PostgreSQL connections, and Cron status.
* `GET /api/admin/tickets` – Centralized user support ticket desk.
* `POST /api/admin/announcements` – Deploy system-wide top banner alerts.

---

### 6. Frontend Architecture (Next.js 16 App Router)

The codebase strictly adheres to standard App Router conventions separating Public Shells, User Dashboards, and Role-Guarded Admin Interfaces:

```text
app/
├── (public)/                 # Landing, Marketing, Terms, Auth & 2FA Pages
├── onboarding/               # First-time User Currency & Primary Wallet Setup
├── (dashboard)/              # User Dashboard Shell (Wallets, Txns, Budgets, Reports)
│   ├── dashboard/
│   ├── analytics/
│   ├── wallets/
│   ├── transactions/
│   ├── categories/
│   ├── budgets/
│   ├── goals/
│   ├── family/
│   ├── help/
│   └── settings/             # Profile, Preferences, Security (2FA), Billing
├── (admin)/                  # Admin Control Center (Protected by RBAC Guard)
│   ├── admin/
│   │   ├── dashboard/        # Financial KPIs (MRR, Active Users, Churn)
│   │   ├── users/            # Directory, Impersonation
│   │   ├── subscriptions/
│   │   ├── coupons/          # Promo Codes Configurator
│   │   ├── tickets/          # Support Desk Queue
│   │   ├── system-health/    # Redis, Postgres & Cron Diagnostics
│   │   └── settings/         # Gateway Keys, SMTP, IP Whitelist
└── proxy.ts                  # Edge Proxy Guard (Middleware Authentication & RBAC)
```

---

### 7. Security & Engineering Standards

1. **Edge Proxy Authorization (`proxy.ts`)**: Route protection, role enforcement (ADMIN vs USER), and security headers managed directly at the edge layer.
2. **Single-Use Token Rotation**: Used refresh tokens are immediately revoked. Double-attempt detection triggers automatic revocation of all descendant tokens for that user session.
3. **Data Protection**: Monetary data recorded with 2-decimal place `Decimal` precision to eliminate floating-point arithmetic errors.
4. **Direct Presigned Cloud Storage**: Binary uploads bypass backend Application Servers directly to Cloudinary/AWS S3 using client presigned signatures.