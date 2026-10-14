"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { portfolioContent } from "@/content/portfolio";

const sectionIds = ["inicio", "artigos", "sobre"] as const;

export function SiteHeader() {
  const { ownerName, navigation } = portfolioContent;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeHash, setActiveHash] = useState("#inicio");
  const items = [
    { id: "inicio", label: navigation.home },
    { id: "artigos", label: navigation.articles },
    { id: "sobre", label: navigation.about },
  ];

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash;
      setActiveHash(sectionIds.some((id) => `#${id}` === hash) ? hash : "#inicio");
    };

    window.addEventListener("hashchange", syncHash);
    const frame = requestAnimationFrame(syncHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target.id);
        else visibleSections.delete(entry.target.id);
      }

      const current = [...sectionIds].reverse().find((id) => visibleSections.has(id));
      if (current) setActiveHash(`#${current}`);
    }, { rootMargin: "-132px 0px -50% 0px" });

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    let anchorScrolling = false;
    let resetTimer = 0;
    let restoreTimer = 0;
    let previousBehavior = "";

    function disarm() {
      anchorScrolling = false;
      window.clearTimeout(resetTimer);
      window.removeEventListener("wheel", onWheel);
    }

    function freezeAt(top: number) {
      const root = document.documentElement;
      previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top, behavior: "instant" });
      restoreTimer = window.setTimeout(() => {
        root.style.scrollBehavior = previousBehavior;
        restoreTimer = 0;
      }, 120);
    }

    function arm() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (restoreTimer) {
        window.clearTimeout(restoreTimer);
        document.documentElement.style.scrollBehavior = previousBehavior;
        restoreTimer = 0;
      }
      anchorScrolling = true;
      window.clearTimeout(resetTimer);
      window.addEventListener("wheel", onWheel, { passive: false });
      resetTimer = window.setTimeout(disarm, 1600);
    }

    function onAnchorClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor && sectionIds.some((id) => anchor.hash === `#${id}`)) arm();
    }

    function interrupt() {
      if (!anchorScrolling) return;
      const top = window.scrollY;
      disarm();
      freezeAt(top);
    }

    function onWheel(event: WheelEvent) {
      if (!anchorScrolling) return;
      event.preventDefault();
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const top = window.scrollY + event.deltaY * unit;
      disarm();
      freezeAt(top);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) interrupt();
    }

    if (sectionIds.some((id) => location.hash === `#${id}`)) arm();
    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scrollend", interrupt);

    return () => {
      disarm();
      window.clearTimeout(restoreTimer);
      if (restoreTimer) document.documentElement.style.scrollBehavior = previousBehavior;
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scrollend", interrupt);
    };
  }, [isHome]);

  function navClass(active: boolean) {
    return active ? "site-nav__link site-nav__link--current" : "site-nav__link";
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {isHome ? (
          <a className="site-brand" href="#inicio" aria-label={ownerName + " — início"}>
            <span className="site-brand__rule" aria-hidden="true" />
            <span className="site-brand__name">{ownerName}</span>
          </a>
        ) : (
          <Link className="site-brand" href="/#inicio" aria-label={ownerName + " — início"}>
            <span className="site-brand__rule" aria-hidden="true" />
            <span className="site-brand__name">{ownerName}</span>
          </Link>
        )}

        <nav aria-label="Navegação principal" className="site-nav">
          <ul className="site-nav__list">
            {items.map(({ id, label }) => {
              const hash = `#${id}`;
              const active = isHome && activeHash === hash;
              return (
                <li key={id}>
                  {isHome ? (
                    <a
                      aria-current={active ? "location" : undefined}
                      className={navClass(active)}
                      href={hash}
                      onClick={() => setActiveHash(hash)}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link className={navClass(false)} href={`/${hash}`}>{label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
