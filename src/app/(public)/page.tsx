import {
  ButtonLink,
  DotPattern,
  Eyebrow,
  FaqList,
  FeatureIcon,
  MarketingCard,
  SectionHeading,
  Stars,
  TextLink,
  TrialCta,
  TrustPoints,
} from '@/components/public/public-ui';
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  FileLock2,
  Gauge,
  ListChecks,
  Lock,
  PiggyBank,
  PlayCircle,
  Repeat2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Take control of your money. Together.',
  description:
    'Track wallets, transactions, budgets, savings, and shared family finances with MoneyBag.',
};

const features = [
  {
    icon: Wallet,
    tone: 'primary' as const,
    title: 'Multiple wallets',
    text: 'Track bank, cash, mobile, cards, and investments in separate wallets with their own balances.',
  },
  {
    icon: Repeat2,
    tone: 'accent' as const,
    title: 'Recurring transactions',
    text: 'Set rent, salary, or subscriptions once. We create entries on the schedule you choose.',
  },
  {
    icon: Target,
    tone: 'success' as const,
    title: 'Budgets that roll over',
    text: 'Set monthly limits per category. Unspent budget automatically carries forward.',
  },
  {
    icon: PiggyBank,
    tone: 'warning' as const,
    title: 'Savings goals',
    text: 'See every goal move forward. Contribute or withdraw any time with a clear history.',
  },
  {
    icon: BarChart3,
    tone: 'info' as const,
    title: 'Beautiful reports',
    text: 'See monthly, yearly, category, and daily trends. Export PDF or CSV in one click.',
  },
  {
    icon: Users,
    tone: 'accent' as const,
    title: 'Family on Pro',
    text: 'Share a wallet, split expenses, settle balances, and pool budgets with up to 5 members.',
  },
];

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'Designer · Berlin',
    quote:
      'MoneyBag finally gave our family one calm place to talk about money. We saved $4,200 in our first year.',
  },
  {
    initials: 'FK',
    name: 'Fatima Khan',
    role: 'Freelancer · Dubai',
    quote:
      'The CSV importer saved me hours, and the reports finally show where every invoice goes.',
  },
  {
    initials: 'AT',
    name: 'Ahmed Tariq',
    role: 'Developer · Karachi',
    quote:
      'Clean budgets, no ads, and family sharing that makes sense. It paid for itself immediately.',
  },
] as const;

const homeFaq = [
  {
    question: 'Is MoneyBag free to use?',
    answer:
      'Yes. The Free plan includes one wallet, 50 monthly transactions, two budgets, one savings goal, and basic reports.',
  },
  {
    question: 'Can I use MoneyBag with my family?',
    answer:
      'Yes. Pro plans include a family group for up to five members, shared wallets, pooled budgets, expense splits, and settle-up balances.',
  },
  {
    question: 'Do I need a credit card for the trial?',
    answer:
      'No. Start the full 14-day Pro trial without a credit card and choose a plan only if MoneyBag works for you.',
  },
  {
    question: 'Can I import transactions from my bank?',
    answer:
      'Yes. Upload a CSV from any bank and MoneyBag will help map the date, description, and amount columns.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <DotPattern className="opacity-65" />
        <div className="relative mx-auto grid min-h-[400px] max-w-7xl items-center gap-14 px-4 py-12 sm:min-h-[440px] sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Eyebrow icon={<Sparkles className="size-3.5" />}>New · Family sharing on Pro</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Take control of your money. <span className="text-primary">Together.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              MoneyBag is a personal and family finance platform. Track wallets, transactions,
              budgets, and savings—then share with up to 5 family members on Pro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/register">
                Start your 14-day trial <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/pricing" tone="secondary">
                <PlayCircle className="size-4" /> See how it works
              </ButtonLink>
            </div>
            <div className="mt-6">
              <TrustPoints items={['14-day Pro trial', 'No credit card', 'Cancel anytime']} />
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            ['10k+', 'Active users'],
            ['$2M+', 'Tracked monthly'],
            ['4.8★', 'User rating'],
            ['99.9%', 'Uptime'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Everything you need"
          icon={<Zap className="size-3.5" />}
          title="A finance app that grows with you."
          description="From your first budget to sharing a family wallet—MoneyBag handles it all in one calm, focused interface."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, tone, title, text }) => (
            <MarketingCard key={title}>
              <FeatureIcon tone={tone}>
                <Icon className="size-5" />
              </FeatureIcon>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
            </MarketingCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <TextLink href="/features">Explore all features</TextLink>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="How it works"
            icon={<ListChecks className="size-3.5" />}
            title="Three steps to clarity."
          />
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-linear-to-r from-transparent via-indigo-200 to-transparent md:block" />
            {[
              [
                '1',
                'Add your wallets',
                'Create a wallet for each account—bank, cash, or card—and choose a default.',
              ],
              [
                '2',
                'Log every transaction',
                'Add income, expenses, or transfers. Tag, categorize, and add a useful note.',
              ],
              [
                '3',
                'Budget, save, share',
                'Plan flexible budgets, track savings goals, and invite your family when ready.',
              ],
            ].map(([step, title, text]) => (
              <div className="relative" key={step}>
                <span className="grid size-14 place-items-center rounded-lg bg-primary text-lg font-bold text-white shadow-md">
                  {step}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-5">
          <FamilyCard />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow icon={<Users className="size-3.5" />}>Pro feature</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Money is easier together.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Create a family group, share wallets, split bills, and see who owes whom at a glance.
            Everyone gets the right level of access.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              'Shared wallets everyone can see',
              'Equal, percentage, or exact expense splits',
              'Pooled budgets with helpful alerts',
              'One-tap settlements with full history',
            ].map((item) => (
              <li className="flex items-start gap-3" key={item}>
                <Check className="mt-0.5 size-5 text-success" />
                {item}
              </li>
            ))}
          </ul>
          <TextLink className="mt-7" href="/pricing">
            Explore family features
          </TextLink>
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            centered
            eyebrow="LOVED BY USERS"
            title="Real people, real money"
            tone="warning"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <MarketingCard key={testimonial.name}>
                <Stars />
                <blockquote className="mt-4 text-sm leading-7">“{testimonial.quote}”</blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </MarketingCard>
            ))}
          </div>
          <div className="mt-8 text-center">
            <TextLink href="/customers">Read customer stories</TextLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          centered
          description="Start free, upgrade when you need unlimited tracking and family sharing."
          eyebrow="SIMPLE PRICING"
          title="Plans that grow with you"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          <MarketingCard>
            <p className="text-sm font-bold text-muted-foreground">Free</p>
            <p className="mt-2 text-4xl font-bold">$0</p>
            <p className="mt-1 text-sm text-muted-foreground">Forever</p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              One wallet, 50 monthly transactions, two budgets, and one savings goal.
            </p>
          </MarketingCard>
          <MarketingCard className="border-2 border-primary shadow-lg">
            <Eyebrow>BEST FOR MOST</Eyebrow>
            <p className="mt-4 text-sm font-bold text-primary">Pro Monthly</p>
            <p className="mt-2 text-4xl font-bold">$4.99</p>
            <p className="mt-1 text-sm text-muted-foreground">per month</p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Unlimited tracking, advanced reports, CSV import, and family sharing.
            </p>
          </MarketingCard>
          <MarketingCard className="bg-foreground text-background">
            <p className="text-sm font-bold text-brand-accent">Unlimited</p>
            <p className="mt-2 text-4xl font-bold">$99.99</p>
            <p className="mt-1 text-sm text-background/65">One-time payment</p>
            <p className="mt-5 text-sm leading-6 text-background/75">
              Every Pro feature now and every future Pro upgrade, with no recurring bill.
            </p>
          </MarketingCard>
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/pricing">
            See full pricing <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading centered eyebrow="FAQ" title="Frequently asked" />
          <div className="mt-8">
            <FaqList items={homeFaq} />
          </div>
          <div className="mt-7 text-center">
            <TextLink href="/faq">See every question</TextLink>
          </div>
        </div>
      </section>

      <section id="security" className="scroll-mt-24 border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-24">
          <div>
            <Eyebrow>Security & privacy</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Built to protect your data.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Your financial data is sensitive. We treat it that way.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
            {[
              [
                Lock,
                'Encrypted sessions',
                'Strong authentication with short-lived sessions and secure refresh.',
              ],
              [
                CreditCard,
                'Safe payments',
                'Payment details stay with our PCI-compliant payment provider.',
              ],
              [
                Gauge,
                'Abuse protection',
                'Rate limits and monitoring protect sensitive account actions.',
              ],
              [
                FileLock2,
                'Privacy controls',
                'Export your data or permanently delete your account at any time.',
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Lock;
              return (
                <article className="rounded-lg border border-border p-5" key={title as string}>
                  <I className="size-5 text-primary" />
                  <h3 className="mt-3 font-semibold">{title as string}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <TrialCta />
    </>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="relative rounded-lg border border-border bg-card p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total balance
            </p>
            <p className="mt-1 text-3xl font-bold">
              $12,840.<span className="text-muted-foreground">25</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-xs font-medium text-success">
            <TrendingUp className="size-3.5" /> +8.2%
          </span>
        </div>
        <svg viewBox="0 0 320 90" className="mt-5 h-24 w-full" aria-label="Weekly balance trend">
          <defs>
            <linearGradient id="home-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity=".3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 70L40 55 80 62 120 40 160 48 200 25 240 35 280 18 320 22V90H0Z"
            fill="url(#home-area)"
          />
          <path
            d="M0 70L40 55 80 62 120 40 160 48 200 25 240 35 280 18 320 22"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="mt-0.5 font-semibold text-success">+$4,200</p>
          </div>
          <div className="rounded-md bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Expense</p>
            <p className="mt-0.5 font-semibold text-danger">−$2,180</p>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 -top-7 -rotate-3 rounded-md border border-border bg-card p-3 shadow-lg sm:-left-7">
        <p className="text-[11px] text-muted-foreground">Main wallet</p>
        <p className="text-sm font-semibold">$8,420.10</p>
      </div>
      <div className="absolute -bottom-7 -right-2 rotate-2 rounded-md border border-border bg-card p-3 shadow-lg">
        <p className="text-[11px] text-muted-foreground">Groceries budget</p>
        <p className="text-sm font-semibold">$320 / $500</p>
        <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[64%] rounded-full bg-linear-to-r from-primary to-brand-accent" />
        </div>
      </div>
    </div>
  );
}

function FamilyCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-md">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Family balances</p>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>
      <ul className="mt-4 space-y-3">
        {[
          ['AM', 'Amelia', 'Editor', '+$120.00', 'text-success'],
          ['JR', 'Jordan', 'Editor', '−$48.50', 'text-danger'],
          ['SK', 'Sam', 'Viewer', '$0.00', 'text-muted-foreground'],
        ].map(([initials, name, role, amount, color]) => (
          <li className="flex items-center justify-between" key={name}>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </span>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${color}`}>{amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-md bg-secondary p-3">
        <div>
          <p className="text-xs text-muted-foreground">Settle up</p>
          <p className="text-sm font-semibold">Jordan → Amelia</p>
        </div>
        <span className="ui-gradient-primary inline-flex items-center justify-center rounded-md transition-[transform,box-shadow,filter] hover:-translate-y-px hover:brightness-[.98] hover:shadow-sm px-3 py-2 text-xs font-semibold">
          Settle $48.50
        </span>
      </div>
    </div>
  );
}
