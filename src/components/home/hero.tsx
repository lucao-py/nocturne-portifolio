"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import { portfolioContent } from "@/content/portfolio";

type Point = { x: number; y: number };

export function Hero() {
  const { ownerName, hero } = portfolioContent;
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef<Point | null>(null);
  const targetRef = useRef<Point | null>(null);
  const visibleRef = useRef(true);

  const stopPulse = useCallback((element: HTMLElement | null) => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    currentRef.current = null;
    targetRef.current = null;
    element?.removeAttribute("data-pulse-active");
  }, []);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) stopPulse(element);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      stopPulse(element);
    };
  }, [stopPulse]);

  function animatePulse() {
    const element = heroRef.current;
    const current = currentRef.current;
    const target = targetRef.current;
    if (!element || !current || !target || !visibleRef.current) {
      frameRef.current = null;
      return;
    }

    const dx = target.x - current.x;
    const dy = target.y - current.y;
    current.x += dx * 0.22;
    current.y += dy * 0.22;
    element.style.setProperty("--hero-pointer-x", `${current.x}px`);
    element.style.setProperty("--hero-pointer-y", `${current.y}px`);

    if (Math.abs(dx) + Math.abs(dy) > 0.6) {
      frameRef.current = requestAnimationFrame(animatePulse);
    } else {
      frameRef.current = null;
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !visibleRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    targetRef.current = point;
    if (!currentRef.current) {
      currentRef.current = { ...point };
      event.currentTarget.style.setProperty("--hero-pointer-x", `${point.x}px`);
      event.currentTarget.style.setProperty("--hero-pointer-y", `${point.y}px`);
    }
    if (!event.currentTarget.hasAttribute("data-pulse-active")) event.currentTarget.dataset.pulseActive = "true";
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animatePulse);
  }

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={heroRef} onPointerMove={handlePointerMove} onPointerLeave={(event) => stopPulse(event.currentTarget)}>
      <div className="hero__inner">
        <div className="hero__content">
          <h1 id="hero-title">{ownerName}</h1>
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <Link className="site-action site-action--primary" href="#projetos">{hero.projectsCta}</Link>
            <Link className="site-action site-action--secondary" href="#artigos">{hero.articlesCta}</Link>
          </div>
        </div>
        <div className="hero__portrait">
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
        </div>
      </div>

      <Link className="hero__scroll-hint" href="#projetos">
        <span>Role para explorar</span>
      </Link>
    </section>
  );
}
