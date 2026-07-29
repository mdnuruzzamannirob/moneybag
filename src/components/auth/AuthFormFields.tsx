'use client';

import { Eye, LockKeyhole } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { AppButton, AppCheckbox, AppInput } from '@/components/app-ui';
import { cn } from '@/lib/utils';

type BaseFieldProps = {
  error?: FieldError;
  label?: string;
  labelAction?: ReactNode;
};
type AuthTextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> &
  BaseFieldProps & { icon?: ReactNode; registration: UseFormRegisterReturn };
type AuthPasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> &
  BaseFieldProps & {
    registration: UseFormRegisterReturn;
    showStrength?: boolean;
    watchValue?: string;
  };

function AuthFieldLayout({
  children,
  error,
  id,
  label,
  labelAction,
}: {
  children: ReactNode;
  error?: FieldError;
  id?: string;
  label?: string;
  labelAction?: ReactNode;
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
      {error?.message ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
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
      <AppInput
        {...props}
        {...registration}
        aria-invalid={Boolean(error)}
        leading={icon}
        type={type}
      />
    </AuthFieldLayout>
  );
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
  const [visible, setVisible] = useState(false);
  const score = usePasswordScore(watchValue);
  const strength = score <= 1 ? 'bg-destructive' : score === 2 ? 'bg-warning' : 'bg-success';
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <AuthFieldLayout error={error} id={props.id} label={label} labelAction={labelAction}>
      <AppInput
        {...props}
        {...registration}
        aria-invalid={Boolean(error)}
        leading={<LockKeyhole />}
        trailing={
          <AppButton
            aria-label={visible ? 'Hide password' : 'Show password'}
            className={cn(
              'size-7! border-0! bg-transparent! px-0! text-muted-foreground hover:text-foreground',
              visible && 'text-primary',
            )}
            onClick={() => setVisible((current) => !current)}
            size="icon-xs"
            tone="secondary"
            type="button"
          >
            <Eye className="size-4" />
          </AppButton>
        }
        type={visible ? 'text' : 'password'}
      />
      {showStrength ? (
        <>
          <div aria-hidden="true" className="grid grid-cols-4 gap-1">
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
  );
}

export function AuthCheckboxField({
  children,
  error,
  registration,
}: {
  children: ReactNode;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <AppCheckbox
        {...registration}
        aria-invalid={Boolean(error)}
        className="mt-0.5"
        id={registration.name}
        label={children}
      />
      {error?.message ? <p className="text-xs text-destructive">{error.message}</p> : null}
    </div>
  );
}

function usePasswordScore(password: string) {
  return useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);
}
