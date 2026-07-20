"use client";

import { useMemo } from "react";
import { Painel } from "@/components/painel/Painel";
import { criarSupabaseDemo } from "@/lib/painel-demo";

/**
 * Modo demonstração do painel — dados fictícios, nada é gravado.
 * Serve pra mostrar o painel pra Amanda e testar a interface.
 */
export default function PainelDemo() {
  const supabase = useMemo(() => criarSupabaseDemo(), []);

  return (
    <>
      <div className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900">
        Modo demonstração — dados fictícios, nada é salvo. O painel real fica em /painel.
      </div>
      <Painel supabase={supabase} />
    </>
  );
}
