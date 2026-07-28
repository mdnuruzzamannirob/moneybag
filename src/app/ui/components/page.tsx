'use client'

import {
  AppAlert,
  AppAvatar,
  AppBadge,
  AppBreadcrumb,
  AppButton,
  AppCard,
  AppCardSkeleton,
  AppCheckbox,
  AppCombobox,
  AppConfirmDialog,
  AppCurrencyInput,
  AppDatePicker,
  AppDateRangePicker,
  AppDropdownMenu,
  AppEmptyState,
  AppField,
  AppFileUpload,
  AppInput,
  AppKbd,
  AppModal,
  AppMultiSelect,
  AppNumberInput,
  AppPageHeader,
  AppPagination,
  AppPopover,
  AppProgress,
  AppRadioGroup,
  AppRangeSlider,
  AppSegmentedControl,
  AppSelect,
  AppSheet,
  AppSkeleton,
  AppStatCard,
  AppSwitch,
  AppTable,
  AppTabs,
  AppTextarea,
  AppTimePicker,
  AppTooltip,
} from '@/components/app-ui'
import { cn } from '@/lib/utils'
import {
  ArrowUpRight,
  Bell,
  Car,
  Check,
  CreditCard,
  Edit3,
  Eye,
  LayoutGrid,
  List,
  Mail,
  MoreHorizontal,
  ReceiptText,
  Search,
  ShoppingBasket,
  SlidersHorizontal,
  Trash2,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'

const tabs = [
  'Overview',
  'Actions',
  'Forms',
  'Selection',
  'Data & feedback',
  'Overlays',
] as const
type CatalogueTab = (typeof tabs)[number]
const options = [
  {
    description: 'Groceries, restaurants and delivery',
    icon: <ShoppingBasket />,
    label: 'Food & dining',
    value: 'food',
  },
  {
    description: 'Fuel, rides and public transport',
    icon: <Car />,
    label: 'Transport',
    value: 'transport',
  },
  {
    description: 'Utilities and subscriptions',
    icon: <CreditCard />,
    label: 'Bills & payments',
    value: 'bills',
  },
]
const rows = [
  {
    amount: '-৳2,450',
    category: 'Food',
    date: '28 Jul',
    id: 1,
    title: 'Agora grocery',
  },
  {
    amount: '+৳85,000',
    category: 'Salary',
    date: '27 Jul',
    id: 2,
    title: 'Monthly salary',
  },
  {
    amount: '-৳1,840',
    category: 'Bills',
    date: '25 Jul',
    id: 3,
    title: 'Electricity bill',
  },
]

export default function UiComponentsPage() {
  const [active, setActive] = useState<CatalogueTab>('Overview')
  const [modal, setModal] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [multi, setMulti] = useState<string[]>(['food', 'transport'])
  const [page, setPage] = useState(2)
  const [number, setNumber] = useState(3)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-375 items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary font-semibold text-primary-foreground">
              UI
            </span>
            <div>
              <p className="text-sm font-semibold">Moneybag Design System</p>
              <p className="text-xs text-muted-foreground">
                Components · Patterns · States
              </p>
            </div>
          </div>
          <AppBadge status="success">36 components</AppBadge>
        </div>
      </header>
      <main className="mx-auto max-w-375 px-5 py-8 lg:px-8 lg:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="sticky top-20 z-40 overflow-x-auto lg:border-r lg:border-border lg:pr-7 lg:overflow-visible">
            <p className="mb-3 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:block">
              Components
            </p>
            <nav className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
              {tabs.map((tab) => (
                <button
                  className={cn(
                    'flex h-10 items-center rounded-md px-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:w-full',
                    active === tab &&
                      'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
                  )}
                  key={tab}
                  onClick={() => setActive(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            {active === 'Overview' ? <OverviewTab /> : null}
            {active === 'Actions' ? <ActionsTab /> : null}
            {active === 'Forms' ? (
              <FormsTab
                multi={multi}
                number={number}
                setMulti={setMulti}
                setNumber={setNumber}
              />
            ) : null}
            {active === 'Selection' ? <SelectionTab /> : null}
            {active === 'Data & feedback' ? (
              <DataTab page={page} setPage={setPage} />
            ) : null}
            {active === 'Overlays' ? (
              <OverlaysTab
                openConfirm={() => setConfirm(true)}
                openModal={() => setModal(true)}
                openSheet={() => setSheet(true)}
              />
            ) : null}
          </div>
        </div>
      </main>
      <AppModal
        description="A production form using shared App UI controls."
        footer={
          <>
            <AppButton onClick={() => setModal(false)} tone="secondary">
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(false)}>
              Save transaction
            </AppButton>
          </>
        }
        onOpenChange={setModal}
        open={modal}
        title="Add transaction"
      >
        <div className="space-y-4">
          <AppField label="Title">
            <AppInput placeholder="Transaction title" />
          </AppField>
          <AppField label="Category">
            <AppSelect options={options} />
          </AppField>
          <AppDatePicker />
        </div>
      </AppModal>
      <AppSheet
        description="Responsive filters and secondary workflows."
        footer={
          <AppButton onClick={() => setSheet(false)}>Apply filters</AppButton>
        }
        onOpenChange={setSheet}
        open={sheet}
        title="Advanced filters"
      >
        <div className="space-y-4">
          <AppInput leading={<Search />} placeholder="Search" />
          <AppDateRangePicker />
          <AppSwitch defaultChecked label="Only recurring" />
        </div>
      </AppSheet>
      <AppConfirmDialog
        description="This transaction will be permanently removed."
        onConfirm={() => setConfirm(false)}
        onOpenChange={setConfirm}
        open={confirm}
        title="Delete transaction?"
      />
    </>
  )
}

function OverviewTab() {
  return (
    <TabLayout
      title="Overview"
      description="Foundations, surfaces and the full component inventory."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          change="+8.2%"
          icon={<WalletCards />}
          label="Balance"
          value="৳128,450"
        />
        <AppStatCard
          icon={<TrendingUp />}
          label="Income"
          tone="success"
          value="৳103,200"
        />
        <AppStatCard
          icon={<TrendingDown />}
          label="Expenses"
          tone="danger"
          value="৳24,870"
        />
        <AppStatCard
          change={<ArrowUpRight className="size-4" />}
          icon={<ReceiptText />}
          label="Budget used"
          tone="warning"
          value="68%"
        />
      </div>
      <Panel title="Scale and identity">
        <Row label="Badges">
          <AppBadge size="sm">Small</AppBadge>
          <AppBadge size="md" status="info">
            Medium
          </AppBadge>
          <AppBadge size="lg" status="success">
            Large status
          </AppBadge>
          <AppBadge status="warning">Warning</AppBadge>
          <AppBadge status="danger">Danger</AppBadge>
        </Row>
        <Row label="Avatars">
          <AppAvatar alt="User" fallback="MH" size="sm" />
          <AppAvatar alt="User" fallback="MH" size="md" />
          <AppAvatar alt="User" fallback="MH" size="lg" />
          <AppAvatar alt="User" fallback="MH" size="xl" />
        </Row>
      </Panel>
      <Panel title="Card spacing">
        <div className="grid gap-4 md:grid-cols-3">
          <AppCard padding="sm">Compact card</AppCard>
          <AppCard>Default card</AppCard>
          <AppCard padding="lg">Comfortable card</AppCard>
        </div>
      </Panel>
      <Panel title="Page structure">
        <AppPageHeader
          breadcrumb={
            <AppBreadcrumb
              items={[
                { label: 'Transactions', href: '/transactions' },
                { label: 'Details' },
              ]}
            />
          }
          description="Reusable breadcrumb, title, description and action alignment."
          title="Transaction details"
          actions={<AppButton size="sm">Edit</AppButton>}
        />
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          Keyboard shortcut <AppKbd>?</AppKbd>
          <AppKbd>K</AppKbd>
        </div>
      </Panel>
    </TabLayout>
  )
}

function ActionsTab() {
  return (
    <TabLayout
      title="Actions"
      description="Hierarchy, sizes, semantic intent and contextual actions."
    >
      <Panel title="Button sizes">
        <Row label="Small to large">
          <AppButton size="sm">Small</AppButton>
          <AppButton>Default</AppButton>
          <AppButton size="lg">Large action</AppButton>
          <AppButton size="icon">
            <Bell />
          </AppButton>
        </Row>
      </Panel>
      <Panel title="Intent and states">
        <Row label="All states">
          <AppButton>Primary</AppButton>
          <AppButton tone="secondary">Secondary</AppButton>
          <AppButton tone="success">
            <Check />
            Success
          </AppButton>
          <AppButton tone="danger">
            <Trash2 />
            Delete
          </AppButton>
          <AppButton loading>Saving</AppButton>
          <AppButton disabled>Disabled</AppButton>
        </Row>
      </Panel>
      <Panel title="Context actions">
        <Row label="Menus and helpers">
          <AppDropdownMenu
            items={[
              { icon: <Edit3 />, label: 'Edit' },
              {
                icon: <Trash2 />,
                label: 'Delete',
                separatorBefore: true,
                variant: 'destructive',
              },
            ]}
            trigger={
              <AppButton size="icon" tone="secondary">
                <MoreHorizontal />
              </AppButton>
            }
          />
          <AppTooltip content="Notification settings">
            <AppButton size="icon" tone="secondary">
              <Bell />
            </AppButton>
          </AppTooltip>
          <AppPopover
            title="Quick filters"
            trigger={
              <AppButton tone="secondary">
                <SlidersHorizontal />
                Popover
              </AppButton>
            }
          >
            <AppCheckbox label="Only expenses" />
          </AppPopover>
        </Row>
      </Panel>
    </TabLayout>
  )
}

function FormsTab({
  multi,
  number,
  setMulti,
  setNumber,
}: {
  multi: string[]
  number: number
  setMulti: (value: string[]) => void
  setNumber: (value: number) => void
}) {
  return (
    <TabLayout
      title="Forms"
      description="Text, selection, date, upload and numeric controls with matched dimensions."
    >
      <Panel title="Input states">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AppField label="Default">
            <AppInput placeholder="Transaction title" />
          </AppField>
          <AppField label="Leading icon">
            <AppInput leading={<Mail />} placeholder="Email address" />
          </AppField>
          <AppField label="Trailing action">
            <AppInput
              trailing={<Eye className="size-4" />}
              type="password"
              value="password"
              readOnly
            />
          </AppField>
          <AppField error="Enter a valid amount" label="Invalid">
            <AppInput aria-invalid value="-20" readOnly />
          </AppField>
          <AppField label="Disabled">
            <AppInput disabled value="Read only value" />
          </AppField>
          <AppField label="Search">
            <AppInput leading={<Search />} placeholder="Search transactions" />
          </AppField>
        </div>
      </Panel>
      <Panel title="Select and date controls">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AppField label="Select">
            <AppSelect options={options} />
          </AppField>
          <AppField label="Multi select">
            <AppMultiSelect
              onValueChange={setMulti}
              options={options}
              value={multi}
            />
          </AppField>
          <AppField label="Single date">
            <AppDatePicker />
          </AppField>
          <AppField label="Date range">
            <AppDateRangePicker />
          </AppField>
        </div>
      </Panel>
      <Panel title="Additional controls">
        <div className="grid gap-5 lg:grid-cols-3">
          <AppField label="Textarea">
            <AppTextarea placeholder="Optional note" />
          </AppField>
          <AppRangeSlider defaultValue={75} label="Budget alert" suffix="%" />
          <AppNumberInput
            label="Installments"
            max={12}
            onValueChange={setNumber}
            value={number}
          />
          <AppField label="Currency">
            <AppCurrencyInput placeholder="0.00" />
          </AppField>
          <AppField label="Time">
            <AppTimePicker />
          </AppField>
          <AppField label="Searchable combobox">
            <AppCombobox options={options} />
          </AppField>
        </div>
        <div className="mt-5">
          <AppFileUpload
            accept=".csv"
            description="CSV up to 10 MB"
            label="Import transactions"
          />
        </div>
      </Panel>
    </TabLayout>
  )
}

function SelectionTab() {
  return (
    <TabLayout
      title="Selection"
      description="Binary, single-choice and view-selection patterns."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Checkbox">
          <div className="space-y-4">
            <AppCheckbox label="Unchecked" />
            <AppCheckbox defaultChecked label="Checked" />
            <AppCheckbox disabled label="Disabled" />
          </div>
        </Panel>
        <Panel title="Switch sizes">
          <div className="space-y-3">
            <AppSwitch label="Small" size="sm" />
            <AppSwitch defaultChecked label="Medium active" />
            <AppSwitch defaultChecked label="Large active" size="lg" />
          </div>
        </Panel>
        <Panel title="Radio group">
          <AppRadioGroup
            defaultValue="monthly"
            options={[
              {
                description: 'Recommended',
                label: 'Monthly',
                value: 'monthly',
              },
              { label: 'Weekly', value: 'weekly' },
            ]}
          />
        </Panel>
        <Panel title="Segmented control">
          <AppSegmentedControl
            options={[
              { icon: <LayoutGrid />, label: 'Grid', value: 'grid' },
              { icon: <List />, label: 'List', value: 'list' },
            ]}
            value="grid"
          />
        </Panel>
      </div>
      <Panel title="Tabs">
        <AppTabs
          items={[
            {
              content: (
                <p className="text-sm text-muted-foreground">
                  Overview content
                </p>
              ),
              label: 'Overview',
              value: 'overview',
            },
            {
              content: (
                <p className="text-sm text-muted-foreground">
                  Activity content
                </p>
              ),
              label: 'Activity',
              value: 'activity',
            },
            {
              content: (
                <p className="text-sm text-muted-foreground">
                  Settings content
                </p>
              ),
              label: 'Settings',
              value: 'settings',
            },
          ]}
        />
      </Panel>
    </TabLayout>
  )
}

function DataTab({
  page,
  setPage,
}: {
  page: number
  setPage: (page: number) => void
}) {
  return (
    <TabLayout
      title="Data & feedback"
      description="Status communication, metrics, tables, progress, loading and empty states."
    >
      <Panel title="Alerts">
        <div className="grid gap-3 md:grid-cols-2">
          <AppAlert title="Report ready">Download is available.</AppAlert>
          <AppAlert title="Payment received" tone="success">
            Balance updated.
          </AppAlert>
          <AppAlert title="Budget warning" tone="warning">
            85% used.
          </AppAlert>
          <AppAlert title="Payment failed" tone="danger">
            Try again.
          </AppAlert>
        </div>
      </Panel>
      <Panel title="Progress">
        <div className="grid gap-5 md:grid-cols-2">
          <AppProgress label="Monthly budget" tone="warning" value={68} />
          <AppProgress label="Savings goal" tone="success" value={84} />
        </div>
      </Panel>
      <Panel title="Table and pagination">
        <AppTable
          columns={[
            {
              header: 'Transaction',
              key: 'title',
              render: (row: (typeof rows)[number]) => (
                <span className="font-medium">{row.title}</span>
              ),
            },
            {
              header: 'Category',
              key: 'category',
              render: (row) => <AppBadge>{row.category}</AppBadge>,
            },
            { header: 'Date', key: 'date', render: (row) => row.date },
            {
              align: 'right',
              header: 'Amount',
              key: 'amount',
              render: (row) => row.amount,
            },
          ]}
          getRowKey={(row) => row.id}
          rows={rows}
        />
        <div className="mt-5 flex justify-end">
          <AppPagination onPageChange={setPage} page={page} totalPages={8} />
        </div>
      </Panel>
      <Panel title="Loading and empty">
        <div className="grid gap-4 md:grid-cols-3">
          <AppCard>
            <AppSkeleton className="h-4 w-1/3" />
            <AppSkeleton className="mt-4 h-9 w-1/2" />
          </AppCard>
          <AppCardSkeleton />
          <AppCard padding="none">
            <AppEmptyState
              action={<AppButton tone="secondary">Create wallet</AppButton>}
              icon={<WalletCards />}
              title="No wallets"
            />
          </AppCard>
        </div>
      </Panel>
    </TabLayout>
  )
}

function OverlaysTab({
  openConfirm,
  openModal,
  openSheet,
}: {
  openConfirm: () => void
  openModal: () => void
  openSheet: () => void
}) {
  return (
    <TabLayout
      title="Overlays"
      description="Layered workflows for forms, filters and destructive confirmation."
    >
      <Panel title="Interactive examples">
        <div className="grid gap-4 md:grid-cols-3">
          <DemoCard
            description="Structured header, scrollable body and deep footer."
            label="Modal"
          >
            <AppButton onClick={openModal}>Open modal</AppButton>
          </DemoCard>
          <DemoCard
            description="Responsive side panel for filters and mobile forms."
            label="Sheet"
          >
            <AppButton onClick={openSheet} tone="secondary">
              Open sheet
            </AppButton>
          </DemoCard>
          <DemoCard
            description="Focused confirmation for destructive actions."
            label="Confirm dialog"
          >
            <AppButton onClick={openConfirm} tone="danger">
              Delete item
            </AppButton>
          </DemoCard>
        </div>
      </Panel>
    </TabLayout>
  )
}

function TabLayout({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <section>
      <div className="mb-7">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}
function Panel({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h3 className="mb-5 text-base font-semibold">{title}</h3>
      {children}
    </section>
  )
}
function Row({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
function DemoCard({
  children,
  description,
  label,
}: {
  children: React.ReactNode
  description: string
  label: string
}) {
  return (
    <div className="rounded-lg border border-border p-5">
      <p className="font-medium">{label}</p>
      <p className="mt-1 min-h-10 text-sm text-muted-foreground">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  )
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-4 py-3 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
