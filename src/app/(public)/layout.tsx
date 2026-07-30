import { PublicShell } from '@/components/public/public-shell';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PublicShell>{children}</PublicShell>;
}
