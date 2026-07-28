'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { AuthTextField } from '@/components/moneybag-ui'
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
        <Button
          className="h-10 w-full rounded-md border-primary bg-clip-border text-sm font-semibold shadow-sm hover:border-primary"
          size="lg"
          type="submit"
        >
          Continue securely
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/2fa">
          Use authenticator code instead
        </Link>
      </div>
    </>
  )
}