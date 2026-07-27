import { AuthShell } from "@/components/auth/auth-shell"
import { TwoFactorForm } from "@/components/auth/two-factor-form"

export default function Page() {
  return (
    <AuthShell>
      <TwoFactorForm />
    </AuthShell>
  )
}
