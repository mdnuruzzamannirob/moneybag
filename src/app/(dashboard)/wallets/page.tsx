'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSelect,
} from '@/components/app-ui';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Check,
  CreditCard,
  Landmark,
  MoreHorizontal,
  Plus,
  Search,
  Smartphone,
  WalletCards,
} from 'lucide-react';

const wallets = [
  {
    name: 'Cash wallet',
    type: 'Cash',
    balance: '৳ 18,450',
    color: 'from-emerald-500 to-teal-600',
    icon: Banknote,
    transactions: 32,
    updated: 'Updated today',
  },
  {
    name: 'BRAC Bank',
    type: 'Bank account',
    balance: '৳ 126,800',
    color: 'from-indigo-500 to-violet-600',
    icon: Landmark,
    transactions: 18,
    updated: 'Updated yesterday',
  },
  {
    name: 'bKash',
    type: 'Mobile wallet',
    balance: '৳ 8,250',
    color: 'from-pink-500 to-rose-600',
    icon: Smartphone,
    transactions: 12,
    updated: 'Updated 2 days ago',
  },
  {
    name: 'City Bank card',
    type: 'Credit card',
    balance: '৳ 42,600',
    color: 'from-amber-500 to-orange-600',
    icon: CreditCard,
    transactions: 9,
    updated: 'Updated today',
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main className="space-y-6">
      <AppPageHeader
        title="Wallets & accounts"
        description="Keep track of your cash, bank accounts and cards in one place."
        actions={
          <>
            <AppButton tone="secondary">
              <ArrowDownLeft /> Transfer
            </AppButton>
            <AppButton onClick={() => setOpen(true)}>
              <Plus /> Add wallet
            </AppButton>
          </>
        }
      />
      <AppCard className="overflow-hidden border-0 bg-gradient-to-br from-primary to-indigo-700 text-white shadow-lg transition-shadow hover:shadow-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-indigo-100">Total balance</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">৳ 196,100</p>
            <p className="mt-2 flex items-center gap-1 text-sm text-indigo-100">
              <ArrowUpRight className="size-4" /> 8.4% compared to last month
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <WalletCards className="size-8" />
          </div>
        </div>
      </AppCard>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Your wallets</h2>
          <p className="text-sm text-muted-foreground">4 active accounts</p>
        </div>
        <AppInput placeholder="Search wallets" leading={<Search />} containerClassName="sm:w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {wallets.map((wallet) => (
          <AppCard
            key={wallet.name}
            className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${wallet.color}`} />
            <div className="flex items-start justify-between">
              <span
                className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white ${wallet.color}`}
              >
                <wallet.icon className="size-5" />
              </span>
              <AppButton size="icon-sm" tone="secondary" aria-label="Wallet actions">
                <MoreHorizontal />
              </AppButton>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{wallet.name}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{wallet.balance}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span>{wallet.type}</span>
              <span>{wallet.transactions} transactions</span>
            </div>
          </AppCard>
        ))}
      </div>
      <AppCard padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-semibold">Recent wallet activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest movements across your accounts
            </p>
          </div>
          <AppButton tone="secondary" size="sm">
            View all
          </AppButton>
        </div>
        {[
          ['Salary credited', 'BRAC Bank', '+ ৳ 85,000', 'success'],
          ['Grocery shopping', 'Cash wallet', '- ৳ 2,450', 'danger'],
          ['Wallet transfer', 'bKash → BRAC Bank', '- ৳ 5,000', 'neutral'],
        ].map(([title, wallet, amount, status]) => (
          <div
            key={title}
            className="flex items-center justify-between border-b border-border px-5 py-4 transition-colors hover:bg-muted/40 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-9 place-items-center rounded-full ${status === 'success' ? 'bg-success-soft text-success' : status === 'danger' ? 'bg-danger-soft text-danger' : 'bg-muted text-muted-foreground'}`}
              >
                {status === 'success' ? (
                  <ArrowDownLeft className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{wallet} · Today</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${status === 'success' ? 'text-success' : status === 'danger' ? 'text-danger' : ''}`}
            >
              {amount}
            </span>
          </div>
        ))}
      </AppCard>
      <AppModal
        open={open}
        onOpenChange={setOpen}
        title="Add wallet"
        description="Add a new account to keep your balance organized."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setOpen(false)}>
              <Check /> Add wallet
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">
            Wallet name
            <AppInput placeholder="e.g. Dutch-Bangla Bank" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            Wallet type
            <AppSelect
              ariaLabel="Wallet type"
              options={[
                { label: 'Cash', value: 'cash' },
                { label: 'Bank account', value: 'bank' },
                { label: 'Mobile wallet', value: 'mobile' },
                { label: 'Credit card', value: 'card' },
              ]}
              placeholder="Select wallet type"
            />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            Opening balance
            <AppInput placeholder="৳ 0.00" />
          </label>
        </div>
      </AppModal>
    </main>
  );
}
