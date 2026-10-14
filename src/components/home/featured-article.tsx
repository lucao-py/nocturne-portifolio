import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag-list";
import { formatPublishedDate } from "@/lib/content/format";
import type { Article } from "@/lib/content/types";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className={`home-article-feature${article.coverImage ? " home-article-feature--with-image" : ""}`}>
      <Link className="home-article-feature__link" href={`/artigos/${article.slug}`} aria-label={`Ler artigo: ${article.title}`}>
        <div className="home-article-feature__content">
          <div className="home-article-feature__meta">
            <span>Em destaque</span>
            {article.publishedAt ? <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time> : null}
            {article.isExample ? <span className="example-label">Exemplo fictício</span> : null}
          </div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <TagList items={article.tags} label="Tags" />
          <span className="action-link home-article-feature__read">Ler artigo</span>
        </div>
        {article.coverImage ? (
          <div className="home-article-feature__cover">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1199px) 42vw, 50vw"
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
