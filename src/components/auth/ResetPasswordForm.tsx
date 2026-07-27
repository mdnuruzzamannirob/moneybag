"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthPasswordField,
  SubmitButton,
} from "@/components/auth/FormUi"
import { resetPasswordSchema, type ResetPasswordValues } from "@/schemas/auth.schema"

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  function onSubmit(_values: ResetPasswordValues) {}

  return (
    <>
      <AuthHeading
        title="Reset your password"
        subtitle="Choose a new password to secure your MoneyBag account."
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.password}
          id="password"
          label="New password"
          placeholder="At least 8 characters"
          registration={form.register("password")}
          showStrength
          watchValue={form.watch("password")}
        />
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.confirmPassword}
          id="confirmPassword"
          label="Confirm password"
          placeholder="Repeat new password"
          registration={form.register("confirmPassword")}
        />
        <SubmitButton>Update password</SubmitButton>
      </form>
      <AuthFooter>
        <AuthLink href="/login">Back to sign in</AuthLink>
      </AuthFooter>
    </>
  )
}


