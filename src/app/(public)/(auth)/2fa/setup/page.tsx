import { AuthShell } from "@/components/auth/auth-shell"
import { TwoFactorSetupForm } from "@/components/auth/two-factor-setup-form"

export default function Page() {
  return (
    <AuthShell>
      <TwoFactorSetupForm />
    </AuthShell>
  )
}
