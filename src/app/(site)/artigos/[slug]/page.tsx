import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/articles/reading-progress";
import { EditorialReturnLink } from "@/components/layout/editorial-return-link";
import { ContentBody } from "@/components/ui/content-body";
import { TagList } from "@/components/ui/tag-list";
import { portfolioContent } from "@/content/portfolio";
import { formatPublishedDate } from "@/lib/content/format";
import { getArticleBySlug, getProjectsForArticle } from "@/lib/content/repository";
import { isValidExternalUrl } from "@/lib/content/urls";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return { title: "Artigo não encontrado" };
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug((await params).slug);
  if (!article) notFound();
  const relatedProjects = await getProjectsForArticle(article.relatedProjectSlugs ?? []);
  const repositoryLinks = relatedProjects.filter((project) => isValidExternalUrl(project.repositoryUrl))
    .filter((project, index, projects) => projects.findIndex((item) => item.repositoryUrl === project.repositoryUrl) === index);

  return (
    <div className="editorial-shell editorial-shell--article article-reading">
      <ReadingProgress contentId="article-body" />
      <div className="editorial-shell__top">
        <div className="editorial-shell__top-inner">
          <EditorialReturnLink section="artigos" />
        </div>
      </div>
      <div className="editorial-shell__surface">
        <article className="article-reading__inner">
          <header className="article-reading__header">
            <p className="article-reading__eyebrow">Artigo</p>
            {article.isExample ? <p className="example-label">Exemplo fictício — não representa uma publicação real</p> : null}
            <h1>{article.title}</h1>
            {article.excerpt ? <p className="article-reading__summary">{article.excerpt}</p> : null}
            <div className="article-reading__byline">
              <span>Por {portfolioContent.ownerName}</span>
              {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
            </div>
            <TagList items={article.tags} label="Tags" />
            {repositoryLinks.length ? (
              <div className="article-reading__repositories" aria-label="Código dos projetos relacionados">
                {repositoryLinks.map((project) => (
                  <a key={project.slug} className="site-action site-action--primary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    {repositoryLinks.length === 1 ? "Ver código no GitHub" : `GitHub · ${project.title}`}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          {article.coverImage ? (
            <figure className="article-reading__cover">
              <Image src={article.coverImage.src} alt={article.coverImage.alt} width={article.coverImage.width ?? 1600} height={article.coverImage.height ?? 900} sizes="(max-width: 767px) 100vw, 720px" />
              {article.coverImage.caption ? <figcaption>{article.coverImage.caption}</figcaption> : null}
            </figure>
          ) : null}

          <div className="article-reading__content" id="article-body">
            <ContentBody blocks={article.body} />
          </div>

          {relatedProjects.length ? (
            <aside className="article-reading__related" aria-label="Projetos relacionados">
              <h2>Projetos relacionados</h2>
              <ul>{relatedProjects.map((project) => <li key={project.slug}><Link className="action-link action-link--light" href={`/projetos/${project.slug}`}>{project.title}</Link></li>)}</ul>
            </aside>
          ) : null}

          <footer className="editorial-shell__end">
            <EditorialReturnLink section="artigos" />
          </footer>
        </article>
      </div>
    </div>
  );
}
