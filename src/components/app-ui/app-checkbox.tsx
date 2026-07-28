"use client"
import { Checkbox } from "@/components/ui/checkbox"
import type { ReactNode } from "react"
import { useId } from "react"
export function AppCheckbox({ defaultChecked, description, disabled, label }: { defaultChecked?: boolean; description?: string; disabled?: boolean; label: ReactNode }) { const id = useId(); return <label className={description ? "flex cursor-pointer select-none items-start gap-3 text-sm has-disabled:cursor-not-allowed has-disabled:opacity-60" : "flex cursor-pointer select-none items-center gap-3 text-sm has-disabled:cursor-not-allowed has-disabled:opacity-60"} htmlFor={id}><Checkbox className={description ? "mt-0.5 size-5 rounded-sm border-border bg-card" : "size-5 rounded-sm border-border bg-card"} defaultChecked={defaultChecked} disabled={disabled} id={id} /><span><span className="block font-medium leading-5">{label}</span>{description ? <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span> : null}</span></label> }
