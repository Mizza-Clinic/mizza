"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ETAPAS,
  ROTULO_ETAPA,
  ROTULO_FAIXA,
  ROTULO_FORMATO,
  formatarWhatsApp,
  linkWhatsApp,
  moverEtapaLead,
  type Etapa,
  type Lead,
} from "@/lib/crm";
import { PERGUNTAS_ESCOLHA } from "@/lib/formulario";

interface Props {
  supabase: SupabaseClient;
  lead: Lead;
  aoVoltar: () => void;
  aoMudar: () => void;
}

export function FichaLead({ supabase, lead, aoVoltar, aoMudar }: Props) {
  const [anotacoes, setAnotacoes] = useState(lead.anotacoes ?? "");
  const [salvandoNota, setSalvandoNota] = useState(false);
  const [notaSalva, setNotaSalva] = useState(false);
  const [mudandoEtapa, setMudandoEtapa] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function mudarEtapa(nova: Etapa) {
    if (nova === lead.etapa) return;
    setErro(null);
    setMudandoEtapa(true);
    const { error } = await moverEtapaLead(supabase, lead, nova);
    setMudandoEtapa(false);
    if (error) {
      setErro("Não foi possível mudar a etapa. Tente de novo.");
      return;
    }
    aoMudar();
  }

  async function salvarAnotacoes() {
    setErro(null);
    setSalvandoNota(true);
    const { error } = await supabase
      .from("leads")
      .update({ anotacoes: anotacoes || null })
      .eq("id", lead.id);
    setSalvandoNota(false);
    if (error) {
      setErro("Não foi possível salvar as anotações. Tente de novo.");
    } else {
      setNotaSalva(true);
      setTimeout(() => setNotaSalva(false), 2000);
      aoMudar();
    }
  }

  const respostasRotuladas = PERGUNTAS_ESCOLHA.map((p) => {
    const val = lead.respostas?.[p.id];
    if (Array.isArray(val)) {
      const rotulos = val
        .map((id) => p.opcoes.find((o) => o.id === id)?.rotulo)
        .filter(Boolean)
        .join(", ");
      return rotulos ? { pergunta: p.rotulo, resposta: rotulos } : null;
    }
    const opcao = p.opcoes.find((o) => o.id === val);
    return opcao ? { pergunta: p.rotulo, resposta: opcao.rotulo } : null;
  }).filter(Boolean) as { pergunta: string; resposta: string }[];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16">
      <header className="flex items-center gap-3 py-5">
        <button onClick={aoVoltar} className="text-sm text-grafite underline underline-offset-2">
          ← Voltar
        </button>
      </header>

      {/* Identificação */}
      <div className="rounded-md border border-linha bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl">{lead.nome}</h1>
            <p className="mt-1 text-sm text-grafite">
              {[lead.cidade, lead.estado].filter(Boolean).join(" / ")}
              {lead.instagram && (
                <>
                  {" · "}
                  <a
                    href={`https://instagram.com/${lead.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    @{lead.instagram}
                  </a>
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-grafite">{formatarWhatsApp(lead.whatsapp)}</p>
          </div>
          <a
            href={linkWhatsApp(lead.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-green-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            Abrir WhatsApp
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {lead.origem === "manual" ? (
            <Fato rotulo="Origem" valor="Cadastro manual (sem score)" />
          ) : (
            <>
              <Fato rotulo="Score" valor={`${lead.score}/18 — ${ROTULO_FAIXA[lead.faixa]}`} />
              {lead.variante && <Fato rotulo="Variante" valor={lead.variante.toUpperCase()} />}
            </>
          )}
          {lead.formato_interesse && (
            <Fato rotulo="Formato" valor={ROTULO_FORMATO[lead.formato_interesse]} />
          )}
          {lead.estudante && <Fato rotulo="Atenção" valor="Ainda é estudante" />}
          {lead.perfil_entrada && (
            <Fato rotulo="Perfil" valor="Entrada na especialidade — argumento de segurança, não refinamento" />
          )}
          <Fato
            rotulo="Chegou em"
            valor={new Date(lead.criado_em).toLocaleDateString("pt-BR")}
          />
        </div>
      </div>

      {erro && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {erro}
        </p>
      )}

      {/* Etapa */}
      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-grafite">
          Etapa do funil
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {ETAPAS.map((e) => (
            <button
              key={e}
              disabled={mudandoEtapa}
              onClick={() => mudarEtapa(e)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                lead.etapa === e
                  ? "border-carvao bg-carvao text-cru"
                  : "border-linha bg-white text-grafite hover:border-bronze/60"
              }`}
            >
              {ROTULO_ETAPA[e]}
            </button>
          ))}
        </div>
        {lead.formato_interesse === "dupla_sem_parceiro" && lead.etapa !== "fechado" && (
          <p className="mt-2 text-xs text-grafite">
            Este lead procura parceiro de dupla — ao marcar como Fechado, uma
            vaga parcial abre automaticamente no topo do painel.
          </p>
        )}
      </section>

      {/* Anotações */}
      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-grafite">
          Anotações
        </h2>
        <textarea
          value={anotacoes}
          onChange={(e) => setAnotacoes(e.target.value)}
          rows={4}
          placeholder="Registre aqui o que combinou com esse lead…"
          className="w-full rounded-md border border-linha bg-white px-4 py-3 text-sm outline-none focus:border-bronze"
        />
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={salvarAnotacoes}
            disabled={salvandoNota}
            className="rounded-md bg-carvao px-4 py-2 text-sm font-medium text-cru hover:bg-bronze-escuro disabled:opacity-60"
          >
            {salvandoNota ? "Salvando…" : "Salvar anotações"}
          </button>
          {notaSalva && <span className="text-sm text-green-800">Salvo.</span>}
        </div>
      </section>

      {/* Respostas do formulário */}
      {respostasRotuladas.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-grafite">
            Respostas do formulário
          </h2>
          <dl className="divide-y divide-linha rounded-md border border-linha bg-white">
            {respostasRotuladas.map(({ pergunta, resposta }) => (
              <div key={pergunta} className="px-4 py-3">
                <dt className="text-xs text-grafite">{pergunta}</dt>
                <dd className="mt-0.5 text-sm">{resposta}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  );
}

function Fato({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <span className="rounded-md bg-cru px-2.5 py-1.5">
      <span className="text-xs text-grafite">{rotulo}: </span>
      <span className="font-medium">{valor}</span>
    </span>
  );
}
