'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { QrCode } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { AppButton, AppField } from '@/components/app-ui'
import { AuthOtpInput } from '@/components/auth/AuthOtpInput'
import { twoFactorSchema, type TwoFactorValues } from '@/schemas/auth.schema'

export function TwoFactorSetupForm() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '' },
  })

  function onSubmit(_values: TwoFactorValues) {}

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">{showCodeInput ? 'Verify your code' : 'Set up 2FA'}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {showCodeInput ? 'Enter the 6-digit code from your authenticator app to finish setup.' : 'Scan the QR code with your authenticator app.'}
        </p>
      </div>
      {!showCodeInput && (
        <>
          <div className="mb-4 grid aspect-square w-40 place-items-center rounded-md border border-border bg-muted text-primary shadow-sm">
            <QrCode className="size-20" aria-hidden="true" />
          </div>
          <div className="mb-4 rounded-md border border-border bg-card p-4">
            <div className="text-sm font-semibold text-foreground">Manual setup key</div>
            <code className="mt-2 block rounded-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
              MBAG-W7K9-P4Q2-L8TN
            </code>
          </div>
        </>
      )}
      {showCodeInput ? (
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <AppField error={form.formState.errors.code?.message} label="Authentication code">
            <AuthOtpInput aria-invalid={Boolean(form.formState.errors.code)} autoComplete="one-time-code" id="code" name="code" onValueChange={(value) => form.setValue('code', value, { shouldTouch: true, shouldValidate: true })} value={form.watch('code')} />
          </AppField>
          <AppButton className="w-full" size="lg" type="submit">
            Enable 2FA
          </AppButton>
        </form>
      ) : (
        <AppButton className="w-full" size="lg" onClick={() => setShowCodeInput(true)} type="button">
          Next
        </AppButton>
      )}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/settings/security">
          Do this later
        </Link>
      </div>
    </>
  )
}