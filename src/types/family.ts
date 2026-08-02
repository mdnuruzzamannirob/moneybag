export type FamilyMemberSummary = {
  id: string;
  initials: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
};

export type SharedWalletType = 'bank' | 'cash' | 'mobile';

export type SharedWallet = {
  accessedBy: string[];
  balance: number;
  currency: 'BDT';
  id: string;
  isDefault: boolean;
  monthlyExpense: number;
  monthlyIncome: number;
  name: string;
  transactions: number;
  type: SharedWalletType;
  updated: string;
};

export type SharedWalletActivity = {
  amount: number;
  date: string;
  id: string;
  note: string;
  paidBy: string;
  splitLabel: string;
  title: string;
  type: 'income' | 'expense' | 'transfer';
  walletId: string;
};

export type FamilyWalletsData = {
  activities: SharedWalletActivity[];
  family: {
    memberCount: number;
    name: string;
  };
  members: FamilyMemberSummary[];
  wallets: SharedWallet[];
};
