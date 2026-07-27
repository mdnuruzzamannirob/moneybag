'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Mail } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
  AuthCheckboxField,
  AuthDivider,
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthPasswordField,
  AuthTextField,
  SocialButtons,
  SubmitButton,
} from '@/components/auth/FormUi'
import { loginSchema, type LoginValues } from '@/schemas/auth.schema'

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'anika@moneybag.app',
      password: 'demo1234',
      remember: true,
    },
  })

  function onSubmit(_values: LoginValues) {}

  return (
    <>
      <AuthHeading
        title="Welcome back"
        subtitle="Sign in to continue tracking your finances"
      />
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="email"
          error={form.formState.errors.email}
          icon={<Mail />}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          registration={form.register('email')}
          type="email"
        />
        <AuthPasswordField
          autoComplete="current-password"
          error={form.formState.errors.password}
          id="password"
          label="Password"
          labelAction={<AuthLink href="/forgot-password">Forgot password?</AuthLink>}
          placeholder="Password"
          registration={form.register('password')}
        />
        <AuthCheckboxField
          error={form.formState.errors.remember}
          registration={form.register('remember')}
        >
          Remember me for 30 days
        </AuthCheckboxField>
        <SubmitButton>Sign in</SubmitButton>
      </form>
      <AuthDivider />
      <SocialButtons />
      <AuthFooter>
        Don&apos;t have an account?{' '}
        <Link
          className="font-medium text-primary underline-offset-4 hover:underline"
          href="/register"
        >
          Sign up
        </Link>
      </AuthFooter>
      <div className="mt-5 flex gap-3 rounded-md border border-info/20 bg-info-soft p-3 text-xs leading-5 text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
        <div>
          <strong className="text-foreground">Demo accounts:</strong>
          <br />
          User: anika@moneybag.app / demo1234
          <br />
          Admin: admin@moneybag.app / admin1234
        </div>
      </div>
    </>
  )
}

