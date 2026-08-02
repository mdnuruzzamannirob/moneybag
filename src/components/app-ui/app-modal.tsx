'use client';
import type { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
export type AppModalProps = React.ComponentProps<typeof Dialog> & {
  bodyClassName?: string;
  children: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  footerClassName?: string;
  title: ReactNode;
};
export function AppModal({
  bodyClassName,
  children,
  description,
  footer,
  footerClassName,
  title,
  ...props
}: AppModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="gap-0 overflow-visible rounded-lg p-0 max-sm:rounded-b-none">
        <DialogHeader className="rounded-t-lg border-b border-border py-3.5 pl-4 pr-14 sm:pl-5 sm:pr-14">
          <DialogTitle className="leading-5 wrap-break-word">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="leading-5 wrap-break-word">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <div className={cn('max-h-[65vh] overflow-y-auto px-4 py-4 sm:px-5', bodyClassName)}>
          {children}
        </div>
        {footer ? (
          <DialogFooter
            className={cn(
              'm-0 rounded-b-lg border-t border-border bg-secondary px-4 py-3 sm:px-5 sm:[&_[data-slot=button]]:min-h-10 sm:[&_[data-slot=button]]:px-4 max-sm:rounded-b-none',
              footerClassName,
            )}
          >
            {footer}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
