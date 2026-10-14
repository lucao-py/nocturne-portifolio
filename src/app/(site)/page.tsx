import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { AboutTimeline } from "@/components/home/about-timeline";
import { FeaturedArticle } from "@/components/home/featured-article";
import { Hero } from "@/components/home/hero";
import { RecentArticle } from "@/components/home/recent-article";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { portfolioContent } from "@/content/portfolio";
import { listRecentArticles } from "@/lib/content/repository";

export const metadata: Metadata = {
  description: `Artigos e análises publicados no portfólio de ${portfolioContent.ownerName}.`,
};

export default async function Home() {
  // Busca o conteúdo durante a requisição; a consulta mantém a revalidação de 60 s.
  await connection();
  const articles = await listRecentArticles().then(
    (items) => ({ items, unavailable: false }),
    () => ({ items: [], unavailable: true }),
  );
  const [featuredArticle, ...recentArticles] = articles.items;

  return (
    <>
      <Hero />
      <ScrollReveal />
      <div className="home-sections">
        <section className="home-section" id="artigos" aria-labelledby="artigos-recentes">
          <div className="home-section__header">
            <div>
              <p className="home-section__index" aria-hidden="true">02 / Publicações</p>
              <h2 id="artigos-recentes">Artigos</h2>
            </div>
            <Link className="action-link" href="/artigos">Ver todos os artigos</Link>
          </div>
          {featuredArticle ? (
            <div className={`home-articles-layout${recentArticles.length ? "" : " home-articles-layout--solo"}`}>
              <FeaturedArticle article={featuredArticle} />
              {recentArticles.length ? (
                <div className="home-articles-recent">
                  <p className="home-articles-recent__label">Mais artigos</p>
                  <div className="home-articles">
                    {recentArticles.map((article, index) => <RecentArticle key={article.slug} article={article} position={index + 2} />)}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <EmptyState
              title={articles.unavailable ? "Artigos indisponíveis" : "Nenhum artigo publicado"}
              description={articles.unavailable ? "Não foi possível carregar os artigos agora." : "Os artigos publicados serão exibidos aqui."}
            />
          )}
        </section>

        <AboutTimeline />
      </div>
    </>
  );
}
