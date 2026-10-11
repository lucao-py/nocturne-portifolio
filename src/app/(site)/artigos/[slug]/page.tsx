import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBody } from "@/components/ui/content-body";
import { TagList } from "@/components/ui/tag-list";
import { formatPublishedDate } from "@/lib/content/format";
import { getArticleBySlug, getProjectsForArticle } from "@/lib/content/repository";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return { title: "Artigo não encontrado" };
  return {
    title: `${article.seoTitle ?? article.title} — Lucas de Oliveira Santos`,
    description: article.seoDescription ?? article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug((await params).slug);
  if (!article) notFound();
  const relatedProjects = await getProjectsForArticle(article.relatedProjectSlugs ?? []);

  return (
    <article className="content-page content-detail">
      <Link className="content-back" href="/artigos">← Voltar aos artigos</Link>
      <header className="content-page__header">
        <p className="content-page__eyebrow">Artigo</p>
        {article.isExample ? <p className="example-label">Exemplo fictício — não representa uma publicação real</p> : null}
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
        <TagList items={article.tags} label="Tags" />
      </header>

      {article.coverImage ? (
        <figure className="detail-cover">
          <Image src={article.coverImage.src} alt={article.coverImage.alt} width={1600} height={900} sizes="(max-width: 900px) 100vw, 900px" />
          {article.coverImage.caption ? <figcaption>{article.coverImage.caption}</figcaption> : null}
        </figure>
      ) : null}

      <ContentBody blocks={article.body} />

      {relatedProjects.length ? (
        <aside className="related-content" aria-label="Projetos relacionados">
          <h2>Projetos relacionados</h2>
          <ul>{relatedProjects.map((project) => <li key={project.slug}><Link href={`/projetos/${project.slug}`}>{project.title} →</Link></li>)}</ul>
        </aside>
      ) : null}
    </article>
  );
}
