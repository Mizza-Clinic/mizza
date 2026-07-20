"use client";

import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Pixel da Meta. Só renderiza se NEXT_PUBLIC_META_PIXEL_ID estiver definido.
 * O evento "Lead" é disparado pelo formulário no envio bem-sucedido —
 * é ele que alimenta a otimização dos conjuntos de anúncio por variante.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');`}
    </Script>
  );
}

/** Dispara o evento de Lead (chamar após envio confirmado do formulário). */
export function dispararEventoLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
