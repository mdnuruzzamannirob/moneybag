'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Eye, EyeOff, Send } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import {
  Controller,
  useForm,
  type FieldErrors,
  type UseFormRegister,
  type UseFormRegisterReturn,
} from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

export type AdminSettingsSectionName =
  | 'general'
  | 'email'
  | 'oauth'
  | 'payment'
  | 'storage'
  | 'security'
  | 'legal'
  | 'smtp'
  | 'auth-providers'
  | 'payment-gateways'
  | 'localization'

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`)
const generalSchema = z.object({
  siteName: requiredText('Site name'),
  currency: requiredText('Default currency'),
  language: requiredText('Default language'),
  maintenance: z.boolean(),
  csvSize: z.coerce
    .number()
    .min(0.1, 'Minimum 0.1 MB')
    .max(10, 'Maximum 10 MB'),
  receiptSize: z.coerce
    .number()
    .min(0.1, 'Minimum 0.1 MB')
    .max(20, 'Maximum 20 MB'),
})
const emailSchema = z.object({
  host: requiredText('SMTP host'),
  port: z.coerce
    .number()
    .int()
    .min(1, 'Port must be between 1 and 65535')
    .max(65535, 'Port must be between 1 and 65535'),
  username: requiredText('SMTP username'),
  password: requiredText('SMTP password'),
  encryption: requiredText('Encryption'),
  fromName: requiredText('From name'),
  fromEmail: z.string().email('Enter a valid email address'),
})
const oauthSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  redirectUris: z.string(),
  enabled: z.boolean(),
})
const paymentSchema = z.object({
  secretKey: z.string(),
  webhookSecret: z.string(),
  enabled: z.boolean(),
})
const storageSchema = z.object({
  cloudName: requiredText('Cloud name'),
  apiKey: requiredText('API key'),
  apiSecret: requiredText('API secret'),
  preset: requiredText('Upload preset'),
  expiry: z.coerce
    .number()
    .int()
    .min(60, 'Minimum 60 seconds')
    .max(3600, 'Maximum 3600 seconds'),
})
const securitySchema = z.object({
  whitelist: z.string(),
  enforceTwoFactor: z.boolean(),
  rateLimit: z.coerce
    .number()
    .int()
    .min(10, 'Minimum 10 requests/minute')
    .max(1000, 'Maximum 1000 requests/minute'),
})
const legalSchema = z.object({
  terms: requiredText('Terms of Service'),
  privacy: requiredText('Privacy Policy'),
})

type SettingsValues = Record<string, unknown>
type FormProps = {
  children: (
    register: UseFormRegister<SettingsValues>,
    errors: FieldErrors<SettingsValues>,
    control: ReturnType<typeof useForm<SettingsValues>>['control'],
  ) => ReactNode
  schema: z.ZodType
  values: SettingsValues
}
const inputClass =
  'mt-2 h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20'
const primaryButtonClass =
  'h-9 rounded-md border-0 bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90'
const outlineButtonClass =
  'h-9 rounded-md border-border bg-transparent px-3 text-sm font-medium text-muted-foreground shadow-none hover:bg-muted hover:text-foreground'

function SettingsForm({ children, schema, values }: FormProps) {
  const [saved, setSaved] = useState(false)
  const form = useForm<SettingsValues>({
    defaultValues: values,
    resolver: zodResolver(schema as never) as never,
  })
  const submit = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 3000)
  }
  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(submit)}>
      {children(form.register, form.formState.errors, form.control)}
      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="min-h-5 text-sm text-success">
          {saved ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4" />
              Settings saved successfully
            </span>
          ) : null}
        </p>
        <Button className={`${primaryButtonClass} max-sm:w-full`} type="submit">
          Save changes
        </Button>
      </div>
    </form>
  )
}

function Card({
  children,
  description,
  title,
}: {
  children: ReactNode
  description?: string
  title: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card shadow-xs">
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}
function Field({
  children,
  error,
  hint,
  label,
}: {
  children: ReactNode
  error?: { message?: string }
  hint?: string
  label: string
}) {
  return (
    <label className="block text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
      {error?.message ? (
        <span className="mt-2 block text-xs font-normal text-destructive">
          {error.message}
        </span>
      ) : hint ? (
        <span className="mt-2 block text-xs font-normal leading-5 text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  )
}
function Switch({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className="relative h-6 w-11 shrink-0 whitespace-nowrap rounded-full bg-muted transition-colors data-[checked=true]:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform data-[checked=true]:after:translate-x-5"
      data-checked={checked}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
    />
  )
}
function ToggleRow({
  checked,
  description,
  label,
  onChange,
}: {
  checked: unknown
  description: string
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch checked={Boolean(checked)} label={label} onChange={onChange} />
    </div>
  )
}
function PasswordInput({ register }: { register: UseFormRegisterReturn }) {
  const [shown, setShown] = useState(false)
  return (
    <div className="relative">
      <input
        {...register}
        className={inputClass}
        type={shown ? 'text' : 'password'}
      />
      <button
        aria-label={shown ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 mt-1 bg-background grid size-5 -translate-y-1/2 place-items-center text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => setShown(!shown)}
        type="button"
      >
        {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}

function GeneralForm() {
  return (
    <SettingsForm
      schema={generalSchema}
      values={{
        siteName: 'MoneyBag',
        currency: 'USD',
        language: 'English',
        maintenance: false,
        csvSize: 10,
        receiptSize: 20,
      }}
    >
      {(register, errors, control) => (
        <>
          <Card
            description="Default platform rules for new MoneyBag accounts."
            title="General"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field error={errors.siteName} label="Site name">
                <input {...register('siteName')} className={inputClass} />
              </Field>
              <Field error={errors.currency} label="Default currency">
                <select {...register('currency')} className={inputClass}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="BDT">BDT — Bangladeshi Taka</option>
                </select>
              </Field>
              <Field error={errors.language} label="Default language">
                <select {...register('language')} className={inputClass}>
                  <option>English</option>
                  <option>Bengali</option>
                </select>
              </Field>
              <Controller
                control={control}
                name="maintenance"
                render={({ field }) => (
                  <div className="pt-6">
                    <ToggleRow
                      checked={field.value}
                      description="Restrict regular-user access while maintenance is in progress."
                      label="Maintenance mode"
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </Card>
          <Card
            description="Limits apply to validated customer uploads."
            title="Upload limits"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                error={errors.csvSize}
                label="Allowed CSV upload size (MB)"
              >
                <input
                  {...register('csvSize')}
                  className={inputClass}
                  min="0.1"
                  max="10"
                  step="0.1"
                  type="number"
                />
              </Field>
              <Field
                error={errors.receiptSize}
                label="Allowed receipt upload size (MB)"
              >
                <input
                  {...register('receiptSize')}
                  className={inputClass}
                  min="0.1"
                  max="20"
                  step="0.1"
                  type="number"
                />
              </Field>
            </div>
          </Card>
        </>
      )}
    </SettingsForm>
  )
}
function EmailForm() {
  return (
    <SettingsForm
      schema={emailSchema}
      values={{
        host: 'smtp.mailprovider.com',
        port: 587,
        username: 'mailer@moneybag.app',
        password: '',
        encryption: 'TLS',
        fromName: 'MoneyBag',
        fromEmail: 'hello@moneybag.app',
      }}
    >
      {(register, errors) => (
        <>
          <Card
            description="Used for verification, password recovery, receipts, and transaction alerts."
            title="SMTP connection"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field error={errors.host} label="SMTP host">
                <input {...register('host')} className={inputClass} />
              </Field>
              <Field error={errors.port} label="SMTP port">
                <input
                  {...register('port')}
                  className={inputClass}
                  type="number"
                />
              </Field>
              <Field error={errors.username} label="SMTP username">
                <input {...register('username')} className={inputClass} />
              </Field>
              <Field error={errors.password} label="SMTP password">
                <PasswordInput register={register('password')} />
              </Field>
              <Field error={errors.encryption} label="Encryption">
                <select {...register('encryption')} className={inputClass}>
                  <option>None</option>
                  <option>TLS</option>
                  <option>SSL</option>
                </select>
              </Field>
            </div>
          </Card>
          <Card title="Sender identity">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field error={errors.fromName} label="From name">
                <input {...register('fromName')} className={inputClass} />
              </Field>
              <Field error={errors.fromEmail} label="From email">
                <input
                  {...register('fromEmail')}
                  className={inputClass}
                  type="email"
                />
              </Field>
            </div>
            <Button className={`mt-5 ${outlineButtonClass} max-sm:w-full`} type="button" variant="outline">
              <Send />
              Test email
            </Button>
          </Card>
        </>
      )}
    </SettingsForm>
  )
}
function OAuthForm() {
  return (
    <SettingsForm
      schema={oauthSchema}
      values={{
        clientId: '',
        clientSecret: '',
        redirectUris: 'https://moneybag.app/api/auth/callback/google',
        enabled: true,
      }}
    >
      {(register, errors, control) => (
        <Card
          description="Allow customers to sign in using their Google account."
          title="Google OAuth"
        >
          <div className="grid mb-5 gap-5 sm:grid-cols-2">
            <Field error={errors.clientId} label="Google client ID">
              <input {...register('clientId')} className={inputClass} />
            </Field>
            <Field error={errors.clientSecret} label="Google client secret">
              <PasswordInput register={register('clientSecret')} />
            </Field>
          </div>
          <Field
            error={errors.redirectUris}
            hint="Enter one authorized callback URL per line."
            label="Authorized redirect URIs"

          >
            <textarea
              {...register('redirectUris')}
              className="mt-2 min-h-28 w-full rounded-md border border-input bg-card p-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
          </Field>
          <div className="mt-5 border-t border-border pt-5">
            <Controller
              control={control}
              name="enabled"
              render={({ field }) => (
                <ToggleRow
                  checked={field.value}
                  description="Display Google as a sign-in option on public authentication screens."
                  label="Enable Google login"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </Card>
      )}
    </SettingsForm>
  )
}
const webhookEvents = [
  ['invoice.paid', 'evt_1Q7M…K18', 'Succeeded', 'Jul 26, 2026'],
  [
    'customer.subscription.updated',
    'evt_1Q7L…J92',
    'Succeeded',
    'Jul 26, 2026',
  ],
  ['checkout.session.completed', 'evt_1Q7K…A43', 'Succeeded', 'Jul 25, 2026'],
  ['invoice.payment_failed', 'evt_1Q7J…T15', 'Failed', 'Jul 24, 2026'],
  [
    'customer.subscription.deleted',
    'evt_1Q7H…P67',
    'Succeeded',
    'Jul 23, 2026',
  ],
]
function PaymentForm() {
  return (
    <SettingsForm
      schema={paymentSchema}
      values={{ secretKey: '', webhookSecret: '', enabled: true }}
    >
      {(register, errors, control) => (
        <>
          <Card
            description="Stripe handles MoneyBag subscriptions and lifetime plan purchases."
            title="Stripe gateway"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field error={errors.secretKey} label="Stripe secret key">
                <PasswordInput register={register('secretKey')} />
              </Field>
              <Field
                error={errors.webhookSecret}
                label="Webhook signing secret"
              >
                <PasswordInput register={register('webhookSecret')} />
              </Field>
            </div>
            <div className="mt-5 border-t border-border pt-5">
              <Controller
                control={control}
                name="enabled"
                render={({ field }) => (
                  <ToggleRow
                    checked={field.value}
                    description="Enable subscription checkout and payment processing."
                    label="Enable payment gateway"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </Card>
          <Card
            description="Last five Stripe webhook deliveries. This data is read-only mock data."
            title="Webhook event log"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-150 text-left text-sm">
                <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {webhookEvents.map(([event, id, status, date]) => (
                    <tr
                      className="border-b border-border last:border-0"
                      key={id}
                    >
                      <td className="py-3 font-medium">{event}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">
                        {id}
                      </td>
                      <td className="py-3">
                        <span
                          className={
                            status === 'Succeeded'
                              ? 'text-success'
                              : 'text-destructive'
                          }
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </SettingsForm>
  )
}
function StorageForm() {
  return (
    <SettingsForm
      schema={storageSchema}
      values={{
        cloudName: 'moneybag',
        apiKey: '',
        apiSecret: '',
        preset: 'moneybag_receipts',
        expiry: 600,
      }}
    >
      {(register, errors) => (
        <Card
          description="Cloudinary stores receipt uploads through signed, time-limited upload URLs."
          title="Cloudinary"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field error={errors.cloudName} label="Cloud name">
              <input {...register('cloudName')} className={inputClass} />
            </Field>
            <Field error={errors.apiKey} label="API key">
              <input {...register('apiKey')} className={inputClass} />
            </Field>
            <Field error={errors.apiSecret} label="API secret">
              <PasswordInput register={register('apiSecret')} />
            </Field>
            <Field error={errors.preset} label="Upload preset">
              <input {...register('preset')} className={inputClass} />
            </Field>
            <Field error={errors.expiry} label="Presigned URL expiry (seconds)">
              <input
                {...register('expiry')}
                className={inputClass}
                min="60"
                max="3600"
                type="number"
              />
            </Field>
          </div>
        </Card>
      )}
    </SettingsForm>
  )
}
function SecurityForm() {
  return (
    <SettingsForm
      schema={securitySchema}
      values={{ whitelist: '', enforceTwoFactor: true, rateLimit: 120 }}
    >
      {(register, errors, control) => (
        <Card
          description="Limit privileged access and protect public API resources."
          title="Security controls"
        >
          <Field
            error={errors.whitelist}
            hint="Enter one IPv4, IPv6, or CIDR range per line. Leave empty to allow trusted admins from any address."
            label="Admin IP whitelist"
          >
            <textarea
              {...register('whitelist')}
              className="mt-2 min-h-28 w-full rounded-md border border-input bg-card p-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20"
              placeholder="203.0.113.0/24"
            />
          </Field>
          <div className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <Field
              error={errors.rateLimit}
              label="API rate limit (requests/min)"
            >
              <input
                {...register('rateLimit')}
                className={inputClass}
                min="10"
                max="1000"
                type="number"
              />
            </Field>
            <Controller
              control={control}
              name="enforceTwoFactor"
              render={({ field }) => (
                <div className="pt-6">
                  <ToggleRow
                    checked={field.value}
                    description="Require TOTP 2FA before administrators can access the admin area."
                    label="Enforce 2FA for admins"
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </Card>
      )}
    </SettingsForm>
  )
}
function LegalForm() {
  return (
    <SettingsForm
      schema={legalSchema}
      values={{
        terms:
          'Terms of Service\n\nBy using MoneyBag, you agree to these terms.',
        privacy:
          'Privacy Policy\n\nWe protect and process personal finance data responsibly.',
      }}
    >
      {(register, errors) => (
        <Card
          description="Manage the customer-facing documents shown during registration and throughout the product."
          title="Legal documents"
        >
          <div className="space-y-6">
            <div>
              <Field error={errors.terms} label="Terms of Service">
                <textarea
                  {...register('terms')}
                  className="mt-2 min-h-48 w-full rounded-md border border-input bg-card p-3 text-sm leading-6 text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
                />
              </Field>
              <p className="mt-2 text-xs text-muted-foreground">
                Last updated: July 12, 2026
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <Field error={errors.privacy} label="Privacy Policy">
                <textarea
                  {...register('privacy')}
                  className="mt-2 min-h-48 w-full rounded-md border border-input bg-card p-3 text-sm leading-6 text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
                />
              </Field>
              <p className="mt-2 text-xs text-muted-foreground">
                Last updated: July 12, 2026
              </p>
            </div>
          </div>
        </Card>
      )}
    </SettingsForm>
  )
}

const sections: Record<AdminSettingsSectionName, () => ReactNode> = {
  general: GeneralForm,
  email: EmailForm,
  oauth: OAuthForm,
  payment: PaymentForm,
  storage: StorageForm,
  security: SecurityForm,
  legal: LegalForm,
  smtp: EmailForm,
  'auth-providers': OAuthForm,
  'payment-gateways': PaymentForm,
  localization: GeneralForm,
}
export function AdminSettingsPanel() {
  return <GeneralForm />
}
export function AdminSettingsSection({
  section,
}: {
  section: AdminSettingsSectionName
}) {
  const Section = sections[section]
  return <Section />
}
