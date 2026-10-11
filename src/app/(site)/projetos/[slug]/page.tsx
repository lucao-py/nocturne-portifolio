import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${project.seoTitle ?? project.title} — Lucas de Oliveira Santos`,
    description: project.seoDescription ?? project.excerpt,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const relatedArticles = await getArticlesForProject(project.slug);

  return (
    <article className="content-page content-detail">
      <Link className="content-back" href="/projetos">← Voltar aos projetos</Link>
      <header className="content-page__header">
        <p className="content-page__eyebrow">{projectCategoryLabels[project.category]}</p>
        {project.isExample ? <p className="example-label">Exemplo fictício — não representa um projeto realizado</p> : null}
        <h1>{project.title}</h1>
        <p>{project.excerpt}</p>
        <TagList items={project.technologies} label="Tecnologias" />
        {isValidExternalUrl(project.repositoryUrl) || isValidExternalUrl(project.demoUrl) ? (
          <div className="detail-links">
            {isValidExternalUrl(project.repositoryUrl) ? <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (abre em nova aba)</span></a> : null}
            {isValidExternalUrl(project.demoUrl) ? <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demonstração ↗<span className="sr-only"> (abre em nova aba)</span></a> : null}
          </div>
        ) : null}
      </header>

      {project.coverImage ? (
        <figure className="detail-cover">
          <Image src={project.coverImage.src} alt={project.coverImage.alt} width={1600} height={900} sizes="(max-width: 900px) 100vw, 900px" />
          {project.coverImage.caption ? <figcaption>{project.coverImage.caption}</figcaption> : null}
        </figure>
      ) : null}

      <div className="detail-sections">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading">Visão geral</h2>
          <ContentBody blocks={project.overview} />
        </section>
        {project.challenges?.length ? <section aria-labelledby="challenges-heading"><h2 id="challenges-heading">Desafios</h2><ContentBody blocks={project.challenges} /></section> : null}
        {project.implementation?.length ? <section aria-labelledby="implementation-heading"><h2 id="implementation-heading">Implementação</h2><ContentBody blocks={project.implementation} /></section> : null}
        {project.results?.length ? <section aria-labelledby="results-heading"><h2 id="results-heading">Resultados</h2><ContentBody blocks={project.results} /></section> : null}
      </div>

      {project.images?.length ? (
        <section className="detail-gallery" aria-label="Imagens do projeto">
          {project.images.map((image) => (
            <figure key={image.src}>
              <Image src={image.src} alt={image.alt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 900px" />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}

      {relatedArticles.length ? (
        <aside className="related-content" aria-label="Artigos relacionados">
          <h2>Artigos relacionados</h2>
          <ul>{relatedArticles.map((article) => <li key={article.slug}><Link href={`/artigos/${article.slug}`}>{article.title} →</Link></li>)}</ul>
        </aside>
      ) : null}
    </article>
  );
}
