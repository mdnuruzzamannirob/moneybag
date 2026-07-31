'use client';

import {
  AppAlert,
  AppButton,
  AppCheckbox,
  AppField,
  AppInput,
  AppSelect,
  AppTextarea,
} from '@/components/app-ui';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const topics = [
  { label: 'General inquiry', value: 'general' },
  { label: 'Technical support', value: 'support' },
  { label: 'Billing question', value: 'billing' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Press / media', value: 'press' },
  { label: 'Security issue', value: 'security' },
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <AppField label="First name" required>
          <AppInput autoComplete="given-name" name="firstName" placeholder="Mira" required />
        </AppField>
        <AppField label="Last name" required>
          <AppInput autoComplete="family-name" name="lastName" placeholder="Shah" required />
        </AppField>
      </div>
      <AppField label="Email" required>
        <AppInput
          autoComplete="email"
          name="email"
          placeholder="mira@example.com"
          required
          type="email"
        />
      </AppField>
      <AppField label="Subject">
        <AppSelect
          ariaLabel="Message subject"
          defaultValue="general"
          name="topic"
          options={topics}
        />
      </AppField>
      <AppField label="Message" required>
        <AppTextarea name="message" placeholder="Tell us what's on your mind..." required />
      </AppField>
      <AppCheckbox
        id="contact-consent"
        label={
          <span className="font-normal text-muted-foreground">
            I agree to the{' '}
            <Link className="text-primary underline underline-offset-2" href="/terms">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="text-primary underline underline-offset-2" href="/privacy">
              Privacy Policy
            </Link>
            .
          </span>
        }
        name="consent"
        required
      />
      <AppButton size="lg" type="submit">
        Send message <Send className="size-4" />
      </AppButton>
      {submitted ? (
        <AppAlert title="Message sent" tone="success">
          This demo request was received. The MoneyBag team usually replies within 24 hours.
        </AppAlert>
      ) : null}
    </form>
  );
}
