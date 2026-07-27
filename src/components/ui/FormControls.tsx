"use client"

import type { InputHTMLAttributes, ReactNode } from "react"
import { useMemo, useState } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { Eye } from "lucide-react"

import { cn } from "@/lib/utils"

const fieldClassName = "space-y-2"
const inputClassName =
  "h-10 w-full rounded-md border border-input bg-card text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20"
const invalidInputClassName =
  "border-destructive focus:border-destructive focus:ring-destructive/20"

type BaseFieldProps = {
  error?: FieldError
  label?: string
  labelAction?: ReactNode
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> &
  BaseFieldProps & {
    icon?: ReactNode
    registration: UseFormRegisterReturn
  }

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> &
  BaseFieldProps & {
    registration: UseFormRegisterReturn
    showStrength?: boolean
    watchValue?: string
  }

export function TextField({
  error,
  icon,
  label,
  labelAction,
  registration,
  type = "text",
  ...props
}: TextFieldProps) {
  return (
    <FieldWrapper error={error} id={props.id} label={label} labelAction={labelAction}>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
        <input
          {...props}
          {...registration}
          aria-invalid={Boolean(error)}
          className={cn(inputClassName, icon ? "pl-10" : "pl-3", "pr-3", error && invalidInputClassName)}
          type={type}
        />
      </div>
    </FieldWrapper>
  )
}

export function PasswordField({
  error,
  label,
  labelAction,
  registration,
  showStrength = false,
  watchValue = "",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const score = usePasswordScore(watchValue)
  const strength = score <= 1 ? "bg-destructive" : score === 2 ? "bg-warning" : "bg-success"
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"]

  return (
    <FieldWrapper error={error} id={props.id} label={label} labelAction={labelAction}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <input
          {...props}
          {...registration}
          aria-invalid={Boolean(error)}
          className={cn(inputClassName, "pl-10 pr-11", error && invalidInputClassName)}
          type={visible ? "text" : "password"}
        />
        <button
          aria-label={visible ? "Hide password" : "Show password"}
          className={cn(
            "absolute right-3 top-1/2 grid size-5 -translate-y-1/2 place-items-center text-muted-foreground transition-colors hover:text-foreground",
            visible && "text-primary",
          )}
          type="button"
          onClick={() => setVisible((current) => !current)}
        >
          <Eye className="size-4" aria-hidden="true" />
        </button>
      </div>
      {showStrength ? (
        <>
          <div className="grid grid-cols-4 gap-1" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <div
                className={cn(
                  "h-1 rounded-full bg-muted transition-colors",
                  index < score && strength,
                )}
                key={index}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {watchValue.length === 0
              ? "Use 8+ characters with letters, numbers & symbols"
              : `Strength: ${labels[score]}`}
          </p>
        </>
      ) : null}
    </FieldWrapper>
  )
}

export function CheckboxField({
  children,
  error,
  registration,
}: {
  children: ReactNode
  error?: FieldError
  registration: UseFormRegisterReturn
}) {
  return (
    <div className={fieldClassName}>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
        <input className="peer sr-only" type="checkbox" {...registration} />
        <span className="grid size-5 shrink-0 place-items-center rounded border border-input bg-card text-transparent transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      <FieldErrorMessage error={error} />
    </div>
  )
}

export function FieldErrorMessage({ error }: { error?: FieldError }) {
  if (!error?.message) return null
  return <p className="text-xs text-destructive">{error.message}</p>
}

function FieldWrapper({
  children,
  error,
  id,
  label,
  labelAction,
}: {
  children: ReactNode
  error?: FieldError
  id?: string
  label?: string
  labelAction?: ReactNode
}) {
  return (
    <div className={fieldClassName}>
      {label ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="font-medium text-foreground" htmlFor={id}>
            {label}
          </label>
          {labelAction}
        </div>
      ) : null}
      {children}
      <FieldErrorMessage error={error} />
    </div>
  )
}

function usePasswordScore(password: string) {
  return useMemo(() => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }, [password])
}

