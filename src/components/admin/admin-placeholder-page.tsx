import { FileText } from 'lucide-react'

export function AdminPlaceholderPage({
  description,
  title,
}: {
  description: string
  title: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-xs sm:p-8">
      <div className="flex max-w-xl items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <span className="mt-4 inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Ready for content management
          </span>
        </div>
      </div>
    </section>
  )
}
