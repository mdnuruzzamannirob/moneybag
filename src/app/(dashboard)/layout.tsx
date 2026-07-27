import { DashboardShell } from "@/components/layout/DashboardShell"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>
}
