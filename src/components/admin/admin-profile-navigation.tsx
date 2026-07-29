'use client';

import { LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const items = [
  { href: '/admin/profile', label: 'Profile', icon: UserRound },
  { href: '/admin/profile/security', label: 'Security', icon: LockKeyhole },
];

export function AdminProfileNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Admin profile sections"
      className="flex max-w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain pb-2 lg:flex-col lg:overflow-visible lg:pb-1"
    >
      {items.map(({ href, icon: Icon, label }) => (
        <Link
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors',
            pathname === href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
          href={href}
          key={href}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
