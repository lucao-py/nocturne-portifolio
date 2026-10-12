import Link from "next/link";

export function Pagination({ page, totalPages, basePath }: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Paginação">
      {page > 1 ? <Link className="action-link" href={page === 2 ? basePath : `${basePath}?page=${page - 1}`}>Anterior</Link> : <span />}
      <span>Página {page} de {totalPages}</span>
      {page < totalPages ? <Link className="action-link" href={`${basePath}?page=${page + 1}`}>Próxima</Link> : <span />}
    </nav>
  );
}
