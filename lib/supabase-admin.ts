import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente com service role — SÓ usar em código de servidor (API routes).
 * A chave secreta nunca chega ao navegador.
 */
export function supabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
