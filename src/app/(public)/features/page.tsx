import type { Metadata } from 'next';
import {
  BarChart3,
  BellRing,
  FileDown,
  FileUp,
  Goal,
  Layers3,
  LockKeyhole,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Split,
  Tags,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react';
import { FeatureIcon, PageHero, SectionHeading, TrialCta } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore MoneyBag wallets, budgets, savings goals, reports, automation, and family finance features.',
};

const featureGroups = [
  {
    title: 'See every dollar clearly',
    text: 'A flexible foundation for accounts and everyday money movement.',
    items: [
      [
        WalletCards,
        'Wallets that match real life',
        'Keep bank accounts, cash, cards, and investments separate while seeing one total balance.',
      ],
      [
        Tags,
        'Fast categorization',
        'Use clean categories, notes, and tags so every transaction keeps its context.',
      ],
      [
        Repeat2,
        'Recurring automation',
        'Schedule salary, rent, bills, or subscriptions and let MoneyBag create them for you.',
      ],
      [
        FileUp,
        'CSV import',
        'Bring in an existing transaction history without rebuilding it line by line.',
      ],
    ],
  },
  {
    title: 'Turn tracking into progress',
    text: 'Plan ahead, notice patterns, and make your next decision with confidence.',
    items: [
      [
        Layers3,
        'Flexible budgets',
        'Create category limits that reset or roll unused money into the next month.',
      ],
      [
        Goal,
        'Visual savings goals',
        'Set a target and date, add contributions, and see exactly how far you have come.',
      ],
      [
        BarChart3,
        'Reports that explain',
        'Compare income and spending across months, categories, and daily trends.',
      ],
      [
        FileDown,
        'Useful exports',
        'Download CSV or polished reports whenever you need a deeper look.',
      ],
    ],
  },
  {
    title: 'Make money a team sport',
    text: 'Share the right information without giving up ownership or control.',
    items: [
      [Users, 'Family groups', 'Invite up to five people with clear Viewer and Editor roles.'],
      [
        Split,
        'Fair expense splits',
        'Split equally, by percentage, or with exact amounts—and keep the history.',
      ],
      [
        BellRing,
        'Helpful alerts',
        'Stay ahead of pooled budgets and important account activity without constant checking.',
      ],
      [
        ShieldCheck,
        'Privacy by design',
        'Secure sessions, protected requests, and account-level data controls come standard.',
      ],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="FEATURES"
        icon={<Sparkles className="size-3.5" />}
        title={
          <>
            Every feature you&apos;ll <span className="text-primary">ever need.</span>
          </>
        }
        description="Built for individuals, couples, and families who want a complete view of their money—without the bloat."
      />
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-4 px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          {['Unlimited on Pro', 'Fast CSV import', 'Family sharing', 'Export anytime'].map(
            (item) => (
              <span className="inline-flex items-center gap-2" key={item}>
                <Zap className="size-4 text-primary" />
                {item}
              </span>
            ),
          )}
        </div>
      </section>
      {featureGroups.map((group, groupIndex) => (
        <section
          className={groupIndex % 2 ? 'border-y border-border bg-card' : ''}
          key={group.title}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow={`0${groupIndex + 1}`}
                title={group.title}
                description={group.text}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {group.items.map(([Icon, title, text], index) => {
                const I = Icon as typeof LockKeyhole;
                return (
                  <article
                    className="rounded-lg border border-border bg-card p-6"
                    key={title as string}
                  >
                    <FeatureIcon
                      tone={
                        ['primary', 'accent', 'success', 'info'][index] as
                          'primary' | 'accent' | 'success' | 'info'
                      }
                    >
                      <I className="size-5" />
                    </FeatureIcon>
                    <h3 className="mt-4 font-ubuntu text-lg font-semibold">{title as string}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {text as string}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
      <TrialCta
        title="Ready for a calmer money system?"
        description="Start with every Pro feature free for 14 days. No card and no complicated setup."
      />
    </>
  );
}
