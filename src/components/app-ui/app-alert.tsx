import type { ReactNode } from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
export type AppAlertTone = "info" | "success" | "warning" | "danger"
export function AppAlert({ children, title, tone = "info" }: { children?: ReactNode; title: ReactNode; tone?: AppAlertTone }) { const Icon = { info: Info, success: CheckCircle2, warning: TriangleAlert, danger: AlertCircle }[tone]; return <div className={cn("flex gap-3 rounded-lg border p-4", { info: "border-info/20 bg-info-soft text-info", success: "border-success/20 bg-success-soft text-success", warning: "border-warning/20 bg-warning-soft text-warning", danger: "border-danger/20 bg-danger-soft text-danger" }[tone])}><Icon className="mt-0.5 size-5 shrink-0" /><div><p className="text-sm font-medium">{title}</p>{children ? <div className="mt-1 text-sm opacity-80">{children}</div> : null}</div></div> }
