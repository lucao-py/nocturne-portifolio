"use client";

export function ContentLoadError({ reset }: { reset: () => void }) {
  return (
    <div className="content-page">
      <div className="empty-state" role="alert">
        <h1>Conteúdo temporariamente indisponível</h1>
        <p>Não foi possível carregar os registros agora. Tente novamente em instantes.</p>
        <button type="button" onClick={reset} className="site-action site-action--secondary">
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
