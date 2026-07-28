'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { AuthTextField } from '@/components/moneybag-ui'
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
        <AuthTextField
          autoComplete="one-time-code"
          error={form.formState.errors.code}
          icon={<ShieldCheck />}
          id="code"
          inputMode="numeric"
          label="Authentication code"
          maxLength={6}
          placeholder="000000"
          registration={form.register('code')}
        />
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