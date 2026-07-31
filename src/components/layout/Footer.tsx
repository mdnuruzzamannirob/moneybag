import { AppButton } from '@/components/app-ui';
import { Code2, Mail, Network } from 'lucide-react';
import Link from 'next/link';

import Logo from '../shared/Logo';

const columns = [
  {
    links: [
      ['Features', '/features'],
      ['Pricing', '/pricing'],
      ['Integrations', '/integrations'],
      ['Changelog', '/changelog'],
    ],
    title: 'Product',
  },
  {
    links: [
      ['About', '/about'],
      ['Customers', '/customers'],
      ['Blog', '/blog'],
      ['Careers', '/careers'],
    ],
    title: 'Company',
  },
  {
    links: [
      ['Help center', '/help-center'],
      ['FAQ', '/faq'],
      ['Security', '/security'],
      ['System status', '/status'],
    ],
    title: 'Resources',
  },
  {
    links: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      ['Press kit', '/press'],
      ['Contact', '/contact'],
    ],
    title: 'Legal',
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
        <div className="sm:col-span-2">
          <Logo href="/" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Your money, your control. Personal and family finance, beautifully simple.
          </p>
          <div className="mt-5 flex gap-2">
            <AppButton
              aria-label="Email MoneyBag"
              nativeButton={false}
              render={<a href="mailto:hello@moneybag.app" />}
              size="icon"
              tone="secondary"
            >
              <Mail className="size-4" />
            </AppButton>
            <AppButton
              aria-label="MoneyBag on GitHub"
              nativeButton={false}
              render={<a href="#" />}
              size="icon"
              tone="secondary"
            >
              <Code2 className="size-4" />
            </AppButton>
            <AppButton
              aria-label="MoneyBag on LinkedIn"
              nativeButton={false}
              render={<a href="#" />}
              size="icon"
              tone="secondary"
            >
              <Network className="size-4" />
            </AppButton>
          </div>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} links={column.links} title={column.title} />
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 MoneyBag. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Language: English</span>
            <span>Currency: USD</span>
            <span>
              Made with <span className="text-brand-accent">♥</span> for calmer money.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: readonly (readonly [string, string])[];
  title: string;
}) {
  return (
    <div>
      <h2 className="font-ubuntu text-sm font-bold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
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
