'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { AppButton } from '@/components/app-ui'
import { AuthTextField } from '@/components/auth/AuthFormFields'
import { recoveryCodeSchema, type RecoveryCodeValues } from '@/schemas/auth.schema'

export function RecoveryCodeForm() {
  const form = useForm<RecoveryCodeValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { recoveryCode: '' },
  })

  function onSubmit(_values: RecoveryCodeValues) {}

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">Recovery code</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use one of your saved recovery codes if your authenticator is unavailable.
        </p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="one-time-code"
          error={form.formState.errors.recoveryCode}
          icon={<ShieldCheck />}
          id="recoveryCode"
          label="Recovery code"
          placeholder="XXXX-XXXX-XXXX"
          registration={form.register('recoveryCode')}
        />
        <AppButton
          className="w-full"
          size="lg"
          type="submit"
        >
          Continue securely
        </AppButton>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/2fa">
          Use authenticator code instead
        </Link>
      </div>
    </>
  )
}