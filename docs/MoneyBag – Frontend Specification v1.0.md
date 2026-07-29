# MoneyBag – Frontend Specification v1.0

**Document ID:** FRONTEND-MB-001
**Date:** 2026-07-29
**Version:** 1.0
**Target Audience:** Frontend Developers, UI/UX Designers

---

## 1. Introduction

This document defines the complete frontend implementation for MoneyBag. It covers the Next.js project structure, routing with three dashboard shells, state management, custom theme integration (Tailwind CSS 4 + shadcn/ui), all API data‑fetching patterns, and a detailed screen‑by‑screen layout reference. Everything needed to build the user interface is described here.

---

## 2. Technology Stack (Frontend)

| Concern          | Technology                                                         |
| ---------------- | ------------------------------------------------------------------ |
| Framework        | Next.js 16 (App Router, React Server Components)                   |
| Language         | TypeScript (strict mode)                                           |
| Styling          | Tailwind CSS 4 – CSS‑first configuration (no `tailwind.config.ts`) |
| UI Components    | shadcn/ui (Tailwind v4 compatible)                                 |
| Icons            | Lucide React                                                       |
| State Management | Redux Toolkit + RTK Query (API slices)                             |
| Form Handling    | React Hook Form + Zod                                              |
| Charts           | Apache ECharts (dynamic import / tree‑shaking)                     |
| HTTP Client      | Axios (interceptors for CSRF & token refresh)                      |
| Notifications    | Sonner (toast)                                                     |
| Date Utilities   | date‑fns                                                           |
| Package Manager  | pnpm                                                               |

---

## 3. Project Structure

```
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                     # Landing
│   │   │   ├── pricing/page.tsx
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   └── reset-password/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── privacy/page.tsx
│   │   ├── (user)/                          # Personal Dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── wallets/
│   │   │   ├── transactions/
│   │   │   ├── categories/page.tsx
│   │   │   ├── budgets/
│   │   │   ├── goals/page.tsx
│   │   │   ├── reports/
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx                 # Profile
│   │   │   │   ├── preferences/page.tsx
│   │   │   │   ├── security/page.tsx
│   │   │   │   └── data/page.tsx
│   │   │   └── billing/
│   │   ├── (family)/                        # Family Dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── wallets/page.tsx
│   │   │   ├── transactions/
│   │   │   ├── budgets/
│   │   │   ├── balances/page.tsx
│   │   │   ├── members/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   │       └── page.tsx                 # Family settings
│   │   ├── (admin)/                         # Admin Panel
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── users/
│   │   │   ├── subscriptions/page.tsx
│   │   │   ├── plans/page.tsx
│   │   │   ├── coupons/page.tsx
│   │   │   ├── family-groups/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── email-templates/page.tsx
│   │   │   ├── audit-logs/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── layout.tsx                      # Root layout
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                              # shadcn/ui primitives
│   │   ├── layout/                          # Sidebar, Topbar, FamilyToggle
│   │   ├── wallets/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── goals/
│   │   ├── reports/
│   │   ├── family/
│   │   └── billing/
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── csrf.ts
│   │   └── utils.ts
│   ├── hooks/
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/                          # RTK Query API slices
│   │   └── features/                        # UI slices (ui, familyToggle)
│   └── types/
└── (config files)
```

---

## 4. Routing & Layout Architecture

Three distinct dashboard shells are created using Next.js route groups.

| Route Group | URL Prefix              | Layout Purpose                                     |
| ----------- | ----------------------- | -------------------------------------------------- |
| (public)    | /                       | Landing, auth, legal pages (minimal header/footer) |
| (user)      | /dashboard, /wallets, … | Personal finance shell                             |
| (family)    | /family/…               | Family collaboration shell (toggled from user)     |
| (admin)     | /admin/…                | Administration shell                               |

### 4.1 User Shell (`(user)/layout.tsx`)

- Collapsible **Sidebar** with navigation: Dashboard, Wallets, Transactions, Categories, Budgets, Goals, Reports, Family, Settings, Billing.
- **Topbar**: Breadcrumb, Family Toggle, User Menu (Profile, Theme, Logout).
- **Family Toggle**: Switches between `(user)` and `(family)` route groups. Stores active family group ID in Redux.

### 4.2 Family Shell (`(family)/layout.tsx`)

- Same sidebar structure, but shows Family‑specific links: Family Dashboard, Wallets, Transactions, Budgets, Balances, Members, Reports, Settings.
- Topbar shows active family group name; dropdown to switch groups.

### 4.3 Admin Shell (`(admin)/layout.tsx`)

- Separate sidebar: Dashboard, Users, Subscriptions, Plans, Coupons, Family Groups, Email Templates, Audit Logs, Settings.
- RBAC guard: if `user.role !== ADMIN`, redirect to `/dashboard`.

### 4.4 Middleware (`middleware.ts`)

- Checks access token. If absent or expired, attempts refresh (via cookie). On failure, redirects to `/auth/login`.
- Role validation for admin routes based on JWT claim.

---

## 5. Custom Theme Integration (Tailwind v4 + shadcn/ui)

MoneyBag uses a **custom design system** provided as a global CSS file. There is **no `tailwind.config.ts`** – all configuration is CSS‑first.

### 5.1 Global Styles (`app/globals.css`)

The file includes:

- `@import 'tailwindcss';`
- `@import 'tw-animate-css';`
- `@import 'shadcn/tailwind.css';`
- A `@theme inline` block that defines design tokens as CSS variables (colors, fonts, spacing, radii, shadows, etc.).
- `:root` and `.dark` selectors that assign light/dark values to those variables.

All components use these variables, so no additional theme configuration is needed.

### 5.2 Font Loading

Fonts (Ubuntu, Ubuntu Sans, Ubuntu Mono) are loaded via `next/font` and assigned to CSS variables in the root layout.

Example in `app/layout.tsx`:

```tsx
import { Ubuntu, Ubuntu_Sans, Ubuntu_Mono } from 'next/font/google'
import './globals.css'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
})

const ubuntuSans = Ubuntu_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ubuntu-sans',
})

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ubuntu-mono',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${ubuntuSans.variable} ${ubuntuMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

### 5.3 Dark Mode

A `ThemeProvider` (client component) reads the current theme from Redux (`ui.theme`) and toggles the `dark` class on `<html>`.

---

## 6. State Management

### 6.1 RTK Query API Slices

Every API domain has its own RTK Query `createApi` slice. List of slices:

- `authSlice.ts` – register, login, google, refresh, logout, forgot, reset, getMe, updateMe, changePassword, updatePreferences
- `walletSlice.ts` – list, create, update, transfer
- `categorySlice.ts` – list, create, update, delete
- `transactionSlice.ts` – list, create, update, delete, import, getTags
- `budgetSlice.ts` – list, create, update, delete, alerts
- `savingsSlice.ts` – list, create, contribute, withdraw, delete
- `reportSlice.ts` – monthly, yearly, categoryBreakdown, trend, export
- `familySlice.ts` – groups (CRUD), members (invite, remove, role, leave), sharedWallets, familyTransactions, balances, settlements, familyBudgets, familyCategories, familyReports
- `billingSlice.ts` – plans, subscription, checkout, portal
- `adminSlice.ts` – stats, users, subscriptions, plans, coupons, familyGroups, emailTemplates, auditLogs, settings

Each slice defines tag types for automatic cache invalidation.

### 6.2 Global UI Slices

- `uiSlice.ts`: `{ sidebarOpen: boolean, theme: 'light' | 'dark' | 'system' }`
- `familyToggleSlice.ts`: `{ activeFamilyGroupId: string | null, isInFamilyView: boolean }`

Family toggle updates both the route group and the active group ID.

---

## 7. Data Fetching Patterns

Pages use RTK Query hooks. Loading → Skeleton, Error → Error card with retry, Empty → illustration with CTA, Success → render data.

Family pages read `activeFamilyGroupId` from Redux and pass it to API hooks.

---

## 8. Screen Layout Reference

All screens follow the three‑dashboard pattern. Only the main content area is described; the surrounding shell (sidebar, topbar) is assumed.

### 8.1 Public Pages

- **Landing:** Hero, feature highlights, CTA buttons, footer.
- **Pricing:** Plan comparison cards.
- **Auth:** Centered forms (login, register, forgot/reset password).

### 8.2 Personal Dashboard (User Shell)

**Main Dashboard**

- Summary cards (total balance, monthly income, expense).
- Quick actions: Add Transaction, Add Budget.
- Upcoming recurring transactions list.
- Budget progress bars (top 3).
- Mini spending trend chart.

**Wallets**

- Grid of wallet cards (icon, name, type badge, balance, default flag). “Add Wallet” button.
- Wallet detail: transaction list filtered by wallet.

**Transactions**

- Filter bar (wallet, type, category, date range, tags with autocomplete, search).
- Sortable table (date, description, category, amount).
- Create/Edit slide‑over sheet.
- CSV import button (Pro only).

**Categories**

- List/grid of categories with edit/delete actions. “Add Category” modal.

**Budgets**

- Month/Year filter, budget cards with progress bar, spent/limit, alert badge.
- Create Budget sheet.

**Savings Goals**

- Goal cards (title, target, current, progress, deadline). Contribute/Withdraw modals.

**Reports**

- Sub‑navigation: Monthly, Yearly, Category Breakdown, Daily Trend, Export.
- Interactive charts (bar, donut, line).
- Export buttons for PDF/CSV.

**Settings**

- **Profile Tab:** name, avatar URL, currency, theme toggle.
- **Preferences Tab:** notification toggles (budget alert email, in‑app placeholder, recurring reminder, marketing).
- **Security Tab:** change password form.
- **Data Tab:** export JSON button, delete account button with confirmation.

### 8.3 Family Dashboard (Family Shell)

**Family Main Dashboard**

- Aggregated balances, income/expense, pooled budget progress.
- “You owe” / “You are owed” summary.
- Recent activity feed.

**Family Wallets**

- Same as personal but for shared wallets (owner creates/deletes).

**Family Transactions**

- Table with who paid and split summary. Create with split type and member selection.

**Family Budgets**

- Pooled budgets tied to shared wallet.

**Family Balances**

- Balance summary cards, pairwise balance list with “Settle” button.
- Settlement modal (from, to, amount, note).
- Settlement history table.

**Family Members**

- Owner view: list with role badges, invite button, remove button.
- Non‑owner view: read‑only list, “Leave Group” button.

**Family Settings (Owner)**

- Group name input + save.
- Default Categories list (add/edit/delete).
- “Delete Group” button (with confirmation, emails members).

**Family Settings (Non‑owner)**

- Group name (read‑only).
- “Leave Group” button.

### 8.4 Admin Panel (Admin Shell)

**Admin Dashboard**

- KPI cards (total users, active trials, MRR, churn rate, active today).
- Charts: new registrations over time, plan distribution pie.

**User Management**

- Search/filterable table (name, email, role, plan, status). Actions: view details, impersonate, toggle status.
- Manual plan assignment.

**Subscription Management**

- Subscription list with filters. Actions: refund, cancel, reactivate.

**Plan Management**

- CRUD for plans (name, slug, price, interval, limits JSON, active flag).

**Coupon Management**

- CRUD for coupons (code, discount type/amount, expiry, usage limits).

**Family Groups Management**

- Searchable table of all groups (name, owner, member count, status).
- Group detail page (members, wallets, budgets – read‑only).
- Actions: delete group, deactivate.

**Email Templates**

- List and edit transactional templates.

**Audit Logs**

- Searchable log table (timestamp, user, action, details).

**Global Settings**

- Form for SMTP, OAuth credentials, storage keys, maintenance mode toggle, legal page content.

---

## 9. Key UI Components (shadcn/ui)

Reusable components: Button, Card, Input, Select, Textarea, Dialog, Sheet, Table, Badge, Progress, Toast, Tabs, Tooltip, DropdownMenu, Command (autocomplete), DatePicker.

---

## 10. Axios Configuration

- Base URL from `NEXT_PUBLIC_API_URL`.
- Request interceptor: attaches CSRF token for mutations.
- Response interceptor: on 401, attempts token refresh; on failure, redirects to login.

---

## 11. Mobile Responsiveness

- Sidebar becomes a drawer on small screens.
- Tables stack into cards.
- Filters collapse into a button that opens a sheet.

---

## 12. Accessibility

- Keyboard navigation, aria attributes, focus rings.
- Color contrast meets WCAG AA.

---

## 13. Performance

- Dynamic import for charts.
- RTK Query caching.
- Server Components for static content.

---

**End of Frontend Specification**
