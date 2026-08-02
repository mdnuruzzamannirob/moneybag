'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export function LegalSideNav({ sections }: { sections: readonly { id: string; title: string }[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const updateFromHash = () => {
      const id = window.location.hash.slice(1);
      if (sections.some((section) => section.id === id)) setActiveId(id);
    };

    updateFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
    window.addEventListener('hashchange', updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, [sections]);

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-xs lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-1 text-sm">
        {sections.map((section, index) => {
          const active = activeId === section.id;

          return (
            <li key={section.id}>
              <a
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'block rounded-md px-2.5 py-1.5 transition-colors',
                  active
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
                href={`#${section.id}`}
                onClick={() => setActiveId(section.id)}
              >
                {index + 1}. {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
