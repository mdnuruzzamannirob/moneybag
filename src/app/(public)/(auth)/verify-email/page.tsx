import { AuthShell } from "@/components/auth/auth-shell"
import { VerifyEmailForm } from "@/components/auth/verify-email-form"

export default function Page() {
  return (
    <AuthShell>
      <VerifyEmailForm />
    </AuthShell>
  )
}
