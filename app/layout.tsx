import type { Metadata } from "next";
import { Fraunces, Inter, Jost } from "next/font/google";
import localFont from "next/font/local";
import { MetaPixel } from "@/components/MetaPixel";
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

// Voz tipográfica da marca — display, só headlines e labels de seção.
// Pendência: confirmar se a licença Envato da clínica cobre uso como webfont.
const bevas = localFont({
  src: "./fonts/bevas.woff",
  variable: "--font-bevas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mentoria em Resina Composta — Dra. Isabella Barbosa | Mizza Academy",
  description:
    "Dois dias de imersão presencial na Mizza Clinic: teoria, hands-on e um caso real finalizado por você, do planejamento ao polimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${jost.variable} ${bevas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
