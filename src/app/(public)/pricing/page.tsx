import type { Metadata } from 'next';
import { Check, CreditCard, Mail, RefreshCw, ShieldCheck, Tag, X } from 'lucide-react';
import { ButtonLink, FaqList, MarketingCard, PageHero } from '@/components/public/public-ui';
import { CouponForm } from '@/components/public/coupon-form';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple MoneyBag pricing for personal and family finance.',
};

const plans = [
  {
    name: 'Free',
    blurb: 'Get a feel for the basics.',
    price: '$0',
    cadence: 'Forever free',
    action: 'Start free',
    featured: false,
    features: [
      '1 wallet',
      '50 transactions / month',
      '2 budgets',
      '1 savings goal',
      'Basic reports',
    ],
  },
  {
    name: 'Pro Monthly',
    blurb: 'Everything personal, billed monthly.',
    price: '$4.99',
    cadence: 'per month · cancel anytime',
    action: 'Start 14-day trial',
    featured: false,
    features: [
      'Unlimited wallets',
      'Unlimited transactions',
      'Unlimited budgets and goals',
      'CSV import',
      'Family group (up to 5)',
      'Priority email support',
    ],
  },
  {
    name: 'Pro Yearly',
    blurb: 'Same Pro features, save 17%.',
    price: '$49.99',
    cadence: 'per year · about $4.17/mo',
    action: 'Start 14-day trial',
    featured: true,
    features: [
      'Everything in Pro Monthly',
      '2 months free',
      'Family group (up to 5)',
      'CSV import',
      'Priority email support',
    ],
  },
  {
    name: 'Unlimited',
    blurb: 'Pay once. Keep it forever.',
    price: '$99.99',
    cadence: 'One-time payment · lifetime',
    action: 'Get lifetime',
    featured: false,
    features: [
      'Everything in Pro',
      'Lifetime access',
      'All future Pro features',
      'Family group (up to 5)',
      'Priority email support',
    ],
  },
];
const comparison = [
  ['Wallets', '1', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Transactions / month', '50', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Budgets', '2', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Savings goals', '1', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['CSV import', false, true, true, true],
  ['Family group', false, true, true, true],
  ['Priority support', false, true, true, true],
  ['Future Pro features', false, false, false, true],
];

const pricingFaq = [
  {
    question: 'Can I switch plans anytime?',
    answer:
      'Yes. Upgrade or downgrade from billing settings. Upgrades are prorated and downgrades take effect at the end of the current period.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Paid subscriptions have a 14-day refund window. Lifetime purchases can be refunded within 30 days.',
  },
  {
    question: 'Is there a student or family discount?',
    answer:
      'A single Pro subscription already covers a family group of up to five people. Student pricing is not available yet.',
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="PRICING"
        icon={<Tag className="size-3.5" />}
        title={
          <>
            Plans that <span className="text-primary">grow with you</span>
          </>
        }
        description="Start free, upgrade when you need more, or pay once and keep every Pro feature forever."
      />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 flex w-fit items-center rounded-full border border-border bg-card p-1 text-sm font-medium">
          <span className="rounded-full bg-primary px-4 py-2 text-white">Plans for every pace</span>
          <span className="px-4 py-2 text-muted-foreground">Save 17% yearly</span>
        </div>
        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <MarketingCard
              className={cn(
                'relative flex flex-col',
                plan.featured
                  ? 'border-2 border-primary/35 bg-linear-to-b from-card to-primary/5 shadow-lg'
                  : plan.name === 'Unlimited'
                    ? 'bg-foreground text-background'
                    : 'border-border',
              )}
              key={plan.name}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                  Most popular
                </span>
              )}
              <p
                className={cn(
                  'text-sm font-semibold uppercase tracking-wider',
                  plan.name === 'Unlimited'
                    ? 'text-brand-accent'
                    : plan.name === 'Free'
                      ? 'text-muted-foreground'
                      : 'text-primary',
                )}
              >
                {plan.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
              <p className="mt-5 text-4xl font-bold">{plan.price}</p>
              <p className="mt-1 text-xs text-muted-foreground">{plan.cadence}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {plan.features.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink
                className="mt-6 w-full"
                href="/register"
                tone={plan.name === 'Free' || plan.name === 'Unlimited' ? 'secondary' : 'primary'}
              >
                {plan.action}
              </ButtonLink>
            </MarketingCard>
          ))}
        </section>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            [ShieldCheck, '14-day free trial'],
            [CreditCard, 'No card to start'],
            [RefreshCw, 'Cancel anytime'],
            [Mail, 'Priority support'],
          ].map(([Icon, text]) => {
            const I = Icon as typeof Mail;
            return (
              <span className="inline-flex items-center gap-1.5" key={text as string}>
                <I className="size-4 text-success" />
                {text as string}
              </span>
            );
          })}
        </div>
        <section className="mt-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Compare plans
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            A quick look at what is included.
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-3xl text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  {['Feature', 'Free', 'Pro Monthly', 'Pro Yearly', 'Unlimited'].map((head) => (
                    <th
                      className={cn(
                        'px-5 py-4 font-semibold',
                        head === 'Feature' ? 'text-left' : 'text-center',
                      )}
                      key={head}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map(([name, ...values]) => (
                  <tr key={name as string}>
                    <td className="px-5 py-3.5 font-medium">{name as string}</td>
                    {values.map((value, index) => (
                      <td className="px-5 py-3.5 text-center" key={index}>
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="mx-auto size-4 text-success" />
                          ) : (
                            <X className="mx-auto size-4 text-muted-foreground" />
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mx-auto mt-16 flex max-w-4xl flex-col items-start justify-between gap-5 rounded-lg border border-primary/20 bg-linear-to-r from-primary/10 to-brand-accent-soft p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold">Have a coupon code?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Apply it before checkout to preview your discount.
            </p>
          </div>
          <CouponForm />
        </section>
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Frequently asked
          </h2>
          <div className="mt-8">
            <FaqList items={pricingFaq} />
          </div>
        </section>
      </div>
    </>
  );
}
