"use client";

import Image from "next/image";
import { portfolioContent } from "@/content/portfolio";
import { usePixelPulse } from "@/components/home/use-pixel-pulse";

const portraitGridSize = 9;
const portraitBlockCount = portraitGridSize ** 2;

// A ordem percorre a grade inteira sem formar linhas ou uma cortina vertical.
const portraitBlocks = Array.from({ length: portraitBlockCount }, (_, index) => ({
  x: (index % portraitGridSize) / portraitGridSize,
  y: Math.floor(index / portraitGridSize) / portraitGridSize,
  delay: Math.floor(((index * 37) % portraitBlockCount) / portraitGridSize) * 225,
}));

const glitchGroups = [
  { x: 23, y: 27, delay: 0, period: 5200, tone: "cyan" },
  { x: 76, y: 24, delay: 650, period: 5700, tone: "red" },
  { x: 17, y: 53, delay: 1300, period: 5400, tone: "red" },
  { x: 81, y: 57, delay: 1950, period: 6100, tone: "cyan" },
  { x: 32, y: 79, delay: 2600, period: 5600, tone: "cyan" },
  { x: 68, y: 82, delay: 3250, period: 5900, tone: "red" },
] as const;

export function Hero() {
  const { ownerName, hero } = portfolioContent;
  const { surfaceRef, onPointerMove, onPointerLeave } = usePixelPulse<HTMLElement>();

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={surfaceRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="hero__inner">
        <div className="hero__content">
          <h1 id="hero-title">{ownerName}</h1>
          <p className="hero__description">
            {hero.description.map(({ text, highlight }) =>
              highlight ? <span className="hero__description-accent" key={text}>{text}</span> : text,
            )}
          </p>
          <div className="hero__actions">
            <a className="site-action site-action--primary" href="#projetos">{hero.projectsCta}</a>
            <a className="site-action site-action--secondary" href="#artigos">{hero.articlesCta}</a>
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
          <span className="hero__glitch" aria-hidden="true">
            {glitchGroups.map(({ x, y, delay, period, tone }) => (
              <span
                key={`${x}-${y}`}
                className={`hero__glitch-group hero__glitch-group--${tone}`}
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${2100 + delay}ms`, animationDuration: `${period}ms` }}
              >
                <span className="hero__glitch-pixel" />
                <span className="hero__glitch-pixel" />
                <span className="hero__glitch-pixel" />
                <span className="hero__glitch-pixel" />
                <span className="hero__glitch-pixel" />
              </span>
            ))}
          </span>
        </a>
      </div>

      <a className="hero__scroll-hint" href="#projetos">
        <span>Role para explorar</span>
      </a>
    </section>
  );
}
