import type { Metadata } from 'next';
import { Heart, Lightbulb, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { FeatureIcon, PageHero, SectionHeading, TrialCta } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why MoneyBag is building a calmer way to manage personal and family finances.',
};
const values = [
  [
    Lightbulb,
    'Clarity over clutter',
    'We make the next money decision easier instead of adding more dashboards to check.',
  ],
  [
    Heart,
    'Progress without shame',
    'Money is personal. The product should inform and encourage, never judge.',
  ],
  [
    ShieldCheck,
    'Privacy is a feature',
    'We collect what the service needs and give people practical control over their data.',
  ],
  [
    Users,
    'Built for together',
    'Personal finance often becomes family finance. Collaboration should feel natural and fair.',
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        icon={<Sparkles className="size-3.5" />}
        title={
          <>
            Calmer money starts with <span className="public-text-gradient">clearer tools.</span>
          </>
        }
        description="MoneyBag exists to make everyday finances understandable—for one person, a couple, or a whole household."
      />
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <SectionHeading
              eyebrow="Why MoneyBag"
              title="Finance software should feel human."
              description="Most tools either simplify until they stop being useful or grow into a maze. We are building a third option: capable enough for real life, calm enough to use every week."
            />
            <p className="mt-5 leading-7 text-muted-foreground">
              That means thoughtful defaults, honest pricing, clear language, and collaboration that
              respects each person. We want MoneyBag to be the quiet place where your financial life
              makes sense.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-500 via-violet-500 to-pink-500 p-8 text-white shadow-xl sm:p-10">
            <div className="public-dots absolute inset-0 opacity-20" />
            <div className="relative">
              <p className="text-sm font-medium text-white/75">Our north star</p>
              <blockquote className="mt-5 font-ubuntu text-3xl font-bold leading-tight sm:text-4xl">
                “Help people talk about money with more context and less stress.”
              </blockquote>
              <p className="mt-8 text-sm text-white/80">The MoneyBag team</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading eyebrow="What guides us" title="Principles behind the product." centered />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map(([Icon, title, text], index) => {
            const I = Icon as typeof Heart;
            return (
              <article className="public-card p-6" key={title as string}>
                <FeatureIcon
                  tone={
                    ['primary', 'accent', 'success', 'violet'][index] as
                      'primary' | 'accent' | 'success' | 'violet'
                  }
                >
                  <I className="size-5" />
                </FeatureIcon>
                <h3 className="mt-4 text-lg font-semibold">{title as string}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            ['50k+', 'people building clarity'],
            ['2M+', 'transactions understood'],
            ['120+', 'countries represented'],
            ['4.8/5', 'average user rating'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-ubuntu text-3xl font-bold">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <TrialCta title="Come build a calmer money habit." />
    </>
  );
}
