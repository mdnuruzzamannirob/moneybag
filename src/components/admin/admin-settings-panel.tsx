'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Eye, EyeOff, Send } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import {
  Controller,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormRegisterReturn,
} from 'react-hook-form'
import { z } from 'zod'

import {
  AppBadge,
  AppButton,
  AppCard,
  AppField,
  AppInput,
  AppSelect,
  AppSwitch,
  AppTable,
  AppTextarea,
  type AppSelectOption,
  type AppTableColumn,
} from '@/components/app-ui'

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
type SettingsControl = Control<SettingsValues>
type FormProps = {
  children: (
    register: UseFormRegister<SettingsValues>,
    errors: FieldErrors<SettingsValues>,
    control: SettingsControl,
  ) => ReactNode
  schema: z.ZodType
  values: SettingsValues
}

const currencyOptions: AppSelectOption[] = [
  { label: 'USD — US Dollar', value: 'USD' },
  { label: 'EUR — Euro', value: 'EUR' },
  { label: 'BDT — Bangladeshi Taka', value: 'BDT' },
]
const languageOptions: AppSelectOption[] = [
  { label: 'English', value: 'English' },
  { label: 'Bengali', value: 'Bengali' },
]

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
        <AppButton className="max-sm:w-full" size="sm" type="submit">
          Save changes
        </AppButton>
      </div>
    </form>
  )
}

function SettingsCard({
  children,
  description,
  title,
}: {
  children: ReactNode
  description?: string
  title: string
}) {
  return (
    <AppCard padding="none">
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </AppCard>
  )
}

function FormField({
  children,
  description,
  error,
  label,
}: {
  children: ReactNode
  description?: string
  error?: { message?: unknown }
  label: string
}) {
  return (
    <AppField
      description={description}
      error={error?.message ? String(error.message) : undefined}
      label={label}
    >
      {children}
    </AppField>
  )
}

function ControlledSelect({
  control,
  name,
  options,
}: {
  control: SettingsControl
  name: string
  options: readonly AppSelectOption[]
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppSelect
          onValueChange={field.onChange}
          options={options}
          value={typeof field.value === 'string' ? field.value : undefined}
        />
      )}
    />
  )
}

function ControlledSwitch({
  control,
  description,
  label,
  name,
}: {
  control: SettingsControl
  description: string
  label: string
  name: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppSwitch
          checked={Boolean(field.value)}
          description={description}
          label={label}
          onCheckedChange={field.onChange}
        />
      )}
    />
  )
}

function PasswordInput({ register }: { register: UseFormRegisterReturn }) {
  const [shown, setShown] = useState(false)
  return (
    <AppInput
      {...register}
      trailing={
        <AppButton
          aria-label={shown ? 'Hide password' : 'Show password'}
          onClick={() => setShown(!shown)}
          size="icon-xs"
          tone="secondary"
          type="button"
        >
          {shown ? <EyeOff /> : <Eye />}
        </AppButton>
      }
      type={shown ? 'text' : 'password'}
    />
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
          <SettingsCard
            description="Default platform rules for new MoneyBag accounts."
            title="General"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField error={errors.siteName} label="Site name">
                <AppInput {...register('siteName')} />
              </FormField>
              <FormField error={errors.currency} label="Default currency">
                <ControlledSelect
                  control={control}
                  name="currency"
                  options={currencyOptions}
                />
              </FormField>
              <FormField error={errors.language} label="Default language">
                <ControlledSelect
                  control={control}
                  name="language"
                  options={languageOptions}
                />
              </FormField>
              <ControlledSwitch
                control={control}
                description="Restrict regular-user access while maintenance is in progress."
                label="Maintenance mode"
                name="maintenance"
              />
            </div>
          </SettingsCard>
          <SettingsCard
            description="Limits apply to validated customer uploads."
            title="Upload limits"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                error={errors.csvSize}
                label="Allowed CSV upload size (MB)"
              >
                <AppInput
                  {...register('csvSize')}
                  max="10"
                  min="0.1"
                  step="0.1"
                  type="number"
                />
              </FormField>
              <FormField
                error={errors.receiptSize}
                label="Allowed receipt upload size (MB)"
              >
                <AppInput
                  {...register('receiptSize')}
                  max="20"
                  min="0.1"
                  step="0.1"
                  type="number"
                />
              </FormField>
            </div>
          </SettingsCard>
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
      {(register, errors, control) => (
        <>
          <SettingsCard
            description="Used for verification, password recovery, receipts, and transaction alerts."
            title="SMTP connection"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField error={errors.host} label="SMTP host">
                <AppInput {...register('host')} />
              </FormField>
              <FormField error={errors.port} label="SMTP port">
                <AppInput {...register('port')} type="number" />
              </FormField>
              <FormField error={errors.username} label="SMTP username">
                <AppInput {...register('username')} />
              </FormField>
              <FormField error={errors.password} label="SMTP password">
                <PasswordInput register={register('password')} />
              </FormField>
              <FormField error={errors.encryption} label="Encryption">
                <ControlledSelect
                  control={control}
                  name="encryption"
                  options={[
                    { label: 'None', value: 'None' },
                    { label: 'TLS', value: 'TLS' },
                    { label: 'SSL', value: 'SSL' },
                  ]}
                />
              </FormField>
            </div>
          </SettingsCard>
          <SettingsCard title="Sender identity">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField error={errors.fromName} label="From name">
                <AppInput {...register('fromName')} />
              </FormField>
              <FormField error={errors.fromEmail} label="From email">
                <AppInput {...register('fromEmail')} type="email" />
              </FormField>
            </div>
            <AppButton
              className="mt-5 max-sm:w-full"
              tone="secondary"
              type="button"
            >
              <Send />
              Test email
            </AppButton>
          </SettingsCard>
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
        <SettingsCard
          description="Allow customers to sign in using their Google account."
          title="Google OAuth"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField error={errors.clientId} label="Google client ID">
              <AppInput {...register('clientId')} />
            </FormField>
            <FormField error={errors.clientSecret} label="Google client secret">
              <PasswordInput register={register('clientSecret')} />
            </FormField>
          </div>
          <div className="mt-5">
            <FormField
              description="Enter one authorized callback URL per line."
              error={errors.redirectUris}
              label="Authorized redirect URIs"
            >
              <AppTextarea {...register('redirectUris')} />
            </FormField>
          </div>
          <ControlledSwitch
            control={control}
            description="Display Google as a sign-in option on public authentication screens."
            label="Enable Google login"
            name="enabled"
          />
        </SettingsCard>
      )}
    </SettingsForm>
  )
}

type WebhookEvent = {
  date: string
  event: string
  id: string
  status: 'Succeeded' | 'Failed'
}
const webhookEvents: WebhookEvent[] = [
  {
    event: 'invoice.paid',
    id: 'evt_1Q7M…K18',
    status: 'Succeeded',
    date: 'Jul 26, 2026',
  },
  {
    event: 'customer.subscription.updated',
    id: 'evt_1Q7L…J92',
    status: 'Succeeded',
    date: 'Jul 26, 2026',
  },
  {
    event: 'checkout.session.completed',
    id: 'evt_1Q7K…A43',
    status: 'Succeeded',
    date: 'Jul 25, 2026',
  },
  {
    event: 'invoice.payment_failed',
    id: 'evt_1Q7J…T15',
    status: 'Failed',
    date: 'Jul 24, 2026',
  },
  {
    event: 'customer.subscription.deleted',
    id: 'evt_1Q7H…P67',
    status: 'Succeeded',
    date: 'Jul 23, 2026',
  },
]
const webhookColumns: readonly AppTableColumn<WebhookEvent>[] = [
  {
    header: 'Event',
    key: 'event',
    render: (row) => <span className="font-medium">{row.event}</span>,
  },
  {
    header: 'ID',
    key: 'id',
    render: (row) => (
      <span className="font-mono text-xs text-muted-foreground">{row.id}</span>
    ),
  },
  {
    header: 'Status',
    key: 'status',
    render: (row) => (
      <AppBadge status={row.status === 'Succeeded' ? 'success' : 'danger'}>
        {row.status}
      </AppBadge>
    ),
  },
  {
    header: 'Received',
    key: 'date',
    render: (row) => <span className="text-muted-foreground">{row.date}</span>,
  },
]

function PaymentForm() {
  return (
    <SettingsForm
      schema={paymentSchema}
      values={{ secretKey: '', webhookSecret: '', enabled: true }}
    >
      {(register, errors, control) => (
        <>
          <SettingsCard
            description="Stripe handles MoneyBag subscriptions and lifetime plan purchases."
            title="Stripe gateway"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField error={errors.secretKey} label="Stripe secret key">
                <PasswordInput register={register('secretKey')} />
              </FormField>
              <FormField
                error={errors.webhookSecret}
                label="Webhook signing secret"
              >
                <PasswordInput register={register('webhookSecret')} />
              </FormField>
            </div>
            <div className="mt-5">
              <ControlledSwitch
                control={control}
                description="Enable subscription checkout and payment processing."
                label="Enable payment gateway"
                name="enabled"
              />
            </div>
          </SettingsCard>
          <SettingsCard
            description="Last five Stripe webhook deliveries. This data is read-only mock data."
            title="Webhook event log"
          >
            <AppTable
              columns={webhookColumns}
              getRowKey={(row) => row.id}
              rows={webhookEvents}
            />
          </SettingsCard>
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
        <SettingsCard
          description="Cloudinary stores receipt uploads through signed, time-limited upload URLs."
          title="Cloudinary"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField error={errors.cloudName} label="Cloud name">
              <AppInput {...register('cloudName')} />
            </FormField>
            <FormField error={errors.apiKey} label="API key">
              <AppInput {...register('apiKey')} />
            </FormField>
            <FormField error={errors.apiSecret} label="API secret">
              <PasswordInput register={register('apiSecret')} />
            </FormField>
            <FormField error={errors.preset} label="Upload preset">
              <AppInput {...register('preset')} />
            </FormField>
            <FormField
              error={errors.expiry}
              label="Presigned URL expiry (seconds)"
            >
              <AppInput
                {...register('expiry')}
                max="3600"
                min="60"
                type="number"
              />
            </FormField>
          </div>
        </SettingsCard>
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
        <SettingsCard
          description="Limit privileged access and protect public API resources."
          title="Security controls"
        >
          <FormField
            description="Enter one IPv4, IPv6, or CIDR range per line. Leave empty to allow trusted admins from any address."
            error={errors.whitelist}
            label="Admin IP whitelist"
          >
            <AppTextarea
              {...register('whitelist')}
              placeholder="203.0.113.0/24"
            />
          </FormField>
          <div className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <FormField
              error={errors.rateLimit}
              label="API rate limit (requests/min)"
            >
              <AppInput
                {...register('rateLimit')}
                max="1000"
                min="10"
                type="number"
              />
            </FormField>
            <ControlledSwitch
              control={control}
              description="Require TOTP 2FA before administrators can access the admin area."
              label="Enforce 2FA for admins"
              name="enforceTwoFactor"
            />
          </div>
        </SettingsCard>
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
        <SettingsCard
          description="Manage the customer-facing documents shown during registration and throughout the product."
          title="Legal documents"
        >
          <div className="space-y-6">
            <FormField
              description="Last updated: July 12, 2026"
              error={errors.terms}
              label="Terms of Service"
            >
              <AppTextarea
                {...register('terms')}
                className="min-h-48 leading-6"
              />
            </FormField>
            <div className="border-t border-border pt-6">
              <FormField
                description="Last updated: July 12, 2026"
                error={errors.privacy}
                label="Privacy Policy"
              >
                <AppTextarea
                  {...register('privacy')}
                  className="min-h-48 leading-6"
                />
              </FormField>
            </div>
          </div>
        </SettingsCard>
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
