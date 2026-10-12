import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { formatPublishedDate } from "@/lib/content/format";
import type { Article } from "@/lib/content/types";

export function RecentArticle({ article, position }: { article: Article; position: number }) {
  const detailHref = `/artigos/${article.slug}`;

  return (
    <article className={`home-article ${article.coverImage ? "home-article--with-image" : ""}`}>
      <Link className="home-article__link" href={detailHref} aria-label={`Ler artigo: ${article.title}`}>
        <span className="home-article__index" aria-hidden="true">{String(position).padStart(2, "0")}</span>
        {article.coverImage ? (
          <span className="home-article__cover">
            <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes="(max-width: 767px) 220px, 224px" />
          </span>
        ) : null}
        <div className="home-article__content">
          {article.publishedAt || article.isExample ? (
            <div className="home-article__meta">
              {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
              {article.isExample ? <span className="example-label">Exemplo fictício</span> : null}
            </div>
          ) : null}
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <TagList items={article.tags} label="Tags" />
          <span className="action-link home-article__read">Ler artigo</span>
        </div>
      </Link>
    </article>
  );
}
