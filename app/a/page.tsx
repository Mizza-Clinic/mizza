import Image from "next/image";
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
          <p className="font-display text-sm uppercase tracking-[0.4em] text-areia/90">
            Autêntica
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-areia/70">
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
            Dominar resina não é dominar a técnica.
            <br />
            É dominar a tomada de decisão.
          </p>
          <p className="mx-auto mt-4 max-w-md text-areia/75">
            Em dois dias de imersão na Mizza Clinic, você aprende a analisar,
            planejar e executar um caso real, com acompanhamento em cada
            etapa. O que transforma um resultado não é apenas saber fazer.
            É saber por que fazer.
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
            Resina composta aparece toda semana no consultório. O que
            diferencia um profissional não é apenas a técnica. É a capacidade
            de conduzir o caso, fazer as escolhas certas e entregar um
            resultado previsível.
          </p>

          <div className="mt-12 grid gap-px border border-areia/25 bg-areia/25 sm:grid-cols-3">
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Ainda não atua</p>
              <p className="mt-3 text-areia/85">
                Você quer entrar na estética, mas trava quando precisa
                conduzir um caso do início ao fim. Sente que ainda falta
                segurança para assumir o paciente sozinho(a).
              </p>
            </div>
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Se especializou em outra área</p>
              <p className="mt-3 text-areia/85">
                Você investiu em outra especialidade, mas percebeu que a
                estética faz mais sentido para você. A resina continuou sendo
                um desejo, mas acabou ficando em segundo plano.
              </p>
            </div>
            <div className="bg-preto p-7 text-left">
              <p className={rotuloSecaoEscuro}>Tem clínica e terceiriza</p>
              <p className="mt-3 text-areia/85">
                Os casos chegam até você, mas acabam sendo executados por
                outro profissional. Você abre mão da margem financeira e da
                oportunidade de fortalecer sua autoridade clínica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 3 — O QUE MUDA (autonomia) ============ */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 sm:items-center sm:gap-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/fotos/mentoria-teoria-pb.jpg"
              alt="Dra. Isabella Barbosa conduzindo a parte teórica da mentoria"
              fill
              sizes="(min-width: 640px) 32rem, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className={rotuloSecao}>O que muda na sua prática</p>
            <p className="mt-6 font-display text-3xl leading-snug">
              CONSTRUA O SEU CRITÉRIO. DESENVOLVA SUA VISÃO E AUTONOMIA NOS
              CASOS.
            </p>
            <p className="mt-6 text-preto/70">
              Antes de qualquer camada de resina, existe uma sequência de
              decisões: qual caso aceitar, qual material escolher, qual
              técnica utilizar e quando parar.
            </p>
            <p className="mt-4 text-preto/70">
              São nessas decisões que o resultado começa a ser construído.
            </p>
            <p className="mt-4 text-preto/70">O curso te ensina a executar.</p>
            <p className="mt-4 text-preto/70">
              A mentoria ensina a analisar, planejar e decidir com segurança.
              Porque é essa capacidade que sustenta sua confiança clínica,
              seus resultados e o valor que você cobra por cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 4 — A IMERSÃO ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-[1fr_14rem] sm:items-start">
          <div>
            <p className={rotuloSecao}>A imersão</p>
            <div className="mt-10">
              <Marco
                numero="I"
                titulo="Dia 1, manhã · Teoria"
                linhas={[
                  "Critério, não receita. Aprenda a decifrar as resinas do mercado: tamanho e tipo de partícula, opacidade, translucidez e indicação de cada camada.",
                  "Entenda cor de verdade: matiz, croma e valor.",
                  "Mais do que decorar protocolos, desenvolva o raciocínio clínico para analisar, planejar e tomar decisões com segurança em cada caso.",
                ]}
              />
              <Marco
                numero="II"
                titulo="Dia 1, tarde · Hands-on"
                linhas={[
                  "A técnica na sua mão. Estratificação em cinco camadas, morfologia, acabamento e polimento que garantem a estabilidade da cor ao longo do tempo.",
                ]}
              />
              <Marco
                numero="III"
                titulo="Dia 2 · Paciente real"
                linhas={[
                  "Você analisa, planeja e conduz um caso clínico real com a Dra. Isabella ao seu lado.",
                  "Não é observação: a mão é sua, com orientação em cada decisão.",
                ]}
                ultimo
              />
            </div>
          </div>
          <div className="relative order-first aspect-[3/4] w-full sm:order-none sm:mt-14">
            <Image
              src="/fotos/mentoria-handson.jpg"
              alt="Prática de hands-on durante a mentoria"
              fill
              sizes="(min-width: 640px) 14rem, 100vw"
              className="object-cover"
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
              "Treinar o olhar clínico para analisar o caso antes de encostar a mão nele",
              "Escolher a resina por critério técnico, e nunca mais por hábito ou indicação de vendedor",
              "Saber quando indicar resina e quando indicar cerâmica, preservando estrutura dental e entregando a melhor solução para cada paciente",
              "Dominar cor de verdade: matiz, croma e valor. A maioria dos erros de cor acontece por uma leitura incorreta do valor",
              "Executar a estratificação policromática em cinco camadas, inclusive em dentes escurecidos e clareados",
              "Construir morfologia, textura e detalhes ópticos que fazem a restauração desaparecer no sorriso",
              "Realizar acabamento e polimento com técnica para garantir brilho, textura e estabilidade de cor ao longo do tempo",
              "Conduzir um caso anterior completo, do diagnóstico ao planejamento, da execução à entrega final, com segurança em cada decisão clínica",
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
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2 sm:items-center sm:gap-12">
          <div className="relative order-first aspect-[4/3] w-full sm:order-last">
            <Image
              src="/fotos/mentoria-diferencial.jpg"
              alt="Atendimento de paciente real durante a mentoria, com acompanhamento em cada etapa"
              fill
              sizes="(min-width: 640px) 32rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-3xl leading-snug">
              PENSAR CLINICAMENTE.
            </p>
            <p className="mt-8 text-preto/70">
              Planejar o caso, escolher o material e decidir a melhor conduta
              com o paciente na cadeira e a agenda acontecendo.
            </p>
            <p className="mt-4 text-preto/70">
              Essa é a parte que nenhuma aula gravada consegue ensinar. Na
              mentoria, você percorre esse caminho na realidade do
              consultório, com orientação e acompanhamento em cada etapa. As
              decisões são suas, mas a experiência de quem já percorreu esse
              caminho está ao seu lado para corrigir, direcionar e acelerar o
              seu aprendizado no momento em que ele realmente acontece.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DOBRA 7 — QUEM CONDUZ ============ */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-xl">
          <p className={`${rotuloSecao} text-center`}>Quem conduz</p>
          <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-xs overflow-hidden">
            <Image
              src="/fotos/isabella-retrato.jpg"
              alt="Dra. Isabella Barbosa"
              fill
              sizes="(min-width: 640px) 20rem, 80vw"
              className="object-cover"
            />
          </div>
          <p className="mt-8 text-center font-display text-2xl">
            DRA. ISABELLA BARBOSA
          </p>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-preto/60">
            Natural de Cianorte, no Paraná, formou-se em Odontologia pelo
            Centro Universitário Cesumar, em Maringá, onde foi monitora de
            Dentística Restauradora durante a graduação. Desde 2017, atua em
            consultório particular, com foco em Odontologia Restauradora e
            Reabilitação Oral. É especialista em Implantodontia, com
            especialização concluída em 2021, e aprofundou seus conhecimentos
            e sua prática clínica com Luiz Narciso Baratieri e Ronaldo Hirata,
            além de ter atingido a excelência em resina composta com Newton
            Fahl.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-preto/60">
            Seu trabalho é guiado pela ética profissional e pela adesão
            correta aos materiais dentários, sempre em busca de um tratamento
            íntegro para cada paciente. É professora de pós-graduação no IOA
            Maringá, na especialização em Dentística e Prótese Dentária, e
            atualmente é graduanda em Reabilitação Oral na Era Adesiva, pela
            Kina Essencial Balance/UCAM.
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
            <p className="relative font-display text-xl leading-snug text-areia sm:text-2xl">
              “O QUE NÃO TE DESAFIA,
              <br />
              NÃO TE TRANSFORMA.”
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-preto/70">
            A mesma régua do consultório vale na mentoria. Preservar
            estrutura. Indicar por critério. Recusar o que não deveria ser
            feito. Você não sai com um passo a passo decorado. Sai com
            raciocínio clínico, para justificar cada decisão que tomou.
          </p>
        </div>
      </section>

      {/* ============ DOBRA 7.5 — PROVA SOCIAL (depoimentos) ============ */}
      <section className="border-t border-preto/10 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className={`${rotuloSecao} text-center`}>Quem já fez</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Depoimento
              foto="/fotos/depoimento-gabrielle.jpg"
              nome="Dra. Gabrielle Ribeiro Teixeira"
              cidade="Loanda, PR"
              quote="A prática no paciente muda totalmente a nossa visão. Tem vários aspectos que a gente não vive no manequim."
            />
            <Depoimento
              foto="/fotos/depoimento-luis.jpg"
              nome="Dr. Luis Fernando Gianchini"
              quote="Consegui tirar praticamente todas as dúvidas que eu tinha sobre planejamento e execução dos casos em resina composta."
            />
            <Depoimento
              foto="/fotos/depoimento-karla.jpg"
              nome="Dra. Karla Giovanna Soares"
              quote="Foi muito bom. Um aprendizado incrível."
            />
          </div>
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
  linhas,
  ultimo = false,
}: {
  numero: string;
  titulo: string;
  linhas: string[];
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
        {linhas.map((linha, i) => (
          <p key={i} className={i === 0 ? "mt-3 text-preto/70" : "mt-2 text-preto/70"}>
            {linha}
          </p>
        ))}
      </div>
    </div>
  );
}

function Depoimento({
  foto,
  nome,
  cidade,
  quote,
}: {
  foto: string;
  nome: string;
  cidade?: string;
  quote: string;
}) {
  return (
    <div className="text-center">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[11rem] overflow-hidden">
        <Image src={foto} alt={nome} fill sizes="11rem" className="object-cover" />
      </div>
      <p className="mt-5 text-[15px] italic leading-snug text-preto/80">
        “{quote}”
      </p>
      <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.1em]">
        {nome}
      </p>
      {cidade && <p className="text-[12px] text-preto/50">{cidade}</p>}
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
