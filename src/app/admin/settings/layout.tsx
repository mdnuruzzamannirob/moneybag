import { AdminSettingsNavigation } from "@/components/admin/admin-settings-navigation"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div><div className="mb-7"><h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">System settings</h1><p className="mt-1.5 text-sm text-muted-foreground">Manage platform preferences and configuration.</p></div><div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]"><aside className="lg:sticky lg:top-22 lg:self-start"><AdminSettingsNavigation /></aside><div className="min-w-0">{children}</div></div></div>
}
