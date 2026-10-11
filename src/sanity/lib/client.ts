import "server-only";

import { createClient, type QueryParams } from "next-sanity";

// Uma única camada de cache: Next.js revalida após 60 s; o CDN de consultas do
// Sanity é ignorado para que uma resposta antiga não seja recacheada pelo Next.
export const CONTENT_REVALIDATE_SECONDS = 60;

function createPublicClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

  if (!projectId || !dataset) {
    throw new Error("Configuração pública do Sanity ausente.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-01",
    perspective: "published",
    useCdn: false,
  });
}

let client: ReturnType<typeof createPublicClient> | undefined;

export function getPublicSanityClient() {
  client ??= createPublicClient();
  return client;
}

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return getPublicSanityClient().fetch<T>(query, params, {
    perspective: "published",
    next: { revalidate: CONTENT_REVALIDATE_SECONDS },
  });
}
