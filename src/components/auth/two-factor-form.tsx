"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthTextField,
  SubmitButton,
} from "@/components/auth/form-ui"
import { twoFactorSchema, type TwoFactorValues } from "@/schemas/auth.schema"

export function TwoFactorForm() {
  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  })

  function onSubmit(_values: TwoFactorValues) {}

  return (
    <>
      <AuthHeading
        title="Two-factor authentication"
        subtitle="Enter the 6-digit code from your authenticator app to continue."
      />
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
        <SubmitButton>Verify code</SubmitButton>
      </form>
      <AuthFooter>
        Lost your device?{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/2fa/recovery">
          Use recovery code
        </Link>
      </AuthFooter>
    </>
  )
}

