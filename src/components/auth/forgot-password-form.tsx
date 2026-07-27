"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthTextField,
  SubmitButton,
} from "@/components/auth/form-ui"
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/schemas/auth.schema"

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  function onSubmit(_values: ForgotPasswordValues) {}

  return (
    <>
      <AuthHeading
        title="Forgot your password?"
        subtitle="Enter your email and we'll send you a reset link."
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="email"
          error={form.formState.errors.email}
          icon={<Mail />}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          registration={form.register("email")}
          type="email"
        />
        <SubmitButton>Send reset link</SubmitButton>
      </form>
      <AuthFooter>
        <AuthLink href="/login">Back to sign in</AuthLink>
      </AuthFooter>
    </>
  )
}

