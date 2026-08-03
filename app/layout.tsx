import type { Metadata } from "next";
import { Fraunces, Inter, Jost, Marcellus } from "next/font/google";
import localFont from "next/font/local";
import { MetaPixel } from "@/components/MetaPixel";
import { Clarity } from "@/components/Clarity";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Corpo de texto da LP — sans geométrica leve (direção maison)
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

// Títulos da LP — serifa romana limpa, espírito maison com legibilidade
// (feedback João 20/07: Bevas só em momentos pontuais)
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

// Voz tipográfica da marca — display, uso PONTUAL (numerais, detalhes).
// Pendência: confirmar se a licença Envato da clínica cobre uso como webfont.
const bevas = localFont({
  src: "./fonts/bevas.woff",
  variable: "--font-bevas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mentoria em Resina Composta | Dra. Isabella Barbosa | Mizza Academy",
  description:
    "Dois dias de imersão presencial na Mizza Clinic. Você analisa, planeja e conduz um caso real de resina composta, com a Dra. Isabella Barbosa ao seu lado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${jost.variable} ${marcellus.variable} ${bevas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MetaPixel />
        <Clarity />
        {children}
      </body>
    </html>
  );
}
