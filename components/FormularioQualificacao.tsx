"use client";

import { useEffect, useRef, useState } from "react";
import { PERGUNTAS_ESCOLHA, UFS } from "@/lib/formulario";
import { dispararEventoLead } from "@/components/MetaPixel";
import { OctogonoProgresso } from "@/components/OctogonoProgresso";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/**
 * Formulário de aplicação multi-step — UMA pergunta por tela
 * (lp_mentoria_copy_layout.md, dobra 10). Completa em 60–90s.
 * Progresso pelos 8 gomos do octógono da marca.
 *
 * Etapas: 0 nome · 1 whatsapp · 2 instagram · 3 cidade/UF ·
 * 4–12 perguntas de escolha · 13 LGPD + envio
 */
interface Props {
  variante: "a" | "b";
}

const TOTAL_ETAPAS = 4 + PERGUNTAS_ESCOLHA.length + 1; // 14

export function FormularioQualificacao({ variante }: Props) {
  const [etapa, setEtapa] = useState(0);
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
  const topo = useRef<HTMLDivElement>(null);

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

  function irPara(n: number) {
    setErro(null);
    setEtapa(n);
    topo.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function validarAtual(): string | null {
    if (etapa === 0 && nome.trim().length < 3) return "Escreva seu nome completo.";
    if (etapa === 1) {
      const d = whatsapp.replace(/\D/g, "");
      if (d.length < 10 || d.length > 13) return "Confira o WhatsApp — precisa do DDD.";
    }
    if (etapa === 3 && (!cidade.trim() || !estado)) return "Informe cidade e estado.";
    const idx = etapa - 4;
    if (idx >= 0 && idx < PERGUNTAS_ESCOLHA.length) {
      if (!respostas[PERGUNTAS_ESCOLHA[idx].id]) return "Escolha uma opção para continuar.";
    }
    return null;
  }

  function avancar() {
    const problema = validarAtual();
    if (problema) {
      setErro(problema);
      return;
    }
    irPara(etapa + 1);
  }

  function responderEAvancar(perguntaId: string, opcaoId: string) {
    setRespostas((r) => ({ ...r, [perguntaId]: opcaoId }));
    // avanço automático — menos toques, mais fluidez no mobile
    setTimeout(() => irPara(etapa + 1), 180);
  }

  async function enviar() {
    if (!consentimento) {
      setErro("É preciso autorizar o contato para enviar.");
      return;
    }
    setErro(null);
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
      <div className="border border-preto/15 bg-white px-6 py-16 text-center">
        <p className="font-bevas text-3xl tracking-wide">APLICAÇÃO RECEBIDA</p>
        <p className="mx-auto mt-4 max-w-sm text-preto/70">
          A Amanda, da nossa equipe, entra em contato pelo seu WhatsApp em até
          1 dia útil.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-preto/20 bg-white px-4 py-4 text-lg text-preto outline-none focus:border-preto transition-colors";

  const idxPergunta = etapa - 4;
  const perguntaAtual =
    idxPergunta >= 0 && idxPergunta < PERGUNTAS_ESCOLHA.length
      ? PERGUNTAS_ESCOLHA[idxPergunta]
      : null;

  return (
    <div ref={topo} className="border border-preto/15 bg-white">
      {/* Progresso: os 8 gomos do octógono */}
      <div className="flex items-center justify-between border-b border-preto/10 px-5 py-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-preto/50">
          Aplicação
        </span>
        <OctogonoProgresso fracao={etapa / (TOTAL_ETAPAS - 1)} />
      </div>

      <div className="px-5 py-10 sm:px-10">
        {etapa === 0 && (
          <Tela rotulo="Para começar" titulo="Seu nome completo">
            <input
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && avancar()}
              className={inputCls}
              autoComplete="name"
            />
          </Tela>
        )}

        {etapa === 1 && (
          <Tela
            rotulo="Contato"
            titulo="Seu WhatsApp"
            nota="É por ele que a Amanda fala com você."
          >
            <input
              autoFocus
              type="tel"
              inputMode="numeric"
              placeholder="(44) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && avancar()}
              className={inputCls}
              autoComplete="tel"
            />
          </Tela>
        )}

        {etapa === 2 && (
          <Tela
            rotulo="Contato"
            titulo="Instagram profissional"
            nota="Opcional — se quiser, pule."
          >
            <input
              autoFocus
              placeholder="@seuperfil"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && avancar()}
              className={inputCls}
            />
          </Tela>
        )}

        {etapa === 3 && (
          <Tela rotulo="Localização" titulo="De onde você vem?">
            <div className="grid grid-cols-[1fr_6.5rem] gap-3">
              <input
                autoFocus
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && avancar()}
                className={inputCls}
                autoComplete="address-level2"
              />
              <select
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
          </Tela>
        )}

        {perguntaAtual && (
          <Tela
            rotulo={`Pergunta ${idxPergunta + 1} de ${PERGUNTAS_ESCOLHA.length}`}
            titulo={perguntaAtual.rotulo}
          >
            <div className="space-y-2">
              {perguntaAtual.opcoes.map((opcao) => {
                const ativo = respostas[perguntaAtual.id] === opcao.id;
                return (
                  <button
                    key={opcao.id}
                    type="button"
                    onClick={() => responderEAvancar(perguntaAtual.id, opcao.id)}
                    className={`block w-full border px-4 py-4 text-left text-[15px] leading-snug transition-colors ${
                      ativo
                        ? "border-preto bg-preto text-white"
                        : "border-preto/20 bg-white text-preto hover:border-preto"
                    }`}
                  >
                    {opcao.rotulo}
                  </button>
                );
              })}
            </div>
          </Tela>
        )}

        {etapa === TOTAL_ETAPAS - 1 && (
          <Tela rotulo="Último passo" titulo="Autorização de contato">
            <label className="flex cursor-pointer items-start gap-3 border border-preto/20 px-4 py-4 text-sm text-preto/80">
              <input
                type="checkbox"
                checked={consentimento}
                onChange={(e) => setConsentimento(e.target.checked)}
                className="mt-0.5 size-4 accent-marrom"
              />
              <span>
                Autorizo o contato da equipe Mizza pelo WhatsApp e o uso dos
                meus dados conforme a{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  className="underline underline-offset-2"
                >
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
          </Tela>
        )}

        {erro && (
          <p className="mt-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
            {erro}
          </p>
        )}

        {/* Navegação */}
        <div className="mt-8 flex items-center justify-between">
          {etapa > 0 ? (
            <button
              type="button"
              onClick={() => irPara(etapa - 1)}
              className="text-[11px] uppercase tracking-[0.25em] text-preto/50 hover:text-preto"
            >
              Voltar
            </button>
          ) : (
            <span />
          )}
          {etapa === TOTAL_ETAPAS - 1 ? (
            <button
              type="button"
              onClick={enviar}
              disabled={enviando}
              className="bg-preto px-10 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:bg-marrom disabled:opacity-60"
            >
              {enviando ? "Enviando…" : "Enviar aplicação"}
            </button>
          ) : (
            !perguntaAtual && (
              <button
                type="button"
                onClick={avancar}
                className="bg-preto px-10 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:bg-marrom"
              >
                Continuar
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Tela({
  rotulo,
  titulo,
  nota,
  children,
}: {
  rotulo: string;
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-preto/50">{rotulo}</p>
      <h3 className="mt-2 mb-6 text-xl font-medium text-preto">{titulo}</h3>
      {nota && <p className="-mt-4 mb-6 text-sm text-preto/60">{nota}</p>}
      {children}
    </div>
  );
}
