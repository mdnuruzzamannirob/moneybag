import { AuthShell } from '@/components/auth/auth-shell'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthShell>{children}</AuthShell>
}
