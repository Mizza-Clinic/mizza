/**
 * Tipos e rótulos do CRM — painel da Amanda.
 * Tudo em português claro: a Amanda não é técnica.
 */

export const ETAPAS = [
  "novo",
  "contatado",
  "negociando",
  "data_em_definicao",
  "fechado",
  "perdido",
] as const;

export type Etapa = (typeof ETAPAS)[number];

export const ROTULO_ETAPA: Record<Etapa, string> = {
  novo: "Novo",
  contatado: "Contatado",
  negociando: "Negociando",
  data_em_definicao: "Data em definição",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const ROTULO_FAIXA: Record<string, string> = {
  alto: "Prioridade",
  medio: "Normal",
  baixo: "Nutrição",
};

export const ROTULO_FORMATO: Record<string, string> = {
  individual: "Individual",
  dupla_com_parceiro: "Dupla (tem parceiro)",
  dupla_sem_parceiro: "Dupla (procura parceiro)",
  entender_formatos: "Quer entender formatos",
};

export interface Lead {
  id: string;
  criado_em: string;
  nome: string;
  whatsapp: string;
  instagram: string | null;
  cidade: string | null;
  estado: string | null;
  respostas: Record<string, string>;
  score: number;
  faixa: "alto" | "medio" | "baixo";
  perfil_entrada: boolean;
  estudante: boolean;
  formato_interesse: string | null;
  origem: "formulario" | "manual";
  variante: "a" | "b" | null;
  etapa: Etapa;
  anotacoes: string | null;
}

export interface VagaParcial {
  id: string;
  criado_em: string;
  lead_id: string;
  status: "aberta" | "fechada" | "cancelada";
  par_lead_id: string | null;
  data_confirmada: string | null;
  observacoes: string | null;
}

/** Cores da faixa de score (usadas em badges do painel). */
export function corFaixa(faixa: string): string {
  return faixa === "alto"
    ? "bg-green-100 text-green-900"
    : faixa === "medio"
      ? "bg-amber-100 text-amber-900"
      : "bg-stone-200 text-stone-700";
}

/**
 * Move um lead de etapa — usado tanto pela ficha quanto pelo arrastar no
 * Kanban. Registra o evento e, se fechar um "dupla sem parceiro", abre a
 * vaga parcial automaticamente (regra da oferta).
 */
export async function moverEtapaLead(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  lead: Pick<Lead, "id" | "etapa" | "formato_interesse">,
  nova: Etapa
): Promise<{ error: boolean }> {
  if (nova === lead.etapa) return { error: false };

  const { error } = await supabase.from("leads").update({ etapa: nova }).eq("id", lead.id);
  if (error) return { error: true };

  await supabase.from("eventos").insert({
    tipo: "etapa_alterada",
    lead_id: lead.id,
    dados: { de: lead.etapa, para: nova },
  });

  if (nova === "fechado" && lead.formato_interesse === "dupla_sem_parceiro") {
    const { data: existente } = await supabase
      .from("vagas_parciais")
      .select("id")
      .eq("lead_id", lead.id)
      .eq("status", "aberta")
      .maybeSingle();
    if (!existente) {
      const { data: vaga } = await supabase
        .from("vagas_parciais")
        .insert({ lead_id: lead.id })
        .select("id")
        .single();
      await supabase.from("eventos").insert({
        tipo: "vaga_parcial_aberta",
        lead_id: lead.id,
        dados: { vaga_id: vaga?.id },
      });
    }
  }
  return { error: false };
}

/** Link direto pra conversa no WhatsApp (números brasileiros). */
export function linkWhatsApp(whatsapp: string): string {
  const digitos = whatsapp.replace(/\D/g, "");
  const completo = digitos.startsWith("55") ? digitos : "55" + digitos;
  return `https://wa.me/${completo}`;
}

/** Formata (44) 99999-9999 pra leitura. */
export function formatarWhatsApp(whatsapp: string): string {
  const d = whatsapp.replace(/\D/g, "").replace(/^55/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return whatsapp;
}
