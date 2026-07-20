/**
 * Os 8 gomos do octógono da marca como indicador de progresso do formulário
 * (sistema de aplicação da marca, item 3 — lp_mentoria_copy_layout.md).
 * Preenchimento em marrom: o ÚNICO uso do acento marrom na página.
 */
export function OctogonoProgresso({ fracao }: { fracao: number }) {
  const preenchidos = Math.round(Math.max(0, Math.min(1, fracao)) * 8);

  // 8 gomos: arcos de um anel, com folga entre eles (como no símbolo)
  const gomos = Array.from({ length: 8 }, (_, i) => {
    const inicio = i * 45 - 90 + 4; // começa no topo, 4° de folga por lado
    const fim = inicio + 37;
    return descreverArco(24, 24, 18, inicio, fim);
  });

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={8}
      aria-valuenow={preenchidos}
      aria-label={`Progresso da aplicação: ${preenchidos} de 8`}
    >
      {gomos.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          strokeWidth="7"
          className={i < preenchidos ? "stroke-marrom" : "stroke-areia/50"}
        />
      ))}
    </svg>
  );
}

function descreverArco(cx: number, cy: number, r: number, inicioGraus: number, fimGraus: number) {
  const a1 = (inicioGraus * Math.PI) / 180;
  const a2 = (fimGraus * Math.PI) / 180;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy + r * Math.sin(a2);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}
