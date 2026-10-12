"use client";

import Link from "next/link";
import Image from "next/image";
import { portfolioContent } from "@/content/portfolio";
import { usePixelPulse } from "@/components/home/use-pixel-pulse";

const portraitGridSize = 9;
const portraitBlockCount = portraitGridSize ** 2;

// A ordem percorre a grade inteira sem formar linhas ou uma cortina vertical.
const portraitBlocks = Array.from({ length: portraitBlockCount }, (_, index) => ({
  x: (index % portraitGridSize) / portraitGridSize,
  y: Math.floor(index / portraitGridSize) / portraitGridSize,
  delay: Math.floor(((index * 37) % portraitBlockCount) / portraitGridSize) * 195,
}));

export function Hero() {
  const { ownerName, hero } = portfolioContent;
  const { surfaceRef, onPointerMove, onPointerLeave } = usePixelPulse<HTMLElement>();

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={surfaceRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="hero__inner">
        <div className="hero__content">
          <h1 id="hero-title">{ownerName}</h1>
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <Link className="site-action site-action--primary" href="#projetos">{hero.projectsCta}</Link>
            <Link className="site-action site-action--secondary" href="#artigos">{hero.articlesCta}</Link>
          </div>
        </div>
        <a className="hero__portrait" href="#sobre" aria-label="Conheça mais sobre Lucas na seção Sobre">
          <svg className="hero__portrait-mask" width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
              <mask id="hero-portrait-pixels" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                {portraitBlocks.map(({ x, y, delay }) => (
                  <rect
                    key={`${x}-${y}`}
                    className="hero__pixel-block"
                    x={x}
                    y={y}
                    width={1 / portraitGridSize + 0.008}
                    height={1 / portraitGridSize + 0.008}
                    fill="white"
                    shapeRendering="crispEdges"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </mask>
            </defs>
          </svg>
          <Image
            className="hero__portrait-image"
            src="/images/hero/lucas-pixel-hero.png"
            alt="Retrato de Lucas de Oliveira Santos em pixel art"
            width={1254}
            height={1254}
            sizes="(max-width: 767px) 68vw, (max-width: 1023px) 38vw, 430px"
            preload
            unoptimized
          />
        </a>
      </div>

      <Link className="hero__scroll-hint" href="#projetos">
        <span>Role para explorar</span>
      </Link>
    </section>
  );
}
