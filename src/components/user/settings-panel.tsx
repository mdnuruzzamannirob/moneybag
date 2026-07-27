"use client"

import { Camera, ChevronRight, Download, LogOut, ShieldCheck } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

type Section = "profile" | "security" | "preferences" | "notifications" | "billing" | "privacy"

const toggleClass = "relative h-6 w-11 rounded-full bg-muted transition-colors data-[checked=true]:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform data-[checked=true]:after:translate-x-5"
const primaryButtonClass = "h-9 rounded-md border-0 bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
const outlineButtonClass =
  'h-9 rounded-md border-border bg-transparent px-3 text-sm font-medium text-muted-foreground shadow-none hover:bg-muted hover:text-foreground'
const destructiveButtonClass =
  'h-9 rounded-md border-0 bg-destructive/10 px-3 text-sm font-medium text-destructive shadow-none hover:bg-destructive/20'

function Toggle({ initial = false }: { initial?: boolean }) {
  const [checked, setChecked] = useState(initial)
  return <button aria-checked={checked} className={toggleClass} data-checked={checked} onClick={() => setChecked(!checked)} role="switch" type="button" />
}

function Row({ action, hint, label }: { action: React.ReactNode; hint: string; label: string }) {
  return <div className="flex flex-col gap-4 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0 flex-1"><p className="text-sm font-medium text-foreground">{label}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p></div>
    <div className="shrink-0 max-sm:w-full max-sm:[&_button]:w-full">{action}</div>
  </div>
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return <section className="rounded-xl border border-border bg-card p-5 shadow-xs sm:p-6"><h2 className="mb-6 text-base font-semibold text-foreground">{title}</h2>{children}</section>
}

export function SettingsPanel({ section }: { section: Section }) {
  if (section === "profile") return <Profile />
  if (section === "security") return <Card title="Security & sign-in"><Row label="Password" hint="Last changed: 12 June 2026" action={<Button className={outlineButtonClass} variant="outline">Change password</Button>} /><Row label="Two-factor authentication (2FA)" hint="Add a verification code on top of your password for extra safety" action={<Button className={outlineButtonClass} variant="outline">Set up</Button>} /><Row label="Google account" hint="Sign in faster with your Google account" action={<Button className={outlineButtonClass} variant="outline">Connect</Button>} /><Row label="Active sessions" hint="You’re currently signed in on 2 devices" action={<Button className={outlineButtonClass} variant="outline"><LogOut /> Manage sessions</Button>} /></Card>
  if (section === "preferences") return <Card title="Preferences"><Row label="Currency" hint="Used throughout the app" action={<select className="h-9 w-45 rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary"><option>৳ BDT — Taka</option><option>$ USD — Dollar</option><option>€ EUR — Euro</option></select>} /><Row label="Date format" hint="How dates are displayed" action={<select className="h-9 w-45 rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary"><option>DD MMM, YYYY</option><option>MM/DD/YYYY</option></select>} /><Row label="Compact mode" hint="Use smaller spacing across the dashboard" action={<Toggle />} /></Card>
  if (section === "notifications") return <Card title="Notifications"><Row label="Budget warnings" hint="Notify me when I reach 80% of a budget" action={<Toggle initial />} /><Row label="Large transactions" hint="Notify me of transactions over ৳5,000" action={<Toggle initial />} /><Row label="Weekly summary" hint="Receive a spending summary every Sunday morning" action={<Toggle />} /></Card>
  if (section === "billing") return <Card title="Plan & billing"><Row label="Current plan" hint="Free plan · Your next billing date is not set" action={<Button className={primaryButtonClass}>Upgrade plan <ChevronRight /></Button>} /><Row label="Payment method" hint="Add a card to start a paid subscription" action={<Button className={outlineButtonClass} variant="outline">Add payment method</Button>} /></Card>
  return <Card title="Privacy & data"><Row label="Export all data" hint="Download your wallets, transactions and budgets as a JSON file" action={<Button className={outlineButtonClass} variant="outline"><Download /> Export data</Button>} /><Row label="Delete account" hint="Permanently remove your account and all associated data. This cannot be undone." action={<Button className={destructiveButtonClass} variant="destructive">Delete account</Button>} /></Card>
}

function Profile() {
  const [name, setName] = useState("Anika Tahsin")
  const [email, setEmail] = useState("anika@moneybag.app")

  return <Card title="Your profile"><div className="mb-7 flex flex-wrap items-center gap-4 border-b border-border pb-6"><div className="grid size-16 place-items-center rounded-full bg-primary/10 text-lg font-bold text-primary">AT</div><div className="min-w-0 flex-1"><p className="text-sm font-medium">Profile photo</p><p className="mt-1 text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p></div><Button className={outlineButtonClass} variant="outline"><Camera /> Change photo</Button></div><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Full name<input className="h-10 w-full rounded-md border border-input bg-card px-3 font-normal outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" onChange={(event) => setName(event.target.value)} value={name} /></label><label className="space-y-2 text-sm font-medium">Email address<input className="h-10 w-full rounded-md border border-input bg-card px-3 font-normal outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" onChange={(event) => setEmail(event.target.value)} type="email" value={email} /></label></div><div className="mt-7 flex justify-end border-t border-border pt-5 max-sm:[&_button]:w-full"><Button className={primaryButtonClass}>Save changes</Button></div></Card>
}
