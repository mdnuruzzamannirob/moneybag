'use client';

import { Camera, CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { AppButton } from '@/components/app-ui';
import { SettingsPanel } from '@/components/user/settings-panel';

const inputClass =
  'h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/20';
const outlineButtonClass =
  'h-9 rounded-md border-border bg-transparent px-3 text-sm font-medium text-muted-foreground shadow-none hover:bg-muted hover:text-foreground';

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <h2 className="mb-6 text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
function PasswordInput({ placeholder }: { placeholder?: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <input
        className={`${inputClass} pr-11`}
        placeholder={placeholder}
        type={shown ? 'text' : 'password'}
      />
      <button
        aria-label={shown ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 grid size-5 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"
        onClick={() => setShown(!shown)}
        type="button"
      >
        {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export type AdminProfileSection = 'profile' | 'security';
export function AdminProfilePanel() {
  return <AdminProfileSectionPanel section="profile" />;
}
export function AdminProfileSectionPanel({ section }: { section: AdminProfileSection }) {
  return <SettingsPanel section={section} />;
}

function Profile() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@moneybag.app');
  return (
    <Card title="Your profile">
      <div className="mb-7 flex flex-wrap items-center gap-4 border-b border-border pb-6">
        <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          AU
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Profile photo</p>
          <p className="mt-1 text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
        </div>
        <Button className={`${outlineButtonClass} max-sm:w-full`} variant="outline">
          <Camera />
          Change photo
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-foreground">
          Full name
          <input
            className={inputClass}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-foreground">
          Email address
          <input
            className={inputClass}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </label>
      </div>
      <div className="mt-7 flex justify-end border-t border-border pt-5 max-sm:[&_button]:w-full">
        <AppButton size="sm">Save changes</AppButton>
      </div>
    </Card>
  );
}

function ExactRow({
  action,
  hint,
  label,
}: {
  action: React.ReactNode;
  hint: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>
      </div>
      <div className="shrink-0 max-sm:w-full max-sm:[&>button:not([role=switch])]:w-full">
        {action}
      </div>
    </div>
  );
}
function ExactSecurity() {
  const [enforced, setEnforced] = useState(true);
  return (
    <Card title="Security & sign-in">
      <ExactRow
        action={
          <Button className={outlineButtonClass} variant="outline">
            Change password
          </Button>
        }
        hint="Last changed: 12 June 2026"
        label="Password"
      />
      <ExactRow
        action={
          <Button className={outlineButtonClass} variant="outline">
            Manage
          </Button>
        }
        hint="Two-factor authentication is enabled for this administrator"
        label="Two-factor authentication (2FA)"
      />
      <ExactRow
        action={
          <button
            aria-checked={enforced}
            aria-label="Enforce 2FA for administrators"
            className="relative h-6 w-11 shrink-0 rounded-full bg-muted transition-colors data-[checked=true]:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform data-[checked=true]:after:translate-x-5"
            data-checked={enforced}
            onClick={() => setEnforced(!enforced)}
            role="switch"
            type="button"
          />
        }
        hint="Require an authenticator code for every administrator sign-in"
        label="Enforce 2FA for admins"
      />
      <ExactRow
        action={
          <Button className={outlineButtonClass} variant="outline">
            <KeyRound />
            Backup codes
          </Button>
        }
        hint="Generate new recovery codes if you lose access to your authenticator"
        label="Recovery codes"
      />
    </Card>
  );
}

function Security() {
  const [twoFactor, setTwoFactor] = useState(true);
  return (
    <div className="space-y-6">
      <Card title="Administrator security">
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Two-factor authentication</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Protect admin access with a code from an authenticator app.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 max-sm:w-full max-sm:[&>button]:flex-1">
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-success">
              <CheckCircle2 className="size-4" />
              Enabled
            </span>
            <Button className={outlineButtonClass} variant="outline">
              Manage
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Enforce 2FA for administrators</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Require every administrator to complete 2FA before signing in.
            </p>
          </div>
          <button
            aria-checked={twoFactor}
            aria-label="Enforce two-factor authentication"
            className="relative h-6 w-11 shrink-0 rounded-full bg-muted transition-colors data-[checked=true]:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform data-[checked=true]:after:translate-x-5"
            data-checked={twoFactor}
            onClick={() => setTwoFactor(!twoFactor)}
            role="switch"
            type="button"
          />
        </div>
      </Card>
      <Card title="Change password">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-foreground sm:col-span-2">
            Current password
            <PasswordInput placeholder="Current password" />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground">
            New password
            <PasswordInput placeholder="New password" />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground">
            Confirm password
            <PasswordInput placeholder="Confirm password" />
          </label>
        </div>
        <div className="mt-5 flex justify-end max-sm:[&_button]:w-full">
          <AppButton size="sm">Update password</AppButton>
        </div>
      </Card>
      <Card title="Recovery">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <KeyRound className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Backup codes</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Generate new one-time codes if you lose access to your authenticator.
              </p>
            </div>
          </div>
          <Button className={`${outlineButtonClass} max-sm:w-full`} variant="outline">
            <ShieldCheck />
            Generate codes
          </Button>
        </div>
      </Card>
    </div>
  );
}
