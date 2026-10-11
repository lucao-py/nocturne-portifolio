export function isValidExternalUrl(value?: string): value is string {
  if (!value) return false;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidContentUrl(value?: string): value is string {
  return Boolean(value && ((value.startsWith("/") && !value.startsWith("//")) || isValidExternalUrl(value)));
}
