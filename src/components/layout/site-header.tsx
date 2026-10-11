"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioContent } from "@/content/portfolio";

export function SiteHeader() {
  const { ownerName, navigation } = portfolioContent;
  const pathname = usePathname();

  function navClass(active: boolean) {
    return active ? "site-nav__link site-nav__link--current" : "site-nav__link";
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href="/" aria-label={ownerName + " — início"}>
          <span className="site-brand__rule" aria-hidden="true" />
          <span className="site-brand__name">{ownerName}</span>
        </Link>

        <nav aria-label="Navegação principal" className="site-nav">
          <ul className="site-nav__list">
            <li><Link aria-current={pathname === "/" ? "page" : undefined} className={navClass(pathname === "/")} href="/">{navigation.home}</Link></li>
            <li><Link aria-current={pathname.startsWith("/projetos") ? "page" : undefined} className={navClass(pathname.startsWith("/projetos"))} href="/projetos">{navigation.projects}</Link></li>
            <li><Link aria-current={pathname.startsWith("/artigos") ? "page" : undefined} className={navClass(pathname.startsWith("/artigos"))} href="/artigos">{navigation.articles}</Link></li>
            <li>
              <span className="site-nav__link site-nav__link--pending" aria-disabled="true">
                <span>{navigation.about}</span>
                <small>{navigation.pending}</small>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
