import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { TrialCta } from '@/components/public/public-ui';
import { blogPosts } from '@/lib/public-content';

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : { title: 'Article not found' };
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <>
      <article>
        <header className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:pb-20 lg:pt-20">
          <div className="pointer-events-none [background-image:radial-gradient(color-mix(in_srgb,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:22px_22px] absolute inset-0 opacity-45" />
          <div className="relative mx-auto max-w-3xl">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              href="/blog"
            >
              <ArrowLeft className="size-4" />
              Back to the journal
            </Link>
            <p className="mt-10 text-sm font-semibold text-primary">{post.category}</p>
            <h1 className="mt-3 font-ubuntu text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>
        <div
          className={`pointer-events-none [background-image:radial-gradient(color-mix(in_srgb,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:22px_22px] mx-auto h-72 max-w-5xl rounded-lg bg-linear-to-br ${post.color} sm:h-96`}
        />
        <div className="[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_p]:leading-[1.8] [&_p]:text-muted-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:mb-1.5 [&_li]:leading-[1.7] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[3px] mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {post.sections.map((section, index) => (
            <section key={section.heading ?? index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p className="text-base" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <p className="font-semibold">Put the idea into practice</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              MoneyBag gives you one calm place to track the numbers, review what changed, and make
              your next plan.
            </p>
          </div>
        </div>
      </article>
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="font-ubuntu text-2xl font-bold">Keep reading</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <Link className="rounded-lg border border-border bg-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md p-6" href={`/blog/${item.slug}`} key={item.slug}>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <TrialCta title="Make the next month feel clearer." />
    </>
  );
}
