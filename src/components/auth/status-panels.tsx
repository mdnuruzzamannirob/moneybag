import Link from "next/link"
import type { ReactNode } from "react"
import { LoaderCircle, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

export function AuthCallbackPanel() {
  return (
    <AuthStatusPanel
      description="We are verifying your provider response and preparing your workspace."
      icon={<LoaderCircle className="size-6 animate-spin" aria-hidden="true" />}
      tone="info"
      title="Finishing sign in"
    >
      <div className="rounded-md border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">OAuth callback</div>
        <div className="mt-1 text-xs text-muted-foreground">
          This usually takes just a moment.
        </div>
      </div>
    </AuthStatusPanel>
  )
}

export function AuthErrorPanel() {
  return (
    <AuthStatusPanel
      description="The authentication request could not be completed. Please try again or choose another sign-in method."
      icon={<TriangleAlert className="size-6" aria-hidden="true" />}
      tone="danger"
      title="Sign in failed"
    >
      <Link
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/80"
        href="/login"
      >
        Try again
      </Link>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Need help?{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/contact">
          Contact support
        </Link>
      </div>
    </AuthStatusPanel>
  )
}

function AuthStatusPanel({
  children,
  description,
  icon,
  title,
  tone,
}: {
  children: ReactNode
  description: string
  icon: ReactNode
  title: string
  tone: "info" | "danger"
}) {
  return (
    <>
      <div
        className={cn(
          "mb-5 grid size-12 place-items-center rounded-md",
          tone === "info" ? "bg-info-soft text-info" : "bg-danger-soft text-destructive",
        )}
      >
        {icon}
      </div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-normal text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </>
  )
}

