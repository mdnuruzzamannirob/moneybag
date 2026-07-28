import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { DashboardMetric, MetricTone } from '@/types/dashboard-models'

const toneClasses: Record<MetricTone, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  accent: 'bg-brand-accent-soft text-brand-accent',
}

export function DashboardStatCard({
  metric,
  icon: Icon,
}: {
  metric: DashboardMetric
  icon: LucideIcon
}) {
  const TrendIcon =
    metric.direction === 'up'
      ? ArrowUpRight
      : metric.direction === 'down'
        ? ArrowDownRight
        : Minus
  const isPositive = metric.direction === 'up' || metric.id === 'churn'

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
      <div
        aria-hidden="true"
        className={cn(
          'absolute -right-8 -top-8 size-28 rounded-full opacity-50 blur-2xl',
          toneClasses[metric.tone].split(' ')[0],
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            'grid size-11 shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-black/5 transition-transform group-hover:scale-105',
            toneClasses[metric.tone],
          )}
        >
          <Icon className="size-5" />
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold',
            isPositive
              ? 'bg-success-soft text-success'
              : 'bg-danger-soft text-danger',
          )}
        >
          <TrendIcon className="size-3" />
          {metric.change.split(' ')[0]}
        </span>
      </div>
      <div className="relative mt-5">
        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
        <p className="mt-1 text-[1.75rem] font-semibold leading-none tracking-tight text-foreground">
          {metric.value}
        </p>
      </div>
      <div className="relative mt-5 h-px bg-border" />
      <p className="relative mt-3 text-xs text-muted-foreground">
        Compared with the previous period
      </p>
    </article>
  )
}
