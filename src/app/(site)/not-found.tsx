import Link from "next/link";

export default function NotFound() {
  return (
    <div className="content-page">
      <div className="empty-state">
        <h1>Página não encontrada</h1>
        <p>O endereço solicitado não corresponde a um conteúdo disponível.</p>
        <Link className="action-link" href="/">Voltar à Home</Link>
      </div>
    </div>
  );
}
