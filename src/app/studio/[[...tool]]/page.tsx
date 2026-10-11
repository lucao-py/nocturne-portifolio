import type { Metadata } from "next";
import { viewport } from "next-sanity/studio";
import { Studio } from "@/sanity/studio";

export { viewport };

export const metadata: Metadata = {
  title: "Studio — Portfólio Lucas de Oliveira Santos",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

  if (!projectId || !dataset) {
    return (
      <main id="conteudo" className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-2xl font-semibold">Sanity Studio não configurado</h1>
        <p className="mt-4">
          Defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET no arquivo .env.local
          e reinicie a aplicação para acessar o painel editorial.
        </p>
      </main>
    );
  }

  return <Studio projectId={projectId} dataset={dataset} />;
}
