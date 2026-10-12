import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReturnLink } from "@/components/layout/editorial-return-link";
import { ContentBody } from "@/components/ui/content-body";
import { TagList } from "@/components/ui/tag-list";
import { getArticlesForProject, getProjectBySlug } from "@/lib/content/repository";
import { isValidExternalUrl } from "@/lib/content/urls";
import { projectCategoryLabels } from "@/lib/content/types";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.excerpt,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const relatedArticles = await getArticlesForProject(project.slug);
  const hasDistinctDemo = isValidExternalUrl(project.demoUrl) && project.demoUrl !== project.repositoryUrl;

  return (
    <article className="editorial-shell editorial-shell--project project-case">
      <div className="editorial-shell__top">
        <div className="editorial-shell__top-inner">
          <EditorialReturnLink section="projetos" />
          <header className="project-case__header">
            <p className="project-case__category">{projectCategoryLabels[project.category]}</p>
            {project.isExample ? <p className="example-label">Exemplo fictício — não representa um projeto realizado</p> : null}
            <h1>{project.title}</h1>
            <p className="project-case__summary">{project.excerpt}</p>
            <TagList items={project.technologies} label="Tecnologias" />
            {isValidExternalUrl(project.repositoryUrl) || hasDistinctDemo ? (
              <div className="project-case__actions">
                {isValidExternalUrl(project.repositoryUrl) ? <a className="site-action site-action--secondary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (abre em nova aba)</span></a> : null}
                {hasDistinctDemo ? <a className="site-action site-action--secondary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração<span className="sr-only"> (abre em nova aba)</span></a> : null}
              </div>
            ) : null}
          </header>
        </div>
      </div>

      <div className="editorial-shell__surface">
        <div className="project-case__inner">
          {project.coverImage ? (
            <figure className="project-case__cover">
              <Image src={project.coverImage.src} alt={project.coverImage.alt} width={project.coverImage.width ?? 1600} height={project.coverImage.height ?? 900} sizes="(max-width: 1100px) 100vw, 1100px" />
              {project.coverImage.caption ? <figcaption>{project.coverImage.caption}</figcaption> : null}
            </figure>
          ) : null}

          <div className="project-case__sections">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading">Visão geral</h2>
              <ContentBody blocks={project.overview} />
            </section>
            {project.challenges?.length ? <section aria-labelledby="challenges-heading"><h2 id="challenges-heading">Desafios</h2><ContentBody blocks={project.challenges} /></section> : null}
            {project.implementation?.length ? <section aria-labelledby="implementation-heading"><h2 id="implementation-heading">Implementação</h2><ContentBody blocks={project.implementation} /></section> : null}
            {project.results?.length ? <section aria-labelledby="results-heading"><h2 id="results-heading">Resultados</h2><ContentBody blocks={project.results} /></section> : null}
          </div>

          {project.images?.length ? (
            <section className="project-case__gallery" aria-label="Imagens do projeto">
              {project.images.map((image) => (
                <figure key={image.src}>
                  <Image src={image.src} alt={image.alt} width={image.width ?? 1200} height={image.height ?? 675} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 520px" />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </section>
          ) : null}

          {relatedArticles.length ? (
            <aside className="project-case__related" aria-label="Artigos relacionados">
              <h2>Artigos relacionados</h2>
              <ul>{relatedArticles.map((article) => <li key={article.slug}><Link className="action-link action-link--light" href={`/artigos/${article.slug}`}>{article.title}</Link></li>)}</ul>
            </aside>
          ) : null}

          <footer className="editorial-shell__end">
            <EditorialReturnLink section="projetos" />
          </footer>
        </div>
      </div>
    </article>
  );
}
