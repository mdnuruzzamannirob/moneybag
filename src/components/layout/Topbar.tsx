import { useTheme } from '@/providers/theme-provider';
import { Bell, Link, LogOut, Menu, Moon, Plus, Search, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AppBreadcrumb, AppButton, AppInput, AppPopover } from '../app-ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { NavSection } from './DashboardShell';

export default function Topbar({
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
        <AppButton
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          size="icon-sm"
          tone="secondary"
        >
          <Search className="size-4" />
        </AppButton>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="max-w-xl gap-4">
            <DialogHeader>
              <DialogTitle>Search MoneyBag</DialogTitle>
              <DialogDescription>Find a page or finance section quickly.</DialogDescription>
            </DialogHeader>
            <AppInput
              ref={inputRef}
              leading={<Search />}
              placeholder="Search pages..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="max-h-72 overflow-y-auto">
              {matches.length ? (
                matches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted"
                      href={item.href}
                      key={item.href}
                      onClick={() => setSearchOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                      <span className="ml-auto text-xs text-muted-foreground">{item.section}</span>
                    </Link>
                  );
                })
              ) : (
                <p className="px-2 py-5 text-center text-sm text-muted-foreground">
                  No matching pages found.
                </p>
              )}
            </div>
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
