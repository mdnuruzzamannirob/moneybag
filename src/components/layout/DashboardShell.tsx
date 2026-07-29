'use client';

import {
  BarChart3,
  Bell,
  Check,
  ChevronsUpDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  Gauge,
  Grid2X2,
  HelpCircle,
  History,
  LogOut,
  Megaphone,
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
  UserRound,
  Users,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { AppBreadcrumb, AppButton, AppInput, AppPopover } from '@/components/app-ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';
import Logo from '../shared/Logo';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Overview', icon: Grid2X2 },
      {
        href: '/transactions',
        label: 'Transactions',
        icon: ReceiptText,
        count: '20',
      },
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
];

const familyNavSections: NavSection[] = [
  {
    label: 'Family',
    items: [
      { href: '/family/dashboard', label: 'Dashboard', icon: Grid2X2 },
      { href: '/family/wallets', label: 'Shared Wallets', icon: WalletCards },
      { href: '/family/transactions', label: 'Transactions', icon: ReceiptText },
      { href: '/family/budgets', label: 'Budgets', icon: Target },
      { href: '/family/balances', label: 'Balances & Settlements', icon: CircleDollarSign },
      { href: '/family/members', label: 'Members', icon: Users },
      { href: '/family/reports', label: 'Reports', icon: FileText },
      { href: '/family/settings', label: 'Settings', icon: Settings },
    ],
  },
];
const adminNavSections: NavSection[] = [
  {
    label: 'Main',
    items: [{ href: '/admin/dashboard', label: 'Dashboard', icon: Gauge }],
  },
  {
    label: 'User & Subscriptions',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      {
        href: '/admin/subscriptions',
        label: 'Subscriptions',
        icon: WalletCards,
      },
      { href: '/admin/coupons', label: 'Coupons', icon: CreditCard },
      { href: '/admin/plans', label: 'Plans', icon: CircleDollarSign },
    ],
  },
  {
    label: 'Reports',
    items: [{ href: '/admin/reports', label: 'Reports', icon: BarChart3 }],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { href: '/admin/blog', label: 'Blog', icon: FileText },
      { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
      {
        href: '/admin/email-templates',
        label: 'Email Templates',
        icon: FileText,
      },
    ],
  },
  {
    label: 'Support',
    items: [{ href: '/admin/tickets', label: 'Tickets', icon: Ticket }],
  },
  {
    label: 'System & Security',
    items: [
      { href: '/admin/system-health', label: 'System Health', icon: Shield },
      { href: '/admin/audit-logs', label: 'Audit Logs', icon: History },
      {
        href: '/admin/settings',
        label: 'Settings',
        icon: Settings,
      },
    ],
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isFamily = pathname.startsWith('/family');
  const sections = isAdmin ? adminNavSections : isFamily ? familyNavSections : navSections;

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
        <Sidebar
          isAdmin={isAdmin}
          isFamily={isFamily}
          sections={sections}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      <div className="lg:pl-65">
        <Topbar onMenuClick={() => setOpen(true)} showAddButton={!isAdmin} sections={sections} />
        <main className="mx-auto min-w-0 w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  sections,
  onNavigate,
  isAdmin,
  isFamily,
}: {
  sections: NavSection[];
  onNavigate: () => void;
  isAdmin: boolean;
  isFamily: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <Logo onNavigate={onNavigate} />
        <button
          className="ml-auto grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={onNavigate}
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {sections.map((section) => (
          <div className="mb-5" key={section.label}>
            <div className="mb-2 px-3 text-[11px] font-medium uppercase text-muted-foreground/70">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <div key={item.href}>
                    <Link
                      className={cn(
                        'flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                      href={item.href}
                      onClick={onNavigate}
                    >
                      <Icon className="size-4.5 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.count ? (
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-semibold leading-none',
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <DashboardSwitcher isAdmin={isAdmin} isFamily={isFamily} onNavigate={onNavigate} />
    </>
  );
}

function DashboardSwitcher({
  isAdmin,
  isFamily,
  onNavigate,
}: {
  isAdmin: boolean;
  isFamily: boolean;
  onNavigate: () => void;
}) {
  const router = useRouter();
  const [hasFamily, setHasFamily] = useState(isFamily);
  const [createOpen, setCreateOpen] = useState(false);
  const [familyName, setFamilyName] = useState('');
  useEffect(() => {
    if (isFamily || window.localStorage.getItem('moneybag-family-created') === 'true')
      setHasFamily(true);
  }, [isFamily]);
  if (isAdmin)
    return (
      <div className="mt-auto border-t border-border p-4 text-sm font-semibold">MoneyBag Admin</div>
    );
  const go = (href: string) => {
    onNavigate();
    router.push(href);
  };
  const createFamily = () => {
    window.localStorage.setItem('moneybag-family-created', 'true');
    window.localStorage.setItem('moneybag-family-name', familyName.trim() || 'Rahman Family');
    setHasFamily(true);
    setCreateOpen(false);
    go('/family/dashboard');
  };
  const trigger = (
    <button
      className="mt-auto flex w-full items-center gap-3 border-t border-border px-4 py-2.5 text-left outline-none hover:bg-muted"
      type="button"
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
        {isFamily ? 'FM' : 'AT'}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">
          {isFamily ? 'Rahman Family' : 'Anika Tahsin'}
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {isFamily ? 'Family dashboard' : 'Personal dashboard'}
        </div>
      </div>
      <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
    </button>
  );
  return (
    <>
      <AppPopover trigger={trigger} side="top" contentClassName="w-64 p-0">
        <div className="border-b border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Switch to
        </div>
        <div className="space-y-0 pb-3">
          <button
            className={cn(
              'm-0 flex w-full items-center gap-3 px-3 py-2.5 text-left leading-tight transition-colors hover:bg-muted',
              !isFamily && 'bg-muted/70',
            )}
            onClick={() => go('/dashboard')}
            type="button"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <UserRound className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">Personal</span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Your private finance
              </span>
            </span>
            {!isFamily ? <Check className="size-4 text-emerald-600" /> : null}
          </button>

          {hasFamily ? (
            <button
              className={cn(
                'm-0 flex w-full items-center gap-3 px-3 py-2.5 text-left leading-tight transition-colors hover:bg-muted',
                isFamily && 'bg-muted/70',
              )}
              onClick={() => go('/family/dashboard')}
              type="button"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
                <UsersRound className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Family</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  Rahman Family · 4 members
                </span>
              </span>
              {isFamily ? <Check className="size-4 text-emerald-600" /> : null}
            </button>
          ) : (
            <button
              className="m-0 flex w-full items-center gap-3 px-3 py-2.5 text-left leading-tight transition-colors hover:bg-muted"
              onClick={() => setCreateOpen(true)}
              type="button"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
                <UsersRound className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Create family</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  Start a shared finance space
                </span>
              </span>
              <Plus className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </AppPopover>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your family group</DialogTitle>
            <DialogDescription>Create one shared space for your family finances.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="family-name">
              Family name
            </label>
            <input
              autoFocus
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
              id="family-name"
              onChange={(event) => setFamilyName(event.target.value)}
              placeholder="e.g. Rahman Family"
              value={familyName}
            />
          </div>
          <DialogFooter>
            <button
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setCreateOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              onClick={createFamily}
              type="button"
            >
              Create family
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
function Topbar({
  onMenuClick,
  showAddButton,
  sections,
}: {
  onMenuClick: () => void;
  showAddButton: boolean;
  sections: NavSection[];
}) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const items = sections.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.label })),
  );
  const matches = items.filter((item) =>
    (item.label + ' ' + item.section).toLowerCase().includes(query.toLowerCase()),
  );
  const active = items.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  );
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input,textarea,[contenteditable="true"]');
      if (
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') ||
        (event.key === '/' && !typing)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [searchOpen]);
  const base = pathname.startsWith('/admin')
    ? { href: '/admin/dashboard', label: 'Admin' }
    : pathname.startsWith('/family')
      ? { href: '/family/dashboard', label: 'Family' }
      : { href: '/dashboard', label: 'Personal' };
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
        <AppBreadcrumb items={[base, { label: active?.label || 'Dashboard' }]} />
      </div>
      <div className="flex shrink-0 items-center gap-2">
                        <AppButton aria-label="Search" onClick={() => setSearchOpen(true)} size="icon-sm" tone="secondary"><Search className="size-4" /></AppButton>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="max-w-xl gap-4">
            <DialogHeader><DialogTitle>Search MoneyBag</DialogTitle><DialogDescription>Find a page or finance section quickly.</DialogDescription></DialogHeader>
            <AppInput ref={inputRef} leading={<Search />} placeholder="Search pages..." value={query} onChange={(event) => setQuery(event.target.value)} />
            <div className="max-h-72 overflow-y-auto">{matches.length ? matches.map((item) => { const Icon = item.icon; return <Link className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted" href={item.href} key={item.href} onClick={() => setSearchOpen(false)}><Icon className="size-4" />{item.label}<span className="ml-auto text-xs text-muted-foreground">{item.section}</span></Link>; }) : <p className="px-2 py-5 text-center text-sm text-muted-foreground">No matching pages found.</p>}</div>
          </DialogContent>
        </Dialog>
        {showAddButton ? (
          <AppPopover
            align="end"
            contentClassName="w-64 gap-2 p-2"
            trigger={
              <AppButton size="sm">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Quick actions</span>
              </AppButton>
            }
          >
            <Link
              className="flex rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/transactions?type=income"
            >
              Add income
            </Link>
            <Link
              className="flex rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/transactions?type=expense"
            >
              Add expense
            </Link>
            <Link className="flex rounded-md px-2 py-2 text-sm hover:bg-muted" href="/wallets">
              Transfer between wallets
            </Link>
          </AppPopover>
        ) : null}
        <AppButton aria-label="Theme" onClick={toggleTheme} size="icon-sm" tone="secondary">
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </AppButton>
        <AppButton aria-label="Notifications" size="icon-sm" tone="secondary">
          <Bell className="size-4" />
        </AppButton>
        <AppButton aria-label="Log out" size="icon-sm" tone="secondary">
          <LogOut className="size-4" />
        </AppButton>
      </div>
    </header>
  );
}
