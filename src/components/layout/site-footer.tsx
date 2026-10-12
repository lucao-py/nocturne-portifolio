import { portfolioContent } from "@/content/portfolio";

export function SiteFooter() {
  const { contact, ownerName } = portfolioContent;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__contact">
          <div className="site-footer__copy">
            <h2>{contact.title}</h2>
            <p>{contact.description}</p>
          </div>
          <a className="site-action site-action--primary site-footer__email" href={`mailto:${contact.email}`} aria-label={`Enviar e-mail para ${contact.email}`}>Enviar e-mail</a>
        </div>
        <small>© {new Date().getFullYear()} {ownerName}</small>
      </div>
    </footer>
  );
}
