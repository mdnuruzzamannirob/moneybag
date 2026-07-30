'use client';

import { cn } from '@/lib/utils';
import { AppButton } from '@/components/app-ui';
import { ArrowRight, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '../shared/Logo';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/2fa',
  '/callback',
  '/error',
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export function PublicLogo() {
  return <Logo className="text-lg font-bold tracking-tight" href="/" />;
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)))
    return children;

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-background">
      <SiteHeader pathname={pathname} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader({
  pathname,
  menuOpen,
  setMenuOpen,
}: {
  pathname: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <PublicLogo />
        <nav
          className="hidden items-center gap-7 text-sm font-medium md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={cn(
                'relative text-muted-foreground transition-colors hover:text-foreground',
                isActive(pathname, item.href) &&
                  'text-primary hover:text-primary after:absolute after:inset-x-0 after:-bottom-[7px] after:h-0.5 after:rounded-full after:bg-primary',
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden sm:inline-flex" href="/login">
            <AppButton size="sm" tone="secondary">Sign in</AppButton>
          </Link>
          <Link href="/register">
            <AppButton size="sm">
              Get started <ArrowRight className="size-4" />
            </AppButton>
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-secondary md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="border-t border-border bg-card px-4 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground',
                  isActive(pathname, item.href) && 'bg-accent text-primary',
                )}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary sm:hidden"
              href="/login"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/65">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <PublicLogo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              A personal and family finance platform. Track, budget, save, and share—all in one calm
              interface.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-[transform,color,border-color] hover:-translate-y-px hover:border-primary hover:text-primary"
                href="#"
                aria-label="MoneyBag on GitHub"
              >
                <Mail className="size-4" />
              </a>
              <a
                className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-[transform,color,border-color] hover:-translate-y-px hover:border-primary hover:text-primary"
                href="mailto:hello@moneybag.app"
                aria-label="Email MoneyBag"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
          <FooterColumn
            title="Product"
            links={[
              ['Home', '/'],
              ['Features', '/features'],
              ['Pricing', '/pricing'],
              ['FAQ', '/faq'],
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              ['About', '/about'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
              ['Sign in', '/login'],
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              ['Terms', '/terms'],
              ['Privacy', '/privacy'],
              ['Security', '/features#security'],
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 MoneyBag. All rights reserved.</p>
          <p>
            Made with <span className="text-brand-accent">♥</span> for calmer money.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              className="text-muted-foreground transition-colors hover:text-primary"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
