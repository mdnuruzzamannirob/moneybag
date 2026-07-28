"use client"

import type { ReactElement, ReactNode } from "react"
import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export type MoneybagModalProps = Omit<
  React.ComponentProps<typeof Dialog>,
  "children"
> & {
  children: ReactNode
  contentClassName?: string
  description?: ReactNode
  footer?: ReactNode
  title: ReactNode
}

/** Controlled modal shell used by create/edit forms throughout the product. */
export function MoneybagModal({
  children,
  contentClassName,
  description,
  footer,
  title,
  ...props
}: MoneybagModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent className={cn("gap-5 p-0", contentClassName)}>
        <DialogHeader className="border-b border-border px-5 py-4 pr-14">
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <div className="max-h-[65vh] overflow-y-auto px-5">{children}</div>
        {footer ? (
          <DialogFooter className="border-t border-border bg-muted/25 px-5 py-4 sm:flex-row">
            {footer}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export type MoneybagConfirmDialogProps = Omit<
  React.ComponentProps<typeof AlertDialog>,
  "children" | "onOpenChange"
> & {
  cancelLabel?: string
  confirmLabel?: string
  description: ReactNode
  destructive?: boolean
  onConfirm: () => void | Promise<void>
  onOpenChange?: (open: boolean) => void
  title: ReactNode
}

/** Confirmation dialog that closes only after the supplied action resolves. */
export function MoneybagConfirmDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  description,
  destructive = false,
  onConfirm,
  onOpenChange,
  title,
  ...props
}: MoneybagConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    try {
      await onConfirm()
      onOpenChange?.(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog onOpenChange={onOpenChange} {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitting}
            onClick={() => void handleConfirm()}
            variant={destructive ? "destructive" : "default"}
          >
            {isSubmitting ? "Please wait…" : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export type MoneybagPopupProps = Omit<
  React.ComponentProps<typeof Popover>,
  "children"
> & {
  children: ReactNode
  contentClassName?: string
  description?: ReactNode
  title?: ReactNode
  trigger: ReactElement
}

/** Small anchored popup for filters, contextual help, and compact forms. */
export function MoneybagPopup({
  children,
  contentClassName,
  description,
  title,
  trigger,
  ...props
}: MoneybagPopupProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger render={trigger} />
      <PopoverContent className={cn("w-80", contentClassName)}>
        {title || description ? (
          <PopoverHeader>
            {title ? <PopoverTitle>{title}</PopoverTitle> : null}
            {description ? <PopoverDescription>{description}</PopoverDescription> : null}
          </PopoverHeader>
        ) : null}
        {children}
      </PopoverContent>
    </Popover>
  )
}

export type MoneybagMenuItem = {
  disabled?: boolean
  icon?: ReactNode
  label: ReactNode
  onSelect?: () => void
  separatorBefore?: boolean
  variant?: "default" | "destructive"
}

export type MoneybagActionMenuProps = {
  align?: "center" | "end" | "start"
  ariaLabel?: string
  items: readonly MoneybagMenuItem[]
  trigger?: ReactElement
}

/** Standard action menu for rows, cards, and overflow actions. */
export function MoneybagActionMenu({
  align = "end",
  ariaLabel = "More actions",
  items,
  trigger,
}: MoneybagActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          trigger ?? (
            <Button aria-label={ariaLabel} size="icon-xs" type="button" variant="ghost">
              <MoreHorizontalIcon />
            </Button>
          )
        }
      />
      <DropdownMenuContent align={align}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.separatorBefore ? <DropdownMenuSeparator /> : null}
            <DropdownMenuItem
              disabled={item.disabled}
              onClick={item.onSelect}
              variant={item.variant}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type MoneybagSheetProps = Omit<React.ComponentProps<typeof Sheet>, "children"> & {
  children: ReactNode
  description?: ReactNode
  footer?: ReactNode
  side?: "bottom" | "left" | "right" | "top"
  title: ReactNode
}

/** Responsive side panel for navigation, advanced filters, and mobile forms. */
export function MoneybagSheet({
  children,
  description,
  footer,
  side = "right",
  title,
  ...props
}: MoneybagSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6">{children}</div>
        {footer ? <SheetFooter>{footer}</SheetFooter> : null}
      </SheetContent>
    </Sheet>
  )
}
