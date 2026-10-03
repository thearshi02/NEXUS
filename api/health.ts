import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY || '';
  res.status(200).json({
    status: 'healthy',
    aiConfigured: Boolean(apiKey),
    engine: apiKey ? 'Gemini 2.0 Flash' : 'Rule-Based Fallback',
    region: 'Asia/Kolkata (en-IN)',
    timestamp: new Date().toISOString()
  });
}
