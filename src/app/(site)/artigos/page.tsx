import type { Metadata } from "next";
import { ArticleCard } from "@/components/articles/article-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { listArticles, parsePage } from "@/lib/content/repository";
export const metadata: Metadata = {
  title: "Artigos — Lucas de Oliveira Santos",
  description: "Artigos técnicos publicados por Lucas de Oliveira Santos.",
};

export default async function ArticlesPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page: pageParam } = await searchParams;
  const { items, page, totalPages, totalItems } = await listArticles(parsePage(pageParam));

  return (
    <div className="content-page">
      <header className="content-page__header">
        <p className="content-page__eyebrow">Portfólio / Artigos</p>
        <h1>Artigos</h1>
        <p>Artigos técnicos sobre dados, engenharia de dados, machine learning e inteligência artificial.</p>
      </header>

      {items.length ? (
        <>
          <div className="catalog-grid">
            {items.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/artigos" />
        </>
      ) : (
        <EmptyState
          title="Nenhum artigo nesta página"
          description={totalItems ? "Volte à primeira página para ver os registros disponíveis." : "Os artigos serão exibidos aqui quando houver conteúdo."}
          href={totalItems ? "/artigos" : undefined}
          linkLabel={totalItems ? "Ver primeira página" : undefined}
        />
      )}
    </div>
  );
}
