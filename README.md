# Funil de captação — Mentoria em Resina Composta (Mizza Academy)

Landing page + formulário de qualificação + CRM/painel da mentoria da
Dra. Isabella Barbosa. Projeto SyncPro para a Mizza Clinic.

## Stack

- Next.js (App Router) + Tailwind — hospedar na **Vercel**
- Supabase (Postgres + Auth) — banco dos leads e login do painel

## Rotas

| Rota | O que é |
|---|---|
| `/a` | Variante A — LP completa + formulário no final |
| `/b` | Variante B — formulário direto com contexto mínimo |
| `/` | Redireciona para `/a` |
| `/privacidade` | Política de privacidade (LGPD) |
| `/painel` | Painel da Amanda (login por e-mail/senha) |
| `/painel/demo` | Demonstração do painel com dados fictícios (nada é salvo) |
| `POST /api/leads` | Recebe o formulário, calcula score no servidor, grava no Supabase |

**Teste A/B:** o split é feito na Meta — cada conjunto de anúncio aponta direto
para `/a` ou `/b`. A variante fica gravada no lead; a decisão do teste é por
**custo por aluno fechado** (etapa "Fechado" no painel), não por lead.

## Setup

1. `npm install`
2. Criar projeto no [Supabase](https://supabase.com) e rodar `supabase/schema.sql` no SQL Editor
3. Criar a usuária da Amanda: Supabase > Authentication > Users > **Add user**
   (e-mail + senha; marcar "Auto Confirm User")
4. Copiar `.env.example` para `.env.local` e preencher as chaves
5. `npm run dev`

Sem Supabase configurado: o formulário funciona em dev (lead só logado no
console) e o painel real mostra aviso — use `/painel/demo` pra ver a interface.
**Em produção sem Supabase o envio é recusado** — nunca subir sem as variáveis
na Vercel.

## O painel da Amanda

- Lista de leads ordenada por **score** (ou mais recentes), com filtros por
  etapa do funil e nível (Prioridade / Normal / Nutrição) e busca
- Etiquetas: Estudante, Entrada na especialidade (Perfil 1 — muda o argumento,
  não descarta), origem Manual
- Ficha do lead: respostas completas do formulário, etapa, anotações, botão
  de WhatsApp (wa.me)
- **+ Novo lead**: cadastro manual pra quem chega por DM (sem score)
- **Vagas de dupla:** quando um lead com "dupla — procura parceiro" vira
  Fechado, abre uma vaga parcial no topo do painel, com a fila de candidatos
  compatíveis. Fechar a vaga pede o segundo aluno + a data que os dois
  confirmaram. Divulgação sempre "data a combinar", sem prazo de expiração.

## Onde mexer

- **Perguntas e pontuação:** `lib/formulario.ts` — pontos máx. 18; faixas: 13+ alto, 8–12 médio, 0–7 nutrição. A qualificação é por proxy — **não trocar por pergunta direta de renda** (ver `../formulario_qualificacao_mentoria.md`)
- **Copy das páginas:** `app/a/page.tsx` e `app/b/page.tsx` — seguir `../perfil_isabella.md` (sem clichê, sem CTA forçado, sem adjetivo exagerado)
- **Painel:** `components/painel/*` e rótulos em `lib/crm.ts`
- **Banco:** `supabase/schema.sql` — tabelas `leads`, `vagas_parciais`, `eventos` (o evento `vaga_parcial_aberta` é o gancho da Fase 3)

## Pendências antes de rodar tráfego

- [ ] Configurar Supabase + variáveis na Vercel + usuária da Amanda
- [ ] Definir `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Domínio definitivo (por ora, URL da Vercel)
- [ ] Coletar com a Isabella o perfil de aluno que ela NÃO quer (afia anúncio e abordagem)
