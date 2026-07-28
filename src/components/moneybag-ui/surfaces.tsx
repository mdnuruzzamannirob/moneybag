import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type MoneybagCardProps = HTMLAttributes<HTMLElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }

/** Standard surface for dashboard cards, panels, and data-table shells. */
export function MoneybagCard({
  className,
  padding = 'md',
  ...props
}: MoneybagCardProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-border bg-card shadow-xs',
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  )
}

export type MoneybagPageHeaderProps = {
  actions?: ReactNode
  className?: string
  description?: ReactNode
  title: ReactNode
}

/** Responsive title/action layout shared by dashboard and admin pages. */
export function MoneybagPageHeader({
  actions,
  className,
  description,
  title,
}: MoneybagPageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col justify-between gap-4 sm:flex-row sm:items-start',
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  )
}

export type MoneybagEmptyStateProps = {
  action?: ReactNode
  className?: string
  description?: ReactNode
  icon?: ReactNode
  title: ReactNode
}

/** Empty result treatment for tables, lists, and standalone feature pages. */
export function MoneybagEmptyState({
  action,
  className,
  description,
  icon,
  title,
}: MoneybagEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className,
      )}
    >
      {icon ? (
        <span className="mb-3 grid size-10 place-items-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
