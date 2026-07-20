"use client";

import { useEffect, useState } from "react";

/**
 * CTA persistente mobile: retângulo preto "APLICAR" fixo após a 1ª dobra.
 * Some quando a dobra de aplicação está visível (não competir com o form).
 */
export function BarraAplicar() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const aplicacao = document.getElementById("aplicacao");
    if (!hero || !aplicacao) return;

    let heroVisivel = true;
    let aplicacaoVisivel = false;
    const atualizar = () => setVisivel(!heroVisivel && !aplicacaoVisivel);

    const obsHero = new IntersectionObserver(([e]) => {
      heroVisivel = e.isIntersecting;
      atualizar();
    });
    const obsAplicacao = new IntersectionObserver(([e]) => {
      aplicacaoVisivel = e.isIntersecting;
      atualizar();
    });
    obsHero.observe(hero);
    obsAplicacao.observe(aplicacao);
    return () => {
      obsHero.disconnect();
      obsAplicacao.disconnect();
    };
  }, []);

  if (!visivel) return null;

  return (
    <a
      href="#aplicacao"
      className="fixed inset-x-0 bottom-0 z-20 block bg-preto py-4 text-center text-[12px] font-medium uppercase tracking-[0.35em] text-white sm:hidden"
    >
      Aplicar
    </a>
  );
}
