import { FormularioQualificacao } from "@/components/FormularioQualificacao";
import { BarraAplicar } from "@/components/BarraAplicar";

/**
 * VARIANTE A — LP completa.
 * Estilo maison: preto profundo + areia, tipografia como ornamento,
 * cantos retos, filetes finos, blocos alternados. Marrom só no octógono
 * de progresso do formulário (acento único da página).
 *
 * Copy (revisão de 21/07):
 * - Hero abre com a especialidade e a mentora, que é o que o lead precisa
 *   confirmar em 2 segundos ao chegar do anúncio.
 * - Três perfis de público, não dois (inclui quem se especializou em área
 *   pouco recorrente e o dono de clínica que hoje terceiriza o caso).
 * - Promessa factual: o aluno conduz COM a Dra. Isabella ao lado, não sozinho.
 * - Sem preço na página; a Amanda apresenta os valores no WhatsApp.
 * - Sem travessões no texto visível.
 */

const rotuloSecao = "text-[11px] uppercase tracking-[0.35em] text-preto/50";
const rotuloSecaoEscuro = "text-[11px] uppercase tracking-[0.35em] text-areia/60";

export default function VarianteA() {
  return (
    <main className="w-full font-jost text-preto">
      {/* ============ DOBRA 1 — HERO ============ */}
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
            Mentoria presencial · 2 dias · Maringá/PR
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-areia sm:text-6xl">
            RESINA
            <br />
            COMPOSTA
          </h1>
          <p className="mt-4 font-display text-xl tracking-wide text-areia/90">
            com a Dra. Isabella Barbosa
          </p>
          <p className="mx-auto mt-10 max-w-md text-lg text-areia">
            Dominar resina não é dominar a técnica. É dominar a decisão.
          </p>
          <p className="mx-auto mt-4 max-w-md text-areia/75">
            Dois dias de imersão na Mizza Clinic. Você aprende a analisar,
            planejar e executar um caso real, com acompanhamento em cada
            etapa.
          </p>
        </div>

        <a
          href="#aplicacao"
          className="border border-areia px-10 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-areia transition-colors hover:bg-areia hover:text-preto"
        >
          Aplicar para uma vaga
        </a>
      </section>

      {/* ============ DOBRA 2 — TRÊS MOMENTOS (identificação) ============ */}
      <section className="border-t border-areia/20 bg-preto px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-3xl leading-snug text-areia">
            O CASO CHEGA. O QUE ACONTECE DEPOIS SEPARA TRÊS PROFISSIONAIS.
          </p>
          <p className="mt-6 text-areia/80">
            Resina composta aparece toda semana na cadeira. A diferença entre
            um profissional e outro não está em saber o que fazer. Está em
            conseguir conduzir, ou não.
          </p>

          <div className="mt-12 grid gap-px border border-areia/25 bg-areia/25 sm:grid-cols-3">
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Ainda não atua</p>
              <p className="mt-3 text-areia/85">
                Quer entrar em estética e trava na hora de conduzir um caso do
                início ao fim sozinha.
              </p>
            </div>
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Especializou em outra área</p>
              <p className="mt-3 text-areia/85">
                Investiu numa especialidade que aparece pouco na rotina.
                Resina aparece toda semana, e hoje você não aproveita.
              </p>
            </div>
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Tem clínica e terceiriza</p>
              <p className="mt-3 text-areia/85">
                Os casos chegam até você, mas saem da sua mão. A margem fica
                com outro profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 3 — O QUE MUDA (autonomia) ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className={rotuloSecao}>O que muda na sua prática</p>
          <p className="mt-8 font-display text-3xl leading-snug">
            CONSTRUA O SEU CRITÉRIO. DESENVOLVA SUA VISÃO E AUTONOMIA NOS CASOS.
          </p>
          <p className="mt-6 text-preto/70">
            Antes de qualquer camada de resina existe uma sequência de
            decisões: qual caso aceitar, qual material usar, qual técnica o
            caso pede, quando parar. É aí que o resultado se define.
          </p>
          <p className="mt-4 text-preto/70">
            Curso ensina a executar. A mentoria coloca a análise, o
            planejamento e a decisão clínica na sua mão, que é o que sustenta
            você cobrando pelo caso.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 4 — A IMERSÃO ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>A imersão</p>
          <div className="mt-10">
            <Marco
              numero="I"
              titulo="Dia 1, manhã · Teoria"
              texto="Critério, não receita. Como decifrar qualquer resina do mercado: partícula, opacidade, camada. Cor de verdade: matiz, croma e valor. Planejamento e decisão clínica."
            />
            <Marco
              numero="II"
              titulo="Dia 1, tarde · Hands-on"
              texto="A técnica na sua mão. Estratificação em 5 camadas, morfologia, acabamento e polimento que seguram cor a longo prazo."
            />
            <Marco
              numero="III"
              titulo="Dia 2 · Paciente real"
              texto="Você analisa, planeja e conduz o atendimento com a Dra. Isabella ao seu lado. Não é observação: a mão é sua, com orientação em cada decisão."
              ultimo
            />
          </div>
        </div>
      </section>

      {/* ============ DOBRA 5 — O QUE VOCÊ VAI DOMINAR ============ */}
      <section className="bg-preto px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecaoEscuro} text-center`}>
            O que você vai dominar
          </p>
          <ol className="mt-10">
            {[
              "Treinar o olhar clínico: ler o caso antes de encostar a mão nele",
              "Escolher resina por critério, e nunca mais por hábito ou indicação de vendedor",
              "Resina ou cerâmica: o critério para indicar cada uma sem desgastar dente à toa",
              "Cor: matiz, croma e valor (90% dos erros de cor são erro de valor)",
              "Estratificação policromática em 5 camadas, inclusive substrato escurecido e dente clareado",
              "Morfologia e textura que fazem a restauração desaparecer no sorriso",
              "Acabamento e polimento, onde a longevidade da cor se decide",
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

      {/* ============ DOBRA 6 — O DIFERENCIAL ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-3xl leading-snug">
            O QUE NÃO SE APRENDE ASSISTINDO É A DECISÃO.
          </p>
          <p className="mx-auto mt-8 max-w-md text-preto/70">
            Planejar o caso, escolher o material e decidir a conduta com o
            paciente na cadeira e a agenda andando. Essa é a parte que nenhuma
            aula alcança. Você percorre esse caminho na realidade do
            atendimento, com a orientação e o acompanhamento de quem tem a
            experiência para te corrigir na hora certa.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 7 — QUEM CONDUZ ============ */}
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

          {/* Citação em bloco preto, com a marca d'água outline cortada pela
              borda (único uso da marca d'água na página) */}
          <div className="relative mt-10 overflow-hidden bg-preto px-8 py-16 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/simbolo-outline-areia.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 w-72 opacity-20"
            />
            <p className="relative font-display text-2xl leading-snug text-areia">
              “O QUE NÃO TE DESAFIA,
              <br />
              NÃO TE TRANSFORMA.”
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-preto/70">
            A mesma régua do consultório vale na mentoria: preservar
            estrutura, indicar por critério, recusar o que não deveria ser
            feito. Você não sai com um passo a passo decorado. Sai sabendo
            justificar cada decisão que tomou.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 8 — A IMERSÃO INCLUI ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>A imersão inclui</p>
          <ul className="mx-auto mt-8 max-w-md">
            {[
              "Teoria e hands-on com todos os materiais",
              "Atendimento de paciente real na Mizza Clinic",
              "Material de apoio da mentoria",
              "Coffee break nos dois dias",
            ].map((item) => (
              <li
                key={item}
                className="border-b border-preto/10 py-3.5 text-center text-preto/75 last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ DOBRA 9 — FORMATOS (sem preço) ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Formatos</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-preto/20 p-8 text-center">
              <p className="font-display text-xl tracking-wide">INDIVIDUAL</p>
              <p className="mt-3 text-sm text-preto/70">
                A imersão exclusiva. Dois dias, você e a mentora.
              </p>
            </div>
            <div className="border border-preto/20 p-8 text-center">
              <p className="font-display text-xl tracking-wide">EM DUPLA</p>
              <p className="mt-3 text-sm text-preto/70">
                A mesma imersão, dividida com um colega da sua confiança, ou
                com outro profissional aprovado na aplicação.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-preto/60">
            Os valores de cada formato a Amanda apresenta no contato, junto
            com as datas disponíveis.
          </p>
          <p className="mt-3 text-center text-sm text-preto/60">
            Não tem com quem vir? Na aplicação você pode entrar na lista de
            duplas abertas. A data é definida quando o par se forma.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 10 — PERGUNTAS DIRETAS ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Perguntas diretas</p>
          <div className="mt-8">
            <Pergunta q="Vou conduzir o caso sozinha?">
              Não. Você conduz com a Dra. Isabella ao seu lado, em cada
              decisão. A mão é sua, a orientação é dela.
            </Pergunta>
            <Pergunta q="Onde acontece?">
              Na Mizza Clinic, em Maringá/PR. Presencial, nos dois dias.
            </Pergunta>
            <Pergunta q="Preciso já atuar com estética?">
              Não. A mentoria atende os dois momentos: entrada na
              especialidade e refinamento de quem já atende.
            </Pergunta>
            <Pergunta q="A data é fixa?">
              Não. As datas são definidas em conjunto, de acordo com as
              agendas.
            </Pergunta>
            <Pergunta q="Como funciona a seleção?">
              Você preenche a aplicação e a equipe entra em contato pelo
              WhatsApp para conversar sobre formato e datas.
            </Pergunta>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 11 — APLICAÇÃO ============ */}
      <section id="aplicacao" className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Aplicação</p>
          <p className="mx-auto mt-6 mb-10 max-w-md text-center text-preto/70">
            A mentoria é individual ou em dupla, o que significa poucas vagas
            por mês. A aplicação leva um minuto e ajuda a entender seu momento
            antes da nossa conversa.
          </p>
          <FormularioQualificacao variante="a" />
        </div>
      </section>

      {/* ============ RODAPÉ ============ */}
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
