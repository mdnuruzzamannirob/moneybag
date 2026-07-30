import { Mail } from 'lucide-react';
import Link from 'next/link';
import Logo from '../shared/Logo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/65">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
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
