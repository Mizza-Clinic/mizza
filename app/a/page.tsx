import { FormularioQualificacao } from "@/components/FormularioQualificacao";

/**
 * VARIANTE A — LP completa + formulário no final.
 * Hipótese: mais convencimento antes da pergunta → menos leads, mais qualificados.
 * Copy segue perfil_isabella.md: sofisticado, direto, autoral.
 */
export default function VarianteA() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between py-6">
        <span className="font-serif text-lg tracking-wide">MIZZA</span>
        <span className="text-xs uppercase tracking-[0.2em] text-grafite">Academy</span>
      </header>

      {/* Hero */}
      <section className="pt-10 pb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze-escuro">
          Mentoria presencial · 2 dias · Maringá, PR
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl">
          Você não observa.
          <br />
          Você faz.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-grafite">
          Mentoria em resina composta com a Dra. Isabella Barbosa. Dois dias de
          imersão na Mizza Clinic: teoria pela manhã, hands-on à tarde — e, no
          segundo dia, paciente real. Conduzido por você.
        </p>
        <a
          href="#aplicacao"
          className="mt-8 inline-block rounded-md bg-carvao px-8 py-4 font-medium text-cru transition-colors hover:bg-bronze-escuro"
        >
          Aplicar para uma vaga
        </a>
      </section>

      <hr className="border-linha" />

      {/* Espelho — a dor dos dois perfis */}
      <section className="py-16">
        <h2 className="font-serif text-3xl leading-tight">
          A distância entre saber e confiar no que sabe.
        </h2>
        <p className="mt-5 leading-relaxed text-grafite">
          A faculdade ensina a técnica. O que ela não ensina é a decidir com o
          paciente na cadeira: qual resina, qual estratificação, quando parar.
          Essa segurança não vem de assistir aula — vem de fazer, com alguém ao
          lado que já resolveu esse caso muitas vezes.
        </p>
        <p className="mt-4 leading-relaxed text-grafite">
          Vale para quem está entrando na especialidade e vale para quem já
          atende e sente que o resultado ainda não reflete o que poderia cobrar.
        </p>
      </section>

      <hr className="border-linha" />

      {/* Como funciona */}
      <section className="py-16">
        <h2 className="font-serif text-3xl">Dois dias. Nessa ordem.</h2>
        <ol className="mt-8 space-y-8">
          <li className="grid grid-cols-[5.5rem_1fr] gap-4">
            <span className="text-sm uppercase tracking-wide text-bronze-escuro pt-0.5">
              Dia 1<br />manhã
            </span>
            <div>
              <h3 className="font-medium">Teoria</h3>
              <p className="mt-1 text-grafite leading-relaxed">
                O raciocínio antes do procedimento: seleção do caso, escolha de
                material, planejamento.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[5.5rem_1fr] gap-4">
            <span className="text-sm uppercase tracking-wide text-bronze-escuro pt-0.5">
              Dia 1<br />tarde
            </span>
            <div>
              <h3 className="font-medium">Hands-on</h3>
              <p className="mt-1 text-grafite leading-relaxed">
                A técnica na prática, com correção em tempo real.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[5.5rem_1fr] gap-4">
            <span className="text-sm uppercase tracking-wide text-bronze-escuro pt-0.5">
              Dia 2
            </span>
            <div>
              <h3 className="font-medium">Paciente real</h3>
              <p className="mt-1 text-grafite leading-relaxed">
                O caso é seu. As decisões, os materiais, a condução. A Isabella
                acompanha — quem faz é você.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <hr className="border-linha" />

      {/* Diferencial */}
      <section className="py-16">
        <h2 className="font-serif text-3xl leading-tight">
          Aula você esquece. Caso finalizado com as suas mãos, não.
        </h2>
        <p className="mt-5 leading-relaxed text-grafite">
          O formato existe por uma razão: aprendizado sob pressão real fica.
          Você sai com um caso finalizado — e com a memória do atendimento
          inteiro, da anamnese ao acabamento, no mesmo contexto que vai
          encontrar no seu consultório.
        </p>
      </section>

      <hr className="border-linha" />

      {/* Quem conduz */}
      <section className="py-16">
        <h2 className="font-serif text-3xl">Quem conduz</h2>
        <p className="mt-5 leading-relaxed text-grafite">
          Dra. Isabella Barbosa, sócia fundadora da Mizza Clinic, em Maringá.
          Especialista em resina composta e cerâmica, trabalha com uma
          filosofia que resume assim:
        </p>
        <blockquote className="mt-6 border-l-2 border-bronze pl-5 font-serif text-2xl leading-snug">
          &ldquo;Conservar é mais difícil do que substituir. Por isso pouca
          gente faz.&rdquo;
        </blockquote>
        <p className="mt-6 leading-relaxed text-grafite">
          É essa forma de pensar — indicação antes de procedimento, estrutura
          acima de estética — que atravessa a mentoria. Não só como executar:
          como decidir.
        </p>
      </section>

      <hr className="border-linha" />

      {/* Formatos */}
      <section className="py-16">
        <h2 className="font-serif text-3xl">Dois formatos. Nenhuma turma cheia.</h2>
        <div className="mt-8 space-y-5">
          <div className="rounded-md border border-linha bg-white p-6">
            <h3 className="font-medium">Individual</h3>
            <p className="mt-1 text-grafite leading-relaxed">
              Dois dias exclusivos. A agenda da clínica reservada para o seu caso.
            </p>
          </div>
          <div className="rounded-md border border-linha bg-white p-6">
            <h3 className="font-medium">Dupla</h3>
            <p className="mt-1 text-grafite leading-relaxed">
              A mesma imersão, dividida com um colega — da sua escolha, ou
              apresentado por nós.
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-grafite">
          Valores e datas são tratados diretamente com a Amanda, do time
          comercial, pelo WhatsApp.
        </p>
      </section>

      <hr className="border-linha" />

      {/* Aplicação */}
      <section id="aplicacao" className="py-16">
        <h2 className="font-serif text-3xl">Aplicação</h2>
        <p className="mt-4 mb-10 leading-relaxed text-grafite">
          As vagas seguem a agenda clínica da Isabella — poucas por mês, sem
          exceção. Preencha com atenção: as respostas orientam a conversa.
        </p>
        <FormularioQualificacao variante="a" />
      </section>

      <footer className="border-t border-linha py-8 text-center text-xs text-grafite">
        Mizza Clinic — Maringá, PR ·{" "}
        <a href="/privacidade" className="underline underline-offset-2">
          Política de privacidade
        </a>
      </footer>
    </main>
  );
}
