import type { DistributionItem, IncomeExpensePoint } from '@/types/dashboard-models';

export type AnalyticsPeriod = '7' | '30' | '90';

export type AnalyticsSnapshot = {
  averageDailyExpense: number;
  categories: DistributionItem[];
  expense: number;
  income: number;
  periodLabel: string;
  savingsRate: number;
  trend: IncomeExpensePoint[];
  comparison: string;
};

export type ReportView = 'monthly' | 'yearly' | 'category' | 'trend';

export type ReportTransaction = {
  amount: number;
  category: string;
  color: string;
  date: string;
  id: number;
  title: string;
  type: 'income' | 'expense';
  wallet: string;
};

export type MonthlyReport = {
  averageExpense: number;
  categories: DistributionItem[];
  expense: number;
  expenseTransactions: number;
  income: number;
  incomeTransactions: number;
  key: string;
  label: string;
  largestExpense: number;
  mostUsedCategory: string;
  shortLabel: string;
  transactions: ReportTransaction[];
};

export type TrendPoint = IncomeExpensePoint & {
  date: string;
  fullLabel: string;
};
