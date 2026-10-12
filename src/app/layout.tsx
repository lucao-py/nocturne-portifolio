import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import { portfolioContent } from "@/content/portfolio";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Lucas Santos", template: "%s | Lucas Santos" },
  description: `Portfólio pessoal de ${portfolioContent.ownerName}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cinzel.variable}`}>
      <body>
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-10 focus:rounded focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-[var(--bg-0)]" href="#conteudo">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
