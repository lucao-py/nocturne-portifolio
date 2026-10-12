import { Pixelify_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "@/styles/site.css";
import "@/styles/content.css";
import "@/styles/home.css";
import "@/styles/editorial.css";
import "@/styles/article.css";
import "@/styles/project-case.css";
import "@/styles/actions.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-pixelify",
  display: "swap",
});

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`site-shell ${pixelify.variable}`}>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </div>
  );
}
