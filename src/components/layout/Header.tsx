'use client';

import { AppButton, AppDropdownMenu, AppSheet } from '@/components/app-ui';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ContactRound,
  Menu,
  Newspaper,
  PlugZap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '../shared/Logo';

const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/customers', label: 'Customers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const moreNavigation = [
  { href: '/security', icon: ShieldCheck, label: 'Security' },
  { href: '/integrations', icon: PlugZap, label: 'Integrations' },
  { href: '/changelog', icon: Sparkles, label: 'Changelog' },
  { href: '/press', icon: Newspaper, label: 'Press kit' },
  { href: '/about', icon: ContactRound, label: 'About' },
  { href: '/careers', icon: BriefcaseBusiness, label: 'Careers' },
] as const;

const resourceNavigation = [
  { href: '/help-center', label: 'Help center' },
  { href: '/status', label: 'System status' },
  { href: '/faq', label: 'FAQ' },
] as const;

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export default function SiteHeader({
  menuOpen,
  pathname,
  setMenuOpen,
}: {
  menuOpen: boolean;
  pathname: string;
  setMenuOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const moreIsActive = moreNavigation.some((item) => isActive(pathname, item.href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo href="/" />
        <nav
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
          aria-label="Main navigation"
        >
          {primaryNavigation.map((item) => (
            <Link
              className={cn(
                'relative py-5 text-muted-foreground transition-colors hover:text-foreground',
                isActive(pathname, item.href) &&
                  'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t-full after:bg-primary',
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <AppDropdownMenu
            items={moreNavigation.map((item) => ({
              icon: <item.icon className="size-4 text-primary" />,
              label: item.label,
              onSelect: () => router.push(item.href),
            }))}
            trigger={
              <AppButton
                className={cn('px-2!', moreIsActive && 'text-primary')}
                size="sm"
                tone="ghost"
              >
                More <ChevronDown className="size-3.5" />
              </AppButton>
            }
          />
        </nav>

        <div className="flex items-center gap-2">
          <AppButton
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login" />}
            tone="secondary"
          >
            Log in
          </AppButton>
          <AppButton nativeButton={false} render={<Link href="/register" />}>
            Get started <ArrowRight className="size-4" />
          </AppButton>
          <AppButton
            aria-label="Open navigation"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            size="icon-lg"
            tone="ghost"
          >
            <Menu className="size-5" />
          </AppButton>
        </div>
      </div>

      <AppSheet
        description="Explore MoneyBag product pages and resources."
        footer={
          <div className="grid w-full grid-cols-2 gap-2">
            <AppButton nativeButton={false} render={<Link href="/login" />} tone="secondary">
              Log in
            </AppButton>
            <AppButton nativeButton={false} render={<Link href="/register" />}>
              Get started
            </AppButton>
          </div>
        }
        onOpenChange={setMenuOpen}
        open={menuOpen}
        title={<Logo href="/" />}
      >
        <MobileNavGroup
          items={primaryNavigation}
          label="Navigation"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
        <MobileNavGroup
          className="mt-6 border-t border-border pt-6"
          items={moreNavigation}
          label="Explore"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
        <MobileNavGroup
          className="mt-6 border-t border-border pt-6"
          items={resourceNavigation}
          label="Resources"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
      </AppSheet>
    </header>
  );
}

function MobileNavGroup({
  className,
  items,
  label,
  onNavigate,
  pathname,
}: {
  className?: string;
  items: readonly { href: string; label: string }[];
  label: string;
  onNavigate: () => void;
  pathname: string;
}) {
  return (
    <div className={className}>
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <nav className="space-y-1" aria-label={label}>
        {items.map((item) => (
          <Link
            className={cn(
              'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
              isActive(pathname, item.href) && 'bg-primary/10 text-primary',
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            {item.label}
            {isActive(pathname, item.href) ? <CheckCircle2 className="size-4" /> : null}
          </Link>
        ))}
      </nav>
    </div>
  );
}
