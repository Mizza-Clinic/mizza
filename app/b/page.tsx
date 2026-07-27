import { FormularioQualificacao } from "@/components/FormularioQualificacao";

/**
 * VARIANTE B — form direto.
 * Página mínima: identidade + gancho + 3 linhas de contexto + aplicação.
 * Mesma identidade maison. Mede se o convencimento da LP completa paga o
 * atrito extra. Decisão do teste: custo por aluno FECHADO.
 */
export default function VarianteB() {
  return (
    <main className="w-full font-jost text-preto">
      {/* Contexto mínimo */}
      <section className="bg-preto px-6 py-14 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/logo-areia.png" alt="Mizza" className="h-8 w-auto" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-areia/70">
            Academy
          </span>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-areia/70">
          Mentoria presencial · 2 dias · Maringá/PR
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.05] text-areia sm:text-5xl">
          RESINA COMPOSTA
        </h1>
        <p className="mt-3 font-display text-lg tracking-wide text-areia/90">
          com a Dra. Isabella Barbosa
        </p>
        <p className="mx-auto mt-8 max-w-md text-lg text-areia">
          Dominar resina não é dominar a técnica.
          <br />
          É dominar a tomada de decisão.
        </p>
        <p className="mx-auto mt-4 max-w-md text-areia/75">
          Dois dias de imersão na Mizza Clinic. Você analisa, planeja e conduz
          um caso real, com ela ao seu lado. Preencha a aplicação e a equipe
          retorna pelo WhatsApp com formatos e datas.
        </p>
      </section>

      {/* Aplicação */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-xl">
          <FormularioQualificacao variante="b" />
        </div>
      </section>

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
    </main>
  );
}
