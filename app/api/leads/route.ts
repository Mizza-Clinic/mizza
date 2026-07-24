import { NextRequest, NextResponse } from "next/server";
import { calcularScore, respostasCompletas } from "@/lib/formulario";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface EnvioLead {
  nome?: string;
  whatsapp?: string;
  instagram?: string;
  cidade?: string;
  estado?: string;
  respostas?: Record<string, string | string[]>;
  consentimento?: boolean;
  variante?: string;
  utms?: Record<string, string>;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export async function POST(req: NextRequest) {
  let corpo: EnvioLead;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ erro: "Envio inválido." }, { status: 400 });
  }

  const nome = corpo.nome?.trim() ?? "";
  const whatsapp = (corpo.whatsapp ?? "").replace(/\D/g, "");
  const cidade = corpo.cidade?.trim() ?? "";
  const estado = corpo.estado?.trim().toUpperCase() ?? "";
  const respostas = corpo.respostas ?? {};

  if (nome.length < 3) {
    return NextResponse.json({ erro: "Informe seu nome completo." }, { status: 400 });
  }
  if (whatsapp.length < 10 || whatsapp.length > 13) {
    return NextResponse.json({ erro: "Informe um WhatsApp válido com DDD." }, { status: 400 });
  }
  if (!cidade || !estado) {
    return NextResponse.json({ erro: "Informe cidade e estado." }, { status: 400 });
  }
  if (!corpo.consentimento) {
    return NextResponse.json(
      { erro: "É preciso autorizar o contato para enviar." },
      { status: 400 }
    );
  }
  const faltante = respostasCompletas(respostas);
  if (faltante) {
    return NextResponse.json(
      { erro: "Responda todas as perguntas antes de enviar.", pergunta: faltante },
      { status: 400 }
    );
  }

  // Score calculado SEMPRE no servidor — o cliente nunca manda pontuação
  const { score, faixa, perfilEntrada, estudante } = calcularScore(respostas);

  const utms: Record<string, string | null> = {};
  for (const k of UTM_KEYS) {
    const v = corpo.utms?.[k]?.slice(0, 200) ?? null;
    utms[k] = v || null;
  }

  const lead = {
    nome: nome.slice(0, 200),
    whatsapp,
    instagram: corpo.instagram?.trim().replace(/^@/, "").slice(0, 100) || null,
    cidade: cidade.slice(0, 120),
    estado: estado.slice(0, 2),
    respostas,
    score,
    faixa,
    perfil_entrada: perfilEntrada,
    estudante,
    formato_interesse: typeof respostas.formato === "string" ? respostas.formato : null,
    origem: "formulario",
    variante: corpo.variante === "a" || corpo.variante === "b" ? corpo.variante : null,
    ...utms,
    consentimento: true,
    consentimento_em: new Date().toISOString(),
  };

  const supabase = supabaseAdmin();

  if (!supabase) {
    // Sem Supabase configurado: em dev, aceita e loga (pra testar o fluxo);
    // em produção, recusa — lead perdido em silêncio é inaceitável.
    if (process.env.NODE_ENV === "development") {
      console.warn("[leads] Supabase não configurado — lead só logado:", lead);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[leads] Supabase não configurado em produção.");
    return NextResponse.json(
      { erro: "Não foi possível enviar agora. Tente de novo em instantes." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.from("leads").insert(lead).select("id").single();
  if (error) {
    console.error("[leads] Erro ao gravar lead:", error.message);
    return NextResponse.json(
      { erro: "Não foi possível enviar agora. Tente de novo em instantes." },
      { status: 500 }
    );
  }

  // Log de evento (Fase 3 vai consumir daqui). Falha aqui não bloqueia o lead.
  const { error: erroEvento } = await supabase.from("eventos").insert({
    tipo: "lead_criado",
    lead_id: data.id,
    dados: { score, faixa, variante: lead.variante },
  });
  if (erroEvento) console.error("[leads] Erro ao gravar evento:", erroEvento.message);

  return NextResponse.json({ ok: true });
}
