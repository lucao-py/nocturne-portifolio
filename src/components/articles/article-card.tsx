import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { formatPublishedDate } from "@/lib/content/format";
import type { Article } from "@/lib/content/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="content-card">
      <div className="content-card__cover">
        {article.coverImage
          ? <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
          : <span className="content-card__cover-label">Sem imagem de capa</span>}
      </div>
      <div className="content-card__body">
        <div className="content-card__meta">
          {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
          {article.isExample ? <span className="example-label">Exemplo fictício</span> : null}
        </div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <TagList items={article.tags} label="Tags" />
        <div className="content-card__links">
          <Link href={`/artigos/${article.slug}`}>Ler artigo <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
