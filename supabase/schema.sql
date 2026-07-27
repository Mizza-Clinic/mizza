-- =============================================================
-- MIZZA ACADEMY — Funil de captação da mentoria em resina composta
-- Schema do banco (Supabase / Postgres)
-- Rodar no SQL Editor do Supabase ao criar o projeto.
-- =============================================================

-- ---------- LEADS ----------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),

  -- Bloco 1 — identificação
  nome text not null,
  whatsapp text not null,
  instagram text,
  cidade text,
  estado text,

  -- Respostas completas do formulário (chave = id da pergunta)
  respostas jsonb not null default '{}'::jsonb,

  -- Qualificação (calculada no servidor no momento do envio)
  score int not null default 0,
  faixa text not null default 'baixo'
    check (faixa in ('alto', 'medio', 'baixo')),
  -- "não trabalho com resina" = Perfil 1 (entrada na especialidade),
  -- muda o argumento da Amanda — não é descarte
  perfil_entrada boolean not null default false,
  estudante boolean not null default false,
  formato_interesse text
    check (formato_interesse in (
      'individual', 'dupla_com_parceiro', 'dupla_sem_parceiro', 'entender_formatos'
    )),

  -- Rastreio (decisão do teste A/B = custo por aluno FECHADO por variante)
  origem text not null default 'formulario'
    check (origem in ('formulario', 'manual')),
  variante text check (variante in ('a', 'b')),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  -- CRM (Fase 2 — painel da Amanda)
  etapa text not null default 'novo'
    check (etapa in ('novo', 'contatado', 'negociando', 'data_em_definicao', 'fechado', 'perdido')),
  anotacoes text,

  -- LGPD
  consentimento boolean not null default false,
  consentimento_em timestamptz
);

create index if not exists leads_etapa_idx on leads (etapa);
create index if not exists leads_score_idx on leads (score desc);
create index if not exists leads_criado_em_idx on leads (criado_em desc);

-- ---------- VAGAS PARCIAIS (formato dupla sem parceiro) ----------
-- Criada quando um lead FECHA "dupla sem parceiro" (Amanda marca no painel).
-- A data só é confirmada quando os dois alunos batem o martelo.
create table if not exists vagas_parciais (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  -- cascade: excluir o lead titular remove a vaga junto
  lead_id uuid not null references leads (id) on delete cascade,
  status text not null default 'aberta'
    check (status in ('aberta', 'fechada', 'cancelada')),
  -- set null: excluir o par não apaga a vaga, só desfaz o vínculo
  par_lead_id uuid references leads (id) on delete set null,
  data_confirmada date,
  observacoes text
);

-- ---------- EVENTOS ----------
-- Log de eventos do funil. Preparação para a Fase 3:
-- o evento 'vaga_parcial_aberta' vai gerar tarefa de divulgação para o João.
create table if not exists eventos (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  tipo text not null,
  -- tipos previstos: lead_criado | etapa_alterada | vaga_parcial_aberta
  --                  | vaga_parcial_fechada | vaga_parcial_cancelada
  lead_id uuid references leads (id) on delete cascade,
  dados jsonb not null default '{}'::jsonb
);

-- ---------- SEGURANÇA (RLS) ----------
-- O formulário grava via service role (chave secreta, só no servidor).
-- O painel da Amanda (Fase 2) acessa como usuária autenticada.
alter table leads enable row level security;
alter table vagas_parciais enable row level security;
alter table eventos enable row level security;

create policy "painel: leitura e escrita para usuários autenticados"
  on leads for all to authenticated
  using (true) with check (true);

create policy "painel: vagas parciais para usuários autenticados"
  on vagas_parciais for all to authenticated
  using (true) with check (true);

create policy "painel: eventos para usuários autenticados"
  on eventos for all to authenticated
  using (true) with check (true);
