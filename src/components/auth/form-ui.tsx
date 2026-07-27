"use client"

import type { InputHTMLAttributes, ReactNode } from "react"
import { useMemo, useState } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-normal text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

export function AuthTextField({
  error,
  icon,
  label,
  registration,
  type = "text",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  error?: FieldError
  icon: ReactNode
  label: string
  registration: UseFormRegisterReturn
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={props.id}>
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
        <input
          {...props}
          {...registration}
          type={type}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          )}
        />
      </div>
      <FieldErrorMessage error={error} />
    </div>
  )
}

export function AuthPasswordField({
  error,
  label,
  registration,
  showStrength = false,
  watchValue = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> & {
  error?: FieldError
  label?: string
  registration: UseFormRegisterReturn
  showStrength?: boolean
  watchValue?: string
}) {
  const [visible, setVisible] = useState(false)
  const score = usePasswordScore(watchValue)
  const strength = score <= 1 ? "bg-destructive" : score === 2 ? "bg-warning" : "bg-success"
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"]

  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-sm font-medium text-foreground" htmlFor={props.id}>
          {label}
        </label>
      ) : null}
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
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-card pl-10 pr-11 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          )}
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
      <FieldErrorMessage error={error} />
    </div>
  )
}

export function AuthCheckboxField({
  children,
  error,
  registration,
}: {
  children: ReactNode
  error?: FieldError
  registration: UseFormRegisterReturn
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 text-sm text-foreground">
        <input className="peer sr-only" type="checkbox" {...registration} />
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-input bg-card text-transparent transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
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

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <Button className="h-11 w-full rounded-md text-sm font-semibold shadow-sm" size="lg" type="submit">
      {children}
    </Button>
  )
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
      OR
    </div>
  )
}

export function SocialButtons({ label }: { label: "sign in" | "sign up" }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button className="h-10 rounded-md" type="button" variant="outline">
        <GoogleIcon />
        Google
      </Button>
      <Button className="h-10 rounded-md" type="button" variant="outline">
        <GitHubIcon />
        GitHub
      </Button>
      <span className="sr-only">Social {label} options</span>
    </div>
  )
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 text-center text-sm text-muted-foreground">{children}</div>
}

export function AuthLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className="font-medium text-primary underline-offset-4 hover:underline" href={href}>
      {children}
    </a>
  )
}

export function FieldErrorMessage({ error }: { error?: FieldError }) {
  if (!error?.message) return null
  return <p className="text-xs text-destructive">{error.message}</p>
}

function GitHubIcon() {
  return (
    <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.46 11.46 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
function GoogleIcon() {
  return (
    <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
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



