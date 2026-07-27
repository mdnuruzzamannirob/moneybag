import { SettingsNavigation } from "@/components/user/settings-navigation"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-w-0">
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-22 lg:self-start"><SettingsNavigation /></aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
