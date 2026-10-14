import Link from "next/link";

export function EditorialReturnLink({ section }: { section: "artigos" | "projetos" }) {
  return (
    <Link className="site-action site-action--primary editorial-shell__return" href={section === "projetos" ? "/#inicio" : "/#artigos"}>Voltar à Home</Link>
  );
}
