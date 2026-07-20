"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ROTULO_FORMATO } from "@/lib/crm";
import { UFS } from "@/lib/formulario";

interface Props {
  supabase: SupabaseClient;
  aoVoltar: () => void;
  aoSalvar: () => void;
}

/**
 * Cadastro manual — para leads que chegam por DM ou indicação.
 * Sem formulário de proxy, então sem score: a Amanda qualifica na conversa.
 */
export function NovoLead({ supabase, aoVoltar, aoSalvar }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [formato, setFormato] = useState("");
  const [anotacoes, setAnotacoes] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const digitos = whatsapp.replace(/\D/g, "");
    if (nome.trim().length < 3) {
      setErro("Informe o nome do lead.");
      return;
    }
    if (digitos.length < 10 || digitos.length > 13) {
      setErro("Informe um WhatsApp válido com DDD.");
      return;
    }

    setSalvando(true);
    const { data, error } = await supabase
      .from("leads")
      .insert({
        nome: nome.trim(),
        whatsapp: digitos,
        instagram: instagram.trim().replace(/^@/, "") || null,
        cidade: cidade.trim() || null,
        estado: estado || null,
        origem: "manual",
        formato_interesse: formato || null,
        anotacoes: anotacoes.trim() || null,
        consentimento: false,
      })
      .select("id")
      .single();

    if (error) {
      setSalvando(false);
      setErro("Não foi possível salvar. Tente de novo.");
      return;
    }

    await supabase.from("eventos").insert({
      tipo: "lead_criado",
      lead_id: data.id,
      dados: { origem: "manual" },
    });

    aoSalvar();
  }

  const inputCls =
    "w-full rounded-md border border-linha bg-white px-4 py-3 text-sm outline-none focus:border-bronze";
  const labelCls = "mb-1.5 block text-sm font-medium";

  return (
    <main className="mx-auto w-full max-w-lg px-4 pb-16">
      <header className="flex items-center gap-3 py-5">
        <button onClick={aoVoltar} className="text-sm text-grafite underline underline-offset-2">
          ← Voltar
        </button>
      </header>

      <h1 className="font-serif text-2xl">Novo lead</h1>
      <p className="mt-1 text-sm text-grafite">
        Para quem chegou por DM, indicação ou fora do formulário. Sem score —
        a qualificação fica na conversa.
      </p>

      <form onSubmit={salvar} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="nl-nome" className={labelCls}>Nome completo</label>
          <input id="nl-nome" required value={nome} onChange={(e) => setNome(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="nl-zap" className={labelCls}>WhatsApp (com DDD)</label>
          <input
            id="nl-zap"
            required
            type="tel"
            placeholder="(44) 99999-9999"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="nl-ig" className={labelCls}>
            Instagram <span className="font-normal text-grafite">(opcional)</span>
          </label>
          <input id="nl-ig" placeholder="@perfil" value={instagram} onChange={(e) => setInstagram(e.target.value)} className={inputCls} />
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <div>
            <label htmlFor="nl-cidade" className={labelCls}>Cidade</label>
            <input id="nl-cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="nl-uf" className={labelCls}>Estado</label>
            <select id="nl-uf" value={estado} onChange={(e) => setEstado(e.target.value)} className={inputCls}>
              <option value="">UF</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="nl-formato" className={labelCls}>Formato de interesse</label>
          <select id="nl-formato" value={formato} onChange={(e) => setFormato(e.target.value)} className={inputCls}>
            <option value="">Ainda não sei</option>
            {Object.entries(ROTULO_FORMATO).map(([id, rotulo]) => (
              <option key={id} value={id}>{rotulo}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nl-notas" className={labelCls}>Anotações</label>
          <textarea
            id="nl-notas"
            rows={3}
            placeholder="De onde veio, o que já conversaram…"
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            className={inputCls}
          />
        </div>

        {erro && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={salvando}
          className="w-full rounded-md bg-carvao px-6 py-3.5 font-medium text-cru hover:bg-bronze-escuro disabled:opacity-60"
        >
          {salvando ? "Salvando…" : "Salvar lead"}
        </button>
      </form>
    </main>
  );
}
