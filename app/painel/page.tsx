"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Login } from "@/components/painel/Login";
import { Painel } from "@/components/painel/Painel";

/**
 * Painel da Amanda — visão única de todos os leads da mentoria.
 * Protegido por login (Supabase Auth). Uma usuária, sem papéis.
 */
export default function PaginaPainel() {
  const supabase = supabaseBrowser();
  const [sessao, setSessao] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setCarregando(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session);
      setCarregando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, s) => {
      setSessao(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-serif text-2xl">Painel não configurado</h1>
        <p className="mt-4 text-grafite">
          Faltam as variáveis do Supabase (NEXT_PUBLIC_SUPABASE_URL e
          NEXT_PUBLIC_SUPABASE_ANON_KEY). Veja o README do projeto.
        </p>
      </main>
    );
  }

  if (carregando) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center text-grafite">
        Carregando…
      </main>
    );
  }

  if (!sessao) return <Login supabase={supabase} />;

  return <Painel supabase={supabase} />;
}
