/**
 * Formulário de qualificação — Mentoria em Resina Composta
 *
 * Fonte da verdade: formulario_qualificacao_mentoria.md (13 perguntas).
 * A qualificação é por PROXY (marca de resina, equipamento, valor por
 * elemento) — nunca perguntar renda/investimento diretamente.
 *
 * Os pontos existem só no servidor/CRM. O lead nunca vê pontuação.
 */

export type OpcaoId = string;

export interface Opcao {
  id: OpcaoId;
  rotulo: string;
  pontos: number;
}

export interface PerguntaEscolha {
  id: string;
  tipo: "escolha";
  /** Permite marcar mais de uma opção. A resposta vira um array de ids. */
  multipla?: boolean;
  rotulo: string;
  opcoes: Opcao[];
}

// Bloco 2 — Momento profissional
export const PERGUNTA_TEMPO_FORMADO: PerguntaEscolha = {
  id: "tempo_formado",
  tipo: "escolha",
  rotulo: "Há quanto tempo você é formado(a)?",
  opcoes: [
    { id: "estudante", rotulo: "Ainda sou estudante", pontos: 0 },
    { id: "menos_2", rotulo: "Menos de 2 anos", pontos: 0 },
    { id: "2_a_5", rotulo: "2 a 5 anos", pontos: 0 },
    { id: "mais_5", rotulo: "Mais de 5 anos", pontos: 0 },
  ],
};

export const PERGUNTA_ATUACAO: PerguntaEscolha = {
  id: "atuacao",
  tipo: "escolha",
  rotulo: "Como é sua atuação hoje?",
  opcoes: [
    { id: "clinica_terceiros", rotulo: "Atendo em clínica de terceiros", pontos: 1 },
    { id: "consultorio_proprio", rotulo: "Tenho consultório próprio", pontos: 3 },
    { id: "montando", rotulo: "Estou montando meu consultório", pontos: 2 },
    { id: "nao_atendo", rotulo: "Ainda não atendo", pontos: 0 },
  ],
};

// Bloco 3 — Sinais de investimento (o coração do proxy)
export const PERGUNTA_RESINA: PerguntaEscolha = {
  id: "resina",
  tipo: "escolha",
  rotulo: "Qual resina você mais usa na sua rotina hoje?",
  opcoes: [
    { id: "clinica_disponibiliza", rotulo: "Uso a que a clínica disponibiliza / não escolho", pontos: 0 },
    { id: "intermediaria", rotulo: "Z350, Vittra e similares", pontos: 2 },
    { id: "premium", rotulo: "Estelite Omega, Empress Direct, Palfique e similares", pontos: 3 },
    { id: "nao_trabalha", rotulo: "Ainda não trabalho com resina no dia a dia", pontos: 0 },
  ],
};

export const PERGUNTA_REGISTRO: PerguntaEscolha = {
  id: "registro",
  tipo: "escolha",
  rotulo: "Como você registra seus casos?",
  opcoes: [
    { id: "camera_macro", rotulo: "Estúdio fotográfico (câmera + lente + flash)", pontos: 3 },
    { id: "celular_acessorios", rotulo: "Celular com acessórios (lente/iluminação)", pontos: 2 },
    { id: "celular_simples", rotulo: "Celular simples", pontos: 1 },
    { id: "nao_registro", rotulo: "Ainda não registro", pontos: 0 },
  ],
};

export const PERGUNTA_LUPA: PerguntaEscolha = {
  id: "lupa",
  tipo: "escolha",
  rotulo: "Você trabalha com magnificação (lupa)?",
  opcoes: [
    { id: "sim", rotulo: "Sim", pontos: 3 },
    { id: "nao", rotulo: "Não", pontos: 0 },
  ],
};

export const PERGUNTA_VALOR: PerguntaEscolha = {
  id: "valor_elemento",
  tipo: "escolha",
  rotulo: "Qual o valor médio que você cobra hoje por um caso de resina anterior?",
  opcoes: [
    { id: "nao_faco", rotulo: "Ainda não faço esses casos", pontos: 0 },
    { id: "ate_500", rotulo: "Até R$ 500 por elemento", pontos: 1 },
    { id: "500_a_1000", rotulo: "R$ 500 a R$ 1.000 por elemento", pontos: 2 },
    { id: "acima_1000", rotulo: "Acima de R$ 1.000 por elemento", pontos: 3 },
  ],
};

export const PERGUNTA_EDUCACAO: PerguntaEscolha = {
  id: "educacao",
  tipo: "escolha",
  rotulo: "Qual foi seu último investimento em educação na área?",
  opcoes: [
    { id: "imersao_presencial", rotulo: "Imersão ou curso presencial", pontos: 3 },
    { id: "congresso", rotulo: "Congresso", pontos: 2 },
    { id: "online_pago", rotulo: "Curso online", pontos: 2 },
    { id: "gratuito", rotulo: "Conteúdo gratuito até agora", pontos: 0 },
  ],
};

// Bloco 4 — Intenção (sem pontos; vira roteiro de abordagem da Amanda)
export const PERGUNTA_ATRACAO: PerguntaEscolha = {
  id: "atracao",
  tipo: "escolha",
  multipla: true,
  rotulo: "O que mais te atrai na mentoria?",
  opcoes: [
    { id: "paciente_real", rotulo: "Atender paciente real com acompanhamento", pontos: 0 },
    { id: "dominar_tecnica", rotulo: "Dominar a técnica do início ao fim", pontos: 0 },
    { id: "cobrar_mais", rotulo: "Ganhar segurança para cobrar mais pelos meus casos", pontos: 0 },
    { id: "comecar_atuar", rotulo: "Começar a atuar na especialidade", pontos: 0 },
  ],
};

export const PERGUNTA_FORMATO: PerguntaEscolha = {
  id: "formato",
  tipo: "escolha",
  rotulo: "Formato de interesse:",
  opcoes: [
    { id: "individual", rotulo: "Individual (imersão exclusiva)", pontos: 0 },
    { id: "dupla_com_parceiro", rotulo: "Dupla, já tenho com quem dividir", pontos: 0 },
    { id: "dupla_sem_parceiro", rotulo: "Dupla, teria interesse se houver outra pessoa", pontos: 0 },
    { id: "entender_formatos", rotulo: "Quero entender os formatos primeiro", pontos: 0 },
  ],
};

/** Perguntas de múltipla escolha, na ordem de exibição (blocos 2–4). */
export const PERGUNTAS_ESCOLHA: PerguntaEscolha[] = [
  PERGUNTA_TEMPO_FORMADO,
  PERGUNTA_ATUACAO,
  PERGUNTA_RESINA,
  PERGUNTA_REGISTRO,
  PERGUNTA_LUPA,
  PERGUNTA_VALOR,
  PERGUNTA_EDUCACAO,
  PERGUNTA_ATRACAO,
  PERGUNTA_FORMATO,
];

/** Perguntas que somam no score (máx. 18 pts = 6 × 3). */
const PERGUNTAS_PONTUADAS = [
  PERGUNTA_ATUACAO,
  PERGUNTA_RESINA,
  PERGUNTA_REGISTRO,
  PERGUNTA_LUPA,
  PERGUNTA_VALOR,
  PERGUNTA_EDUCACAO,
];

export const SCORE_MAXIMO = 18;

export type Faixa = "alto" | "medio" | "baixo";

export interface ResultadoScore {
  score: number;
  faixa: Faixa;
  /** Perfil 1 — entrada na especialidade. Muda a abordagem, não descarta. */
  perfilEntrada: boolean;
  estudante: boolean;
}

/**
 * Calcula o score a partir das respostas { perguntaId: opcaoId }.
 * Faixas (formulario_qualificacao_mentoria.md):
 *   13+  alto  — contato prioritário em até 24h
 *   8–12 medio — contato normal
 *   0–7  baixo — nutrição (não descarte)
 */
export function calcularScore(
  respostas: Record<string, string | string[]>
): ResultadoScore {
  let score = 0;
  // Todas as perguntas pontuadas são de escolha única, então o valor é string.
  for (const pergunta of PERGUNTAS_PONTUADAS) {
    const opcao = pergunta.opcoes.find((o) => o.id === respostas[pergunta.id]);
    if (opcao) score += opcao.pontos;
  }
  const faixa: Faixa = score >= 13 ? "alto" : score >= 8 ? "medio" : "baixo";
  return {
    score,
    faixa,
    perfilEntrada: respostas.resina === "nao_trabalha",
    estudante: respostas.tempo_formado === "estudante",
  };
}

/** Valida que toda pergunta de escolha tem uma resposta válida. */
export function respostasCompletas(
  respostas: Record<string, string | string[]>
): string | null {
  for (const pergunta of PERGUNTAS_ESCOLHA) {
    const valor = respostas[pergunta.id];
    if (pergunta.multipla) {
      const ok =
        Array.isArray(valor) &&
        valor.length > 0 &&
        valor.every((v) => pergunta.opcoes.some((o) => o.id === v));
      if (!ok) return pergunta.id;
    } else if (typeof valor !== "string" || !pergunta.opcoes.some((o) => o.id === valor)) {
      return pergunta.id;
    }
  }
  return null;
}

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
] as const;
