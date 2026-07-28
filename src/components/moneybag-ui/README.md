# Moneybag UI

This folder is the application-facing UI layer. It composes the shadcn
primitives in `@/components/ui` but keeps Moneybag's field spacing, validation
states, date formatting, dialogs, and action patterns in one stable API.

Use this layer in feature components:

```tsx
import {
  MoneybagDateRangePicker,
  MoneybagField,
  MoneybagInput,
  MoneybagModal,
  MoneybagSelect,
} from "@/components/moneybag-ui"
```

- `MoneybagInput`, `MoneybagTextarea`, `MoneybagSelect`, `MoneybagCheckbox`,
  `MoneybagSwitch`, and `MoneybagField` are the standard form controls.
- `MoneybagDatePicker`, `MoneybagDateRangePicker`, and
  `MoneybagDateTimePicker` return JavaScript `Date` values.
- `MoneybagModal`, `MoneybagConfirmDialog`, `MoneybagPopup`,
  `MoneybagActionMenu`, and `MoneybagSheet` are the standard overlay patterns.
- `MoneybagSegmentedControl` is for small single-choice switchers such as
  income/expense, period, or display mode.

Add a new raw shadcn primitive with the CLI first. Then expose any
Moneybag-specific behavior here instead of editing an installed primitive.
