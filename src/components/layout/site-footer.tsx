import { portfolioContent } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>{portfolioContent.ownerName}</span>
        <small>© {new Date().getFullYear()} {portfolioContent.ownerName}</small>
      </div>
    </footer>
  );
}
