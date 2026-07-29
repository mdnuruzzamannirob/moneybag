import { AuthShell } from '@/components/layout/AuthShell';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthShell>{children}</AuthShell>;
}
