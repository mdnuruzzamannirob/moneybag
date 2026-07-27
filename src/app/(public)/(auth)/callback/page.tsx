import { AuthShell } from "@/components/auth/auth-shell"
import { AuthCallbackPanel } from "@/components/auth/status-panels"

export default function Page() {
  return (
    <AuthShell>
      <AuthCallbackPanel />
    </AuthShell>
  )
}
