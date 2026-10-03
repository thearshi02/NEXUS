import { 
  MonthlyCashFlow, 
  FinancialRecord, 
  FinancialTransaction, 
  ConsentPartner, 
  FinancialInsight, 
  ApplicantProfile,
  UserProfile,
  CashFlowForecast
} from '../types';

export const initialUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@nexusdemo.in',
  persona: 'freelancer',
  personaTitle: 'Independent Software Engineer & Product Designer',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  country: 'India',
  monthlyIncomeRange: '₹30,000 – ₹60,000',
  passportId: 'DEMO-NX-84920',
  verificationStatus: 'Verified',
  profileCompletion: 88,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  lastUpdated: '03 Oct 2026',
  inflowAverage: 45000,
  outflowAverage: 28500,
  savingsRate: 36.7,
  incomeConsistencyScore: 86,
  savingsBehaviorScore: 82,
  expenseManagementScore: 84,
  isDemoUser: true
};

export const initialCashFlowData: MonthlyCashFlow[] = [
  { month: 'Apr 2026', inflow: 42000, outflow: 26500, netSavings: 15500, consistencyScore: 84 },
  { month: 'May 2026', inflow: 44000, outflow: 27800, netSavings: 16200, consistencyScore: 87 },
  { month: 'Jun 2026', inflow: 43500, outflow: 27200, netSavings: 16300, consistencyScore: 86 },
  { month: 'Jul 2026', inflow: 47000, outflow: 29800, netSavings: 17200, consistencyScore: 89 },
  { month: 'Aug 2026', inflow: 45000, outflow: 28200, netSavings: 16800, consistencyScore: 88 },
  { month: 'Sep 2026', inflow: 48500, outflow: 30100, netSavings: 18400, consistencyScore: 91 },
];

export const initialTransactions: FinancialTransaction[] = [
  {
    id: 'TXN-7492',
    title: 'Freelance Project Payment — Apex Fintech',
    source: 'UPI - Google Pay',
    category: 'Freelance Payment',
    type: 'inflow',
    amount: 25000,
    date: '2026-10-01',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6274910284/APEX',
    counterparty: 'Apex Global Tech Ltd',
    notes: 'Milestone 2 frontend implementation settlement',
    is_demo: true
  },
  {
    id: 'TXN-7491',
    title: 'Monthly Retainer — Bangalore Design Studio',
    source: 'HDFC Bank',
    category: 'Client Retainer',
    type: 'inflow',
    amount: 20000,
    date: '2026-09-28',
    paymentMethod: 'Net Banking',
    status: 'settled',
    referenceId: 'IMPS/6281940192/BDS',
    counterparty: 'Bangalore Design Studio LLP',
    notes: 'Monthly UX system maintenance retainer',
    is_demo: true
  },
  {
    id: 'TXN-7490',
    title: 'Monthly Rent — Indira Nagar Studio',
    source: 'UPI - PhonePe',
    category: 'Rent & Housing',
    type: 'outflow',
    amount: 8000,
    date: '2026-09-26',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6280019284/RENT',
    counterparty: 'Verma Properties Lucknow',
    notes: 'Studio apartment rent for October',
    is_demo: true
  },
  {
    id: 'TXN-7489',
    title: 'Grocery Shopping — Blinkit & Smart Bazaar',
    source: 'UPI - Google Pay',
    category: 'Groceries & Food',
    type: 'outflow',
    amount: 3500,
    date: '2026-09-25',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6279102841/GROC',
    counterparty: 'Blinkit Commerce Pvt Ltd',
    notes: 'Bi-weekly household supplies and pantry essentials',
    is_demo: true
  },
  {
    id: 'TXN-7488',
    title: 'Coworking Space — Lucknow Innovators Hub',
    source: 'HDFC Bank',
    category: 'Coworking / Studio',
    type: 'outflow',
    amount: 3500,
    date: '2026-09-22',
    paymentMethod: 'Net Banking',
    status: 'settled',
    referenceId: 'NEFT/6278891023/COWORK',
    counterparty: 'Innovators Hub Gomti Nagar',
    notes: 'Dedicated hot-desk monthly membership',
    is_demo: true
  },
  {
    id: 'TXN-7487',
    title: 'Dining & Food Delivery — Swiggy / Zomato',
    source: 'UPI - PhonePe',
    category: 'Dining & Outing',
    type: 'outflow',
    amount: 2400,
    date: '2026-09-20',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6274481029/SWIG',
    counterparty: 'Bundl Technologies (Swiggy)',
    notes: 'Weekend client dinner and food orders',
    is_demo: true
  },
  {
    id: 'TXN-7486',
    title: 'Cloud & Hosting Infrastructure — AWS & Vercel',
    source: 'HDFC Bank',
    category: 'Software & Tools',
    type: 'outflow',
    amount: 1450,
    date: '2026-09-18',
    paymentMethod: 'Debit Card',
    status: 'settled',
    referenceId: 'POS/DEB/6271984/AWS',
    counterparty: 'Amazon Web Services India',
    notes: 'Cloud dev environment and staging server charges',
    is_demo: true
  },
  {
    id: 'TXN-7485',
    title: 'Fuel & Metro Travel — Lucknow Metro UPI',
    source: 'UPI - Google Pay',
    category: 'Transportation',
    type: 'outflow',
    amount: 1200,
    date: '2026-09-15',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6271109283/METRO',
    counterparty: 'UPMRC Lucknow Metro',
    notes: 'Smart card recharge and local commute',
    is_demo: true
  },
  {
    id: 'TXN-7484',
    title: 'Internet Broadband — JioFiber 300 Mbps',
    source: 'UPI - Google Pay',
    category: 'Mobile & Internet',
    type: 'outflow',
    amount: 799,
    date: '2026-09-10',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6269981023/JIO',
    counterparty: 'Reliance Jio Infocomm',
    notes: 'High speed fiber broadband recurring monthly plan',
    is_demo: true
  },
  {
    id: 'TXN-7483',
    title: 'Mobile Recharge — Airtel 5G Prepaid Plan',
    source: 'UPI - PhonePe',
    category: 'Mobile & Internet',
    type: 'outflow',
    amount: 299,
    date: '2026-09-08',
    paymentMethod: 'UPI',
    status: 'settled',
    referenceId: 'UPI/6268891002/AIRTEL',
    counterparty: 'Bharti Airtel Ltd',
    notes: 'Monthly 2GB/day unlimited 5G calling pack',
    is_demo: true
  },
  {
    id: 'TXN-7482',
    title: 'Emergency Reserve Transfer — Liquid Mutual Fund',
    source: 'ICICI Bank',
    category: 'Savings & Investments',
    type: 'outflow',
    amount: 5000,
    date: '2026-09-05',
    paymentMethod: 'Net Banking',
    status: 'settled',
    referenceId: 'SIP/ICICI/62655819',
    counterparty: 'ICICI Prudential Liquid Fund',
    notes: 'Monthly automated savings allocation',
    is_demo: true
  },
  {
    id: 'TXN-7481',
    title: 'Skill Upgrade — Advanced Design Systems Course',
    source: 'HDFC Bank',
    category: 'Education & Skill',
    type: 'outflow',
    amount: 1852,
    date: '2026-09-02',
    paymentMethod: 'Credit Card',
    status: 'settled',
    referenceId: 'CARD/CC/62611984/EDU',
    counterparty: 'DesignSystems Academy',
    notes: 'Certified UI/UX design architecture bootcamp module',
    is_demo: true
  }
];

export const initialRecords: FinancialRecord[] = [
  {
    id: 'REC-0914',
    title: 'HDFC Bank Primary Savings Statement (6 Months)',
    source: 'HDFC Bank',
    category: 'Bank Statement',
    amount: 270000.00,
    date: '28 Sep 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Digitally Signed e-Statement (PDF)',
    referenceId: 'HDFC/E-STMT/2026/09'
  },
  {
    id: 'REC-0912',
    title: 'Razorpay Payment Gateway Settlement Statement',
    source: 'Razorpay',
    category: 'UPI Inflow Audit',
    amount: 150000.00,
    date: '24 Sep 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Direct API Token Verification',
    referenceId: 'RZP/STMT/8492019'
  },
  {
    id: 'REC-0908',
    title: 'Quarterly GST Filing Acknowledgement (GSTR-4)',
    source: 'GST Portal',
    category: 'GST Filing',
    amount: 45000.00,
    date: '15 Sep 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'GSTIN Portal Signed JSON',
    referenceId: 'GST/ACK/09AAAPL1234F1Z5'
  },
  {
    id: 'REC-0899',
    title: 'Independent Contractor Service Agreement — Apex Tech',
    source: 'Client Contract',
    category: 'Client Invoice',
    amount: 120000.00,
    date: '30 Aug 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'e-Signed Contract PDF',
    referenceId: 'CTR/APEX/2026/Q3'
  },
  {
    id: 'REC-0881',
    title: 'PhonePe & Google Pay Business Merchant QR Audit',
    source: 'UPI Statements',
    category: 'UPI Inflow Audit',
    amount: 85000.00,
    date: '18 Aug 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'Medium',
    fileFormat: 'NPCI UPI Export (CSV)',
    referenceId: 'UPI/NPCI/99184912'
  },
  {
    id: 'REC-0865',
    title: 'Income Tax Return Acknowledgement (ITR-4 AY 2026-27)',
    source: 'Tax Assessment',
    category: 'Tax Assessment',
    amount: 540000.00,
    date: '05 Aug 2026',
    verificationStatus: 'self_reported',
    confidenceLevel: 'Standard',
    fileFormat: 'ITR-V Acknowledgement Form',
    referenceId: 'ITR/E-FILING/8819024'
  }
];

export const initialConsentPartners: ConsentPartner[] = [
  {
    id: 'PART-01',
    name: 'HDFC Digital Retail Lending',
    type: 'Lender',
    logoText: 'HDFC',
    requestedFields: ['Monthly Cash Flow Range', 'Income Consistency Score', 'Verified Banking Records'],
    purpose: 'Assessing personal credit line eligibility based on transparent cash flow patterns.',
    grantedDate: '15 Aug 2026',
    expiryDate: '15 Nov 2026',
    status: 'active',
    accessLevel: 'Cash-Flow Summary',
    consentToken: 'HDFC-NEX-9821-EXP'
  },
  {
    id: 'PART-02',
    name: 'Urban Landlord Alliance India',
    type: 'Landlord & Property Manager',
    logoText: 'ULA',
    requestedFields: ['Rent Payment History', 'Net Savings Ratio', 'Identity Verification'],
    purpose: 'Residential tenancy verification for high-reputation rental apartment leasing.',
    grantedDate: '01 Sep 2026',
    expiryDate: '01 Mar 2027',
    status: 'active',
    accessLevel: 'Full Passport',
    consentToken: 'ULA-NX-4412-RES'
  },
  {
    id: 'PART-03',
    name: 'TechEquipment Lease & Workspace Capital',
    type: 'Equipment Financing',
    logoText: 'TEL',
    requestedFields: ['Expense-to-Income Ratio', '6-Month Inflow Stability'],
    purpose: 'Workstation and camera gear zero-deposit lease verification.',
    grantedDate: '10 Jul 2026',
    expiryDate: '10 Oct 2026',
    status: 'active',
    accessLevel: 'Income Verification Only',
    consentToken: 'TEL-NX-1029-LEAS'
  },
  {
    id: 'PART-04',
    name: 'ICICI Fintech Partner Credit Network',
    type: 'Fintech Underwriting',
    logoText: 'ICICI',
    requestedFields: ['Full Financial History', 'Raw Statement Logs'],
    purpose: 'Pre-approved commercial credit card evaluation.',
    grantedDate: '20 Jun 2026',
    expiryDate: '20 Jul 2026',
    status: 'revoked',
    accessLevel: 'Full Passport',
    consentToken: 'ICICI-REVOKED-001'
  }
];

export const initialInsights: FinancialInsight[] = [
  {
    id: 'INS-01',
    title: 'Food & Dining Outflow Increased by 18%',
    description: 'Your food and dining expenses reached ₹2,400 this month, an 18% increase compared with the previous month (₹2,030). Review recent UPI transactions to optimize discretionary spending.',
    category: 'Anomaly Alert',
    type: 'alert',
    severity: 'medium',
    metricNote: '+18% vs Aug 2026',
    actionLabel: 'Review Dining Transactions',
    actionRoute: '/transactions?category=Dining%20%26%20Outing',
    isAiGenerated: true,
    modelConfidence: '96%'
  },
  {
    id: 'INS-02',
    title: 'Strong 36.7% Savings Rate Maintained',
    description: 'You retained ₹16,500 of your ₹45,000 monthly inflow into savings & liquid reserves. This exceeds the recommended 20% benchmark for independent Indian freelancers.',
    category: 'Savings Action',
    type: 'positive',
    severity: 'low',
    metricNote: '₹16,500 retained this month',
    actionLabel: 'Explore Cash Flow Forecast',
    actionRoute: '/dashboard',
    isAiGenerated: true,
    modelConfidence: '98%'
  },
  {
    id: 'INS-03',
    title: 'Recurring Fixed Expenses Stabilized at 31%',
    description: 'Fixed obligations (Rent ₹8,000, Internet ₹799, Mobile ₹299, Coworking ₹3,500) total ₹12,598, accounting for only 31.4% of total inflow, providing healthy financial breathing room.',
    category: 'Income Consistency',
    type: 'positive',
    severity: 'low',
    metricNote: '31.4% Fixed Expense Ratio',
    actionLabel: 'View Trust Passport',
    actionRoute: '/passport',
    isAiGenerated: true,
    modelConfidence: '94%'
  },
  {
    id: 'INS-04',
    title: 'Multi-Client Retainer Diversification',
    description: 'Inflow is split across two primary clients (Apex Fintech ₹25,000 and Bangalore Design Studio ₹20,000). Adding a 3rd micro-contract would further reduce single-client concentration risk.',
    category: 'Cash Flow',
    type: 'recommendation',
    severity: 'low',
    metricNote: '2 Active Retainers',
    actionLabel: 'Add New Inflow',
    actionRoute: '/transactions',
    isAiGenerated: true,
    modelConfidence: '91%'
  }
];

export const initialForecasts: CashFlowForecast[] = [
  {
    month: 'Oct 2026',
    estimatedIncome: 46000,
    estimatedExpenses: 28500,
    estimatedBalance: 17500,
    confidenceScore: 92,
    assumptions: ['Apex Fintech and Bangalore Design retainers recurring', 'Rent and utility bills constant at ₹12,598']
  },
  {
    month: 'Nov 2026',
    estimatedIncome: 47500,
    estimatedExpenses: 29000,
    estimatedBalance: 18500,
    confidenceScore: 89,
    assumptions: ['Festival season minor discretionary surge accounted for (+₹1,500)', 'Expected UI consultation milestone payout']
  },
  {
    month: 'Dec 2026',
    estimatedIncome: 50000,
    estimatedExpenses: 30500,
    estimatedBalance: 19500,
    confidenceScore: 85,
    assumptions: ['Year-end client project completion bonus', 'Advance tax installment provision']
  },
  {
    month: 'Jan 2027',
    estimatedIncome: 48000,
    estimatedExpenses: 28000,
    estimatedBalance: 20000,
    confidenceScore: 82,
    assumptions: ['New annual retainer kick-off', 'Reduced travel and holiday spending']
  },
  {
    month: 'Feb 2027',
    estimatedIncome: 48000,
    estimatedExpenses: 27500,
    estimatedBalance: 20500,
    confidenceScore: 78,
    assumptions: ['Short month operating savings', 'Stable utility expenditure']
  },
  {
    month: 'Mar 2027',
    estimatedIncome: 52000,
    estimatedExpenses: 29500,
    estimatedBalance: 22500,
    confidenceScore: 75,
    assumptions: ['Financial year-end settlement and invoices collection', 'Tax savings investments']
  }
];

export const applicantProfiles: ApplicantProfile[] = [
  {
    id: 'APP-84920',
    fullName: 'John Doe',
    persona: 'Independent Freelancer',
    passportId: 'DEMO-NX-84920',
    city: 'Lucknow, Uttar Pradesh',
    verificationStatus: 'Verified',
    profileCompletion: 88,
    monthlyAverageInflow: 45000,
    monthlyAverageOutflow: 28500,
    incomeConsistencyRating: 'High Consistency',
    expenseToIncomeRatio: '63.3%',
    consentExpiry: '15 Nov 2026',
    consentedDataFields: ['Income Summary', 'Verified Bank Records', 'UPI Settlement Audit'],
    verifiedRecordsCount: 6,
    lastUpdated: '03 Oct 2026',
    notes: 'Clear freelance cash flow pattern. 6-month uninterrupted UPI inflows with stable savings buffer.',
    applicationPurpose: 'Personal Credit Line Assessment'
  },
  {
    id: 'APP-77219',
    fullName: 'Priya Sharma',
    persona: 'Self-Employed Consultant',
    passportId: 'NX-99214-DEL',
    city: 'South Delhi, Delhi',
    verificationStatus: 'Verified',
    profileCompletion: 94,
    monthlyAverageInflow: 85000,
    monthlyAverageOutflow: 48000,
    incomeConsistencyRating: 'High Consistency',
    expenseToIncomeRatio: '56.4%',
    consentExpiry: '30 Nov 2026',
    consentedDataFields: ['GST Filings', 'Bank Statement', 'Client Invoices'],
    verifiedRecordsCount: 8,
    lastUpdated: '02 Oct 2026',
    notes: 'GST registered service provider with 12 months verified filings.',
    applicationPurpose: 'Commercial Office Space Lease'
  },
  {
    id: 'APP-62104',
    fullName: 'Rahul Verma',
    persona: 'Graduate Student & Tutor',
    passportId: 'NX-55219-BLR',
    city: 'Bengaluru, Karnataka',
    verificationStatus: 'Pending Records',
    profileCompletion: 68,
    monthlyAverageInflow: 22000,
    monthlyAverageOutflow: 16500,
    incomeConsistencyRating: 'Moderate Consistency',
    expenseToIncomeRatio: '75.0%',
    consentExpiry: '20 Oct 2026',
    consentedDataFields: ['UPI Inflow Records', 'Stipend Proof'],
    verifiedRecordsCount: 3,
    lastUpdated: '29 Sep 2026',
    notes: 'Academic stipend plus verifiable online tutoring inflows.',
    applicationPurpose: 'Student Laptop Financing'
  }
];
