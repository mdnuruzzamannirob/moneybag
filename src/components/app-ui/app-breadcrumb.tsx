import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
export type AppBreadcrumbItem = { href?: string; label: ReactNode }
export function AppBreadcrumb({ items }: { items: readonly AppBreadcrumbItem[] }) { return <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"><li><Link aria-label="Home" className="hover:text-foreground" href="/"><Home className="size-4" /></Link></li>{items.map((item, index) => <li className="flex items-center gap-1.5" key={index}><ChevronRight className="size-3.5" />{item.href ? <Link className="hover:text-foreground" href={item.href}>{item.label}</Link> : <span aria-current="page" className="font-medium text-foreground">{item.label}</span>}</li>)}</ol></nav> }
