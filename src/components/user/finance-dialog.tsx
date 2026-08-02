'use client';

import { Edit3, Ellipsis, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  AppAlert,
  AppButton,
  AppConfirmDialog,
  AppCurrencyInput,
  AppDatePicker,
  AppDropdownMenu,
  AppField,
  AppFileUpload,
  AppInput,
  AppModal,
  AppSegmentedControl,
  AppSelect,
  AppSwitch,
} from '@/components/app-ui';

export type FinanceDialogKind =
  'transaction' | 'import' | 'export' | 'budget' | 'goal' | 'contribution';

const dialogTitles: Record<FinanceDialogKind, string> = {
  transaction: 'Add transaction',
  import: 'Import transactions',
  export: 'Export transactions',
  budget: 'Create budget',
  goal: 'Create savings goal',
  contribution: 'Add contribution',
};

const categoryOptions = [
  { label: 'Food & dining', value: 'food' },
  { label: 'Transport', value: 'transport' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Bills', value: 'bills' },
];

export function FinanceDialog({
  editing = false,
  kind,
  onClose,
}: {
  editing?: boolean;
  kind: FinanceDialogKind;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const title = editing ? `Edit ${kind}` : dialogTitles[kind];
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <AppModal
      description={saved ? undefined : getDialogDescription(kind)}
      footer={
        saved ? (
          <AppButton onClick={onClose} size="sm">
            Done
          </AppButton>
        ) : (
          <>
            <AppButton onClick={onClose} size="sm" tone="secondary" type="button">
              Cancel
            </AppButton>
            <AppButton form="finance-dialog-form" size="sm" type="submit">
              {getSubmitLabel(kind, editing)}
            </AppButton>
          </>
        )
      }
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open
      title={title}
    >
      {saved ? (
        <AppAlert title="Ready to continue" tone="success">
          {getSuccessMessage(kind)}
        </AppAlert>
      ) : (
        <form className="space-y-4" id="finance-dialog-form" onSubmit={submit}>
          <FinanceFields kind={kind} />
        </form>
      )}
    </AppModal>
  );
}

function FinanceFields({ kind }: { kind: FinanceDialogKind }) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [fileName, setFileName] = useState('');

  if (kind === 'import') {
    return (
      <>
        <AppFileUpload
          accept=".csv,text/csv"
          description="CSV only · maximum file size 1 MB"
          label={fileName || 'Choose or drop a CSV file'}
          onFiles={(files) => setFileName(files?.[0]?.name ?? '')}
        />
        <p className="text-xs text-muted-foreground">
          Required columns: date, description, amount, type, category and wallet.
        </p>
      </>
    );
  }

  if (kind === 'export') {
    return (
      <>
        <AppField label="Date range">
          <AppSelect
            defaultValue="july"
            options={[
              { label: 'July 2026', value: 'july' },
              { label: 'Last 3 months', value: 'quarter' },
              { label: 'This year', value: 'year' },
              { label: 'All time', value: 'all' },
            ]}
          />
        </AppField>
        <AppSwitch
          defaultChecked
          description="Add notes and wallet details to each exported row."
          label="Include additional details"
        />
      </>
    );
  }

  if (kind === 'transaction') {
    const transactionCategories =
      type === 'income'
        ? [
            { label: 'Salary', value: 'salary' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Other income', value: 'other-income' },
          ]
        : categoryOptions;
    return (
      <>
        <AppField label="Type">
          <AppSegmentedControl
            onValueChange={(value) => {
              if (value === 'income' || value === 'expense') setType(value);
            }}
            options={[
              { label: 'Income', value: 'income' },
              { label: 'Expense', value: 'expense' },
            ]}
            value={type}
          />
        </AppField>
        <AppField label="Description" required>
          <AppInput placeholder="e.g. Grocery shopping" required />
        </AppField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AppField label="Amount" required>
            <AppCurrencyInput placeholder="0" required />
          </AppField>
          <AppField label="Date" required>
            <AppDatePicker value={new Date(2026, 6, 28)} />
          </AppField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AppField label="Category">
            <AppSelect
              defaultValue={transactionCategories[0]?.value}
              options={transactionCategories}
            />
          </AppField>
          <AppField label="Wallet">
            <AppSelect
              defaultValue="cash"
              options={[
                { label: 'Cash', value: 'cash' },
                { label: 'BRAC Bank', value: 'brac' },
                { label: 'bKash', value: 'bkash' },
              ]}
            />
          </AppField>
        </div>
        <AppField label="Note (optional)">
          <AppInput placeholder="Add a note" />
        </AppField>
        <AppFileUpload
          accept="image/png,image/jpeg,application/pdf"
          description="JPG, PNG or PDF"
          label={fileName || 'Attach receipt'}
          onFiles={(files) => setFileName(files?.[0]?.name ?? '')}
        />
      </>
    );
  }

  if (kind === 'budget') {
    return (
      <>
        <AppField label="Category">
          <AppSelect defaultValue="food" options={categoryOptions} />
        </AppField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AppField label="Monthly limit" required>
            <AppCurrencyInput placeholder="0" required />
          </AppField>
          <AppField label="Alert threshold">
            <AppSelect
              defaultValue="80"
              options={[
                { label: '80%', value: '80' },
                { label: '90%', value: '90' },
              ]}
            />
          </AppField>
        </div>
        <AppField label="Period">
          <AppSelect
            defaultValue="monthly"
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          />
        </AppField>
        <AppSwitch
          description="Add unused funds to the next month."
          label="Roll over unspent amount"
        />
      </>
    );
  }

  if (kind === 'goal') {
    return (
      <>
        <AppField label="Goal name" required>
          <AppInput placeholder="e.g. Emergency fund" required />
        </AppField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AppField label="Target amount" required>
            <AppCurrencyInput placeholder="0" required />
          </AppField>
          <AppField label="Already saved">
            <AppCurrencyInput placeholder="0" />
          </AppField>
        </div>
        <AppField label="Target deadline" required>
          <AppDatePicker value={new Date(2026, 11, 31)} />
        </AppField>
        <AppField label="Goal colour">
          <AppSelect
            defaultValue="indigo"
            options={[
              { label: 'Indigo', value: 'indigo' },
              { label: 'Green', value: 'green' },
              { label: 'Pink', value: 'pink' },
              { label: 'Amber', value: 'amber' },
            ]}
          />
        </AppField>
      </>
    );
  }

  return (
    <>
      <div className="rounded-lg bg-muted p-4 text-sm">
        <p className="text-muted-foreground">Add a one-time contribution to this goal.</p>
        <p className="mt-1 text-xl font-semibold">Every amount counts</p>
      </div>
      <AppField label="Contribution amount" required>
        <AppCurrencyInput autoFocus placeholder="0" required />
      </AppField>
      <AppField label="Note (optional)">
        <AppInput placeholder="e.g. July savings" />
      </AppField>
    </>
  );
}

function getDialogDescription(kind: FinanceDialogKind) {
  if (kind === 'import') return 'Upload a CSV file and validate it before importing.';
  if (kind === 'export') return 'Choose which transaction data to include.';
  if (kind === 'contribution') return 'Record progress toward this savings goal.';
  return 'Complete the details below, then save your changes.';
}

function getSubmitLabel(kind: FinanceDialogKind, editing: boolean) {
  if (kind === 'export') return 'Export CSV';
  if (kind === 'import') return 'Import file';
  if (kind === 'contribution') return 'Add contribution';
  return editing ? 'Save changes' : 'Save';
}

function getSuccessMessage(kind: FinanceDialogKind) {
  if (kind === 'import') return 'The file is ready for validation.';
  if (kind === 'export') return 'Your export has been prepared.';
  return 'Your changes have been saved.';
}

export function ConfirmDialog({
  description,
  onClose,
  title,
}: {
  description: string;
  onClose: () => void;
  title: string;
}) {
  return (
    <AppConfirmDialog
      description={description}
      onConfirm={onClose}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open
      title={title}
    />
  );
}

export function RowMenu({
  inline = false,
  kind,
}: {
  inline?: boolean;
  kind: 'transaction' | 'budget' | 'goal';
}) {
  const [dialog, setDialog] = useState<'edit' | 'delete' | null>(null);
  return (
    <>
      {inline ? (
        <div className="flex justify-end gap-1">
          <AppButton
            aria-label={`Edit ${kind}`}
            onClick={() => setDialog('edit')}
            size="icon-sm"
            tone="info"
          >
            <Edit3 />
          </AppButton>
          <AppButton
            aria-label={`Delete ${kind}`}
            onClick={() => setDialog('delete')}
            size="icon-sm"
            tone="danger"
          >
            <Trash2 />
          </AppButton>
        </div>
      ) : (
        <AppDropdownMenu
          items={[
            { icon: <Edit3 />, label: 'Edit', onSelect: () => setDialog('edit') },
            {
              icon: <Trash2 />,
              label: 'Delete',
              onSelect: () => setDialog('delete'),
              separatorBefore: true,
              variant: 'destructive',
            },
          ]}
          trigger={
            <AppButton aria-label="More actions" size="icon-xs" tone="secondary">
              <Ellipsis />
            </AppButton>
          }
        />
      )}
      {dialog === 'edit' ? (
        <FinanceDialog editing kind={kind} onClose={() => setDialog(null)} />
      ) : null}
      {dialog === 'delete' ? (
        <ConfirmDialog
          description="This action cannot be undone. Related information will remain available where required."
          onClose={() => setDialog(null)}
          title={`Delete ${kind}`}
        />
      ) : null}
    </>
  );
}
