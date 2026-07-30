import { cn } from '@/lib/utils';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AppButton } from '../app-ui';
import Link from 'next/link';
import Logo from '../shared/Logo';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export default function SiteHeader({
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
        <Logo />
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
                  'text-primary hover:text-primary after:absolute after:inset-x-0 after:-bottom-1.75 after:h-0.5 after:rounded-full after:bg-primary',
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden sm:inline-flex" href="/login">
            <AppButton  tone="secondary">
              Sign in
            </AppButton>
          </Link>
          <Link href="/register">
            <AppButton >
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
