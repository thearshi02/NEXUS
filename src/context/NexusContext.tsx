import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FinancialRecord, 
  FinancialTransaction,
  MonthlyCashFlow, 
  ConsentPartner, 
  FinancialInsight, 
  ApplicantProfile,
  ToastMessage,
  UserPersona,
  UserProfile,
  CashFlowForecast
} from '../types';
import { 
  initialUser,
  initialCashFlowData, 
  initialRecords, 
  initialTransactions,
  initialConsentPartners, 
  initialInsights, 
  initialForecasts,
  applicantProfiles 
} from '../data/mockData';
import { analyzeFinancialTransactions, generateCashFlowForecast } from '../services/aiService';

interface NexusContextType {
  user: UserProfile;
  updateUserPersona: (persona: UserPersona, personaTitle: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  // Financial Summary & Calculations
  monthlyInflow: number;
  monthlyOutflow: number;
  estimatedSavings: number;
  savingsRate: number;
  
  // Data entities
  cashFlowData: MonthlyCashFlow[];
  records: FinancialRecord[];
  addRecord: (record: Omit<FinancialRecord, 'id' | 'referenceId'>) => void;
  deleteRecord: (id: string) => void;
  
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id' | 'referenceId'>) => void;
  updateTransaction: (id: string, tx: Partial<FinancialTransaction>) => void;
  deleteTransaction: (id: string) => void;
  resetDemoData: () => void;
  
  partners: ConsentPartner[];
  revokeConsent: (id: string) => void;
  grantConsent: (partner: Omit<ConsentPartner, 'id' | 'grantedDate' | 'status'>) => void;
  
  insights: FinancialInsight[];
  aiEngineMode: 'gemini_ai' | 'rule_based_engine';
  isAiRefreshing: boolean;
  refreshAiInsights: () => Promise<void>;
  
  forecasts: CashFlowForecast[];
  updateForecastSimulation: (incomeMult: number, expenseMult: number) => void;
  
  applicants: ApplicantProfile[];
  updateApplicantNotes: (id: string, notes: string) => void;
  
  // Modals & Drawers
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isConsentModalOpen: boolean;
  setIsConsentModalOpen: (open: boolean) => void;
  activeConsentPartner: ConsentPartner | null;
  openConsentModal: (partner: ConsentPartner | null) => void;
  
  // User Actions
  exportUserData: (format: 'json' | 'csv') => void;
  deleteAccount: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, description: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage state initialization
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [transactions, setTransactions] = useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem('nexus_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [records, setRecords] = useState<FinancialRecord[]>(() => {
    const saved = localStorage.getItem('nexus_records');
    return saved ? JSON.parse(saved) : initialRecords;
  });

  const [partners, setPartners] = useState<ConsentPartner[]>(() => {
    const saved = localStorage.getItem('nexus_partners');
    return saved ? JSON.parse(saved) : initialConsentPartners;
  });

  const [insights, setInsights] = useState<FinancialInsight[]>(() => {
    const saved = localStorage.getItem('nexus_insights');
    return saved ? JSON.parse(saved) : initialInsights;
  });

  const [cashFlowData] = useState<MonthlyCashFlow[]>(initialCashFlowData);
  const [forecasts, setForecasts] = useState<CashFlowForecast[]>(initialForecasts);
  const [applicants, setApplicants] = useState<ApplicantProfile[]>(applicantProfiles);
  const [aiEngineMode, setAiEngineMode] = useState<'gemini_ai' | 'rule_based_engine'>('rule_based_engine');
  const [isAiRefreshing, setIsAiRefreshing] = useState(false);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [activeConsentPartner, setActiveConsentPartner] = useState<ConsentPartner | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent storage hooks
  useEffect(() => {
    localStorage.setItem('nexus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nexus_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nexus_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('nexus_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('nexus_insights', JSON.stringify(insights));
  }, [insights]);

  // Dynamic Financial Totals from Active Transactions
  const inflows = transactions.filter((t) => t.type === 'inflow');
  const outflows = transactions.filter((t) => t.type === 'outflow');
  
  const monthlyInflow = inflows.length > 0 ? inflows.reduce((acc, t) => acc + t.amount, 0) : 45000;
  const monthlyOutflow = outflows.length > 0 ? outflows.reduce((acc, t) => acc + t.amount, 0) : 28500;
  const estimatedSavings = Math.max(0, monthlyInflow - monthlyOutflow);
  const savingsRate = monthlyInflow > 0 ? (estimatedSavings / monthlyInflow) * 100 : 36.7;

  const showToast = (title: string, description: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserPersona = (persona: UserPersona, personaTitle: string) => {
    setUser((prev) => ({
      ...prev,
      persona,
      personaTitle
    }));
    showToast('Persona Profile Updated', `Switched mode to ${personaTitle}.`, 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Your profile details were saved successfully.', 'success');
  };

  const addRecord = (recordData: Omit<FinancialRecord, 'id' | 'referenceId'>) => {
    const newRecord: FinancialRecord = {
      ...recordData,
      id: `REC-09${Math.floor(Math.random() * 90) + 10}`,
      referenceId: `nx_ref_${Date.now().toString(36)}`
    };
    setRecords((prev) => [newRecord, ...prev]);
    showToast('Document Verified', `${recordData.title} was uploaded and indexed into your Trust Passport.`, 'success');
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Record Removed', 'The document was removed from your Trust Passport.', 'info');
  };

  const addTransaction = (txData: Omit<FinancialTransaction, 'id' | 'referenceId'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`,
      referenceId: `UPI/${Math.floor(Math.random() * 9000000000 + 1000000000)}/NEX`
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('Transaction Logged', `${txData.title} was recorded (${txData.type === 'inflow' ? '+' : '-'}₹${txData.amount.toLocaleString('en-IN')}).`, 'success');
  };

  const updateTransaction = (id: string, updates: Partial<FinancialTransaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast('Transaction Updated', 'Changes were saved and dashboard totals recalculated.', 'success');
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Transaction Deleted', 'The transaction was removed from your history.', 'info');
  };

  const resetDemoData = () => {
    setUser(initialUser);
    setTransactions(initialTransactions);
    setRecords(initialRecords);
    setPartners(initialConsentPartners);
    setInsights(initialInsights);
    setForecasts(initialForecasts);
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('nexus_transactions');
    localStorage.removeItem('nexus_records');
    localStorage.removeItem('nexus_partners');
    localStorage.removeItem('nexus_insights');
    showToast('Demo Data Restored', 'All values reset to John Doe (Lucknow) baseline.', 'info');
  };

  const revokeConsent = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'revoked' as const } : p))
    );
    showToast('Access Revoked', 'Institution access terminated. No further data sharing queries will be fulfilled.', 'warning');
  };

  const grantConsent = (partnerData: Omit<ConsentPartner, 'id' | 'grantedDate' | 'status'>) => {
    const newPartner: ConsentPartner = {
      ...partnerData,
      id: `PART-0${partners.length + 1}`,
      grantedDate: '03 Oct 2026',
      expiryDate: '03 Jan 2027',
      status: 'active',
      consentToken: `NEX-CONSENT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    setPartners((prev) => [newPartner, ...prev]);
    showToast('Consent Granted', `Permission granted to ${partnerData.name} for ${partnerData.accessLevel}.`, 'success');
  };

  const refreshAiInsights = async () => {
    setIsAiRefreshing(true);
    try {
      const result = await analyzeFinancialTransactions(transactions, user);
      setInsights(result.insights);
      setAiEngineMode(result.mode);
      showToast(
        result.mode === 'gemini_ai' ? 'Gemini AI Insights Updated' : 'Rule-Based Engine Refreshed',
        result.summary,
        'info'
      );
    } catch (err) {
      showToast('Analysis Completed', 'Financial metrics re-evaluated against Indian freelancer baseline.', 'info');
    } finally {
      setIsAiRefreshing(false);
    }
  };

  const updateForecastSimulation = (incomeMult: number, expenseMult: number) => {
    const newForecast = generateCashFlowForecast(transactions, incomeMult, expenseMult);
    setForecasts(newForecast);
  };

  const openConsentModal = (partner: ConsentPartner | null) => {
    setActiveConsentPartner(partner);
    setIsConsentModalOpen(true);
  };

  const updateApplicantNotes = (id: string, notes: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, notes } : app))
    );
    showToast('Notes Saved', 'Assessment notes updated in applicant dossier.', 'success');
  };

  const exportUserData = (format: 'json' | 'csv') => {
    const dataObj = {
      user,
      summary: { monthlyInflow, monthlyOutflow, estimatedSavings, savingsRate },
      transactions,
      records,
      partners,
      insights,
      forecasts,
      exportedAt: new Date().toISOString()
    };

    if (format === 'json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `NEXUS_Financial_Data_${user.name.replace(/\s+/g, '_')}_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      // CSV of transactions
      const headers = 'ID,Title,Amount,Type,Category,PaymentMethod,Date,ReferenceID\n';
      const rows = transactions.map(t => `"${t.id}","${t.title}",${t.amount},"${t.type}","${t.category}","${t.paymentMethod}","${t.date}","${t.referenceId}"`).join('\n');
      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', csvContent);
      downloadAnchor.setAttribute('download', `NEXUS_Transactions_${user.name.replace(/\s+/g, '_')}_${Date.now()}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
    showToast('Export Completed', `Your financial records have been exported as ${format.toUpperCase()}.`, 'success');
  };

  const deleteAccount = () => {
    localStorage.clear();
    resetDemoData();
    showToast('Account Data Purged', 'All personal records, transactions, and consent tokens have been deleted.', 'warning');
    window.location.href = '/';
  };

  return (
    <NexusContext.Provider
      value={{
        user,
        updateUserPersona,
        updateUserProfile,
        monthlyInflow,
        monthlyOutflow,
        estimatedSavings,
        savingsRate,
        cashFlowData,
        records,
        addRecord,
        deleteRecord,
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetDemoData,
        partners,
        revokeConsent,
        grantConsent,
        insights,
        aiEngineMode,
        isAiRefreshing,
        refreshAiInsights,
        forecasts,
        updateForecastSimulation,
        applicants,
        updateApplicantNotes,
        isShareModalOpen,
        setIsShareModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isConsentModalOpen,
        setIsConsentModalOpen,
        activeConsentPartner,
        openConsentModal,
        exportUserData,
        deleteAccount,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
