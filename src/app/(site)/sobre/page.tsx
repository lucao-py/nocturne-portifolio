import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import { portfolioContent } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Página Sobre do portfólio de ${portfolioContent.ownerName}.`,
};

export default function AboutPage() {
  return (
    <article className="content-page about-page">
      <header className="content-page__header">
        <p className="content-page__eyebrow">{aboutContent.eyebrow}</p>
        <h1>{aboutContent.title}</h1>
      </header>
      <div className="about-sections">
        {aboutContent.sections.map((section) => (
          <section className="about-section" aria-labelledby={section.id} key={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
