import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
export function AppStatCard({
  change,
  icon,
  label,
  tone = 'primary',
  value,
}: {
  change?: ReactNode
  icon: ReactNode
  label: ReactNode
  tone?: 'primary' | 'success' | 'warning' | 'danger'
  value: ReactNode
}) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'grid size-10 place-items-center rounded-lg [&>svg]:size-5',
            {
              primary: 'bg-primary/10 text-primary',
              success: 'bg-success-soft text-success',
              warning: 'bg-warning-soft text-warning',
              danger: 'bg-danger-soft text-danger',
            }[tone],
          )}
        >
          {icon}
        </span>
        {change ? (
          <span className="text-xs font-medium text-muted-foreground">
            {change}
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </article>
  )
}
