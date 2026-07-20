"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { formatarWhatsApp, linkWhatsApp, type Lead, type VagaParcial } from "@/lib/crm";

interface Props {
  supabase: SupabaseClient;
  vagas: VagaParcial[]; // só as abertas
  leads: Lead[];
  aoMudar: () => void;
}

/**
 * Vagas parciais do formato dupla: 1 de 2 preenchida.
 * Regras (oferta_mentoria_resina.md):
 * - Divulgar sem prometer data ("data a combinar")
 * - Sem prazo de expiração
 * - Data só confirma quando os DOIS alunos batem o martelo
 */
export function VagasParciais({ supabase, vagas, leads, aoMudar }: Props) {
  return (
    <section className="mb-6 rounded-md border border-amber-300 bg-amber-50 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900">
        Vagas de dupla em aberto — falta o segundo aluno
      </h2>
      <div className="mt-3 space-y-3">
        {vagas.map((vaga) => (
          <Vaga key={vaga.id} supabase={supabase} vaga={vaga} leads={leads} aoMudar={aoMudar} />
        ))}
      </div>
    </section>
  );
}

function Vaga({
  supabase,
  vaga,
  leads,
  aoMudar,
}: {
  supabase: SupabaseClient;
  vaga: VagaParcial;
  leads: Lead[];
  aoMudar: () => void;
}) {
  const [fechando, setFechando] = useState(false);
  const [parId, setParId] = useState("");
  const [data, setData] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const titular = leads.find((l) => l.id === vaga.lead_id);

  // Fila natural de candidatos: quem marcou "dupla — teria interesse se
  // houver outra pessoa" e ainda não fechou nem foi perdido
  const candidatos = leads.filter(
    (l) =>
      l.id !== vaga.lead_id &&
      l.formato_interesse === "dupla_sem_parceiro" &&
      l.etapa !== "fechado" &&
      l.etapa !== "perdido"
  );

  async function fecharVaga() {
    setErro(null);
    if (!parId) {
      setErro("Escolha quem é o segundo aluno.");
      return;
    }
    if (!data) {
      setErro("Informe a data que os dois confirmaram.");
      return;
    }
    setSalvando(true);
    const { error } = await supabase
      .from("vagas_parciais")
      .update({ status: "fechada", par_lead_id: parId, data_confirmada: data })
      .eq("id", vaga.id);
    if (error) {
      setSalvando(false);
      setErro("Não foi possível fechar a vaga. Tente de novo.");
      return;
    }
    await supabase.from("eventos").insert({
      tipo: "vaga_parcial_fechada",
      lead_id: vaga.lead_id,
      dados: { vaga_id: vaga.id, par_lead_id: parId, data_confirmada: data },
    });
    setSalvando(false);
    aoMudar();
  }

  async function cancelarVaga() {
    setErro(null);
    setSalvando(true);
    const { error } = await supabase
      .from("vagas_parciais")
      .update({ status: "cancelada" })
      .eq("id", vaga.id);
    if (error) {
      setSalvando(false);
      setErro("Não foi possível cancelar. Tente de novo.");
      return;
    }
    await supabase.from("eventos").insert({
      tipo: "vaga_parcial_cancelada",
      lead_id: vaga.lead_id,
      dados: { vaga_id: vaga.id },
    });
    setSalvando(false);
    aoMudar();
  }

  return (
    <div className="rounded-md border border-amber-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-medium">{titular?.nome ?? "Lead removido"}</span>
        {titular && (
          <span className="text-sm text-grafite">{formatarWhatsApp(titular.whatsapp)}</span>
        )}
        <span className="text-xs text-grafite">
          aberta em {new Date(vaga.criado_em).toLocaleDateString("pt-BR")} · data a combinar
        </span>
        {titular && (
          <a
            href={linkWhatsApp(titular.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto rounded-md border border-green-700/30 bg-green-50 px-3 py-1 text-xs font-medium text-green-900 hover:bg-green-100"
          >
            Abrir WhatsApp
          </a>
        )}
      </div>

      {!fechando ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFechando(true)}
            className="rounded-md bg-carvao px-3.5 py-2 text-xs font-medium text-cru hover:bg-bronze-escuro"
          >
            Achei o segundo aluno
          </button>
          <button
            onClick={cancelarVaga}
            disabled={salvando}
            className="rounded-md border border-linha px-3.5 py-2 text-xs text-grafite hover:border-bronze/60 disabled:opacity-60"
          >
            Cancelar vaga
          </button>
          {candidatos.length > 0 && (
            <span className="text-xs text-grafite">
              {candidatos.length}{" "}
              {candidatos.length === 1
                ? "lead na fila também procura dupla"
                : "leads na fila também procuram dupla"}
              : {candidatos.slice(0, 3).map((c) => c.nome.split(" ")[0]).join(", ")}
              {candidatos.length > 3 && "…"}
            </span>
          )}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <select
              value={parId}
              onChange={(e) => setParId(e.target.value)}
              className="rounded-md border border-linha bg-white px-3 py-2 text-sm outline-none focus:border-bronze"
            >
              <option value="">Quem é o segundo aluno?</option>
              {candidatos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} {c.origem === "manual" ? "(manual)" : `(${c.score}/18)`}
                </option>
              ))}
              {leads
                .filter((l) => l.id !== vaga.lead_id && !candidatos.includes(l))
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.nome} — outra origem
                  </option>
                ))}
            </select>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="rounded-md border border-linha bg-white px-3 py-2 text-sm outline-none focus:border-bronze"
            />
          </div>
          <p className="text-xs text-grafite">
            A data só vale se os dois já bateram o martelo com você.
          </p>
          {erro && <p className="text-xs text-red-800">{erro}</p>}
          <div className="flex gap-2">
            <button
              onClick={fecharVaga}
              disabled={salvando}
              className="rounded-md bg-carvao px-3.5 py-2 text-xs font-medium text-cru hover:bg-bronze-escuro disabled:opacity-60"
            >
              {salvando ? "Salvando…" : "Confirmar dupla fechada"}
            </button>
            <button
              onClick={() => setFechando(false)}
              className="rounded-md border border-linha px-3.5 py-2 text-xs text-grafite"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
