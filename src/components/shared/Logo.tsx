'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = ({
  className,
  href,
  inverse = false,
  onNavigate,
}: {
  className?: string;
  href?: string;
  inverse?: boolean;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        'flex min-w-0 items-end gap-1 truncate font-ubuntu text-2xl',
        inverse ? 'text-white' : 'text-primary',
        className,
      )}
      href={href ?? (pathname.startsWith('/admin') ? '/admin' : '/dashboard')}
      onClick={onNavigate}
    >
      <Image alt="Logo" src={'/logo.png'} width={40} height={40} />
      MoneyBag
    </Link>
  );
};

export default Logo;
