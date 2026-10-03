export type UserPersona = 'student' | 'freelancer' | 'self_employed' | 'small_business';

export type VerificationStatus = 'Verified' | 'Pending Verification' | 'Under Review' | 'Self-Reported';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  persona: UserPersona;
  personaTitle: string;
  city: string;
  state: string;
  country: string;
  monthlyIncomeRange: string;
  passportId: string;
  verificationStatus: VerificationStatus;
  profileCompletion: number;
  avatarUrl: string;
  lastUpdated: string;
  inflowAverage: number;
  outflowAverage: number;
  savingsRate: number;
  incomeConsistencyScore: number;
  savingsBehaviorScore: number;
  expenseManagementScore: number;
  isDemoUser: boolean;
}

export interface FinancialMetric {
  label: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isPositive: boolean;
    period: string;
  };
  indicator?: 'healthy' | 'neutral' | 'attention';
}

export interface MonthlyCashFlow {
  month: string;
  inflow: number;
  outflow: number;
  netSavings: number;
  consistencyScore: number;
  isProjected?: boolean;
}

export type PaymentMethod = 
  | 'UPI' 
  | 'Net Banking' 
  | 'IMPS / NEFT' 
  | 'Debit Card' 
  | 'Credit Card' 
  | 'Cash' 
  | 'Client Direct Payout';

export type TransactionCategory = 
  | 'Freelance Payment'
  | 'Client Retainer'
  | 'Salary / Stipend'
  | 'Platform Inflow'
  | 'Rent & Housing'
  | 'Groceries & Food'
  | 'Utilities & Bills'
  | 'Software & Tools'
  | 'Coworking / Studio'
  | 'Transportation'
  | 'Dining & Outing'
  | 'Mobile & Internet'
  | 'Healthcare & Wellness'
  | 'Education & Skill'
  | 'Taxes & Compliance'
  | 'Savings & Investments'
  | 'General Expense';

export interface FinancialTransaction {
  id: string;
  user_id?: string;
  title: string;
  source: 'HDFC Bank' | 'ICICI Bank' | 'SBI' | 'UPI - Google Pay' | 'UPI - PhonePe' | 'Razorpay' | 'Direct Transfer' | 'Cash';
  category: TransactionCategory;
  type: 'inflow' | 'outflow';
  amount: number;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  status: 'settled' | 'cleared' | 'verified';
  referenceId: string;
  counterparty?: string;
  notes?: string;
  is_demo?: boolean;
}

export interface FinancialRecord {
  id: string;
  title: string;
  source: 'HDFC Bank' | 'ICICI Bank' | 'Razorpay' | 'UPI Statements' | 'GST Portal' | 'Client Contract' | 'Invoicing Portal';
  category: 'Bank Statement' | 'UPI Inflow Audit' | 'Client Invoice' | 'GST Filing' | 'Tax Assessment' | 'Income Certificate';
  amount: number;
  date: string;
  verificationStatus: 'verified' | 'pending_verification' | 'self_reported';
  confidenceLevel: 'High' | 'Medium' | 'Standard';
  fileFormat?: string;
  referenceId: string;
}

export interface FilterState {
  searchQuery: string;
  datePreset: 'all' | '30d' | '90d' | '6m' | 'custom';
  startDate: string;
  endDate: string;
  category: string;
  source: string;
  paymentMethod: string;
  minAmount: string;
  maxAmount: string;
  type?: 'all' | 'inflow' | 'outflow';
  status?: string;
}

export interface ConsentPartner {
  id: string;
  name: string;
  type: 'Lender' | 'Landlord & Property Manager' | 'Equipment Financing' | 'Fintech Underwriting' | 'MSME Credit Network';
  logoText: string;
  requestedFields: string[];
  purpose: string;
  grantedDate?: string;
  expiryDate?: string;
  status: 'active' | 'pending' | 'revoked';
  accessLevel: 'Full Passport' | 'Income Verification Only' | 'Cash-Flow Summary' | 'Custom Fields';
  consentToken?: string;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  category: 'Income Consistency' | 'Spending Trend' | 'Cash Flow' | 'Profile Completeness' | 'Savings Action' | 'Anomaly Alert';
  type: 'positive' | 'neutral' | 'recommendation' | 'alert';
  severity?: 'low' | 'medium' | 'high';
  metricNote?: string;
  actionLabel?: string;
  actionRoute?: string;
  isAiGenerated?: boolean;
  modelConfidence?: string;
}

export interface CashFlowForecast {
  month: string;
  historicalInflow?: number;
  historicalOutflow?: number;
  estimatedIncome: number;
  estimatedExpenses: number;
  estimatedBalance: number;
  confidenceScore: number;
  assumptions: string[];
}

export interface ApplicantProfile {
  id: string;
  fullName: string;
  persona: string;
  passportId: string;
  city: string;
  verificationStatus: 'Verified' | 'Pending Records' | 'Under Review';
  profileCompletion: number;
  monthlyAverageInflow: number;
  monthlyAverageOutflow: number;
  incomeConsistencyRating: 'High Consistency' | 'Moderate Consistency' | 'Variable';
  expenseToIncomeRatio: string;
  consentExpiry: string;
  consentedDataFields: string[];
  verifiedRecordsCount: number;
  lastUpdated: string;
  notes?: string;
  applicationPurpose: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
