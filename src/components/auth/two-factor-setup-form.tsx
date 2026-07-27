"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { QrCode, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AuthFooter,
  AuthHeading,
  AuthTextField,
  SubmitButton,
} from "@/components/auth/form-ui"
import { twoFactorSchema, type TwoFactorValues } from "@/schemas/auth.schema"

export function TwoFactorSetupForm() {
  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  })

  function onSubmit(_values: TwoFactorValues) {}

  return (
    <>
      <AuthHeading
        title="Set up 2FA"
        subtitle="Scan the QR code, then enter the first code from your authenticator app."
      />
      <div className="mb-4 grid aspect-square w-40 place-items-center rounded-md border border-border bg-muted text-primary shadow-sm">
        <QrCode className="size-20" aria-hidden="true" />
      </div>
      <div className="mb-4 rounded-md border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">Manual setup key</div>
        <code className="mt-2 block rounded-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
          MBAG-W7K9-P4Q2-L8TN
        </code>
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
          registration={form.register("code")}
        />
        <SubmitButton>Enable 2FA</SubmitButton>
      </form>
      <AuthFooter>
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/settings/security">
          Do this later
        </Link>
      </AuthFooter>
    </>
  )
}

