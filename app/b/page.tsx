import { FormularioQualificacao } from "@/components/FormularioQualificacao";

/**
 * VARIANTE B — form direto (lp_mentoria_copy_layout.md).
 * Página mínima: eyebrow + H1 + 3 linhas de contexto + aplicação multi-step.
 * Mesma identidade maison. Mede se o convencimento da LP completa paga o
 * atrito extra. Decisão do teste: custo por aluno FECHADO.
 */
export default function VarianteB() {
  return (
    <main className="w-full font-jost text-preto">
      {/* Contexto mínimo (preto) */}
      <section className="bg-preto px-6 py-14 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/logo-areia.png" alt="Mizza" className="h-8 w-auto" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-areia/70">
            Academy
          </span>
        </div>
        <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-areia/70">
          Mentoria presencial · Maringá/PR
        </p>
        <h1 className="mx-auto mt-5 max-w-xl font-bevas text-4xl leading-[1.1] text-areia sm:text-5xl">
          O MANEQUIM NÃO REAGE.
          <br />
          O PACIENTE, SIM.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-areia/80">
          Dois dias de imersão em resina composta com a Dra. Isabella Barbosa,
          na Mizza Clinic. Teoria, hands-on — e um caso real finalizado por
          você. Preencha a aplicação; a equipe retorna pelo WhatsApp com
          formatos e datas.
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
