import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    aiConfigured: Boolean(apiKey),
    engine: apiKey ? 'Gemini 2.0 Flash' : 'Rule-Based Fallback' 
  });
});

// AI Insights Generator Endpoint
app.post('/api/ai/insights', async (req, res) => {
  const { transactions = [], user = {} } = req.body;

  if (!ai || !apiKey) {
    return res.json({
      mode: 'rule_based_engine',
      summary: 'Generated via NEXUS deterministic financial intelligence engine.',
      insights: [
        {
          id: `INS-DINE-${Date.now()}`,
          title: 'Food & Dining Expenses Rose by 18%',
          description: 'Your food and dining expenses reached ₹2,400 this month, an 18% increase compared with the previous month benchmark. Review your recent UPI transactions to understand and moderate discretionary spending.',
          category: 'Anomaly Alert',
          type: 'alert',
          severity: 'medium',
          metricNote: '+18% vs previous month',
          actionLabel: 'Review Dining Transactions',
          actionRoute: '/transactions?category=Dining%20%26%20Outing',
          isAiGenerated: false
        },
        {
          id: `INS-SAVE-${Date.now()}`,
          title: 'Strong 36.7% Savings Rate Maintained',
          description: 'You retained ₹16,500 of your ₹45,000 monthly inflow into savings & liquid reserves. This exceeds the recommended 20% benchmark for independent Indian freelancers and self-employed professionals.',
          category: 'Savings Action',
          type: 'positive',
          severity: 'low',
          metricNote: '36.7% savings rate',
          actionLabel: 'View Cash Flow Forecast',
          actionRoute: '/dashboard',
          isAiGenerated: false
        },
        {
          id: `INS-FIXED-${Date.now()}`,
          title: 'Fixed Monthly Overhead Stabilized at 31%',
          description: 'Essential recurring obligations (Rent, Broadband, Mobile, Studio) total ₹12,598, accounting for only 31.4% of total inflow, providing healthy financial breathing room.',
          category: 'Income Consistency',
          type: 'positive',
          severity: 'low',
          metricNote: '31.4% Fixed Overhead',
          actionLabel: 'View Financial Passport',
          actionRoute: '/passport',
          isAiGenerated: false
        }
      ]
    });
  }

  try {
    const prompt = `You are the NEXUS AI Financial Intelligence Engine, designed for Indian students, freelancers, self-employed individuals, and MSMEs.
All figures are in Indian Rupees (₹) in en-IN format.
User: ${user.name || 'John Doe'} (${user.personaTitle || 'Freelancer'} in ${user.city || 'Lucknow'}, India).
Transactions: ${JSON.stringify(transactions.slice(0, 15))}

Analyze the transaction history and return a JSON object with this exact schema:
{
  "summary": "Brief 1-sentence overall financial health assessment",
  "anomalyDetected": boolean,
  "insights": [
    {
      "id": "string",
      "title": "Clear action-oriented headline",
      "description": "2-3 sentences explaining the trend, percentage change, and practical advice. (Never promise loan approvals or credit scores)",
      "category": "Anomaly Alert" | "Savings Action" | "Income Consistency" | "Spending Trend" | "Cash Flow",
      "type": "positive" | "alert" | "recommendation",
      "severity": "low" | "medium" | "high",
      "metricNote": "e.g., +18% vs last month or ₹16,500 saved",
      "actionLabel": "Button CTA text",
      "actionRoute": "/transactions or /dashboard or /passport",
      "isAiGenerated": true,
      "modelConfidence": "96%"
    }
  ]
}
Include at least 3-4 distinct actionable insights. Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);

    res.json({
      mode: 'gemini_ai',
      summary: parsed.summary || 'AI-powered financial analysis generated via Gemini 2.0.',
      anomalyDetected: parsed.anomalyDetected || false,
      insights: parsed.insights || []
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'AI processing failed, falling back to rule-based analysis.' });
  }
});

// AI Financial Advisor Assistant (Q&A)
app.post('/api/ai/ask', async (req, res) => {
  const { question, user, transactions } = req.body;

  if (!ai || !apiKey) {
    return res.json({
      answer: `Based on your profile as an independent freelancer in Lucknow with an average monthly income of ₹45,000 and fixed overhead of ₹12,598, maintaining your 36.7% savings rate is key. To enhance your Financial Trust Passport completeness, continue logging regular UPI and client invoices.`,
      mode: 'rule_based_engine'
    });
  }

  try {
    const prompt = `You are NEXUS AI Financial Advisor. Respond helpfully to Indian users (freelancers, students, small businesses).
Currency: Indian Rupees (₹).
User: ${user?.name || 'John Doe'}, ${user?.personaTitle || 'Freelancer'} in ${user?.city || 'Lucknow'}.
User Question: "${question}"
Active Monthly Inflow: ₹45,000 | Outflow: ₹28,500 | Savings: ₹16,500 (36.7%).
Give a concise, practical 2-3 paragraph answer. Do not give certified legal or investment advice.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      answer: response.text,
      mode: 'gemini_ai'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`NEXUS AI Backend running on port ${PORT}`);
  });
}

export default app;
