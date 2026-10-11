import Image from "next/image";
import Link from "next/link";
import { portfolioContent } from "@/content/portfolio";

export function Hero() {
  const { ownerName, hero } = portfolioContent;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__visual" aria-hidden="true">
        <Image
          className="hero__image"
          src="/images/hero/hero-gotham-neon.png"
          alt=""
          fill
          priority
          sizes="(max-height: 700px) 1280px, 1600px"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__ambient" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__marker" aria-hidden="true"><span /></div>
          <h1 id="hero-title" className="hero__title">{ownerName}</h1>
          <p className="hero__support">{hero.support}</p>
          <p className="hero__description">{hero.description}</p>

          <div className="hero__actions">
            <Link className="hero__button hero__button--primary" href="/projetos">
              {hero.projectsCta}<span aria-hidden="true">↗</span>
            </Link>
            <Link className="hero__button hero__button--secondary" href="/artigos">
              {hero.articlesCta}<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
