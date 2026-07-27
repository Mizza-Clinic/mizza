-- Migração: permitir excluir lead (rodar uma vez no SQL Editor do Supabase)
-- Sem isso, excluir um lead falha porque eventos e vagas_parciais apontam
-- para ele. Ajusta as duas tabelas para cascade/set null.

alter table eventos
  drop constraint eventos_lead_id_fkey,
  add constraint eventos_lead_id_fkey
    foreign key (lead_id) references leads (id) on delete cascade;

alter table vagas_parciais
  drop constraint vagas_parciais_lead_id_fkey,
  add constraint vagas_parciais_lead_id_fkey
    foreign key (lead_id) references leads (id) on delete cascade;

alter table vagas_parciais
  drop constraint vagas_parciais_par_lead_id_fkey,
  add constraint vagas_parciais_par_lead_id_fkey
    foreign key (par_lead_id) references leads (id) on delete set null;
