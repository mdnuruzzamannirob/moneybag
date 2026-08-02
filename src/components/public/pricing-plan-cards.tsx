'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

import { AppSegmentedControl } from '@/components/app-ui';
import { ButtonLink, MarketingCard } from '@/components/public/public-ui';
import { cn } from '@/lib/utils';

const freePlan = {
  name: 'Free',
  blurb: 'Essential tools for managing personal finances.',
  price: '$0',
  cadence: 'Free forever',
  action: 'Start free',
  features: ['1 personal wallet', '50 transactions per month', '2 budgets', '1 savings goal', 'Basic reports'],
};

const proFeatures = [
  'Everything in Free',
  'Unlimited wallets and transactions',
  'Unlimited budgets and savings goals',
  'Recurring transactions and CSV import',
  'Full reports with PDF and CSV exports',
  'Priority email support',
] as const;

const paidPlans = {
  monthly: {
    pro: {
      name: 'Pro',
      blurb: 'Complete personal finance management.',
      price: '$4.99',
      cadence: 'per month · cancel anytime',
      label: 'MOST POPULAR',
      action: 'Start 14-day trial',
      features: proFeatures,
    },
    family: {
      name: 'Family',
      blurb: 'Manage money together in one shared space.',
      price: '$7.99',
      cadence: 'per month · cancel anytime',
      label: 'FOR FAMILIES',
      action: 'Choose Family',
      features: [
        'Everything in Pro',
        'Family group for up to 5 members',
        'Shared family wallets',
        'Expense splitting and settle-up',
        'Pooled family budgets',
        'Family reports with PDF and CSV exports',
      ],
    },
  },
  yearly: {
    pro: {
      name: 'Pro',
      blurb: 'Complete personal finance management.',
      price: '$49.99',
      cadence: 'per year · about $4.17/mo',
      label: 'MOST POPULAR',
      saving: 'SAVE 17%',
      action: 'Start 14-day trial',
      features: proFeatures,
    },
    family: {
      name: 'Family',
      blurb: 'Manage money together in one shared space.',
      price: '$79.99',
      cadence: 'per year · about $6.67/mo',
      label: 'FOR FAMILIES',
      saving: 'SAVE 17%',
      action: 'Choose Family',
      features: [
        'Everything in Pro',
        'Family group for up to 5 members',
        'Shared family wallets',
        'Expense splitting and settle-up',
        'Pooled family budgets',
        'Family reports with PDF and CSV exports',
      ],
    },
  },
} as const;

export function PricingPlanCards() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const { family, pro } = paidPlans[billing];

  return (
    <>
      <AppSegmentedControl
        className="mx-auto mt-8 h-11! w-fit! text-sm font-semibold"
        onValueChange={(value) => {
          if (value === 'monthly' || value === 'yearly') setBilling(value);
        }}
        options={[
          { label: 'Monthly', value: 'monthly' },
          {
            label: (
              <>
                Yearly
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-extrabold">
                  SAVE 17%
                </span>
              </>
            ),
            value: 'yearly',
          },
        ]}
        value={billing}
      />

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <PlanCard plan={freePlan} />
        <PlanCard featured plan={pro} />
        <PlanCard accent plan={family} />
      </section>
    </>
  );
}

type PaidPlan = (typeof paidPlans)[keyof typeof paidPlans]['pro' | 'family'];

function PlanCard({ accent, featured, plan }: { accent?: boolean; featured?: boolean; plan: typeof freePlan | PaidPlan }) {
  return (
    <MarketingCard className={cn('relative flex flex-col p-6', featured && 'border-2 border-primary/45 bg-linear-to-b from-card to-primary/5 shadow-lg lg:-mt-3', accent && 'border-brand-accent/35 bg-linear-to-br from-brand-accent-soft via-card to-card')}>
      {featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">{'label' in plan ? plan.label : ''}</span>}
      {accent && <span className="absolute right-5 top-5 rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white">{`label` in plan ? plan.label : 'FAMILY'}</span>}
      <h2 className="text-lg font-bold">{plan.name}</h2>
      <p className="mt-1 min-h-10 text-sm text-muted-foreground">{plan.blurb}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="text-4xl font-extrabold tracking-tight">{plan.price}</p>
        {'saving' in plan && (
          <span className="rounded-full bg-success-soft px-2 py-1 text-[10px] font-extrabold tracking-wide text-success">
            {plan.saving}
          </span>
        )}
      </div>
      <p className={cn('mt-1 text-xs', featured ? 'font-semibold text-success' : 'text-muted-foreground')}>{plan.cadence}</p>
      <ButtonLink className="mt-6 w-full" href="/register" tone={featured ? 'primary' : 'secondary'}>{plan.action}</ButtonLink>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plan.features.map((feature) => <li className="flex items-start gap-2" key={feature}><Check className={cn('mt-0.5 size-4 shrink-0', accent ? 'text-brand-accent' : 'text-success')} />{feature}</li>)}
      </ul>
      {plan.name === 'Free' && <p className="mt-5 border-t border-border pt-5 text-center text-xs text-muted-foreground">No credit card required</p>}
    </MarketingCard>
  );
}
