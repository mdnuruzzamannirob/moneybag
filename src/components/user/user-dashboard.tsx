import {
  ArrowRight,
  Download,
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'

import {
  CategoryPieChart,
  IncomeExpenseBarChart,
} from '@/components/charts/dashboard-charts'
import { DashboardStatCard } from '@/components/shared/dashboard-stat-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type {
  BudgetSummary,
  SavingsGoalSummary,
  UserDashboardData,
} from '@/types/dashboard-models'

const metricIcons = [WalletCards, TrendingUp, TrendingDown, PiggyBank]

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

function formatCurrency(value: number) {
  return `৳${numberFormatter.format(value)}`
}

export function UserDashboard({ data }: { data: UserDashboardData }) {
  const categoryTotal = data.categories.reduce(
    (total, category) => total + category.value,
    0,
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="mb-1 text-sm font-medium text-primary">
            {data.user.overviewDate}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Good morning, {data.user.firstName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your full financial overview—income, expenses, budgets
            and savings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/reports"
          >
            <Download data-icon="inline-start" />
            Export
          </Link>
          <Link
            className={buttonVariants({ variant: 'default' })}
            href="/transactions"
          >
            <Plus data-icon="inline-start" />
            Add transaction
          </Link>
        </div>
      </header>

      <section
        aria-label="Financial summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {data.metrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? WalletCards
          return (
            <DashboardStatCard icon={Icon} key={metric.id} metric={metric} />
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <DashboardCard
          description="Monthly cash flow comparison"
          title="Income vs expense"
        >
          <IncomeExpenseBarChart dataByYear={data.cashFlowByYear} />
        </DashboardCard>
        <DashboardCard
          action="View all"
          description="This month · by category"
          href="/categories"
          title="Top spending"
        >
          <CategoryPieChart
            centerLabel="Spent"
            centerValue={formatCurrency(categoryTotal)}
            data={data.categories}
            valuePrefix="৳"
          />
        </DashboardCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <DashboardCard
          action="View all"
          description="Your five latest entries"
          href="/transactions"
          title="Recent transactions"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.transactions.map((transaction) => (
              <Link
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/60"
                href="/transactions"
                key={transaction.id}
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-lg text-base"
                  style={{
                    backgroundColor: `${transaction.color}18`,
                    color: transaction.color,
                  }}
                >
                  {transaction.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {transaction.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {transaction.category} · {transaction.wallet} ·{' '}
                    {transaction.date}
                  </span>
                </span>
                <span
                  className={cn(
                    'shrink-0 text-sm font-semibold',
                    transaction.type === 'income'
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          action="Manage"
          description="Monthly category limits"
          href="/budgets"
          title="Budget status"
        >
          <div className="space-y-5 pt-1">
            {data.budgets.map((budget) => (
              <BudgetProgress budget={budget} key={budget.id} />
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        action="View all"
        description="Track progress towards what matters most"
        href="/goals"
        title="Savings goals"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {data.goals.map((goal) => (
            <GoalCard goal={goal} key={goal.id} />
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}

function DashboardCard({
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

function BudgetProgress({ budget }: { budget: BudgetSummary }) {
  const progress = Math.min(100, Math.round((budget.spent / budget.limit) * 100))
  const remaining = Math.max(0, budget.limit - budget.spent)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">
          {budget.icon} {budget.category}
        </span>
        <span className="text-xs text-muted-foreground">
          <strong className="font-semibold text-foreground">
            {formatCurrency(budget.spent)}
          </strong>{' '}
          of {formatCurrency(budget.limit)}
        </span>
      </div>
      <div
        aria-label={`${budget.category} budget ${progress}% used`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
      >
        <div
          className="h-full rounded-full"
          style={{ backgroundColor: budget.color, width: `${progress}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
        <span>{progress}% spent</span>
        <span>{formatCurrency(remaining)} left</span>
      </div>
    </div>
  )
}

function GoalCard({ goal }: { goal: SavingsGoalSummary }) {
  const progress = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
  )
  const complete = progress === 100

  return (
    <div className="rounded-lg border border-border bg-muted/35 p-4">
      <div className="flex items-center justify-between">
        <span
          className="grid size-10 place-items-center rounded-lg text-lg"
          style={{ backgroundColor: `${goal.color}18` }}
        >
          {goal.icon}
        </span>
        <span
          className={cn(
            'rounded-full px-2 py-1 text-xs font-semibold',
            complete
              ? 'bg-success-soft text-success'
              : 'bg-primary/10 text-primary',
          )}
        >
          {complete ? 'Completed' : `${progress}%`}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold">{goal.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatCurrency(goal.currentAmount)} of{' '}
        {formatCurrency(goal.targetAmount)}
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-card">
        <div
          className="h-full rounded-full"
          style={{ backgroundColor: goal.color, width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Target · {goal.deadline}
      </p>
    </div>
  )
}
