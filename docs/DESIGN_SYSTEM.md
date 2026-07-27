# MAVIS Design System v2.0 — Complete Frontend Guide

MAVIS Design System v2.0 হলো একটি আধুনিক, ক্লিন এবং থিম-সাপোর্টেড ড্যাশবোর্ড ডিজাইন সিস্টেম, যা লাইট ও ডার্ক মোডের জন্য সম্পূর্ণ অপটিমাইজড[cite: 1]।

---

## 1. Design Tokens

### 1.1 Color Palette

ডিজাইন সিস্টেমে ডাইনামিক লাইট ও ডার্ক থিমের জন্য CSS Variables ব্যবহার করা হয়েছে[cite: 1]।

| Variable Name           | Light Mode Value   | Dark Mode Value | Usage / Description                                  |
| :---------------------- | :----------------- | :-------------- | :--------------------------------------------------- |
| `--color-primary`       | `#6366F1` (Indigo) | `#818CF8`       | প্রাইমারি অ্যাকশন বা মূল ব্র্যান্ড কালার[cite: 1]    |
| `--color-primary-hover` | `#4F46E5`          | `#A5B4FC`       | প্রাইমারি বাটন ও এলিমেন্টের হোভার স্টেট[cite: 1]     |
| `--color-primary-soft`  | `#EEF2FF`          | `#1E1B4B`       | অ্যাক্টিভ ব্যাকগ্রাউন্ড, চিপস ও সফট হাইলাইট[cite: 1] |
| `--color-accent`        | `#EC4899` (Pink)   | `#F472B6`       | সেকেন্ডারি হাইলাইট ও ব্র্যান্ড অ্যাকসেন্ট[cite: 1]   |
| `--color-bg`            | `#FAFAFB`          | `#0A0A0F`       | সম্পূর্ণ অ্যাপ্লিকেশনের মূল ব্যাকগ্রাউন্ড[cite: 1]   |
| `--color-surface`       | `#FFFFFF`          | `#13131A`       | কার্ড, মডাল এবং সাইডবারের ব্যাকগ্রাউন্ড[cite: 1]     |
| `--color-surface-2`     | `#F4F4F7`          | `#1C1C26`       | টেবিল হেডার, ইনপুট ফিল্ড ও হোভার স্টেট[cite: 1]      |
| `--color-text`          | `#0F172A`          | `#F1F5F9`       | প্রাইমারি টেক্সট কালার[cite: 1]                      |
| `--color-text-muted`    | `#64748B`          | `#94A3B8`       | সাবটাইটেল ও মিউটেড টেক্সট[cite: 1]                   |
| `--color-border`        | `#E2E8F0`          | `#262633`       | ডিফল্ট ডিভাইডার ও বর্ডার কালার[cite: 1]              |

#### Semantic Status Colors

- **Success:** `#10B981` (Soft: `#D1FAE5` / Dark Soft: `#064E3B`) — ইনকাম ও সফল অ্যাকশন[cite: 1]।
- **Warning:** `#F59E0B` (Soft: `#FEF3C7` / Dark Soft: `#451A03`) — সতর্কবার্তা ও পেন্ডিং স্টেট[cite: 1]।
- **Danger:** `#EF4444` (Soft: `#FEE2E2` / Dark Soft: `#450A0A`) — খরচ, এরর বা ডিলিট অ্যাকশন[cite: 1]।
- **Info:** `#3B82F6` (Soft: `#DBEAFE` / Dark Soft: `#172554`) — তথ্যভিত্তিক নোটিফিকেশন[cite: 1]।

---

### 1.2 Typography & Layout Rules

#### Font Family

- **Primary Sans Font:** `'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`[cite: 1]
- **Monospace Font:** `'JetBrains Mono', 'Fira Code', Consolas, monospace`[cite: 1]

#### Font Weights

অতিরিক্ত বোল্ড ব্যবহার না করে ক্লিন ভিজ্যুয়াল হায়ারার্কির জন্য নিচের তিনটি ওয়েট নির্দিষ্ট করা হয়েছে:

- **Normal:** `400` (Body, descriptions, readable content)
- **Medium:** `500` (Labels, table headers, sub-headings)
- **Semi-bold:** `600` (Headings, primary buttons, key numbers)

#### Type Scale

- `--text-xs`: `0.75rem` (12px)[cite: 1]
- `--text-sm`: `0.875rem` (14px — Default Body Text)[cite: 1]
- `--text-base`: `1rem` (16px)[cite: 1]
- `--text-lg`: `1.125rem` (18px)[cite: 1]
- `--text-xl`: `1.25rem` (20px)[cite: 1]
- `--text-2xl`: `1.5rem` (24px)[cite: 1]
- `--text-3xl`: `1.875rem` (30px)[cite: 1]
- `--text-4xl`: `2.25rem` (36px)[cite: 1]
- `--text-5xl`: `3rem` (48px)[cite: 1]

---

### 1.3 Spacing Scale

৮-পয়েন্ট গ্রিড এবং Flex/Grid গ্যাপের জন্য স্পেসিং সিস্টেম[cite: 1]:

- `--space-1`: `0.25rem` (4px)[cite: 1]
- `--space-2`: `0.5rem` (8px)[cite: 1]
- `--space-3`: `0.75rem` (12px)[cite: 1]
- `--space-4`: `1rem` (16px)[cite: 1]
- `--space-5`: `1.25rem` (20px)[cite: 1]
- `--space-6`: `1.5rem` (24px)[cite: 1]
- `--space-8`: `2rem` (32px)[cite: 1]
- `--space-10`: `2.5rem` (40px)[cite: 1]
- `--space-12`: `3rem` (48px)[cite: 1]
- `--space-16`: `4rem` (64px)[cite: 1]
- `--space-20`: `5rem` (80px)[cite: 1]
- `--space-24`: `6rem` (96px)[cite: 1]

---

### 1.4 Elevation & Radii

#### Border Radius

- `--radius-sm`: `0.25rem` (4px)[cite: 1]
- `--radius-md`: `0.5rem` (8px)[cite: 1]
- `--radius-lg`: `0.75rem` (12px)[cite: 1]
- `--radius-xl`: `1rem` (16px)[cite: 1]
- `--radius-2xl`: `1.5rem` (24px)[cite: 1]
- `--radius-full`: `9999px`[cite: 1]

#### Shadows

- `--shadow-xs` / `--shadow-sm`: বাটন ও ছোট কার্ডের জন্য[cite: 1]।
- `--shadow-md` / `--shadow-lg`: কার্ড ও পপওভারের জন্য[cite: 1]।
- `--shadow-xl` / `--shadow-2xl`: ড্রপডাউন, ড্রয়ার ও মডালের জন্য[cite: 1]।
- `--shadow-glow`: `0 0 0 4px rgba(99, 102, 241, 0.18)` (ফোকাস স্টেট)[cite: 1]।

---

### 1.5 Motion & Transitions

- **Ease-Default:** `cubic-bezier(0.4, 0, 0.2, 1)`[cite: 1]
- **Ease-Spring:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (মডাল ও টোস্ট অ্যানিমেশন)[cite: 1]
- **Duration Fast:** `150ms`[cite: 1]
- **Duration Normal:** `250ms`[cite: 1]
- **Duration Slow:** `400ms`[cite: 1]

---

## 2. Components Guidelines

### 2.1 Buttons

ফ্লেক্সবক্সভিত্তিক বাটন লেআউট এবং বেস ক্লাস: `.btn`[cite: 1]।

- **Variants:**
  - `.btn-primary`: মূল অ্যাকশন বাটন[cite: 1]।
  - `.btn-secondary`: সেকেন্ডারি অ্যাকশন[cite: 1]।
  - `.btn-ghost`: ব্যাকগ্রাউন্ড ছাড়া আইকন বা মিউটেড বাটন[cite: 1]।
  - `.btn-danger`: ধ্বংসাত্মক বা ডিলিট অ্যাকশন[cite: 1]।
  - `.btn-success`: কনফার্মেশন অ্যাকশন[cite: 1]।
- **Sizes:** `.btn-sm`, Default (Medium), `.btn-lg`, `.btn-block`[cite: 1]।

```html
<button class="btn btn-primary">
  <span>Save Changes</span>
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: 'Google Sans', sans-serif;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 150ms ease;
}
```

---

### 2.2 Form Controls

- **Inputs & Textareas:** `.input` এবং `.textarea` ক্লাসে ফোকাস স্টেট তৈরি করতে `--shadow-glow` ব্যবহৃত হয়[cite: 1]।
- **Custom Select:** নেটিভ অপশনের বদলে Flexbox ভিত্তিক কাস্টম UI এর জন্য `.select-wrap`, `.select-trigger` এবং `.select-menu` ব্যবহৃত হয়[cite: 1]।
- **Toggles & Checkboxes:**
  - `.toggle`: স্মুথ সুইচ ট্রান্সফরমেশন[cite: 1]।
  - `.checkbox` & `.radio`: থিম-ম্যাচড কাস্টম ডিজাইন[cite: 1]।

---

### 2.3 Cards & Data Display

#### Base Card (`.card`)

ফ্লেক্সবক্স কন্টেইনার এবং স্ট্রাকচার: `.card-header`, `.card-body`, এবং `.card-footer`[cite: 1]।

#### KPI Cards (`.kpi`)

ড্যাশবোর্ডের মেট্রিক্স দেখানোর জন্য কাস্টম কার্ড[cite: 1]:

- **আইকন কন্টেইনার:** Flex alignment সহ `.kpi-icon-primary`, `.kpi-icon-success` ইত্যাদি[cite: 1]।
- **ট্রেন্ড ইন্ডিকেটর:** `.kpi-trend-up` (সবুজ) এবং `.kpi-trend-down` (লাল)[cite: 1]।

#### Badges & Tags

- **Status Badges:** Flex alignment সহ `.badge-success`, `.badge-warning`, `.badge-danger`, `.badge-info`, `.badge-neutral`[cite: 1]।
- **Transaction Tags:** `.tag-income` এবং `.tag-expense`[cite: 1]।

---

### 2.4 Modals & Toast Notifications

#### Custom Modal (`.modal-overlay` & `.modal`)

- স্প্রিং অ্যানিমেশনের (`modalIn`) মাধ্যমে স্কেল-আপ হয়ে প্রদর্শিত হয়[cite: 1]।
- সাইজ ভ্যারিয়েন্ট: `.modal-sm` (380px), Default (500px), `.modal-lg` (720px)[cite: 1]।

#### Toast Notification (`.toast`)

- Flexbox লেআউট ব্যবহার করে আইকন ও টেক্সট এলাইন করা হয় এবং এটি স্ক্রিনের উপরে ডান কোণে `.toast-container` এ থাকে[cite: 1]।
- টাইপ: `.toast.danger`, `.toast.info`, `.toast.warning`[cite: 1]।

---

## 3. Layout & Architecture

### 3.1 App Shell

ড্যাশবোর্ড লেআউটে সাইডবার ও মেইন কন্টেন্ট সমন্বয়ের অবকাঠামো[cite: 1]:

```css
.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-w); /* 260px */
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

### 3.2 Dynamic Grids & Flex Layouts

- `.grid-2`: `2fr 1fr` (মূল কন্টেন্ট এবং সাইড প্যানেল)[cite: 1]।
- `.grid-2-equal`: `1fr 1fr`[cite: 1]।
- `.grid-3`: `repeat(3, 1fr)`[cite: 1]।
- `.grid-4`: `repeat(4, 1fr)`[cite: 1]।
- `.flex-row`: Flex Direction Row সহ গ্যাপ ও এলাইনমেন্ট ম্যানেজমেন্ট।
- `.flex-col`: Flex Direction Column সহ ইউজার ইন্টারফেস লেআউটিং।

### 3.3 Responsive Rules

- **Desktop (`> 1024px`):** সাইডবার দৃশ্যমান থাকে এবং ফুল কলাম লেআউট কাজ করে[cite: 1]।
- **Tablet (`<= 1024px`):** সাইডবার স্লাইডিং অফ-ক্যানভাসে পরিণত হয় (`.sidebar.open`)[cite: 1]।
- **Mobile (`<= 640px`):** স্পেসিং প্যাডিং কমে `--space-4` হয় এবং ফ্লেক্স এলিমেন্টগুলো ভার্টিক্যালি এলাইন হয়[cite: 1]।
