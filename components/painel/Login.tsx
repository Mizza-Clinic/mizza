"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

export function Login({ supabase }: { supabase: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [entrando, setEntrando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEntrando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setEntrando(false);
    if (error) {
      setErro(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar. Tente de novo."
      );
    }
  }

  return (
    <main className="mx-auto w-full max-w-sm px-5 py-24">
      <div className="text-center">
        <span className="font-serif text-2xl tracking-wide">MIZZA</span>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-grafite">
          Painel de leads
        </p>
      </div>
      <form onSubmit={entrar} className="mt-10 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-linha bg-white px-4 py-3 outline-none focus:border-bronze"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="senha" className="mb-1.5 block text-sm font-medium">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-md border border-linha bg-white px-4 py-3 outline-none focus:border-bronze"
            autoComplete="current-password"
          />
        </div>
        {erro && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {erro}
          </p>
        )}
        <button
          type="submit"
          disabled={entrando}
          className="w-full rounded-md bg-carvao px-6 py-3.5 font-medium text-cru transition-colors hover:bg-bronze-escuro disabled:opacity-60"
        >
          {entrando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
