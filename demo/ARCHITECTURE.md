# 💰 MoneyBag - Production Architecture & Engineering Standards
> **Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit, RTK Query, Zod, Axios, Apache ECharts.

---

## 📁 1. Project Directory Structure

moneybag/
├── src/
│   ├── app/                                   # Next.js 16 App Router Routes
│   │   ├── (public)/                          # Public Landing & Marketing Shell
│   │   │   ├── page.tsx                       # Landing Page
│   │   │   ├── about/page.tsx                 # About Us & Company Story
│   │   │   ├── contact/page.tsx               # Contact Us & Support Form
│   │   │   ├── features/page.tsx              # Feature Highlights Showcase
│   │   │   ├── pricing/page.tsx               # Subscription Plans & Feature Comparison
│   │   │   ├── faq/page.tsx                   # Frequently Asked Questions
│   │   │   ├── blog/                          # SEO & Content Pages
│   │   │   │   ├── page.tsx                   # Blog Article List
│   │   │   │   └── [slug]/page.tsx            # Single Blog Post Detail
│   │   │   ├── changelog/page.tsx             # Release Notes & Product Updates
│   │   │   ├── terms/page.tsx                 # Terms of Service
│   │   │   ├── privacy/page.tsx               # Privacy Policy
│   │   │   ├── auth/                          # Authentication Pages
│   │   │   │   ├── login/page.tsx             # Login (Email/Password + OAuth)
│   │   │   │   ├── register/page.tsx          # Registration + 14-day Trial Start
│   │   │   │   ├── verify-email/page.tsx      # Email Verification Screen
│   │   │   │   ├── 2fa/                       # Two-Factor Authentication Module
│   │   │   │   │   ├── page.tsx               # OTP / Authenticator App Code Entry Screen
│   │   │   │   │   ├── recovery/page.tsx      # Backup Code Recovery Login Screen
│   │   │   │   │   └── setup/page.tsx         # Enforced 2FA Setup Screen (QR Code)
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   ├── reset-password/page.tsx
│   │   │   │   ├── callback/page.tsx          # OAuth Callback (Google Login) Handler
│   │   │   │   ├── error/page.tsx             # Auth Exception & Error Page
│   │   │   │   └── layout.tsx                 # Split Layout (Left: Branding/Banner, Right: Form)
│   │   │   └── layout.tsx                     # Public Navbar & Footer Shell
│   │   │
│   │   ├── onboarding/                        # First-time User Setup Wizard
│   │   │   ├── page.tsx                       # Currency, Primary Wallet Setup & Preferences
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/                       # User Panel (Protected Routes)
│   │   │   ├── dashboard/page.tsx             # Overview Dashboard & Quick Insights
│   │   │   ├── analytics/page.tsx             # Interactive Visual Insights (ECharts)
│   │   │   ├── reports/page.tsx               # Tabular Reports & PDF/CSV Downloads
│   │   │   ├── wallets/page.tsx               # Wallets & Accounts (Bank, Cash, Mobile & Transfers)
│   │   │   ├── transactions/                  # Transactions Module
│   │   │   │   ├── page.tsx                   # Transaction List, Filters & CSV Import
│   │   │   │   └── recurring/page.tsx         # Automated Recurring Bills & Income
│   │   │   ├── categories/page.tsx            # Personal & Custom Category Management
│   │   │   ├── budgets/page.tsx               # Monthly/Yearly Budgets & Threshold Alerts
│   │   │   ├── goals/page.tsx                 # Savings Goals & Contribution Logs
│   │   │   ├── family/                        # Family Group Sharing (Pro Feature)
│   │   │   │   ├── page.tsx                   # Group Overview & Role Assignment
│   │   │   │   └── join/page.tsx              # Group Invitation Acceptance Page
│   │   │   ├── notifications/page.tsx         # In-App Alerts & Notification Center
│   │   │   ├── help/page.tsx                  # User Support Tickets & Documentation
│   │   │   ├── checkout/                      # Stripe Payment Redirect Handlers
│   │   │   │   ├── success/page.tsx           # Payment Success Confirmation
│   │   │   │   └── cancel/page.tsx            # Payment Cancelled/Retry Page
│   │   │   ├── settings/                      # Unified User Settings Modules
│   │   │   │   ├── page.tsx                   # Redirects to Profile
│   │   │   │   ├── profile/page.tsx           # Avatar, Name, Bio, Account Deletion
│   │   │   │   ├── preferences/page.tsx       # Currency, Theme, Language, Date Format
│   │   │   │   ├── notifications/page.tsx     # Email & Push Notification Toggles
│   │   │   │   ├── security/                  # Security Settings
│   │   │   │   │   ├── page.tsx               # Password Change, Active Sessions & 2FA Toggle
│   │   │   │   │   └── backup-codes/page.tsx  # Emergency 2FA Backup Code Generator
│   │   │   │   ├── billing/page.tsx           # Subscriptions, Stripe Portal, Invoices
│   │   │   │   ├── privacy/page.tsx           # Data Export (JSON/CSV) & GDPR Rules
│   │   │   │   └── layout.tsx                 # Settings Navigation Sidebar/Tabs
│   │   │   └── layout.tsx                     # User Panel Navigation Shell
│   │   │
│   │   ├── (admin)/                           # Admin Panel (Protected by RBAC Guard)
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/page.tsx         # Platform KPIs (MRR, Churn, Active Users)
│   │   │   │   ├── users/                     # User Management Module
│   │   │   │   │   ├── page.tsx               # User List, Filter, Status Toggles
│   │   │   │   │   └── [id]/page.tsx          # User Detail View, Activity & Impersonation
│   │   │   │   ├── subscriptions/page.tsx     # Subscription Oversight & Refund Requests
│   │   │   │   ├── plans/page.tsx             # Plan Pricing & Limit JSON Configurator
│   │   │   │   ├── coupons/page.tsx           # Promo Codes & Discount Management
│   │   │   │   ├── categories/page.tsx        # System Default Categories Management
│   │   │   │   ├── reports/page.tsx           # Business Financials & Revenue Analytics
│   │   │   │   ├── tickets/                   # Support Tickets Management
│   │   │   │   │   ├── page.tsx               # Ticket Queue & Priority Filters
│   │   │   │   │   └── [id]/page.tsx          # Ticket Thread & Resolution Controls
│   │   │   │   ├── announcements/page.tsx     # System Broadcasts & Banner Alerts
│   │   │   │   ├── team/page.tsx              # Multi-Admin Roles & Permission Rules
│   │   │   │   ├── system-health/page.tsx     # Cron Jobs Status, Redis & Database Health
│   │   │   │   ├── logs/page.tsx              # System Audit Logs & Security Events
│   │   │   │   ├── email-templates/page.tsx   # Transactional Email Content Editor
│   │   │   │   ├── settings/                  # Global System Settings
│   │   │   │   │   ├── page.tsx               # Redirects to General
│   │   │   │   │   ├── general/page.tsx       # Site Branding, Logo, Maintenance Mode
│   │   │   │   │   ├── auth-providers/page.tsx # Google OAuth Credentials & Social Toggles
│   │   │   │   │   ├── smtp/page.tsx          # Email Gateway & SMTP Test Trigger
│   │   │   │   │   ├── payment-gateways/page.tsx # Stripe Keys, Webhooks & Multi-currency Rules
│   │   │   │   │   ├── storage/page.tsx       # Cloudinary / AWS S3 Keys for Receipt Uploads
│   │   │   │   │   ├── localization/page.tsx  # System Currencies & Regional Formats
│   │   │   │   │   ├── security/page.tsx      # Admin IP Whitelist, Rate Limit Rules & Admin 2FA
│   │   │   │   │   ├── legal/page.tsx         # Dynamic Editor for Terms & Privacy Policy
│   │   │   │   │   └── layout.tsx             # Admin Settings Sub-navigation Layout
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                     # Admin Panel Sidebar & Security Shell
│   │   │
│   │   ├── api/                               # Next.js Route Handlers
│   │   │   └── auth/callback/route.ts
│   │   │
│   │   ├── maintenance/page.tsx               # System Maintenance Mode Landing Page
│   │   ├── globals.css                        # Tailwind & Custom CSS Variables
│   │   ├── layout.tsx                         # Root Layout (Providers, Fonts, Toast)
│   │   ├── loading.tsx                        # Global Suspense Skeleton Loader
│   │   ├── error.tsx                          # Application Error Boundary
│   │   ├── global-error.tsx                   # Root Exception Handler
│   │   └── not-found.tsx                      # Custom 404 Error Page
│   │
│   ├── components/                            # React UI Components
│   │   ├── ui/                                # Shadcn UI Primitives
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── tabs.tsx
│   │   │
│   │   ├── shared/                            # Reusable Cross-Feature UI Components
│   │   │   ├── data-table/                    # Reusable Data Table (Filter, Search, Paginate)
│   │   │   ├── date-range-picker.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── currency-display.tsx
│   │   │   └── file-uploader.tsx              # Direct Cloudinary/S3 Presigned Uploader
│   │   │
│   │   ├── charts/                            # Apache ECharts Visualization Modules (Lazy Loaded)
│   │   │   ├── income-expense-bar-chart.tsx
│   │   │   ├── category-pie-chart.tsx
│   │   │   ├── daily-trend-line-chart.tsx
│   │   │   └── budget-gauge-chart.tsx
│   │   │
│   │   ├── user/                              # User Panel Component Widgets
│   │   │   ├── wallet-card.tsx                # Wallet Balance Summary Card
│   │   │   ├── wallet-modal.tsx               # Create/Edit Wallet & Transfer Modal
│   │   │   ├── transaction-modal.tsx          # Create/Edit Expense/Income Modal
│   │   │   ├── csv-import-dialog.tsx          # Bulk CSV Upload Modal
│   │   │   ├── budget-card.tsx
│   │   │   ├── goal-contribution-modal.tsx
│   │   │   ├── family-invite-modal.tsx
│   │   │   └── billing-status-banner.tsx      # Active Plan / Trial End Alert
│   │   │
│   │   └── admin/                             # Admin Panel Component Widgets
│   │       ├── mrr-metric-card.tsx
│   │       ├── user-impersonate-button.tsx
│   │       ├── plan-config-modal.tsx
│   │       └── audit-log-table.tsx
│   │
│   ├── redux/                                 # State Management (RTK Query)
│   │   ├── api/
│   │   │   ├── baseApi.ts                     # Axios baseQuery + Single-use Refresh Token logic
│   │   │   ├── authApi.ts
│   │   │   ├── walletsApi.ts                  # Wallet Accounts & Internal Transfers
│   │   │   ├── transactionsApi.ts             # Txns CRUD, CSV & Receipts
│   │   │   ├── recurringApi.ts                # Scheduled Recurring Payments
│   │   │   ├── categoriesApi.ts
│   │   │   ├── budgetsApi.ts
│   │   │   ├── goalsApi.ts
│   │   │   ├── reportsApi.ts
│   │   │   ├── familyApi.ts
│   │   │   ├── billingApi.ts                  # Stripe Checkout & Portal Integration
│   │   │   ├── couponsApi.ts                  # Discount Codes
│   │   │   └── adminApi.ts                    # Admin KPIs, Users, System Health & Settings
│   │   │
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── themeSlice.ts
│   │   │   └── filterSlice.ts
│   │   │
│   │   ├── hooks.ts
│   │   └── store.ts
│   │
│   ├── schemas/                               # Zod Validation Schemas
│   │   ├── auth.schema.ts
│   │   ├── wallet.schema.ts
│   │   ├── transaction.schema.ts
│   │   ├── recurring.schema.ts
│   │   ├── budget.schema.ts
│   │   ├── goal.schema.ts
│   │   ├── family.schema.ts
│   │   ├── coupon.schema.ts
│   │   └── admin.schema.ts
│   │
│   ├── lib/                                   # Core Utilities & Library Configs
│   │   ├── axios.ts                           # Axios Instance & Interceptors
│   │   ├── echarts.ts                         # Apache ECharts Tree-shakable Registry
│   │   ├── utils.ts                           # cn() helper, Currency/Date Formatters
│   │   └── constants.ts                       # Currencies, Roles, Plan Slugs
│   │
│   ├── hooks/                                 # Custom React Hooks
│   │   ├── use-auth.ts
│   │   ├── use-debounce.ts
│   │   └── use-plan-limits.ts                 # Feature Gating Logic (Free vs Pro)
│   │
│   ├── providers/                             # React Context Providers
│   │   ├── redux-provider.tsx
│   │   ├── theme-provider.tsx
│   │   └── toast-provider.tsx                 # Sonner Toast Configuration
│   │
│   ├── types/                                 # Global TypeScript Interfaces
│   │   ├── user.ts                            # User, Role, Plan, SubscriptionStatus
│   │   ├── wallet.ts                          # Wallet Accounts & Transfer Types
│   │   ├── transaction.ts                     # Transaction & Recurring Types
│   │   ├── budget.ts
│   │   ├── family.ts
│   │   ├── admin.ts                           # System Audit Logs, Health Metrics
│   │   └── api.ts                             # Standard API Envelope Interface
│   │
│   └── proxy.ts                               # Next.js 16 Request Proxy (Routing, Security Headers & RBAC)
│
├── public/                                    # Static Files & Logos
├── .env.example
├── next.config.ts                             # Next.js Configuration
├── tailwind.config.ts                         # Tailwind CSS Configuration
├── tsconfig.json
└── package.json

---

## 🏗️ 2. Architectural Conventions & Best Practices

### A. React Server Components (RSC) vs Client Components
* **Server Components (page.tsx) by Default:**
  * প্রতিটি page.tsx মূলতঃ Server Component হিসেবে কাজ করবে।
  * কাজ: SEO Metadata জেনারেট করা, ইনিশিয়াল লেআউট শেপ তৈরি করা এবং প্রোটেক্টেড সিঙ্ক চেকিং।
* **Client Components ('use client'):**
  * ইন্টারেক্টিভ ফর্ম (Zod + React Hook Form), মডাল উইন্ডো, ডাটা টেবিল ফিল্টার, এবং ECharts ভিজ্যুয়ালাইজেশন শুধু components/ ফোল্ডারের ফাইলগুলোতে অন্তর্ভুক্ত থাকবে।
  * কোনো page.tsx-এর একদম টপে ডাইরেক্ট 'use client' দেওয়া যাবে না; বরং পেজটি ইন্টারেক্টিভ কম্পোনেন্টগুলো হোল্ড করবে।

### B. State Management & RTK Query Caching Rules
একটি আর্থিক লেনদেনের সিস্টেমে যেকোনো ডাটা পরিবর্তনের সাথে সাথে অন্যান্য সব সম্পর্কিত উইজেট রিয়েল-টাইমে রিলোড ছাড়া আপডেট হওয়া আবশ্যক। 

* **Tag Invalidation Mapping:**
  Tag Registry:
  - User
  - Wallet
  - Transaction
  - Category
  - Budget
  - Goal
  - Analytics
  - AdminStats

* **Dependency Rules:**
  * Add/Edit Transaction Mutation: invalidatesTags -> ['Transaction', 'Wallet', 'Budget', 'Analytics', 'Goal']
  * Wallet Transfer Mutation: invalidatesTags -> ['Wallet', 'Transaction', 'Analytics']
  * Category Edit Mutation: invalidatesTags -> ['Category', 'Transaction', 'Budget']

### C. Performance Optimization Strategies
1. **Dynamic Import for Heavy Modules (ECharts):**
   চার্ট ফাইলগুলোর বান্ডেল সাইজ কমাতে next/dynamic ব্যবহার করতে হবে (ssr: false, loading: ChartSkeleton)।
2. **Direct Storage Uploads:**
   রিসিপ্ট আপলোড করার সময় ব্যাকএন্ডের ভারী মেমোরি কনসাম্পশন রোধ করতে file-uploader.tsx ব্যবহার করে ডাইরেক্ট Presigned URL দিয়ে Cloudinary/AWS S3-তে ফাইল পাঠাতে হবে।

### D. Security, Auth & Edge Proxy Guidelines
1. **Edge Protection via src/proxy.ts:**
   Next.js 16-এর কনভেনশন মেনে Edge-এ Authentication Check, RBAC (Admin vs User access control), এবং Headers ইমপ্লিমেন্ট করতে হবে।
2. **2FA Flow Enforcement:**
   * যদি ইউজারের ২FA সক্রিয় করা থাকে, তবে প্রোপার TOTP ভ্যালিডেশন না পাওয়া পর্যন্ত সেম সেশনে Protected Routes-এ রিডাইরেক্ট করা যাবে না।
   * ফোন হারানো বা অ্যাপ নষ্ট হওয়ার পরিস্থিতিতে /auth/2fa/recovery পেজের ব্যাকআপ কোড ফ্লো ভ্যালিডেশন নিশ্চিত থাকতে হবে।
3. **Sensitive Token Storage:**
   JWT বা Refresh Token সবসময় HttpOnly, Secure, SameSite Cookies-এ রাখতে হবে। কোনোভাবেই localStorage-এ টোকেন রাখা যাবে না।

### E. Code Quality & Formatting
* **Strict Types:** কোনো ফাইলে any টাইপ ব্যবহার সম্পূর্ণ নিষিদ্ধ। সব API রেসপন্স types/api.ts-এর Standard Envelope ইন্টারফেস ফলো করবে।
* **Zod Schemas:** ক্লায়েন্ট-সাইড ফর্ম ভ্যালিডেশন এবং API পে লোড উভয় ক্ষেত্রেই schemas/ ফোল্ডারের একক Zod স্কিমা পুনরায় ব্যবহার করা হবে।
* **UI/UX Consistency:** Shadcn UI মডিউলগুলো components/ui/-এ থাকবে এবং কালার কাস্টমাইজেশন সম্পূর্ণ globals.css ও tailwind.config.ts-এর মাধ্যমে হ্যান্ডেল করা হবে।