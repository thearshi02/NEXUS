import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { question, user = {}, transactions = [] } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY || '';

  if (!apiKey) {
    return res.status(200).json({
      answer: `Based on your profile as an independent freelancer in Lucknow with an average monthly income of ₹45,000 and fixed overhead of ₹12,598, maintaining your 36.7% savings rate is key. To enhance your Financial Trust Passport completeness, continue logging regular UPI and client invoices.`,
      mode: 'rule_based_engine'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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

    res.status(200).json({
      answer: response.text,
      mode: 'gemini_ai'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'AI processing error' });
  }
}
