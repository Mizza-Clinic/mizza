import { FormularioQualificacao } from "@/components/FormularioQualificacao";
import { BarraAplicar } from "@/components/BarraAplicar";

/**
 * VARIANTE A — LP completa (lp_mentoria_copy_layout.md, aprovado 20/07).
 * Estilo maison: preto profundo + areia, tipografia como ornamento,
 * cantos retos, filetes finos, blocos alternados. Marrom só no octógono
 * de progresso do formulário (acento único da página).
 */

const rotuloSecao =
  "text-[11px] uppercase tracking-[0.35em] text-preto/50";
const rotuloSecaoEscuro =
  "text-[11px] uppercase tracking-[0.35em] text-areia/60";

export default function VarianteA() {
  return (
    <main className="w-full font-jost text-preto">
      {/* ============ DOBRA 1 — HERO (preto, tela cheia) ============ */}
      <section
        id="hero"
        className="flex min-h-svh flex-col items-center justify-between bg-preto px-6 py-10 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/logo-areia.png" alt="Mizza" className="h-9 w-auto" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-areia/70">
            Academy
          </span>
        </div>

        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-areia/70">
            Mentoria presencial · Maringá/PR
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.08] text-areia sm:text-6xl">
            O MANEQUIM
            <br />
            NÃO REAGE.
            <br />
            O PACIENTE, SIM.
          </h1>
          <p className="mx-auto mt-8 max-w-md text-areia/80">
            Dois dias de imersão em resina composta com a Dra. Isabella
            Barbosa. Teoria, hands-on — e um caso real finalizado por você, do
            planejamento ao polimento.
          </p>
        </div>

        <a
          href="#aplicacao"
          className="border border-areia px-10 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-areia transition-colors hover:bg-areia hover:text-preto"
        >
          Aplicar para uma vaga
        </a>
      </section>

      {/* ============ DOBRA 2 — ESPELHO (bloco escuro) ============ */}
      <section className="border-t border-areia/20 bg-preto px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-3xl leading-snug text-areia">
            VOCÊ SABE A TÉCNICA.
          </p>
          <p className="mt-6 text-areia/80">
            O que ninguém te ensinou foi a{" "}
            <span className="text-areia">decidir</span> — com o paciente na
            cadeira, o substrato escurecido, a expectativa alta e a agenda
            andando.
          </p>
          <p className="mt-4 text-areia/80">
            A distância entre a faculdade e o consultório não se resolve
            assistindo aula. Se resolve atendendo. Com alguém ao lado que já
            percorreu o caminho.
          </p>

          <div className="mt-12 grid gap-px bg-areia/25 border border-areia/25 sm:grid-cols-2">
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Se você ainda não atua</p>
              <p className="mt-3 text-areia/85">
                Sai daqui com a sequência completa na mão e a segurança de quem
                já atendeu, não só assistiu.
              </p>
            </div>
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Se você já atua</p>
              <p className="mt-3 text-areia/85">
                Sai daqui com critério: cor, estratificação e acabamento no
                nível que te deixa cobrar o que o seu trabalho vale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 3 — A IMERSÃO (branco, timeline) ============ */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>A imersão</p>
          <div className="mt-10">
            <Marco
              numero="I"
              titulo="Dia 1 — manhã · Teoria"
              texto="Critério, não receita. Como decifrar qualquer resina do mercado: partícula, opacidade, camada. Cor de verdade — matiz, croma e valor. Planejamento e decisão clínica."
            />
            <Marco
              numero="II"
              titulo="Dia 1 — tarde · Hands-on"
              texto="A técnica na sua mão. Estratificação em 5 camadas, morfologia, acabamento e polimento que seguram cor a longo prazo."
            />
            <Marco
              numero="III"
              titulo="Dia 2 · Paciente real"
              texto="Você conduz o caso — anamnese, decisão, execução. A Dra. Isabella ao seu lado. Você não observa: você faz."
              ultimo
            />
          </div>
        </div>
      </section>

      {/* ============ DOBRA 4 — O QUE VOCÊ VAI DOMINAR (preto) ============ */}
      <section className="bg-preto px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecaoEscuro} text-center`}>
            O que você vai dominar
          </p>
          <ol className="mt-10">
            {[
              "Escolher resina por critério — e nunca mais por hábito ou indicação de vendedor",
              "Cor: matiz, croma e valor (90% dos erros de cor são erro de valor)",
              "Estratificação policromática em 5 camadas — inclusive substrato escurecido e dente clareado",
              "Morfologia e textura que fazem a restauração desaparecer no sorriso",
              "Acabamento e polimento — onde a longevidade da cor se decide",
              "A sequência clínica completa de um caso anterior, do diagnóstico à entrega",
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-5 border-b border-areia/15 py-5 last:border-b-0"
              >
                <span className="font-bevas text-lg text-areia/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-areia/85">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ DOBRA 5 — O DIFERENCIAL (branco) ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-3xl leading-snug">
            “QUANDO VOCÊ APRENDE AO LADO DE UM PACIENTE REAL, COM A PRESSÃO
            REAL DO ATENDIMENTO, O APRENDIZADO NÃO VAI EMBORA.”
          </p>
          <p className="mx-auto mt-8 max-w-md text-preto/70">
            Você sai com um caso finalizado nas mãos — e com a memória do que é
            decidir na cadeira. É diferente de assistir aula. É diferente de
            treinar no manequim. É o seu consultório, antecipado.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 6 — QUEM CONDUZ ============ */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Quem conduz</p>
          <p className="mt-8 text-center font-display text-2xl">
            DRA. ISABELLA BARBOSA
          </p>
          <p className="mt-2 text-center text-sm text-preto/60">
            Especialista em resina composta e cerâmica. Sócia fundadora da
            Mizza Clinic.
          </p>

          {/* Citação em bloco 100% preto, com a marca d'água outline
              cortada pela borda (único uso da marca d'água na página) */}
          <div className="relative mt-10 overflow-hidden bg-preto px-8 py-16 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/simbolo-outline-areia.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 w-72 opacity-20"
            />
            <p className="relative font-display text-2xl leading-snug text-areia">
              “CONSERVAR É MAIS DIFÍCIL DO QUE SUBSTITUIR.
              <br />
              POR ISSO POUCA GENTE FAZ.”
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-preto/70">
            A filosofia da mentoria é a mesma do consultório: conservadorismo
            inteligente. Preservar estrutura, indicar por critério, recusar o
            que não deveria ser feito. É o que ela pratica — e é exatamente o
            que ela ensina.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 7 — FORMATOS (branco) ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Formatos</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-preto/20 p-8 text-center">
              <p className="font-display text-xl tracking-wide">INDIVIDUAL</p>
              <p className="mt-3 text-sm text-preto/70">
                A imersão exclusiva. Dois dias, você e a mentora.
              </p>
              <p className="mt-6 text-sm tracking-wide text-preto/80">
                R$ 6.997
              </p>
            </div>
            <div className="border border-preto/20 p-8 text-center">
              <p className="font-display text-xl tracking-wide">EM DUPLA</p>
              <p className="mt-3 text-sm text-preto/70">
                A mesma imersão, dividida com um colega da sua confiança — ou
                com outro profissional aprovado na aplicação.
              </p>
              <p className="mt-6 text-sm tracking-wide text-preto/80">
                R$ 6.000 por pessoa
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-preto/60">
            Não tem com quem vir? Na aplicação você pode entrar na lista de
            duplas abertas — a data é definida quando o par se forma.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 9 — PERGUNTAS DIRETAS ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Perguntas diretas</p>
          <div className="mt-8">
            <Pergunta q="Onde acontece?">
              Na Mizza Clinic, em Maringá/PR. Presencial, nos dois dias.
            </Pergunta>
            <Pergunta q="Preciso já atuar com estética?">
              Não. A mentoria atende os dois momentos — entrada na
              especialidade e refinamento.
            </Pergunta>
            <Pergunta q="A data é fixa?">
              Não. As datas são definidas em conjunto, de acordo com as
              agendas.
            </Pergunta>
            <Pergunta q="O que está incluso?">
              Teoria, hands-on com materiais, atendimento de paciente real e o
              material de apoio da mentoria.
            </Pergunta>
            <Pergunta q="Como funciona a seleção?">
              Você preenche a aplicação; a equipe entra em contato pelo
              WhatsApp para conversar sobre formato e datas.
            </Pergunta>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 10 — APLICAÇÃO ============ */}
      <section id="aplicacao" className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Aplicação</p>
          <p className="mx-auto mt-6 mb-10 max-w-md text-center text-preto/70">
            A mentoria é individual ou em dupla — o que significa poucas vagas
            por mês. A aplicação leva um minuto e me ajuda a entender seu
            momento antes da nossa conversa.
          </p>
          <FormularioQualificacao variante="a" />
        </div>
      </section>

      {/* ============ RODAPÉ (preto, wordmark clínica) ============ */}
      <footer className="bg-preto px-6 py-12 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marca/logo-areia.png"
          alt="Mizza"
          className="mx-auto h-5 w-auto opacity-80"
        />
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-areia/50">
          Maringá, PR ·{" "}
          <a href="/privacidade" className="underline underline-offset-2">
            Privacidade
          </a>
        </p>
      </footer>

      <BarraAplicar />
    </main>
  );
}

function Marco({
  numero,
  titulo,
  texto,
  ultimo = false,
}: {
  numero: string;
  titulo: string;
  texto: string;
  ultimo?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[3.5rem_1fr] gap-5 py-8 ${
        ultimo ? "" : "border-b border-preto/15"
      }`}
    >
      <span className="font-bevas text-4xl text-preto/80">{numero}</span>
      <div>
        <h3 className="text-[13px] font-medium uppercase tracking-[0.2em]">
          {titulo}
        </h3>
        <p className="mt-3 text-preto/70">{texto}</p>
      </div>
    </div>
  );
}

function Pergunta({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-preto/15 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium">
        {q}
        <span className="text-preto/40 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 pr-6 text-[15px] text-preto/70">{children}</p>
    </details>
  );
}
