import type { SupabaseClient } from "@supabase/supabase-js";
import type { Lead, VagaParcial } from "@/lib/crm";

/**
 * "Supabase" de mentira para o modo demonstração do painel (/painel/demo).
 * Dados fictícios em memória — nada é gravado. Serve pra:
 * - mostrar o painel pra Amanda antes do banco existir
 * - testar a interface sem mexer em dados reais
 * Implementa só a superfície que os componentes do painel usam.
 */

const agora = Date.now();
const dia = 24 * 60 * 60 * 1000;

const leadsSeed: Lead[] = [
  {
    id: "demo-1",
    criado_em: new Date(agora - 1 * dia).toISOString(),
    nome: "Carolina Menezes",
    whatsapp: "44998761234",
    instagram: "dra.carolmenezes",
    cidade: "Maringá",
    estado: "PR",
    respostas: {
      tempo_formado: "2_a_5",
      atuacao: "consultorio_proprio",
      resina: "premium",
      registro: "camera_macro",
      lupa: "sim",
      valor_elemento: "acima_1000",
      educacao: "imersao_presencial",
      atracao: ["cobrar_mais", "dominar_tecnica"],
      formato: "individual",
    },
    score: 18,
    faixa: "alto",
    perfil_entrada: false,
    estudante: false,
    formato_interesse: "individual",
    origem: "formulario",
    variante: "a",
    etapa: "negociando",
    anotacoes: "Quer data em setembro. Já conhece o trabalho da Isabella.",
  },
  {
    id: "demo-2",
    criado_em: new Date(agora - 2 * dia).toISOString(),
    nome: "Rafael Tanaka",
    whatsapp: "43991234567",
    instagram: "drrafaeltanaka",
    cidade: "Londrina",
    estado: "PR",
    respostas: {
      tempo_formado: "2_a_5",
      atuacao: "consultorio_proprio",
      resina: "intermediaria",
      registro: "celular_acessorios",
      lupa: "sim",
      valor_elemento: "500_a_1000",
      educacao: "online_pago",
      atracao: ["dominar_tecnica"],
      formato: "dupla_sem_parceiro",
    },
    score: 14,
    faixa: "alto",
    perfil_entrada: false,
    estudante: false,
    formato_interesse: "dupla_sem_parceiro",
    origem: "formulario",
    variante: "a",
    etapa: "fechado",
    anotacoes: "Fechou dupla sem parceiro — vaga parcial aberta.",
  },
  {
    id: "demo-3",
    criado_em: new Date(agora - 3 * dia).toISOString(),
    nome: "Beatriz Alvarenga",
    whatsapp: "44997654321",
    instagram: null,
    cidade: "Cianorte",
    estado: "PR",
    respostas: {
      tempo_formado: "menos_2",
      atuacao: "clinica_terceiros",
      resina: "intermediaria",
      registro: "celular_acessorios",
      lupa: "nao",
      valor_elemento: "ate_500",
      educacao: "congresso",
      atracao: "paciente_real",
      formato: "dupla_sem_parceiro",
    },
    score: 8,
    faixa: "medio",
    perfil_entrada: false,
    estudante: false,
    formato_interesse: "dupla_sem_parceiro",
    origem: "formulario",
    variante: "b",
    etapa: "contatado",
    anotacoes: null,
  },
  {
    id: "demo-4",
    criado_em: new Date(agora - 4 * dia).toISOString(),
    nome: "Luana Ferreira dos Santos",
    whatsapp: "45999887766",
    instagram: "lua.ferreira.odonto",
    cidade: "Cascavel",
    estado: "PR",
    respostas: {
      tempo_formado: "menos_2",
      atuacao: "montando",
      resina: "nao_trabalha",
      registro: "celular_simples",
      lupa: "nao",
      valor_elemento: "nao_faco",
      educacao: "online_pago",
      atracao: "comecar_atuar",
      formato: "entender_formatos",
    },
    score: 5,
    faixa: "baixo",
    perfil_entrada: true,
    estudante: false,
    formato_interesse: "entender_formatos",
    origem: "formulario",
    variante: "b",
    etapa: "novo",
    anotacoes: null,
  },
  {
    id: "demo-5",
    criado_em: new Date(agora - 5 * dia).toISOString(),
    nome: "Gabriela Poltronieri",
    whatsapp: "44988112233",
    instagram: "gabi.poltro",
    cidade: "Maringá",
    estado: "PR",
    respostas: {},
    score: 0,
    faixa: "baixo",
    perfil_entrada: false,
    estudante: false,
    formato_interesse: "individual",
    origem: "manual",
    variante: null,
    etapa: "novo",
    anotacoes: "Chegou pela DM da Isabella. Pediu pra Amanda chamar.",
  },
  {
    id: "demo-6",
    criado_em: new Date(agora - 6 * dia).toISOString(),
    nome: "Pedro Yamamoto",
    whatsapp: "41996543210",
    instagram: null,
    cidade: "Curitiba",
    estado: "PR",
    respostas: {
      tempo_formado: "estudante",
      atuacao: "nao_atendo",
      resina: "clinica_disponibiliza",
      registro: "nao_registro",
      lupa: "nao",
      valor_elemento: "nao_faco",
      educacao: "gratuito",
      atracao: "comecar_atuar",
      formato: "entender_formatos",
    },
    score: 0,
    faixa: "baixo",
    perfil_entrada: false,
    estudante: true,
    formato_interesse: "entender_formatos",
    origem: "formulario",
    variante: "b",
    etapa: "novo",
    anotacoes: null,
  },
];

const vagasSeed: VagaParcial[] = [
  {
    id: "vaga-demo-1",
    criado_em: new Date(agora - 1 * dia).toISOString(),
    lead_id: "demo-2",
    status: "aberta",
    par_lead_id: null,
    data_confirmada: null,
    observacoes: null,
  },
];

export function criarSupabaseDemo(): SupabaseClient {
  const tabelas: Record<string, Record<string, unknown>[]> = {
    leads: leadsSeed.map((l) => ({ ...l })),
    vagas_parciais: vagasSeed.map((v) => ({ ...v })),
    eventos: [],
  };

  function from(tabela: string) {
    const linhas = tabelas[tabela] ?? [];
    const filtros: [string, unknown][] = [];
    let modo: "select" | "update" | "insert" = "select";
    let mudancas: Record<string, unknown> = {};
    let inserido: Record<string, unknown> | null = null;

    const aplicar = () => {
      if (modo === "update") {
        for (const linha of linhas) {
          if (filtros.every(([c, v]) => linha[c] === v)) Object.assign(linha, mudancas);
        }
        return { data: null, error: null };
      }
      const achados = linhas.filter((l) => filtros.every(([c, v]) => l[c] === v));
      return { data: achados, error: null };
    };

    const builder = {
      select() {
        return builder;
      },
      order(coluna: string, opts?: { ascending?: boolean }) {
        const asc = opts?.ascending ?? true;
        linhas.sort((a, b) => {
          const va = String(a[coluna] ?? "");
          const vb = String(b[coluna] ?? "");
          return asc ? va.localeCompare(vb) : vb.localeCompare(va);
        });
        return builder;
      },
      eq(coluna: string, valor: unknown) {
        filtros.push([coluna, valor]);
        return builder;
      },
      update(valores: Record<string, unknown>) {
        modo = "update";
        mudancas = valores;
        return builder;
      },
      insert(valores: Record<string, unknown>) {
        modo = "insert";
        inserido = {
          id: `demo-${Math.random().toString(36).slice(2, 8)}`,
          criado_em: new Date().toISOString(),
          score: 0,
          faixa: "baixo",
          perfil_entrada: false,
          estudante: false,
          respostas: {},
          etapa: "novo",
          status: "aberta",
          par_lead_id: null,
          data_confirmada: null,
          variante: null,
          ...valores,
        };
        linhas.push(inserido);
        return builder;
      },
      single() {
        if (modo === "insert") return Promise.resolve({ data: inserido, error: null });
        const { data } = aplicar();
        return Promise.resolve({ data: (data as unknown[])?.[0] ?? null, error: null });
      },
      maybeSingle() {
        const { data } = aplicar();
        return Promise.resolve({ data: (data as unknown[])?.[0] ?? null, error: null });
      },
      then(resolver: (r: { data: unknown; error: null }) => unknown) {
        return Promise.resolve(aplicar()).then(resolver);
      },
    };
    return builder;
  }

  const mock = {
    from,
    auth: {
      signOut: () => Promise.resolve({ error: null }),
    },
  };

  return mock as unknown as SupabaseClient;
}
