import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
export type AppTextareaProps = React.ComponentProps<typeof Textarea>
export function AppTextarea({ className, ...props }: AppTextareaProps) { return <Textarea {...props} className={cn("min-h-28 rounded-md border border-border bg-card shadow-none hover:border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15", className)} /> }
