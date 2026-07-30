'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = ({
  className,
  compact = false,
  href,
  inverse = false,
  onNavigate,
}: {
  className?: string;
  compact?: boolean;
  href?: string;
  inverse?: boolean;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        'flex min-w-0 items-end gap-1 truncate font-ubuntu',
        compact ? 'text-lg' : 'text-2xl',
        inverse ? 'text-white' : 'text-primary',
        className,
      )}
      href={href ?? (pathname.startsWith('/admin') ? '/admin' : '/dashboard')}
      onClick={onNavigate}
    >
      <Image alt="Logo" height={compact ? 32 : 40} src="/logo.png" width={compact ? 32 : 40} />
      MoneyBag
    </Link>
  );
};

export default Logo;
