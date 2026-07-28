import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  Server,
  UserMinus,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import {
  CategoryPieChart,
  DailyTrendLineChart,
} from '@/components/charts/dashboard-charts'
import { DashboardStatCard } from '@/components/shared/dashboard-stat-card'
import { buttonVariants } from '@/components/ui/button'
import type {
  AdminActivityItem,
  AdminDashboardData,
} from '@/types/dashboard-models'

const metricIcons = [Users, BadgeDollarSign, Activity, UserMinus]
const currencyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  const userTotal = data.plans.reduce((total, plan) => total + plan.value, 0)

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            Tuesday, July 28, 2026
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Admin dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor MoneyBag growth, subscriptions and system health.
          </p>
        </div>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href="/admin/reports"
        >
          Open full report
        </Link>
      </header>

      <section
        aria-label="Platform metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {data.metrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? Activity
          return (
            <DashboardStatCard
              icon={Icon}
              key={metric.id}
              metric={metric}
            />
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <AdminCard
          description="New registrations · last 12 months"
          title="User growth"
        >
          <DailyTrendLineChart dataByYear={data.userGrowthByYear} />
        </AdminCard>
        <AdminCard
          action="View plans"
          description="Current subscriber mix"
          href="/admin/plans"
          title="Plan distribution"
        >
          <CategoryPieChart
            centerLabel="Users"
            centerValue={currencyFormatter.format(userTotal)}
            data={data.plans}
          />
        </AdminCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ActivityCard
          action="View all"
          description="Newest members joining MoneyBag"
          href="/admin/users"
          items={data.recentSignups}
          title="Recent signups"
        />
        <ActivityCard
          action="Subscriptions"
          description="Latest successful payments"
          href="/admin/subscriptions"
          items={data.recentPayments}
          title="Recent payments"
        />
      </section>

      <AdminCard
        action="Open health monitor"
        description="Live status of platform dependencies"
        href="/admin/system-health"
        title="System health"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.services.map((service) => (
            <div
              className="rounded-lg border border-border bg-muted/35 p-4"
              key={service.id}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-success-soft text-success">
                  <Server className="size-4" />
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold capitalize text-success">
                  <i className="size-1.5 rounded-full bg-success" />
                  {service.status}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold">{service.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {service.detail}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}

function AdminCard({
  title,
  description,
  href,
  action,
  children,
}: {
  title: string
  description: string
  href?: string
  action?: string
  children: React.ReactNode
}) {
  return (
    <article className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {href && action ? (
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            href={href}
          >
            {action}
            <ArrowRight data-icon="inline-end" />
          </Link>
        ) : null}
      </div>
      {children}
    </article>
  )
}

function ActivityCard({
  title,
  description,
  href,
  action,
  items,
}: {
  title: string
  description: string
  href: string
  action: string
  items: AdminActivityItem[]
}) {
  return (
    <AdminCard
      action={action}
      description={description}
      href={href}
      title={title}
    >
      <div className="-mx-5 -mb-5 divide-y divide-border">
        {items.map((item) => (
          <div className="flex items-center gap-3 px-5 py-3.5" key={item.id}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {item.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {item.name}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {item.meta} · {item.timestamp}
              </span>
            </span>
            {item.amount ? (
              <span className="shrink-0 text-sm font-semibold text-success">
                +৳{currencyFormatter.format(item.amount)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </AdminCard>
  )
}
