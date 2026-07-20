"use client";

import { useEffect, useRef, useState } from "react";
import { PERGUNTAS_ESCOLHA, UFS, type PerguntaEscolha } from "@/lib/formulario";
import { dispararEventoLead } from "@/components/MetaPixel";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

interface Props {
  variante: "a" | "b";
}

export function FormularioQualificacao({ variante }: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const utms = useRef<Record<string, string>>({});

  // Captura UTMs da URL no primeiro carregamento (persiste na sessão,
  // pra não perder a origem se a pessoa navegar antes de enviar)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const salvos = sessionStorage.getItem("mizza_utms");
    const acumulado: Record<string, string> = salvos ? JSON.parse(salvos) : {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) acumulado[k] = v;
    }
    utms.current = acumulado;
    sessionStorage.setItem("mizza_utms", JSON.stringify(acumulado));
  }, []);

  function responder(perguntaId: string, opcaoId: string) {
    setRespostas((r) => ({ ...r, [perguntaId]: opcaoId }));
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    const faltando = PERGUNTAS_ESCOLHA.find((p) => !respostas[p.id]);
    if (faltando) {
      setErro("Falta responder: " + faltando.rotulo);
      document.getElementById(`pergunta-${faltando.id}`)?.scrollIntoView({ block: "center" });
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          whatsapp,
          instagram,
          cidade,
          estado,
          respostas,
          consentimento,
          variante,
          utms: utms.current,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErro(json.erro ?? "Não foi possível enviar. Tente de novo.");
        return;
      }
      dispararEventoLead();
      setEnviado(true);
    } catch {
      setErro("Falha de conexão. Confira sua internet e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-md border border-linha bg-white px-6 py-12 text-center">
        <p className="font-serif text-2xl">Recebido.</p>
        <p className="mt-3 text-grafite">
          A Amanda, do time da Mizza, vai falar com você pelo WhatsApp.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md border border-linha bg-white px-4 py-3 text-carvao outline-none focus:border-bronze transition-colors";
  const labelCls = "block text-sm font-medium mb-1.5";

  return (
    <form onSubmit={enviar} className="space-y-10" noValidate>
      {/* Bloco 1 — Identificação */}
      <fieldset className="space-y-5">
        <div>
          <label htmlFor="nome" className={labelCls}>
            Nome completo
          </label>
          <input
            id="nome"
            required
            minLength={3}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={inputCls}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelCls}>
            WhatsApp (com DDD)
          </label>
          <input
            id="whatsapp"
            required
            type="tel"
            inputMode="tel"
            placeholder="(44) 99999-9999"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={inputCls}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="instagram" className={labelCls}>
            Instagram profissional <span className="text-grafite font-normal">(opcional)</span>
          </label>
          <input
            id="instagram"
            placeholder="@seuperfil"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <div>
            <label htmlFor="cidade" className={labelCls}>
              Cidade
            </label>
            <input
              id="cidade"
              required
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className={inputCls}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label htmlFor="estado" className={labelCls}>
              Estado
            </label>
            <select
              id="estado"
              required
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className={inputCls}
            >
              <option value="">UF</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Blocos 2–4 — perguntas de escolha */}
      {PERGUNTAS_ESCOLHA.map((pergunta) => (
        <Pergunta
          key={pergunta.id}
          pergunta={pergunta}
          valor={respostas[pergunta.id]}
          onChange={(opcaoId) => responder(pergunta.id, opcaoId)}
        />
      ))}

      {/* LGPD */}
      <label className="flex items-start gap-3 text-sm text-grafite cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consentimento}
          onChange={(e) => setConsentimento(e.target.checked)}
          className="mt-0.5 size-4 accent-bronze"
        />
        <span>
          Autorizo o contato da equipe da Mizza Clinic pelo WhatsApp e o uso das
          minhas respostas para essa finalidade, conforme a{" "}
          <a href="/privacidade" target="_blank" className="underline underline-offset-2">
            política de privacidade
          </a>
          .
        </span>
      </label>

      {erro && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-md bg-carvao px-6 py-4 font-medium text-cru transition-colors hover:bg-bronze-escuro disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Enviar aplicação"}
      </button>
      <p className="text-center text-xs text-grafite">
        Seus dados ficam restritos à equipe comercial da Mizza. Sem spam, sem lista fria.
      </p>
    </form>
  );
}

function Pergunta({
  pergunta,
  valor,
  onChange,
}: {
  pergunta: PerguntaEscolha;
  valor?: string;
  onChange: (opcaoId: string) => void;
}) {
  return (
    <fieldset id={`pergunta-${pergunta.id}`}>
      <legend className="mb-3 font-medium">{pergunta.rotulo}</legend>
      <div className="space-y-2">
        {pergunta.opcoes.map((opcao) => {
          const ativo = valor === opcao.id;
          return (
            <label
              key={opcao.id}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                ativo
                  ? "border-bronze bg-white"
                  : "border-linha bg-white/60 hover:border-bronze/50"
              }`}
            >
              <input
                type="radio"
                name={pergunta.id}
                value={opcao.id}
                checked={ativo}
                onChange={() => onChange(opcao.id)}
                className="size-4 accent-bronze"
              />
              <span className="text-[15px] leading-snug">{opcao.rotulo}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
