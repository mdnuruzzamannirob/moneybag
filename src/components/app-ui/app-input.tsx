'use client'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
export type AppInputProps = React.ComponentProps<typeof Input> & {
  containerClassName?: string
  leading?: ReactNode
  leadingClassName?: string
  trailing?: ReactNode
}
export function AppInput({
  className,
  containerClassName,
  leading,
  leadingClassName,
  trailing,
  ...props
}: AppInputProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      {leading ? (
        <span className={cn('pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground [&>svg]:size-4', leadingClassName)}>
          {leading}
        </span>
      ) : null}
      <Input
        {...props}
        className={cn(
          'h-10 rounded-md border-border bg-card px-3 shadow-none hover:border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15',
          leading && 'pl-10',
          trailing && 'pr-11',
          className,
        )}
      />
      {trailing ? (
        <span className="absolute inset-y-0 right-2 flex items-center">
          {trailing}
        </span>
      ) : null}
    </div>
  )
}
