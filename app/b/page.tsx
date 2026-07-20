import { FormularioQualificacao } from "@/components/FormularioQualificacao";

/**
 * VARIANTE B — formulário direto com contexto mínimo.
 * Hipótese: menos atrito → mais leads, custo por lead menor.
 * O bloco de contexto no topo é obrigatório: sem ele o lead preenche sem
 * saber o que está pedindo e a qualidade cai por confusão, não por perfil.
 */
export default function VarianteB() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5">
      <header className="flex items-center justify-between py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marca/logo-header.png" alt="Mizza" className="h-8 w-auto" />
        <span className="text-xs uppercase tracking-[0.2em] text-grafite">Academy</span>
      </header>

      {/* Contexto mínimo */}
      <section className="pt-8 pb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze-escuro">
          Mentoria presencial · 2 dias · Maringá, PR
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">
          Mentoria em resina composta com a Dra. Isabella Barbosa
        </h1>
        <p className="mt-5 leading-relaxed text-grafite">
          Dois dias de imersão na Mizza Clinic: teoria, hands-on e, no segundo
          dia, atendimento de paciente real — conduzido por você. Preencha a
          aplicação; a Amanda, do nosso time, retorna pelo WhatsApp com
          formatos e datas.
        </p>
      </section>

      <section className="pb-16">
        <FormularioQualificacao variante="b" />
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
