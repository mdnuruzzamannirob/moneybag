'use client';

import {
  ArrowLeftRight,
  Banknote,
  Check,
  Edit3,
  Eye,
  Landmark,
  MoreHorizontal,
  Plus,
  Search,
  Smartphone,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import {
  AppAvatar,
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppDropdownMenu,
  AppEmptyState,
  AppField,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSegmentedControl,
  AppSelect,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import { cn } from '@/lib/utils';
import type {
  FamilyMemberSummary,
  FamilyWalletsData,
  SharedWallet,
  SharedWalletActivity,
  SharedWalletType,
} from '@/types/family';

type WalletDialog = 'add' | 'edit' | 'transfer' | null;
type WalletFilter = 'all' | SharedWalletType;

const walletMeta = {
  bank: {
    accent: 'bg-info',
    icon: Landmark,
    label: 'Bank account',
    soft: 'bg-info-soft text-info',
  },
  cash: {
    accent: 'bg-success',
    icon: Banknote,
    label: 'Cash',
    soft: 'bg-success-soft text-success',
  },
  mobile: {
    accent: 'bg-warning',
    icon: Smartphone,
    label: 'Mobile banking',
    soft: 'bg-warning-soft text-warning',
  },
} satisfies Record<
  SharedWalletType,
  { accent: string; icon: typeof Landmark; label: string; soft: string }
>;

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyWallets({ data }: { data: FamilyWalletsData }) {
  const [dialog, setDialog] = useState<WalletDialog>(null);
  const [deleting, setDeleting] = useState<SharedWallet | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<SharedWallet | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<WalletFilter>('all');

  const memberMap = useMemo(
    () => new Map(data.members.map((member) => [member.id, member])),
    [data.members],
  );
  const walletMap = useMemo(
    () => new Map(data.wallets.map((wallet) => [wallet.id, wallet])),
    [data.wallets],
  );
  const filteredWallets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.wallets.filter(
      (wallet) =>
        (filter === 'all' || wallet.type === filter) &&
        `${wallet.name} ${walletMeta[wallet.type].label}`.toLowerCase().includes(normalizedQuery),
    );
  }, [data.wallets, filter, query]);

  const totalBalance = data.wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const monthlyIncome = data.wallets.reduce((sum, wallet) => sum + wallet.monthlyIncome, 0);
  const monthlyExpense = data.wallets.reduce((sum, wallet) => sum + wallet.monthlyExpense, 0);

  const openDialog = (kind: Exclude<WalletDialog, null>, wallet: SharedWallet | null = null) => {
    setSelectedWallet(wallet);
    setDialog(kind);
  };

  const columns = useMemo<readonly AppTableColumn<SharedWalletActivity>[]>(
    () => [
      {
        key: 'activity',
        header: 'Activity',
        render: (activity) => (
          <div>
            <p className="font-medium">{activity.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{activity.note}</p>
          </div>
        ),
      },
      {
        key: 'wallet',
        header: 'Wallet',
        render: (activity) => (
          <span className="text-muted-foreground">{walletMap.get(activity.walletId)?.name}</span>
        ),
      },
      {
        key: 'paidBy',
        header: 'Paid by',
        render: (activity) => {
          const member = memberMap.get(activity.paidBy);
          return member ? (
            <div className="flex items-center gap-2">
              <AppAvatar
                alt={member.name}
                className="size-6"
                fallback={member.initials}
                size="sm"
              />
              <span>{member.name.split(' ')[0]}</span>
            </div>
          ) : null;
        },
      },
      {
        key: 'split',
        header: 'Split',
        render: (activity) => (
          <AppBadge status={activity.type === 'income' ? 'success' : 'neutral'}>
            {activity.splitLabel}
          </AppBadge>
        ),
      },
      {
        key: 'date',
        header: 'Date',
        render: (activity) => (
          <span className="whitespace-nowrap text-muted-foreground">{activity.date}</span>
        ),
      },
      {
        align: 'right',
        key: 'amount',
        header: 'Amount',
        render: (activity) => (
          <span
            className={cn(
              'whitespace-nowrap font-semibold',
              activity.type === 'income'
                ? 'text-success'
                : activity.type === 'expense'
                  ? 'text-danger'
                  : 'text-info',
            )}
          >
            {activity.type === 'income' ? '+' : activity.type === 'expense' ? '-' : ''}
            {formatCurrency(activity.amount)}
          </span>
        ),
      },
    ],
    [memberMap, walletMap],
  );

  return (
    <main className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton onClick={() => openDialog('transfer')} size="sm" tone="secondary">
              <ArrowLeftRight /> Transfer
            </AppButton>
            <AppButton onClick={() => openDialog('add')} size="sm">
              <Plus /> Add shared wallet
            </AppButton>
          </>
        }
        description={`${data.family.name} · ${data.family.memberCount} members · Balances are visible to everyone.`}
        title="Shared wallets"
      />

      <section
        aria-label="Shared wallet summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <AppStatCard
          icon={<WalletCards />}
          label="Total shared balance"
          value={formatCurrency(totalBalance)}
          variant="featured"
        />
        <AppStatCard
          change="This month"
          icon={<TrendingUp />}
          label="Money added"
          tone="success"
          value={formatCurrency(monthlyIncome)}
        />
        <AppStatCard
          change="This month"
          icon={<TrendingDown />}
          label="Money spent"
          tone="danger"
          value={formatCurrency(monthlyExpense)}
        />
        <AppStatCard
          change={`${data.family.memberCount} members`}
          icon={<Users />}
          label="Active wallets"
          tone="info"
          value={data.wallets.length}
        />
      </section>

      <section aria-labelledby="wallet-list-title">
        <div className="flex w-full flex-col gap-3 sm:flex-row justify-between lg:w-auto">
          <AppSegmentedControl
            className="w-full sm:w-80"
            onValueChange={(value) => {
              if (value === 'all' || value === 'bank' || value === 'cash' || value === 'mobile') {
                setFilter(value);
              }
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Bank', value: 'bank' },
              { label: 'Cash', value: 'cash' },
              { label: 'Mobile', value: 'mobile' },
            ]}
            value={filter}
          />
          <AppInput
            className="pr-8!"
            containerClassName="w-full sm:w-72"
            leading={<Search />}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shared wallets"
            trailing={
              query ? (
                <AppButton
                  aria-label="Clear wallet search"
                  className="size-5! rounded-sm! p-0!"
                  onClick={() => setQuery('')}
                  size="icon-xs"
                  tone="ghost"
                >
                  <X />
                </AppButton>
              ) : null
            }
            value={query}
          />
        </div>

        {filteredWallets.length ? (
          <div className="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredWallets.map((wallet) => (
              <SharedWalletCard
                key={wallet.id}
                members={wallet.accessedBy.flatMap((id) => {
                  const member = memberMap.get(id);
                  return member ? [member] : [];
                })}
                onDelete={() => setDeleting(wallet)}
                onEdit={() => openDialog('edit', wallet)}
                onTransfer={() => openDialog('transfer', wallet)}
                wallet={wallet}
              />
            ))}
          </div>
        ) : (
          <AppEmptyState
            className="border-b border-border"
            description="Try another wallet type or clear your search."
            icon={<Search />}
            title="No shared wallets found"
          />
        )}
      </section>

      <AppCard padding="none">
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <h2 className="font-semibold">Recent wallet activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest family payments, contributions, and transfers.
            </p>
          </div>
          <AppButton
            nativeButton={false}
            render={<Link href="/family/transactions" />}
            size="sm"
            tone="secondary"
          >
            View all
          </AppButton>
        </div>
        <AppTable
          className="rounded-none border-x-0 border-b-0 border-t border-border"
          columns={columns}
          getRowKey={(activity) => activity.id}
          rows={data.activities}
        />
      </AppCard>

      <SharedWalletDialog
        editing={selectedWallet}
        kind={dialog}
        onClose={() => {
          setDialog(null);
          setSelectedWallet(null);
        }}
        wallets={data.wallets}
      />
      <AppConfirmDialog
        confirmLabel="Delete wallet"
        description="This shared wallet can only be deleted after its transactions are moved or removed. Every member will lose access."
        onConfirm={() => setDeleting(null)}
        onOpenChange={(open) => !open && setDeleting(null)}
        open={Boolean(deleting)}
        title={`Delete ${deleting?.name ?? 'shared wallet'}?`}
      />
    </main>
  );
}

function SharedWalletCard({
  members,
  onDelete,
  onEdit,
  onTransfer,
  wallet,
}: {
  members: FamilyMemberSummary[];
  onDelete: () => void;
  onEdit: () => void;
  onTransfer: () => void;
  wallet: SharedWallet;
}) {
  const meta = walletMeta[wallet.type];
  const Icon = meta.icon;
  const router = useRouter();

  return (
    <AppCard className="relative h-full overflow-hidden">
      <span className={cn('absolute inset-x-0 top-0 h-1', meta.accent)} />
      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid size-10 place-items-center rounded-lg', meta.soft)}>
          <Icon className="size-5" />
        </span>
        <AppDropdownMenu
          items={[
            {
              icon: <Eye />,
              label: 'View transactions',
              onSelect: () => router.push(`/family/transactions?wallet=${wallet.id}`),
            },
            { icon: <ArrowLeftRight />, label: 'Transfer money', onSelect: onTransfer },
            { icon: <Edit3 />, label: 'Edit wallet', onSelect: onEdit },
            {
              disabled: wallet.isDefault,
              icon: <Trash2 />,
              label: 'Delete wallet',
              onSelect: onDelete,
              separatorBefore: true,
              variant: 'destructive',
            },
          ]}
          trigger={
            <AppButton aria-label={`${wallet.name} actions`} size="icon-sm" tone="secondary">
              <MoreHorizontal />
            </AppButton>
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h3 className="font-semibold">{wallet.name}</h3>
        {wallet.isDefault ? <AppBadge status="info">Default</AppBadge> : null}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {meta.label} · {wallet.currency}
      </p>
      <p className="mt-4 text-2xl font-semibold tracking-tight">{formatCurrency(wallet.balance)}</p>
      <p className="mt-1 text-xs text-muted-foreground">Available shared balance</p>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-muted/45 p-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Added</p>
          <p className="mt-1 font-medium text-success">+{formatCurrency(wallet.monthlyIncome)}</p>
        </div>
        <div className="border-l border-border pl-3">
          <p className="text-xs text-muted-foreground">Spent</p>
          <p className="mt-1 font-medium text-danger">-{formatCurrency(wallet.monthlyExpense)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex items-center">
          {members.map((member, index) => (
            <AppAvatar
              alt={member.name}
              className={cn('ring-2 ring-card', index > 0 && '-ml-2')}
              fallback={member.initials}
              key={member.id}
              size="sm"
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{members.length} members</span>
        </div>
        <span className="text-xs text-muted-foreground">{wallet.transactions} entries</span>
      </div>
    </AppCard>
  );
}

function SharedWalletDialog({
  editing,
  kind,
  onClose,
  wallets,
}: {
  editing: SharedWallet | null;
  kind: WalletDialog;
  onClose: () => void;
  wallets: SharedWallet[];
}) {
  const transfer = kind === 'transfer';
  const [walletName, setWalletName] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const walletOptions = wallets.map((wallet) => ({ label: wallet.name, value: wallet.id }));
  const walletTypeOptions = (Object.keys(walletMeta) as SharedWalletType[]).map((type) => ({
    label: walletMeta[type].label,
    value: type,
  }));

  useEffect(() => {
    setWalletName(editing?.name ?? '');
    setOpeningBalance(editing ? String(editing.balance) : '');
  }, [editing, kind]);

  return (
    <AppModal
      description={
        transfer
          ? 'Move funds between family wallets. Everyone with access will see the transfer.'
          : editing
            ? 'Update this shared account for every family member.'
            : 'Create an account that selected family members can use.'
      }
      footer={
        <>
          <AppButton onClick={onClose} tone="secondary">
            Cancel
          </AppButton>
          <AppButton onClick={onClose}>
            <Check />
            {transfer ? 'Transfer funds' : editing ? 'Save changes' : 'Add shared wallet'}
          </AppButton>
        </>
      }
      onOpenChange={(open) => !open && onClose()}
      open={Boolean(kind)}
      title={
        transfer ? 'Transfer shared funds' : editing ? 'Edit shared wallet' : 'Add shared wallet'
      }
    >
      {transfer ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AppField label="From wallet" required>
              <AppSelect
                defaultValue={editing?.id ?? wallets[0]?.id}
                key={`${kind}-${editing?.id ?? 'default'}-source`}
                options={walletOptions}
              />
            </AppField>
            <AppField label="To wallet" required>
              <AppSelect options={walletOptions} placeholder="Select destination" />
            </AppField>
          </div>
          <AppField label="Amount" required>
            <AppInput inputMode="decimal" placeholder="৳0.00" />
          </AppField>
          <AppField label="Note">
            <AppInput placeholder="Optional transfer note" />
          </AppField>
        </div>
      ) : (
        <div className="space-y-4">
          <AppField label="Wallet name" required>
            <AppInput
              onChange={(event) => setWalletName(event.target.value)}
              placeholder="e.g. Family savings"
              value={walletName}
            />
          </AppField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AppField label="Wallet type" required>
              <AppSelect
                defaultValue={editing?.type}
                key={`${kind}-${editing?.id ?? 'new'}-type`}
                options={walletTypeOptions}
                placeholder="Select type"
              />
            </AppField>
            <AppField label="Currency" required>
              <AppSelect
                defaultValue="bdt"
                options={[{ label: 'BDT — Bangladeshi taka', value: 'bdt' }]}
              />
            </AppField>
          </div>
          <AppField label="Opening balance" required>
            <AppInput
              inputMode="decimal"
              onChange={(event) => setOpeningBalance(event.target.value)}
              placeholder="৳0.00"
              value={openingBalance}
            />
          </AppField>
          <AppField
            description="You can fine-tune member permissions from family settings."
            label="Member access"
          >
            <div className="flex items-center justify-between rounded-md border border-border bg-muted/35 px-3 py-2.5 text-sm">
              <span>All family members</span>
              <AppBadge status="success">{wallets.length ? '3 members' : 'Enabled'}</AppBadge>
            </div>
          </AppField>
        </div>
      )}
    </AppModal>
  );
}
