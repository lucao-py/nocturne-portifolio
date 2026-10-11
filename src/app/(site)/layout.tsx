import { SiteHeader } from "@/components/layout/site-header";
import "@/styles/site.css";
import "@/styles/content.css";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="conteudo">{children}</main>
    </div>
  );
}
