import type { Metadata } from 'next';
import { Clock3, LifeBuoy, Mail, MapPin, MessageSquare } from 'lucide-react';
import { FeatureIcon, PageHero } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the MoneyBag team.',
};
const inputClass =
  'mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact"
        icon={<MessageSquare className="size-3.5" />}
        title={
          <>
            Let’s talk about <span className="public-text-gradient">your money goals.</span>
          </>
        }
        description="Whether you need product help or want to share an idea, the right person on our team will get back to you."
      />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          {[
            [Mail, 'General questions', 'hello@moneybag.app'],
            [LifeBuoy, 'Product support', 'support@moneybag.app'],
            [Clock3, 'Typical response', 'Within one business day'],
            [MapPin, 'Working style', 'Remote team · Worldwide'],
          ].map(([Icon, title, text], index) => {
            const I = Icon as typeof Mail;
            return (
              <div
                className="flex gap-4 rounded-2xl border border-border bg-card p-5"
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
                <div>
                  <p className="font-semibold">{title as string}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text as string}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              First name
              <input className={inputClass} name="firstName" placeholder="Alex" />
            </label>
            <label className="text-sm font-medium">
              Last name
              <input className={inputClass} name="lastName" placeholder="Morgan" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium">
            Email address
            <input
              className={inputClass}
              name="email"
              type="email"
              placeholder="alex@example.com"
            />
          </label>
          <label className="mt-5 block text-sm font-medium">
            What can we help with?
            <select className={inputClass} name="topic" defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              <option>Product question</option>
              <option>Account support</option>
              <option>Billing</option>
              <option>Partnership</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="mt-5 block text-sm font-medium">
            Message
            <textarea
              className={`${inputClass} min-h-36 resize-y`}
              name="message"
              placeholder="Tell us a little about what you need…"
            />
          </label>
          <button
            className="public-button-primary mt-6 px-5 py-3 text-sm font-semibold"
            type="submit"
          >
            Send message
          </button>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            By submitting, you agree that we may use your details to respond to this request.
          </p>
        </form>
      </section>
    </>
  );
}
