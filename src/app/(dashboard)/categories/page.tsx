'use client'

import { useMemo, useState } from 'react'
import { AppBadge, AppButton, AppCard, AppInput, AppModal, AppPageHeader, AppSelect, AppTable } from '@/components/app-ui'
import { Check, ChevronDown, Edit3, FolderOpen, Hash, Plus, Search, ShoppingBag, Trash2, Utensils, WalletCards, X } from 'lucide-react'

const categories = [
  { id: 1, name: 'Food & Dining', type: 'Expense', icon: Utensils, color: 'bg-orange-100 text-orange-600', transactions: 24, amount: '৳ 12,450', system: false },
  { id: 2, name: 'Transport', type: 'Expense', icon: ChevronDown, color: 'bg-blue-100 text-blue-600', transactions: 18, amount: '৳ 5,280', system: true },
  { id: 3, name: 'Shopping', type: 'Expense', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600', transactions: 12, amount: '৳ 8,920', system: false },
  { id: 4, name: 'Salary', type: 'Income', icon: WalletCards, color: 'bg-emerald-100 text-emerald-600', transactions: 2, amount: '৳ 85,000', system: true },
  { id: 5, name: 'Bills & Utilities', type: 'Expense', icon: Hash, color: 'bg-violet-100 text-violet-600', transactions: 9, amount: '৳ 7,650', system: false },
  { id: 6, name: 'Entertainment', type: 'Expense', icon: FolderOpen, color: 'bg-amber-100 text-amber-600', transactions: 7, amount: '৳ 3,200', system: false },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [open, setOpen] = useState(false)
  const filtered = useMemo(() => categories.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (type === 'all' || item.type.toLowerCase() === type)), [query, type])
  return <main className="space-y-6">
    <AppPageHeader title="Categories" description="Organize your income and expenses to understand your spending better." actions={<AppButton onClick={() => setOpen(true)}><Plus /> Add category</AppButton>} />
    <div className="grid gap-4 sm:grid-cols-3">
      {[["Total categories", '18', 'Your personal categories', 'bg-primary/10 text-primary'], ['Expense categories', '14', 'Across all wallets', 'bg-danger-soft text-danger'], ['Income categories', '4', 'Recurring and one-off', 'bg-success-soft text-success']].map(([label, value, note, tone]) => <AppCard key={label} className="relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"><div className={`absolute right-5 top-5 grid size-10 place-items-center rounded-xl ${tone}`}><Hash className="size-5" /></div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></AppCard>)}
    </div>
    <AppCard padding="none" className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">All categories</h2><p className="mt-1 text-sm text-muted-foreground">{filtered.length} categories in your workspace</p></div><div className="flex flex-col gap-2 sm:flex-row"><AppInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search categories" leading={<Search />} /><AppSelect ariaLabel="Filter category type" value={type} onValueChange={(v) => setType(v ?? 'all')} options={[{ label: 'All types', value: 'all' }, { label: 'Expense', value: 'expense' }, { label: 'Income', value: 'income' }]} triggerClassName="sm:w-36" /></div></div>
      <AppTable rows={filtered} getRowKey={(row) => row.id} columns={[{ key: 'name', header: 'Category', render: (row) => <div className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-lg ${row.color}`}><row.icon className="size-4" /></span><div><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.system ? 'Default category' : 'Personal category'}</p></div></div> }, { key: 'type', header: 'Type', render: (row) => <AppBadge status={row.type === 'Income' ? 'success' : 'neutral'}>{row.type}</AppBadge> }, { key: 'transactions', header: 'Transactions', render: (row) => <span className="text-muted-foreground">{row.transactions} this month</span> }, { key: 'amount', header: 'This month', align: 'right', render: (row) => <span className="font-semibold">{row.amount}</span> }, { key: 'actions', header: '', align: 'right', render: (row) => <div className="flex justify-end gap-1"><AppButton size="icon-sm" tone="secondary" aria-label={`Edit ${row.name}`}><Edit3 /></AppButton><AppButton size="icon-sm" tone="secondary" aria-label={`Delete ${row.name}`} disabled={row.system}><Trash2 /></AppButton></div> }]} />
    </AppCard>
    <AppModal open={open} onOpenChange={setOpen} title="Add category" description="Create a category for your transactions." footer={<><AppButton tone="secondary" onClick={() => setOpen(false)}>Cancel</AppButton><AppButton onClick={() => setOpen(false)}><Check /> Create category</AppButton></>}><div className="space-y-4"><label className="block space-y-1.5 text-sm font-medium">Category name<AppInput placeholder="e.g. Health & wellness" /></label><label className="block space-y-1.5 text-sm font-medium">Category type<AppSelect ariaLabel="Category type" options={[{ label: 'Expense', value: 'expense' }, { label: 'Income', value: 'income' }]} placeholder="Select type" /></label></div></AppModal>
  </main>
}
