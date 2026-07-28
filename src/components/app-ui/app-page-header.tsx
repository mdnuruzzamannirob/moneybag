import type { ReactNode } from 'react'
export function AppPageHeader({
  actions,
  breadcrumb,
  description,
  title,
}: {
  actions?: ReactNode
  breadcrumb?: ReactNode
  description?: ReactNode
  title: ReactNode
}) {
  return (
    <header>
      {breadcrumb ? <div className="mb-4">{breadcrumb}</div> : null}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}
