import { AuthShell } from "@/components/auth/auth-shell"
import { RecoveryCodeForm } from "@/components/auth/recovery-code-form"

export default function Page() {
  return (
    <AuthShell>
      <RecoveryCodeForm />
    </AuthShell>
  )
}
