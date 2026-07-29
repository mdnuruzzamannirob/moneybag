'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = ({ className, onNavigate }: { className?: string; onNavigate: () => void }) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        'min-w-0 truncate text-2xl items-end font-ubuntu text-primary flex  gap-1',
        className,
      )}
      href={pathname.startsWith('/admin') ? '/admin' : '/dashboard'}
      onClick={onNavigate}
    >
      <Image alt="Logo" src={'/logo.png'} width={40} height={40} />
      MoneyBag
    </Link>
  );
};

export default Logo;
