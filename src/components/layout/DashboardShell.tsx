'use client'

import {
  BarChart3,
  Bell,
  CircleDollarSign,
  ChevronRight,
  FileText,
  Gauge,
  Grid2X2,
  HelpCircle,
  History,
  LogOut,
  Menu,
  Moon,
  Plus,
  ReceiptText,
  Search,
  Settings,
  Shield,
  Sun,
  Tags,
  Target,
  Ticket,
  UserCog,
  Users,
  WalletCards,
  X,
  Megaphone,
  CreditCard,
  Database,
  Languages,
  LockKeyhole,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: string
}

type NavSection = {
  label: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Overview', icon: Grid2X2 },
      { href: '/transactions', label: 'Transactions', icon: ReceiptText, count: '20' },
      { href: '/budgets', label: 'Budgets', icon: Target },
      { href: '/goals', label: 'Savings Goals', icon: CircleDollarSign },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/categories', label: 'Categories', icon: Tags },
      { href: '/wallets', label: 'Wallets', icon: WalletCards },
      { href: '/family', label: 'Family', icon: Users },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/reports', label: 'Reports', icon: FileText },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/help', label: 'Help Center', icon: HelpCircle },
    ],
  },
]

const adminNavSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: Gauge },
      { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
      { href: '/admin/logs', label: 'Logs', icon: History },
      { href: '/admin/system-health', label: 'System Health', icon: Shield },
    ],
  },
  {
    label: 'People',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/team', label: 'Team', icon: Users },
      { href: '/admin/tickets', label: 'Tickets', icon: Ticket },
    ],
  },
  {
    label: 'Business',
    items: [
      { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { href: '/admin/categories', label: 'Categories', icon: Tags },
      { href: '/admin/plans', label: 'Plans', icon: CircleDollarSign },
      { href: '/admin/subscriptions', label: 'Subscriptions', icon: WalletCards },
      { href: '/admin/coupons', label: 'Coupons', icon: CreditCard },
      { href: '/admin/email-templates', label: 'Email Templates', icon: FileText },
    ],
  },
  {
    label: 'Settings',
    items: [{ href: '/admin/settings', label: 'Settings', icon: Settings }],
  },

]

function MailIcon({ className }: { className?: string }) {
  return <ReceiptText className={className} />
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const sections = isAdmin ? adminNavSections : navSections

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-65 flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar sections={sections} onNavigate={() => setOpen(false)} />
      </aside>

      <div className="lg:pl-65">
        <Topbar onMenuClick={() => setOpen(true)} showAddButton={!isAdmin} />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function Sidebar({ sections, onNavigate }: { sections: NavSection[]; onNavigate: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <Link
          className="flex min-w-0 items-center gap-3"
          href={pathname.startsWith('/admin') ? '/admin' : '/dashboard'}
          onClick={onNavigate}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-linear-to-br from-primary to-brand-accent text-sm font-extrabold text-white shadow-md">
            F
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold leading-5 text-foreground">
              MoneyBag
            </span>
            <span className="block truncate text-xs leading-4 text-muted-foreground">
              Personal / BDT
            </span>
          </span>
        </Link>
        <button
          className="ml-auto grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={onNavigate}
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-md border border-border bg-muted pl-8 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
            placeholder="Search..."
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-card px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
            /K
          </kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {sections.map((section) => (
          <div className="mb-5" key={section.label}>
            <div className="mb-2 px-3 text-[11px] font-medium uppercase text-muted-foreground/70">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <Link
                    className={cn(
                      'flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={onNavigate}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.count ? (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-semibold leading-none',
                          active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                        )}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-border p-4">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
          AT
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">Anika Tahsin</div>
          <div className="truncate text-xs text-muted-foreground">anika@moneybag.app</div>
        </div>
        <button className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted">
          <Settings className="size-4" />
        </button>
      </div>
    </>
  )
}

function Topbar({
  onMenuClick,
  showAddButton,
}: {
  onMenuClick: () => void
  showAddButton: boolean
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="size-4" />
        </button>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <span className="truncate font-medium text-foreground">Overview</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {showAddButton ? (
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add transaction</span>
          </button>
        ) : null}
        <button className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted">
          <Sun className="size-4 dark:hidden" />
          <Moon className="hidden size-4 dark:block" />
        </button>
        <button className="relative grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger ring-2 ring-card" />
        </button>
        <button className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted">
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  )
}

