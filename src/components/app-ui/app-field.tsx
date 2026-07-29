import type { ReactNode } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';

export type AppFieldProps = {
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
  required?: boolean;
};
export function AppField({ children, description, error, label, required }: AppFieldProps) {
  return (
    <Field className="gap-2" data-invalid={Boolean(error)}>
      <FieldLabel>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </FieldLabel>
      {children}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}
