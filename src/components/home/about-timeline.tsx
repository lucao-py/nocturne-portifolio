"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { aboutContent } from "@/content/about";
import { usePixelPulse } from "@/components/home/use-pixel-pulse";

export function AboutTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStep = aboutContent.steps[activeIndex];
  const { surfaceRef, onPointerMove, onPointerLeave } = usePixelPulse<HTMLElement>();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % aboutContent.steps.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + aboutContent.steps.length) % aboutContent.steps.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = aboutContent.steps.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="home-section home-section--about" id="sobre" aria-labelledby="sobre-titulo" ref={surfaceRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="home-about__pulse-layer" aria-hidden="true" />
      <div className="home-about__inner">
        <div className="home-section__header">
          <div>
            <p className="home-section__index" aria-hidden="true">04 / Pessoal</p>
            <h2 id="sobre-titulo">{aboutContent.title}</h2>
          </div>
        </div>
        <div className="home-about">
          <div className="home-about__map" aria-label="Linha do tempo de Lucas em quatro etapas">
            <svg className="home-about__route" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
              <path d="M125 136 H375 V42 H625 V136 H875" />
            </svg>
            <ol className="home-about__steps">
              {aboutContent.steps.map((step, index) => (
                <li className={`home-about__step home-about__step--${step.id}`} key={step.id}>
                  <button
                    ref={(element) => { buttonRefs.current[index] = element; }}
                    className="home-about__step-button"
                    type="button"
                    aria-pressed={activeIndex === index}
                    aria-controls="sobre-conteudo"
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="home-about__node" aria-hidden="true" />
                    <span className="home-about__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className="home-about__step-label">{step.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <section className="home-about__detail" id="sobre-conteudo" data-step={activeStep.id} aria-live="polite" aria-atomic="true">
            <div className="home-about__detail-inner" key={activeStep.id}>
              <div className="home-about__detail-rail">
                <p className="home-about__detail-index">{String(activeIndex + 1).padStart(2, "0")} / 04</p>
                <span className="home-about__detail-rail-line" aria-hidden="true" />
                <p className="home-about__detail-rail-label">{activeStep.label}</p>
              </div>
              <div className="home-about__detail-main">
                <p className="home-about__detail-note">{activeStep.note}</p>
                <h3>{activeStep.title}</h3>
                <p className="home-about__detail-description">{activeStep.description}</p>
                {activeStep.markers.length > 0 && (
                  <div className="home-about__detail-extra">
                    {activeStep.markersLabel && <p className="home-about__detail-extra-label">{activeStep.markersLabel}</p>}
                    <ul className="home-about__detail-markers">
                      {activeStep.markers.map((marker) => <li key={marker}>{marker}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="home-about__closing">
            <ul className="home-about__connections" aria-label="Conexões profissionais">
              {aboutContent.connections.filter(({ url }) => url).map(({ label, url }, index) => (
                <li key={label}>
                  <a className={`site-action ${index === 0 ? "site-action--primary" : "site-action--secondary home-about__connection--cyan"}`} href={url} target="_blank" rel="noopener noreferrer">
                    {label}<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
