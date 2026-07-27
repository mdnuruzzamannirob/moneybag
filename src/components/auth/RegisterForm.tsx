"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, User } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  AuthCheckboxField,
  AuthDivider,
  AuthFooter,
  AuthHeading,
  AuthPasswordField,
  AuthTextField,
  SocialButtons,
  SubmitButton,
} from "@/components/auth/FormUi"
import { registerSchema, type RegisterValues } from "@/schemas/auth.schema"

export function RegisterForm() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  })

  function onSubmit(_values: RegisterValues) {}

  return (
    <>
      <AuthHeading
        title="Create your account"
        subtitle="Start your 14-day Pro trial - no credit card required."
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="name"
          error={form.formState.errors.name}
          icon={<User />}
          id="name"
          label="Full name"
          placeholder="Your full name"
          registration={form.register("name")}
        />
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
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.password}
          id="password"
          label="Password"
          placeholder="At least 8 characters"
          registration={form.register("password")}
          showStrength
          watchValue={form.watch("password")}
        />
        <AuthCheckboxField
          error={form.formState.errors.terms}
          registration={form.register("terms")}
        >
          I agree to the{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
        </AuthCheckboxField>
        <SubmitButton>Create account</SubmitButton>
      </form>
      <AuthDivider />
      <SocialButtons />
      <AuthFooter>
        Already have an account?{" "}
        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/login">
          Sign in
        </Link>
      </AuthFooter>
    </>
  )
}



