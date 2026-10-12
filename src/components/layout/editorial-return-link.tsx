import Link from "next/link";

export function EditorialReturnLink({ section }: { section: "artigos" | "projetos" }) {
  return (
    <Link className="site-action site-action--primary editorial-shell__return" href={`/#${section}`}>Voltar à Home</Link>
  );
}
