'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { AppButton } from '@/components/app-ui';
import { AuthTextField } from '@/components/auth/AuthFormFields';
import { forgotPasswordSchema, type ForgotPasswordValues } from '@/schemas/auth.schema';

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(_values: ForgotPasswordValues) {
    router.push('/reset-password');
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="email"
          error={form.formState.errors.email}
          icon={<Mail />}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          registration={form.register('email')}
          type="email"
        />
        <AppButton className="w-full" size="lg" type="submit">
          Send reset link
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
