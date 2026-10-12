import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { Hero } from "@/components/home/hero";
import { RecentArticle } from "@/components/home/recent-article";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { aboutContent } from "@/content/about";
import { portfolioContent } from "@/content/portfolio";
import { listFeaturedProjects, listRecentArticles } from "@/lib/content/repository";

export const metadata: Metadata = {
  description: `Projetos e artigos publicados no portfólio de ${portfolioContent.ownerName}.`,
};

const aboutOrder = ["apresentacao", "trajetoria", "formacao", "competencias", "contato"] as const;

export default async function Home() {
  // Busca o conteúdo durante a requisição; cada consulta mantém a revalidação de 60 s.
  await connection();
  const [projects, articles] = await Promise.allSettled([listFeaturedProjects(), listRecentArticles()]);
  const featuredProjects = projects.status === "fulfilled" ? projects.value : [];
  const recentArticles = articles.status === "fulfilled" ? articles.value : [];

  return (
    <>
      <Hero />
      <ScrollReveal />
      <div className="home-sections">
        <section className="home-section" id="projetos" aria-labelledby="projetos-destaque">
          <div className="home-section__header">
            <div>
              <p className="home-section__index" aria-hidden="true">02 / Seleção</p>
              <h2 id="projetos-destaque">Projetos</h2>
            </div>
            <Link className="action-link" href="/projetos">Ver todos os projetos</Link>
          </div>
          {featuredProjects.length ? (
            <div className={`home-projects home-projects--count-${featuredProjects.length}`}>
              {featuredProjects.map((project, index) => <FeaturedProjectCard key={project.slug} project={project} position={index + 1} lead={index === 0} />)}
            </div>
          ) : (
            <EmptyState
              title={projects.status === "rejected" ? "Projetos indisponíveis" : "Nenhum projeto em destaque"}
              description={projects.status === "rejected" ? "Não foi possível carregar os projetos agora." : "Projetos marcados como destaque serão exibidos aqui quando publicados."}
            />
          )}
        </section>

        <section className="home-section" id="artigos" aria-labelledby="artigos-recentes">
          <div className="home-section__header">
            <div>
              <p className="home-section__index" aria-hidden="true">03 / Publicações</p>
              <h2 id="artigos-recentes">Artigos</h2>
            </div>
            <Link className="action-link" href="/artigos">Ver todos os artigos</Link>
          </div>
          {recentArticles.length ? (
            <div className="home-articles">
              {recentArticles.map((article, index) => <RecentArticle key={article.slug} article={article} position={index + 1} />)}
            </div>
          ) : (
            <EmptyState
              title={articles.status === "rejected" ? "Artigos indisponíveis" : "Nenhum artigo publicado"}
              description={articles.status === "rejected" ? "Não foi possível carregar os artigos agora." : "Os artigos publicados serão exibidos aqui."}
            />
          )}
        </section>

        <section className="home-section" id="sobre" aria-labelledby="sobre-titulo">
          <div className="home-section__header">
            <div>
              <p className="home-section__index" aria-hidden="true">04 / Pessoal</p>
              <h2 id="sobre-titulo">{aboutContent.title}</h2>
            </div>
            <Link className="action-link" href="/sobre">Ver página Sobre</Link>
          </div>
          <div className="home-about">
            {aboutOrder.flatMap((id) => aboutContent.sections.filter((section) => section.id === id)).map((section, index) => (
              <section className={`home-about__item home-about__item--${section.id}`} key={section.id}>
                <span className="home-about__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
