'use client'

import {
  CreditCard,
  HardDrive,
  LockKeyhole,
  Mail,
  Scale,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const items = [
  { href: '/admin/settings/general', icon: Settings2, label: 'General' },
  { href: '/admin/settings/security', icon: LockKeyhole, label: 'Security' },
  { href: '/admin/settings/email', icon: Mail, label: 'Email' },
  { href: '/admin/settings/oauth', icon: ShieldCheck, label: 'OAuth' },
  { href: '/admin/settings/payment', icon: CreditCard, label: 'Payment' },
  { href: '/admin/settings/storage', icon: HardDrive, label: 'Storage' },
  { href: '/admin/settings/legal', icon: Scale, label: 'Legal' },
]

export function AdminSettingsNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Admin settings sections"
      className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
    >
      {items.map(({ href, icon: Icon, label }) => (
        <Link
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors',
            pathname === href ||
              (href === '/admin/settings/general' &&
                pathname === '/admin/settings')
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
  )
}
