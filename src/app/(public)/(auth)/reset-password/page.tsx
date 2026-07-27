import { AuthShell } from "@/components/auth/auth-shell"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function Page() {
  return (
    <AuthShell>
      <ResetPasswordForm />
    </AuthShell>
  )
}
