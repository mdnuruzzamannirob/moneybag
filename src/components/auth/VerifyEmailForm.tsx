'use client';

import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { AppButton } from '@/components/app-ui';

export function VerifyEmailForm() {
  const form = useForm({ defaultValues: {} });

  function onSubmit() {}

  return (
    <>
      <div className="mb-5 grid size-12 place-items-center rounded-md bg-info-soft text-info">
        <MailCheck className="size-6" aria-hidden="true" />
      </div>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">Verify your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a verification link to your inbox. Confirm your address to start tracking with
          MoneyBag.
        </p>
      </div>
      <div className="mb-4 rounded-md border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">anika@moneybag.app</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Check spam or promotions if the email is not in your inbox.
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppButton className="w-full" size="lg" type="submit">
          Resend verification email
        </AppButton>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/login">
          Back to sign in
        </Link>
      </div>
    </>
  );
}
