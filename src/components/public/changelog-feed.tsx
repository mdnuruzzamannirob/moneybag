'use client';

import { AppBadge, AppSegmentedControl } from '@/components/app-ui';
import { MarketingCard } from '@/components/public/public-ui';
import { useState } from 'react';

type Filter = 'All' | 'Features' | 'Fixes' | 'Mobile' | 'API';
type Change = { category: Exclude<Filter, 'All'>; text: string };

const releases: readonly {
  date: string;
  name: string;
  version: string;
  changes: readonly Change[];
}[] = [
  {
    date: 'Released July 22, 2026',
    name: 'Family & sharing',
    version: '2.4',
    changes: [
      {
        category: 'Features',
        text: 'Family settle-up now shows who owes whom across shared expenses.',
      },
      {
        category: 'Features',
        text: 'Pooled family budgets include email alerts when members overspend.',
      },
      {
        category: 'Features',
        text: 'Split a single purchase across multiple categories or members.',
      },
      { category: 'Fixes', text: 'CSV import correctly parses date formats with two-digit years.' },
      {
        category: 'Fixes',
        text: 'Budget rollover no longer double-counts when a year changes mid-month.',
      },
    ],
  },
  {
    date: 'Released June 10, 2026',
    name: 'Reports overhaul',
    version: '2.3',
    changes: [
      {
        category: 'Features',
        text: 'New monthly comparison view with side-by-side category breakdowns.',
      },
      { category: 'Features', text: 'A 12-month trend chart is now available on every wallet.' },
      { category: 'Mobile', text: 'The iOS app now supports Face ID login.' },
      {
        category: 'Fixes',
        text: 'Resolved a timezone issue that placed transactions on the wrong day.',
      },
    ],
  },
  {
    date: 'Released May 3, 2026',
    name: 'Lifetime plan launch',
    version: '2.2',
    changes: [
      {
        category: 'Features',
        text: 'Unlimited Lifetime plan: pay once and keep every current Pro feature.',
      },
      { category: 'API', text: 'Checkout coupon validation now returns clearer status responses.' },
    ],
  },
  {
    date: 'Released April 1, 2026',
    name: 'Initial Pro launch',
    version: '2.1',
    changes: [
      {
        category: 'Features',
        text: 'Pro Monthly and Yearly plans add unlimited wallets, transactions, and budgets.',
      },
      { category: 'Features', text: 'CSV import supports flexible columns from any bank export.' },
      {
        category: 'API',
        text: 'The billing API now supports 14-day trials without a payment method.',
      },
    ],
  },
];

const filters = (['All', 'Features', 'Fixes', 'Mobile', 'API'] as const).map((value) => ({
  label: value,
  value,
}));

export function ChangelogFeed() {
  const [filter, setFilter] = useState<Filter>('All');

  return (
    <>
      <AppSegmentedControl
        className="mb-10 h-auto grid-cols-2! grid-flow-row! sm:grid-cols-5!"
        onValueChange={(value) => setFilter((value as Filter | null) ?? 'All')}
        options={filters}
        value={filter}
      />
      <div className="space-y-10">
        {releases.map((release) => {
          const visibleChanges = release.changes.filter(
            (change) => filter === 'All' || change.category === filter,
          );
          if (visibleChanges.length === 0) return null;
          return (
            <article key={release.version}>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary font-ubuntu text-sm font-bold text-white">
                  {release.version}
                </span>
                <div>
                  <h2 className="font-ubuntu font-bold">{release.name}</h2>
                  <p className="text-xs text-muted-foreground">{release.date}</p>
                </div>
              </div>
              <MarketingCard className="space-y-3" padding="md">
                {visibleChanges.map((change) => (
                  <div className="flex items-start gap-3 text-sm leading-6" key={change.text}>
                    <AppBadge
                      className="mt-0.5 shrink-0"
                      size="sm"
                      status={
                        change.category === 'Fixes'
                          ? 'success'
                          : change.category === 'Mobile' || change.category === 'API'
                            ? 'info'
                            : 'neutral'
                      }
                    >
                      {change.category === 'Features' ? 'NEW' : change.category.toUpperCase()}
                    </AppBadge>
                    <span
                      className={change.category === 'Fixes' ? 'text-muted-foreground' : undefined}
                    >
                      {change.text}
                    </span>
                  </div>
                ))}
              </MarketingCard>
            </article>
          );
        })}
      </div>
    </>
  );
}
