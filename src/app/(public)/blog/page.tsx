import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import { PageHero } from '@/components/public/public-ui';
import { blogPosts } from '@/lib/public-content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical guides for calmer personal and family finances.',
};
export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  return (
    <>
      <PageHero
        compact
        eyebrow="BLOG"
        icon={<BookOpen className="size-3.5" />}
        title={
          <>
            Money talks, <span className="text-primary">we listen.</span>
          </>
        }
        description="Tips, guides, and stories about personal finance."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-sm lg:grid-cols-2"
        >
          <div
            className={`pointer-events-none [background-image:radial-gradient(color-mix(in_srgb,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:22px_22px] relative min-h-72 bg-linear-to-br ${featured.color}`}
          >
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
              Featured article
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-sm font-semibold text-primary">{featured.category}</p>
            <h2 className="mt-3 font-ubuntu text-3xl font-bold leading-tight tracking-tight group-hover:text-primary">
              {featured.title}
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{featured.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" />
                {featured.readTime}
              </span>
            </div>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Read article <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              className="rounded-lg border border-border bg-card overflow-hidden"
              key={post.slug}
            >
              <Link href={`/blog/${post.slug}`}>
                <div
                  className={`pointer-events-none [background-image:radial-gradient(color-mix(in_srgb,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:22px_22px] h-44 bg-linear-to-br ${post.color}`}
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {post.category}
                  </p>
                  <h2 className="mt-2 font-ubuntu text-xl font-bold leading-snug">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
