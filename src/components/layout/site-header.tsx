"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { portfolioContent } from "@/content/portfolio";

const sectionIds = ["inicio", "projetos", "artigos", "sobre"] as const;

export function SiteHeader() {
  const { ownerName, navigation } = portfolioContent;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeHash, setActiveHash] = useState("#inicio");
  const items = [
    { id: "inicio", label: navigation.home },
    { id: "projetos", label: navigation.projects },
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

  function navClass(active: boolean) {
    return active ? "site-nav__link site-nav__link--current" : "site-nav__link";
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href={isHome ? "#inicio" : "/#inicio"} aria-label={ownerName + " — início"}>
          <span className="site-brand__rule" aria-hidden="true" />
          <span className="site-brand__name">{ownerName}</span>
        </Link>

        <nav aria-label="Navegação principal" className="site-nav">
          <ul className="site-nav__list">
            {items.map(({ id, label }) => {
              const hash = `#${id}`;
              const active = isHome && activeHash === hash;
              return (
                <li key={id}>
                  <Link
                    aria-current={active ? "location" : undefined}
                    className={navClass(active)}
                    href={isHome ? hash : `/${hash}`}
                    onClick={() => setActiveHash(hash)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
