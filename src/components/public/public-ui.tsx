import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="public-eyebrow">
      {icon}
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  icon,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  icon?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn('public-page-hero', compact && 'pb-10')}>
      <div className="public-dots absolute inset-0 opacity-45" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-ubuntu text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-ubuntu text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-lg leading-8 text-muted-foreground">{description}</p>}
    </div>
  );
}

export function TrialCta({
  title = 'Start your 14-day Pro trial.',
  description = 'No credit card required. Full access to every Pro feature—cancel anytime.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="public-cta relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-14">
        <div className="public-dots absolute inset-0 opacity-20" />
        <div className="relative">
          <h2 className="font-ubuntu text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{description}</p>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Get started <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrustPoints({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <span className="inline-flex items-center gap-1.5" key={item}>
          <CheckCircle2 className="size-4 text-success" />
          {item}
        </span>
      ))}
    </div>
  );
}

export function FeatureIcon({
  children,
  tone = 'primary',
}: {
  children: ReactNode;
  tone?: 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'violet';
}) {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-brand-accent/10 text-brand-accent',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    info: 'bg-info-soft text-info',
    violet: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300',
  };
  return (
    <span className={cn('grid size-11 place-items-center rounded-xl', tones[tone])}>
      {children}
    </span>
  );
}
