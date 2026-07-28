"use client"

import type { ReactNode } from "react"
import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type MoneybagSegmentOption = {
  disabled?: boolean
  icon?: ReactNode
  label: ReactNode
  value: string
}

export type MoneybagSegmentedControlProps = Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "children" | "defaultValue" | "multiple" | "onValueChange" | "value"
> & {
  className?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  options: readonly MoneybagSegmentOption[]
  value?: string | null
}

/**
 * Single-choice segmented control for transaction type, period, and view
 * switchers. It has a small, consistent project-specific API over shadcn.
 */
export function MoneybagSegmentedControl({
  className,
  defaultValue,
  onValueChange,
  options,
  value,
  ...props
}: MoneybagSegmentedControlProps) {
  return (
    <ToggleGroup
      {...props}
      className={cn("w-full rounded-md bg-muted p-1", className)}
      defaultValue={defaultValue ? [defaultValue] : undefined}
      multiple={false}
      onValueChange={(nextValue) => onValueChange?.(nextValue[0] ?? null)}
      spacing={0}
      value={value ? [value] : undefined}
      variant="default"
    >
      {options.map((option) => (
        <ToggleGroupItem
          className="flex-1 rounded-sm px-3 py-2 data-[state=on]:bg-card data-[state=on]:shadow-xs"
          disabled={option.disabled}
          key={option.value}
          value={option.value}
        >
          {option.icon}
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
