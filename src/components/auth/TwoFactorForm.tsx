'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { AuthOtpInput } from '@/components/auth/AuthOtpInput'
import { twoFactorSchema, type TwoFactorValues } from '@/schemas/auth.schema'

export function TwoFactorForm() {
  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '' },
  })

  function onSubmit(_values: TwoFactorValues) {}

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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="code">Authentication code</label>
          <AuthOtpInput aria-invalid={Boolean(form.formState.errors.code)} autoComplete="one-time-code" id="code" name="code" onValueChange={(value) => form.setValue('code', value, { shouldTouch: true, shouldValidate: true })} value={form.watch('code')} />
          {form.formState.errors.code?.message ? <p className="text-xs text-destructive">{form.formState.errors.code.message}</p> : null}
        </div>
        <Button
          className="h-10 w-full rounded-md border-primary bg-clip-border text-sm font-semibold shadow-sm hover:border-primary"
          size="lg"
          type="submit"
        >
          Verify code
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Lost your device?{' '}
        <Link className="font-medium text-primary hover:underline" href="/2fa/recovery">
          Use recovery code
        </Link>
      </div>
    </>
  )
}