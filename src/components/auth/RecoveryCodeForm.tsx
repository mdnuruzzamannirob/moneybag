"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AuthFooter,
  AuthHeading,
  AuthTextField,
  SubmitButton,
} from "@/components/auth/FormUi"
import { recoveryCodeSchema, type RecoveryCodeValues } from "@/schemas/auth.schema"

export function RecoveryCodeForm() {
  const form = useForm<RecoveryCodeValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { recoveryCode: "" },
  })

  function onSubmit(_values: RecoveryCodeValues) {}

  return (
    <>
      <AuthHeading
        title="Recovery code"
        subtitle="Use one of your saved recovery codes if your authenticator is unavailable."
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="one-time-code"
          error={form.formState.errors.recoveryCode}
          icon={<ShieldCheck />}
          id="recoveryCode"
          label="Recovery code"
          placeholder="XXXX-XXXX-XXXX"
          registration={form.register("recoveryCode")}
        />
        <SubmitButton>Continue securely</SubmitButton>
      </form>
      <AuthFooter>
        <Link className="font-medium text-primary  hover:underline" href="/2fa">
          Use authenticator code instead
        </Link>
      </AuthFooter>
    </>
  )
}


