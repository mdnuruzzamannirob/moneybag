'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { AppButton } from '@/components/app-ui';
import { AuthPasswordField } from '@/components/auth/AuthFormFields';
import { resetPasswordSchema, type ResetPasswordValues } from '@/schemas/auth.schema';

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  function onSubmit(_values: ResetPasswordValues) {}

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a new password to secure your MoneyBag account.
        </p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.password}
          id="password"
          label="New password"
          placeholder="At least 8 characters"
          registration={form.register('password')}
          showStrength
          watchValue={form.watch('password')}
        />
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.confirmPassword}
          id="confirmPassword"
          label="Confirm password"
          placeholder="Repeat new password"
          registration={form.register('confirmPassword')}
        />
        <AppButton className="w-full" size="lg" type="submit">
          Update password
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
