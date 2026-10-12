"use client";

import { useEffect } from "react";

type RevealItem = { element: HTMLElement; delay: number };

export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-sections");
    if (!root || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items: RevealItem[] = [];
    const add = (element: HTMLElement | null, delay: number) => {
      if (element) items.push({ element, delay });
    };

    for (const section of root.querySelectorAll<HTMLElement>(".home-section")) {
      const header = section.querySelector<HTMLElement>(".home-section__header");
      add(header?.querySelector<HTMLElement>(".home-section__index") ?? null, 0);
      add(header?.querySelector<HTMLElement>("h2") ?? null, 80);
      add(header?.querySelector<HTMLElement>("a") ?? null, 160);

      if (section.id === "projetos") {
        section.querySelectorAll<HTMLElement>(".home-project").forEach((card, index) => add(card, 200 + index * 70));
      } else if (section.id === "artigos") {
        section.querySelectorAll<HTMLElement>(".home-article").forEach((article, index) => add(article, Math.min(index, 2) * 70));
      } else if (section.id === "sobre") {
        section.querySelectorAll<HTMLElement>(".home-about__item").forEach((item, index) => add(item, index === 0 ? 180 : Math.min(index - 1, 2) * 70));
      }

      add(section.querySelector<HTMLElement>(":scope > .empty-state"), 160);
    }

    const pending = new Set<HTMLElement>();
    const hashTarget = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    const hashSection = hashTarget?.closest(".home-section");

    for (const { element, delay } of items) {
      const bounds = element.getBoundingClientRect();
      const visibleNow = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (visibleNow || element.contains(document.activeElement) || (hashSection && hashSection.contains(element))) continue;

      element.classList.add("home-reveal", "is-pending");
      element.style.setProperty("--home-reveal-delay", `${delay}ms`);
      pending.add(element);
    }

    if (!pending.size) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement, true);
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    function reveal(element: HTMLElement, animate: boolean) {
      if (!pending.delete(element)) return;
      observer.unobserve(element);
      element.classList.remove("is-pending");
      if (animate) element.classList.add("is-revealed");
    }

    function revealSection(section: Element | null | undefined) {
      if (!section) return;
      for (const { element } of items) {
        if (!section.contains(element)) continue;
        reveal(element, false);
        element.classList.remove("is-revealed");
      }
    }

    function revealHash() {
      const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
      revealSection(target?.closest(".home-section"));
    }

    function revealAnchorClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      revealSection(document.getElementById(url.hash.slice(1))?.closest(".home-section"));
    }

    function revealFocus(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>(".home-reveal");
      if (!element || !root?.contains(element)) return;
      reveal(element, false);
      element.classList.remove("is-revealed");
    }

    pending.forEach((element) => observer.observe(element));
    root.dataset.revealReady = "true";
    window.addEventListener("hashchange", revealHash);
    window.addEventListener("popstate", revealHash);
    document.addEventListener("click", revealAnchorClick, true);
    root.addEventListener("focusin", revealFocus);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", revealHash);
      window.removeEventListener("popstate", revealHash);
      document.removeEventListener("click", revealAnchorClick, true);
      root.removeEventListener("focusin", revealFocus);
      root.removeAttribute("data-reveal-ready");
      for (const { element } of items) {
        element.classList.remove("home-reveal", "is-pending", "is-revealed");
        element.style.removeProperty("--home-reveal-delay");
      }
    };
  }, []);

  return null;
}
