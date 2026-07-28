# App UI

This is the only shared UI import point for feature and page components:

```tsx
import {
  AppButton,
  AppField,
  AppInput,
  AppModal,
  AppPopover,
  AppSelect,
} from "@/components/app-ui"
```

- Use `App*` components when the application has a shared visual rule or API.
- Use `@/components/ui` only to build a new shared `App*` component.
- Keep feature-only UI next to its feature (for example `components/auth`).
- Never modify generated shadcn files by hand; add new primitives via the CLI.

The current shared vocabulary is: `AppButton`, `AppInput`, `AppTextarea`,
`AppSelect`, `AppField`, `AppCheckbox`, `AppSwitch`, `AppModal`,
`AppConfirmDialog`, `AppPopover`, `AppSheet`, `AppActionMenu`, `AppCard`,
`AppPageHeader`, `AppEmptyState`, status badges, date pickers, and segmented
controls.
