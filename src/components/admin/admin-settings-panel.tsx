"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

const topbarButton = "h-9 rounded-md border-0 bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"

function Toggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial)
  return <button aria-checked={on} className="relative h-6 w-11 shrink-0 rounded-full bg-muted transition-colors data-[on=true]:bg-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform data-[on=true]:after:translate-x-5" data-on={on} onClick={() => setOn(!on)} role="switch" type="button" />
}

function SettingRow({ description, enabled = true, title }: { description: string; enabled?: boolean; title: string }) {
  return <div className="flex items-start justify-between gap-5 border-b border-border py-5 first:pt-0 last:border-0 last:pb-0"><div className="min-w-0"><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div><Toggle initial={enabled} /></div>
}

export function AdminSettingsPanel() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">System settings</h1><p className="mt-1.5 text-sm text-muted-foreground">Configure platform-wide preferences and integrations.</p></div><div className="grid gap-6 xl:grid-cols-2"><section className="rounded-xl border border-border bg-card p-5 shadow-xs sm:p-6"><h2 className="mb-6 text-base font-semibold">Platform access</h2><SettingRow description="Show a maintenance banner and restrict access for regular users." enabled={false} title="Maintenance mode" /><SettingRow description="Allow new people to create a MoneyBag account." title="New signups" /><SettingRow description="Require users to verify their email before accessing the dashboard." title="Email verification" /></section><section className="rounded-xl border border-border bg-card p-5 shadow-xs sm:p-6"><h2 className="mb-6 text-base font-semibold">Payment providers</h2><SettingRow description="Mobile wallet · Active" title="bKash" /><SettingRow description="Mobile wallet · Active" title="Nagad" /><SettingRow description="DBBL mobile banking" enabled={false} title="Rocket" /><SettingRow description="International cards" enabled={false} title="Stripe" /></section></div><div className="flex justify-end border-t border-border pt-5 max-sm:[&_button]:w-full"><Button className={topbarButton}>Save system settings</Button></div></div>
}
