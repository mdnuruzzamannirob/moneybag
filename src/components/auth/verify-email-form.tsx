"use client"

import Link from "next/link"
import { MailCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import { AuthFooter, AuthHeading, SubmitButton } from "@/components/auth/form-ui"

export function VerifyEmailForm() {
  const form = useForm({ defaultValues: {} })

  function onSubmit() {}

  return (
    <>
      <div className="mb-5 grid size-12 place-items-center rounded-md bg-info-soft text-info">
        <MailCheck className="size-6" aria-hidden="true" />
      </div>
      <AuthHeading
        title="Verify your email"
        subtitle="We sent a verification link to your inbox. Confirm your address to start tracking with MoneyBag."
      />
      <div className="mb-4 rounded-md border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">anika@moneybag.app</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Check spam or promotions if the email is not in your inbox.
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubmitButton>Resend verification email</SubmitButton>
      </form>
      <AuthFooter>
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/login">
          Back to sign in
        </Link>
      </AuthFooter>
    </>
  )
}

