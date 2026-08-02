'use client';
import type { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function AppSheet({
  bodyClassName,
  children,
  contentClassName,
  description,
  footer,
  footerClassName,
  headerClassName,
  side = 'right',
  title,
  ...props
}: React.ComponentProps<typeof Sheet> & {
  bodyClassName?: string;
  children: ReactNode;
  contentClassName?: string;
  description?: ReactNode;
  footer?: ReactNode;
  footerClassName?: string;
  headerClassName?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  title: ReactNode;
}) {
  return (
    <Sheet {...props}>
      <SheetContent className={cn('border-border', contentClassName)} side={side}>
        <SheetHeader className={cn('border-b border-border pr-16', headerClassName)}>
          <SheetTitle className="leading-5 wrap-break-word">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="leading-5 wrap-break-word">{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className={cn('min-h-0 flex-1 overflow-y-auto px-6 py-5', bodyClassName)}>
          {children}
        </div>
        {footer ? (
          <SheetFooter
            className={cn(
              'border-t border-border bg-secondary sm:**:data-[slot=button]:min-h-10 sm:**:data-[slot=button]:px-4',
              footerClassName,
            )}
          >
            {footer}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
