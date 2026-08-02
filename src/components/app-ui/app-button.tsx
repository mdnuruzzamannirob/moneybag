'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
export type AppButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
  tone?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'info';
};
export function AppButton({
  children,
  className,
  loading,
  size = 'default',
  tone = 'primary',
  ...props
}: AppButtonProps) {
  const variant =
    tone === 'secondary' ? 'outline' : tone === 'ghost' || tone === 'primary' ? 'ghost' : 'default';
  const dimensions =
    size === 'xs'
      ? '!h-7 !px-2 text-xs'
      : size === 'icon-xs'
        ? '!size-7 !px-0'
        : size === 'icon-sm'
          ? '!size-8 !px-0'
          : size === 'icon'
            ? '!size-9 !px-0'
            : size === 'icon-lg'
              ? '!size-10 !px-0'
              : size === 'sm'
                ? '!h-8 !px-2.5'
                : size === 'lg'
                  ? '!h-10 !px-4'
                  : '!h-9 !px-3';
  return (
    <Button
      {...props}
      className={cn(
        dimensions,
        'rounded-md bg-clip-border font-medium transition-[transform,background-color,border-color,box-shadow,filter] active:scale-[.98]',
        tone === 'primary' &&
          'border-0! bg-clip-border ui-gradient-primary focus-visible:border-0! focus-visible:ring-0 hover:text-primary-foreground! hover:brightness-[.98] hover:shadow-sm',
        tone === 'secondary' &&
          'border-border! bg-card! text-muted-foreground hover:border-border! hover:bg-secondary! hover:text-foreground',
        tone === 'ghost' && 'border-transparent! bg-transparent hover:bg-muted',
        tone === 'success' &&
          'border-0! ui-gradient-success hover:text-primary-foreground! hover:brightness-[.98] hover:shadow-sm',
        tone === 'danger' &&
          'border-0! ui-gradient-danger focus-visible:border-0! focus-visible:ring-0 hover:text-primary-foreground! hover:brightness-[.98] hover:shadow-sm',
        tone === 'info' &&
          'border-0! ui-gradient-info focus-visible:border-0! focus-visible:ring-0 hover:text-primary-foreground! hover:brightness-[.98] hover:shadow-sm',
        className,
      )}
      disabled={props.disabled || loading}
      size={size}
      variant={variant}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : null}
      {children}
    </Button>
  );
}
