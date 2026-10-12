import Link from "next/link";

export function EmptyState({ title, description, href, linkLabel }: {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      <p>{description}</p>
      {href && linkLabel ? <Link className="action-link" href={href}>{linkLabel}</Link> : null}
    </div>
  );
}
