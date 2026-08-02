import { ArrowRight, Check, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppBadge, AppButton, AppCard } from '@/components/app-ui';
import { cn } from '@/lib/utils';

export type PublicTone = 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'danger';

const toneClasses: Record<PublicTone, string> = {
  primary: 'border-primary/20 bg-primary/10 text-primary',
  accent: 'border-brand-accent/20 bg-brand-accent-soft text-brand-accent',
  success: 'border-success/20 bg-success-soft text-success',
  warning: 'border-warning/20 bg-warning-soft text-warning',
  info: 'border-info/20 bg-info-soft text-info',
  danger: 'border-danger/20 bg-danger-soft text-danger',
};

const iconToneClasses: Record<PublicTone, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-brand-accent-soft text-brand-accent',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  danger: 'bg-danger-soft text-danger',
};

export function Eyebrow({
  children,
  className,
  icon,
  tone = 'primary',
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  tone?: PublicTone;
}) {
  return (
    <AppBadge
      className={cn(
        'gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-[0.08em]',
        toneClasses[tone],
        className,
      )}
      size="md"
    >
      {icon}
      {children}
    </AppBadge>
  );
}

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_28%,transparent)_1px,transparent_1px)] bg-size-[24px_24px]',
        className,
      )}
    />
  );
}

export function PageHero({
  children,
  description,
  eyebrow,
  icon,
  title,
  tone = 'primary',
}: {
  children?: ReactNode;
  compact?: boolean;
  description: ReactNode;
  eyebrow: string;
  icon?: ReactNode;
  title: ReactNode;
  tone?: PublicTone;
}) {
  return (
    <section className="relative isolate flex min-h-70 items-center overflow-hidden border-b border-border px-0 py-12 sm:min-h-80">
      <DotPattern className="opacity-65" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow icon={icon} tone={tone}>
            {eyebrow}
          </Eyebrow>
          <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  centered,
  description,
  eyebrow,
  icon,
  title,
  tone = 'primary',
}: {
  centered?: boolean;
  description?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
  title: ReactNode;
  tone?: PublicTone;
}) {
  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
      {eyebrow ? (
        <Eyebrow icon={icon} tone={tone}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          eyebrow && 'mt-4',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PublicSection({
  children,
  className,
  muted,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={cn(muted && 'border-y border-border bg-card/60', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">{children}</div>
    </section>
  );
}

export function MarketingCard({
  children,
  className,
  padding = 'lg',
}: {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}) {
  return (
    <AppCard className={cn('rounded-lg', className)} padding={padding}>
      {children}
    </AppCard>
  );
}

export function FeatureIcon({
  children,
  className,
  tone = 'primary',
}: {
  children: ReactNode;
  className?: string;
  tone?: PublicTone;
}) {
  return (
    <span
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-lg [&>svg]:size-5',
        iconToneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ButtonLink({
  children,
  className,
  href,
  size = 'lg',
  tone = 'primary',
}: {
  children: ReactNode;
  className?: string;
  href: string;
  size?: 'default' | 'sm' | 'lg';
  tone?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <AppButton
      className={className}
      nativeButton={false}
      render={<Link href={href} />}
      size={size}
      tone={tone}
    >
      {children}
    </AppButton>
  );
}

export function TextLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      className={cn(
        'inline-flex items-center gap-2 font-semibold text-primary transition-[gap,color] hover:gap-3 hover:text-primary-hover',
        className,
      )}
      href={href}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function CheckList({
  className,
  items,
}: {
  className?: string;
  items: readonly ReactNode[];
}) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <li
          className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground"
          key={index}
        >
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <div aria-label="5 out of 5 stars" className={cn('flex gap-0.5 text-warning', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star className="size-4 fill-current" key={index} />
      ))}
    </div>
  );
}

export type FaqItem = { answer: ReactNode; question: string };

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          className="group rounded-lg border border-border bg-background transition-[background-color,border-color,box-shadow] open:border-primary/30 open:bg-card open:shadow-sm"
          key={item.question}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
            <span>{item.question}</span>
            <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 group-open:text-primary" />
          </summary>
          <div className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function TrialCta({
  description = 'No credit card required. Full access to every Pro feature—cancel anytime.',
  title = 'Ready to take control?',
}: {
  description?: string;
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="ui-gradient-cta-card relative isolate overflow-hidden rounded-lg px-6 py-12 text-center sm:px-12 sm:py-14">
        <DotPattern className="opacity-20" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{description}</p>
          <ButtonLink
            className="ui-light-control mt-7 border-0! hover:brightness-95"
            href="/register"
            tone="secondary"
          >
            Get started free <ArrowRight className="size-4" />
          </ButtonLink>
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
          <Check className="size-4 text-success" strokeWidth={3} />
          {item}
        </span>
      ))}
    </div>
  );
}
