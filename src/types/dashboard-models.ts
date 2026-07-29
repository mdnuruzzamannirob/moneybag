export type MetricTone = 'primary' | 'success' | 'warning' | 'danger' | 'accent';

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  change: string;
  direction: 'up' | 'down' | 'neutral';
  tone: MetricTone;
};

export type IncomeExpensePoint = {
  label: string;
  income: number | null;
  expense: number | null;
};

export type DistributionItem = {
  name: string;
  value: number;
  color: string;
};

export type DashboardTransaction = {
  id: number;
  title: string;
  category: string;
  wallet: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  icon: string;
  color: string;
};

export type BudgetSummary = {
  id: number;
  category: string;
  icon: string;
  spent: number;
  limit: number;
  color: string;
};

export type SavingsGoalSummary = {
  id: number;
  title: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  color: string;
};

export type UserDashboardData = {
  user: { firstName: string; overviewDate: string };
  metrics: DashboardMetric[];
  cashFlowByYear: Record<string, IncomeExpensePoint[]>;
  categories: DistributionItem[];
  transactions: DashboardTransaction[];
  budgets: BudgetSummary[];
  goals: SavingsGoalSummary[];
};

export type UserGrowthPoint = {
  label: string;
  users: number | null;
};

export type AdminActivityItem = {
  id: number;
  name: string;
  initials: string;
  meta: string;
  timestamp: string;
  amount?: number;
};

export type ServiceHealth = {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  detail: string;
};

export type AdminDashboardData = {
  metrics: DashboardMetric[];
  userGrowthByYear: Record<string, UserGrowthPoint[]>;
  plans: DistributionItem[];
  recentSignups: AdminActivityItem[];
  recentPayments: AdminActivityItem[];
  services: ServiceHealth[];
};
