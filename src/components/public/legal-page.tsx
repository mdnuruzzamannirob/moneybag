import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { PageHero } from '@/components/public/public-ui';
import { LegalSideNav } from '@/components/public/legal-side-nav';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LegalSection = { id: string; title: string; content: ReactNode };
export function LegalPage({
  title,
  updated,
  sections,
  intro,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const isTerms = title === 'Terms of Service';

  return (
    <>
      <PageHero
        compact
        eyebrow="LEGAL"
        icon={<FileText className="size-3.5" />}
        title="Terms & Privacy"
        description={`Clear terms, plain-language privacy details, and no surprises. Last updated ${updated}.`}
      />
      <nav className=" bg-card" aria-label="Legal documents">
        <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
          <Link
            className={cn(
              'border-b-2 px-5 py-4 text-sm font-semibold transition-colors',
              isTerms
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className={cn(
              'border-b-2 px-5 py-4 text-sm font-semibold transition-colors',
              !isTerms
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </div>
      </nav>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <aside className="lg:col-span-3">
          <LegalSideNav sections={sections.map(({ id, title: sectionTitle }) => ({ id, title: sectionTitle }))} />
        </aside>
        <article className="rounded-lg border border-border bg-card p-6 shadow-xs [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_p]:leading-[1.8] [&_p]:text-muted-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:mb-1.5 [&_li]:leading-[1.7] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[3px] sm:p-8 lg:col-span-9 lg:p-10">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p>{intro}</p>
          {sections.map((section, index) => (
            <section key={section.id}>
              <h2 id={section.id}>
                {index + 1}. {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
