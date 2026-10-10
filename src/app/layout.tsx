import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOCTURNE — Portfólio em construção",
  description: "Portfólio de Dados, Engenharia de Dados, Machine Learning e Inteligência Artificial em construção.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-10 focus:rounded focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-[var(--bg-0)]" href="#conteudo">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
