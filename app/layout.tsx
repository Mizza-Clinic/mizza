import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mentoria em Resina Composta — Dra. Isabella Barbosa | Mizza Academy",
  description:
    "Dois dias de imersão presencial na Mizza Clinic: teoria, hands-on e atendimento de paciente real. Você não observa — você faz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
