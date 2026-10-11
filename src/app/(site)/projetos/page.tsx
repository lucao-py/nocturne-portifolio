import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { listProjects, parsePage } from "@/lib/content/repository";
export const metadata: Metadata = {
  title: "Projetos — Lucas de Oliveira Santos",
  description: "Projetos publicados por Lucas de Oliveira Santos em dados, engenharia de dados, machine learning e inteligência artificial.",
};

export default async function ProjectsPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page: pageParam } = await searchParams;
  const { items, page, totalPages, totalItems } = await listProjects(parsePage(pageParam));

  return (
    <div className="content-page">
      <header className="content-page__header">
        <p className="content-page__eyebrow">Portfólio / Projetos</p>
        <h1>Projetos</h1>
        <p>Projetos publicados sobre dados, engenharia de dados, machine learning e inteligência artificial.</p>
      </header>

      {items.length ? (
        <>
          <div className="catalog-grid">
            {items.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/projetos" />
        </>
      ) : (
        <EmptyState
          title="Nenhum projeto nesta página"
          description={totalItems ? "Volte à primeira página para ver os registros disponíveis." : "Os projetos serão exibidos aqui quando houver conteúdo."}
          href={totalItems ? "/projetos" : undefined}
          linkLabel={totalItems ? "Ver primeira página" : undefined}
        />
      )}
    </div>
  );
}
