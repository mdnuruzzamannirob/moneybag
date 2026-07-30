import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { PageHero } from '@/components/public/public-ui';

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
  return (
    <>
      <PageHero
        compact
        eyebrow="Legal"
        icon={<FileText className="size-3.5" />}
        title={title}
        description={`Last updated: ${updated}`}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:px-8">
        <aside className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    className="text-muted-foreground transition hover:text-primary"
                    href={`#${section.id}`}
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <article className="public-legal lg:col-span-9">
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
