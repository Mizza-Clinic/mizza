"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente do navegador (chave anon + RLS). Usado pelo painel da Amanda.
 * A sessão fica no localStorage — só usuárias autenticadas passam nas
 * políticas de RLS do banco.
 */
let cliente: SupabaseClient | null = null;

export function supabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!cliente) cliente = createClient(url, anonKey);
  return cliente;
}
