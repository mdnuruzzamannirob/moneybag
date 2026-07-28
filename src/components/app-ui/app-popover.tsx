"use client"

import type { ReactElement, ReactNode } from "react"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

export function AppPopover({ children, description, title, trigger }: { children: ReactNode; description?: ReactNode; title?: ReactNode; trigger: ReactElement }) { return <Popover><PopoverTrigger render={trigger} /><PopoverContent className="w-80 rounded-lg border-border p-4 shadow-xl">{title || description ? <PopoverHeader>{title ? <PopoverTitle>{title}</PopoverTitle> : null}{description ? <PopoverDescription>{description}</PopoverDescription> : null}</PopoverHeader> : null}{children}</PopoverContent></Popover> }
