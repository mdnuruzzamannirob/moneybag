import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

import { ChangelogFeed } from '@/components/public/changelog-feed';
import { PageHero, PublicSection, SectionHeading, TextLink } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'New MoneyBag features, product improvements, and fixes.',
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        description="New features, thoughtful improvements, and fixes that make managing money feel lighter."
        eyebrow="CHANGELOG"
        icon={<Sparkles className="size-3.5" />}
        title={
          <>
            What&apos;s new in <span className="text-brand-accent">MoneyBag</span>
          </>
        }
        tone="accent"
      />

      <PublicSection>
        <SectionHeading
          centered
          description="Filter the latest releases by the part of MoneyBag you care about most."
          eyebrow="PRODUCT UPDATES"
          title="Built in public, shipped with care"
          tone="accent"
        />
        <div className="mx-auto mt-16 max-w-4xl lg:mt-20">
          <ChangelogFeed />
          <div className="mt-12 text-center">
            <TextLink href="/blog">Read the stories behind the product</TextLink>
          </div>
        </div>
      </PublicSection>
    </>
  );
}
