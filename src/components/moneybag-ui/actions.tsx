"use client"

import type { ReactNode } from "react"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>["variant"]>
type ButtonSize = NonNullable<React.ComponentProps<typeof Button>["size"]>

export type MoneybagButtonProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  intent?: "primary" | "secondary" | "danger" | "quiet" | "success"
  loading?: boolean
  size?: ButtonSize
}

const intentVariants: Record<NonNullable<MoneybagButtonProps["intent"]>, ButtonVariant> = {
  primary: "default",
  secondary: "outline",
  danger: "destructive",
  quiet: "ghost",
  success: "default",
}

/** The product action button for shared Moneybag actions. */
export function MoneybagButton({
  children,
  className,
  disabled,
  intent = "primary",
  loading = false,
  size = "default",
  ...props
}: MoneybagButtonProps) {
  return (
    <Button
      className={cn(intent === "success" && "bg-success text-white hover:bg-success/90", className)}
      disabled={disabled || loading}
      size={size}
      variant={intentVariants[intent]}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" data-icon="inline-start" /> : null}
      {children}
    </Button>
  )
}

export type MoneybagStatus = "neutral" | "info" | "success" | "warning" | "danger"
export type MoneybagStatusBadgeProps = {
  children: ReactNode
  className?: string
  status?: MoneybagStatus
}

const statusClasses: Record<MoneybagStatus, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
}

/** Semantic finance/status badge with centralized token colors. */
export function MoneybagStatusBadge({ children, className, status = "neutral" }: MoneybagStatusBadgeProps) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", statusClasses[status], className)}>{children}</span>
}
