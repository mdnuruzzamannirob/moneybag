'use client';

import { AppButton, AppConfirmDialog, AppDropdownMenu } from '@/components/app-ui';
import { Edit3, MoreHorizontal, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function WalletDetailActions({
  isDefault,
  walletId,
  walletName,
}: {
  isDefault: boolean;
  walletId: string;
  walletName: string;
}) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <AppDropdownMenu
        items={[
          {
            icon: <Edit3 />,
            label: 'Edit wallet',
            onSelect: () => router.push(`/wallets?edit=${walletId}`),
          },
          {
            disabled: isDefault,
            icon: <Star />,
            label: isDefault ? 'Default wallet' : 'Set as default',
          },
          {
            disabled: isDefault,
            icon: <Trash2 />,
            label: 'Delete wallet',
            onSelect: () => setDeleteOpen(true),
            separatorBefore: true,
            variant: 'destructive',
          },
        ]}
        trigger={
          <AppButton aria-label={`${walletName} actions`} size="icon-sm" tone="secondary">
            <MoreHorizontal />
          </AppButton>
        }
      />

      <AppConfirmDialog
        confirmLabel="Delete wallet"
        description="This wallet can only be deleted after its transactions are moved or removed."
        onConfirm={() => {
          setDeleteOpen(false);
          router.push('/wallets');
        }}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        title={`Delete ${walletName}?`}
      />
    </>
  );
}
