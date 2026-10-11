export function TagList({ items, label }: { items?: readonly string[]; label: string }) {
  if (!items?.length) return null;

  return (
    <ul className="tag-list" aria-label={label}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
