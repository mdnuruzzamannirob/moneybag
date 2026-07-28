'use client'

import { Eye, LockKeyhole } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MoneybagCheckbox, MoneybagInput } from './form-controls'

type BaseFieldProps = {
  error?: FieldError
  label?: string
  labelAction?: ReactNode
}

type AuthTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> &
  BaseFieldProps & {
    icon?: ReactNode
    registration: UseFormRegisterReturn
  }

type AuthPasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type'
> &
  BaseFieldProps & {
    registration: UseFormRegisterReturn
    showStrength?: boolean
    watchValue?: string
  }

function AuthFieldLayout({
  children,
  error,
  id,
  label,
  labelAction,
}: {
  children: ReactNode
  error?: FieldError
  id?: string
  label?: string
  labelAction?: ReactNode
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="font-medium text-foreground" htmlFor={id}>
            {label}
          </label>
          {labelAction}
        </div>
      ) : null}
      {children}
      <FieldErrorMessage error={error} />
    </div>
  )
}

export function AuthTextField({
  error,
  icon,
  label,
  labelAction,
  registration,
  type = 'text',
  ...props
}: AuthTextFieldProps) {
  return (
    <AuthFieldLayout error={error} id={props.id} label={label} labelAction={labelAction}>
      <MoneybagInput
        {...props}
        {...registration}
        aria-invalid={Boolean(error)}
        leading={icon}
        type={type}
      />
    </AuthFieldLayout>
  )
}

export function AuthPasswordField({
  error,
  label,
  labelAction,
  registration,
  showStrength = false,
  watchValue = '',
  ...props
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const score = usePasswordScore(watchValue)
  const strength =
    score <= 1 ? 'bg-destructive' : score === 2 ? 'bg-warning' : 'bg-success'
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <AuthFieldLayout error={error} id={props.id} label={label} labelAction={labelAction}>
      <MoneybagInput
        {...props}
        {...registration}
        aria-invalid={Boolean(error)}
        leading={<LockKeyhole />}
        trailing={
          <Button
            aria-label={visible ? 'Hide password' : 'Show password'}
            className={cn(
              'text-muted-foreground hover:text-foreground',
              visible && 'text-primary',
            )}
            onClick={() => setVisible((current) => !current)}
            size="icon-xs"
            type="button"
            variant="ghost"
          >
            <Eye className="size-4" />
          </Button>
        }
        type={visible ? 'text' : 'password'}
      />
      {showStrength ? (
        <>
          <div className="grid grid-cols-4 gap-1" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <div
                className={cn(
                  'h-1 rounded-full bg-muted transition-colors',
                  index < score && strength,
                )}
                key={index}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {watchValue.length === 0
              ? 'Use 8+ characters with letters, numbers & symbols'
              : `Strength: ${labels[score]}`}
          </p>
        </>
      ) : null}
    </AuthFieldLayout>
  )
}

export function AuthCheckboxField({
  children,
  error,
  registration,
}: {
  children: ReactNode
  error?: FieldError
  registration: UseFormRegisterReturn
}) {
  return (
    <div className="space-y-2">
      <MoneybagCheckbox
        id={registration.name}
        {...registration}
        aria-invalid={Boolean(error)}
        label={children}
      />
      <FieldErrorMessage error={error} />
    </div>
  )
}

function FieldErrorMessage({ error }: { error?: FieldError }) {
  if (!error?.message) return null

  return <p className="text-xs text-destructive">{error.message}</p>
}

function usePasswordScore(password: string) {
  return useMemo(() => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }, [password])
}

