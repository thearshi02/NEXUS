import { createClient } from '@supabase/supabase-js';

// Supabase Environment Configurations
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Audit log helper
 */
export async function logAuditEvent(action: string, metadata: Record<string, any> = {}) {
  if (supabase) {
    try {
      await supabase.from('audit_logs').insert([{ action, metadata, timestamp: new Date().toISOString() }]);
    } catch (e) {
      console.warn('Audit log write error:', e);
    }
  }
}
