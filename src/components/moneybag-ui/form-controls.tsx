"use client"

import type { ReactNode } from "react"
import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FieldMessage = ReactNode | undefined

export type MoneybagFieldProps = {
  children: ReactNode
  className?: string
  description?: FieldMessage
  error?: FieldMessage
  label?: ReactNode
  required?: boolean
}

/**
 * The shared label, hint, and validation layout for all Moneybag forms.
 * Controls keep their own id so React Hook Form can register them directly.
 */
export function MoneybagField({
  children,
  className,
  description,
  error,
  label,
  required,
}: MoneybagFieldProps) {
  return (
    <Field className={cn("gap-2", className)} data-invalid={Boolean(error)}>
      {label ? (
        <FieldLabel>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </FieldLabel>
      ) : null}
      {children}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  )
}

export type MoneybagInputProps = React.ComponentProps<typeof Input> & {
  leading?: ReactNode
  trailing?: ReactNode
}

/** Text, number, email, password, and search input with optional inline UI. */
export function MoneybagInput({
  className,
  leading,
  trailing,
  ...props
}: MoneybagInputProps) {
  const inputClassName = cn(
    "h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    leading && "pl-10",
    trailing && "pr-11",
    className,
  )

  if (!leading && !trailing) {
    return <Input className={inputClassName} {...props} />
  }

  return (
    <div className="relative">
      {leading ? (
        <span className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center text-muted-foreground [&>svg]:size-4">
          {leading}
        </span>
      ) : null}
      <Input className={inputClassName} {...props} />
      {trailing ? (
        <span className="absolute inset-y-0 right-1 z-10 flex items-center">
          {trailing}
        </span>
      ) : null}
    </div>
  )
}

export type MoneybagTextareaProps = React.ComponentProps<typeof Textarea> & {
  leading?: ReactNode
  trailing?: ReactNode
}

export function MoneybagTextarea({
  className,
  leading,
  trailing,
  ...props
}: MoneybagTextareaProps) {
  if (!leading && !trailing) {
    return <Textarea className={cn("min-h-24 rounded-md bg-card", className)} {...props} />
  }

  return (
    <InputGroup className="h-auto min-h-24 rounded-md bg-card">
      {leading ? <InputGroupAddon align="block-start">{leading}</InputGroupAddon> : null}
      <InputGroupTextarea className={className} {...props} />
      {trailing ? <InputGroupAddon align="block-end">{trailing}</InputGroupAddon> : null}
    </InputGroup>
  )
}

export type MoneybagSelectOption = {
  disabled?: boolean
  label: ReactNode
  value: string
}

export type MoneybagSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "children" | "defaultValue" | "onValueChange" | "value"
> & {
  className?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  options: readonly MoneybagSelectOption[]
  placeholder?: string
  triggerClassName?: string
  value?: string | null
}

/** A consistent, accessible replacement for native select elements. */
export function MoneybagSelect({
  className,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Select an option",
  triggerClassName,
  value,
  ...props
}: MoneybagSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(nextValue) =>
        onValueChange?.(typeof nextValue === "string" ? nextValue : null)
      }
      value={value}
      {...props}
    >
      <SelectTrigger className={cn("h-10 w-full rounded-md bg-card", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((option) => (
          <SelectItem disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type MoneybagCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  className?: string
  description?: ReactNode
  label: ReactNode
}

export function MoneybagCheckbox({
  className,
  description,
  id,
  label,
  ...props
}: MoneybagCheckboxProps) {
  return (
    <Field className={cn("flex-row items-start gap-3", className)}>
      <Checkbox
        id={id}
        className="size-5 rounded-md border border-input bg-card text-primary-foreground data-checked:bg-primary"
        {...props}
      />
      <FieldContent className="gap-1">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description ? <FieldDescription>{description}</FieldDescription> : null}
      </FieldContent>
    </Field>
  )
}

export type MoneybagSwitchProps = React.ComponentProps<typeof Switch> & {
  className?: string
  description?: ReactNode
  label: ReactNode
}

export function MoneybagSwitch({
  className,
  description,
  id,
  label,
  ...props
}: MoneybagSwitchProps) {
  return (
    <Field className={cn("flex-row-reverse items-start justify-between gap-4 rounded-lg border border-border p-3", className)}>
      <Switch id={id} {...props} />
      <FieldContent className="gap-1">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description ? <FieldDescription>{description}</FieldDescription> : null}
      </FieldContent>
    </Field>
  )
}
