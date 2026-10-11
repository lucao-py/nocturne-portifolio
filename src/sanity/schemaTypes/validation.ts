export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
    .replace(/-+$/g, "");
}

export function isValidSlug(value?: string): boolean {
  return Boolean(value && value.length <= 96 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value));
}

export function hasDuplicateValues(values?: readonly unknown[]): boolean {
  if (!values) return false;
  const normalized = values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim().toLocaleLowerCase("pt-BR"));
  return new Set(normalized).size !== normalized.length;
}
