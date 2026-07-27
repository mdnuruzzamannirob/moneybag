"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  CheckboxField as AuthCheckboxField,
  FieldErrorMessage,
  PasswordField as AuthPasswordField,
  TextField as AuthTextField,
} from "@/components/ui/FormControls"
import { cn } from "@/lib/utils"

export { AuthCheckboxField, AuthPasswordField, AuthTextField, FieldErrorMessage }

const authButtonClassName =
  "h-10 w-full rounded-md border-primary bg-clip-border text-sm font-semibold shadow-sm hover:border-primary"

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-medium tracking-normal text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <Button className={authButtonClassName} size="lg" type="submit">
      {children}
    </Button>
  )
}

export function AuthButtonLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/80",
        authButtonClassName,
      )}
      href={href}
    >
      {children}
    </Link>
  )
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
      OR
    </div>
  )
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button className="h-9 rounded-md bg-clip-border text-sm" type="button" variant="outline">
        <GoogleIcon />
        Google
      </Button>
      <Button className="h-9 rounded-md bg-clip-border text-sm" type="button" variant="outline">
        <GitHubIcon />
        GitHub
      </Button>
    </div>
  )
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 text-center text-sm text-muted-foreground">{children}</div>
}

export function AuthLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className="font-medium text-primary hover:underline" href={href}>
      {children}
    </Link>
  )
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

