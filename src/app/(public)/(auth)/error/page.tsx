import { AuthShell } from "@/components/auth/auth-shell"
import { AuthErrorPanel } from "@/components/auth/status-panels"

export default function Page() {
  return (
    <AuthShell>
      <AuthErrorPanel />
    </AuthShell>
  )
}
