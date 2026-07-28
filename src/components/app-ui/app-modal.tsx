"use client"
import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
export type AppModalProps = React.ComponentProps<typeof Dialog> & { bodyClassName?: string; children: ReactNode; description?: ReactNode; footer?: ReactNode; footerClassName?: string; title: ReactNode }
export function AppModal({ bodyClassName, children, description, footer, footerClassName, title, ...props }: AppModalProps) { return <Dialog {...props}><DialogContent className="gap-0 overflow-hidden rounded-xl p-0"><DialogHeader className="border-b border-border px-6 py-5"><DialogTitle>{title}</DialogTitle>{description ? <DialogDescription>{description}</DialogDescription> : null}</DialogHeader><div className={cn("max-h-[65vh] overflow-y-auto px-6 py-5", bodyClassName)}>{children}</div>{footer ? <DialogFooter className={cn("border-t border-border bg-secondary px-6 py-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.55)] dark:bg-secondary/80 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]", footerClassName)}>{footer}</DialogFooter> : null}</DialogContent></Dialog> }
