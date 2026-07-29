import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Za-z]/, 'Password must include a letter')
  .regex(/\d/, 'Password must include a number');

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email address'),
  password: passwordSchema,
  terms: z.boolean().refine((value) => value, 'You must accept the terms to continue'),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const twoFactorSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
});

export const recoveryCodeSchema = z.object({
  recoveryCode: z
    .string()
    .min(8, 'Enter a valid recovery code')
    .max(32, 'Recovery code is too long'),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type TwoFactorValues = z.infer<typeof twoFactorSchema>;
export type RecoveryCodeValues = z.infer<typeof recoveryCodeSchema>;
