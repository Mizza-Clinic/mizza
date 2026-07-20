# Funil de captação — Mentoria em Resina Composta (Mizza Academy)

Landing page + formulário de qualificação da mentoria da Dra. Isabella Barbosa.
Fase 1 do projeto SyncPro para a Mizza Clinic.

## Stack

- Next.js (App Router) + Tailwind — hospedar na **Vercel**
- Supabase (Postgres) — banco dos leads + auth do painel (Fase 2)

## Rotas

| Rota | O que é |
|---|---|
| `/a` | Variante A — LP completa + formulário no final |
| `/b` | Variante B — formulário direto com contexto mínimo |
| `/` | Redireciona para `/a` |
| `/privacidade` | Política de privacidade (LGPD) |
| `POST /api/leads` | Recebe o formulário, calcula score no servidor, grava no Supabase |

**Teste A/B:** o split é feito na Meta — cada conjunto de anúncio aponta direto
para `/a` ou `/b`. A variante fica gravada no lead; a decisão do teste é por
**custo por aluno fechado** (cruzar com a etapa "Fechado" no CRM), não por lead.

## Setup

1. `npm install`
2. Criar projeto no [Supabase](https://supabase.com) e rodar `supabase/schema.sql` no SQL Editor
3. Copiar `.env.example` para `.env.local` e preencher as chaves
4. `npm run dev`

Sem Supabase configurado, o formulário funciona em dev (lead só é logado no
console). **Em produção sem Supabase o envio é recusado** — nunca subir sem as
variáveis configuradas na Vercel.

## Onde mexer

- **Perguntas e pontuação:** `lib/formulario.ts` — pontos máx. 18; faixas: 13+ alto, 8–12 médio, 0–7 nutrição. A qualificação é por proxy — **não trocar por pergunta direta de renda** (ver `../formulario_qualificacao_mentoria.md`)
- **Copy das páginas:** `app/a/page.tsx` e `app/b/page.tsx` — seguir `../perfil_isabella.md` (sem clichê, sem CTA forçado, sem adjetivo exagerado)
- **Banco:** `supabase/schema.sql` — tabelas `leads`, `vagas_parciais`, `eventos` (a tabela de eventos já prepara a Fase 3)

## Pendências antes de rodar tráfego

- [ ] Configurar Supabase + variáveis na Vercel
- [ ] Definir `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Domínio definitivo (por ora, URL da Vercel)
- [ ] Coletar com a Isabella o perfil de aluno que ela NÃO quer (afia anúncio e abordagem)
