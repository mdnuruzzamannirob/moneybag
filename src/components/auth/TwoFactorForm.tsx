'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { AppButton, AppField } from '@/components/app-ui';
import { AuthOtpInput } from '@/components/auth/AuthOtpInput';
import { twoFactorSchema, type TwoFactorValues } from '@/schemas/auth.schema';

export function TwoFactorForm() {
  const router = useRouter();
  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '' },
  });

  function onSubmit(_values: TwoFactorValues) {
    router.push('/dashboard');
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">
          Two-factor authentication
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app to continue.
        </p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AppField error={form.formState.errors.code?.message} label="Authentication code">
          <AuthOtpInput
            aria-invalid={Boolean(form.formState.errors.code)}
            autoComplete="one-time-code"
            id="code"
            name="code"
            onValueChange={(value) =>
              form.setValue('code', value, { shouldTouch: true, shouldValidate: true })
            }
            value={form.watch('code')}
          />
        </AppField>
        <AppButton className="w-full" size="lg" type="submit">
          Verify code
        </AppButton>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Lost your device?{' '}
        <Link className="font-medium text-primary hover:underline" href="/2fa/recovery">
          Use recovery code
        </Link>
      </div>
    </>
  );
}
