import "server-only";

import { sanityFetch } from "@/sanity/lib/client";
import { mapArticle, mapProject, type SanityArticle, type SanityProject } from "@/sanity/lib/mappers";
import {
  articleBySlugQuery,
  articleCountQuery,
  articlesForProjectQuery,
  articlesPageQuery,
  projectBySlugQuery,
  projectCountQuery,
  projectsForArticleQuery,
  projectsPageQuery,
} from "@/sanity/lib/queries";
import type { Article, PageResult, Project } from "./types";

const PROJECTS_PER_PAGE = 9;
const ARTICLES_PER_PAGE = 8;

export function parsePage(value?: string | string[]): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

function pageResult<T>(items: T[], page: number, totalItems: number, pageSize: number): PageResult<T> {
  return {
    items,
    page,
    totalPages: Math.max(1, Math.ceil(totalItems / pageSize)),
    totalItems,
  };
}

function pageRange(page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return { start, end: start + pageSize - 1 };
}

export async function listProjects(page = 1): Promise<PageResult<Project>> {
  const [totalItems, documents] = await Promise.all([
    sanityFetch<number>(projectCountQuery),
    sanityFetch<SanityProject[]>(projectsPageQuery, pageRange(page, PROJECTS_PER_PAGE)),
  ]);
  return pageResult(documents.flatMap((document) => mapProject(document) ?? []), page, totalItems, PROJECTS_PER_PAGE);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const document = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug });
  return document ? mapProject(document, true) : null;
}

export async function listArticles(page = 1): Promise<PageResult<Article>> {
  const [totalItems, documents] = await Promise.all([
    sanityFetch<number>(articleCountQuery),
    sanityFetch<SanityArticle[]>(articlesPageQuery, pageRange(page, ARTICLES_PER_PAGE)),
  ]);
  return pageResult(documents.flatMap((document) => mapArticle(document) ?? []), page, totalItems, ARTICLES_PER_PAGE);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const document = await sanityFetch<SanityArticle | null>(articleBySlugQuery, { slug });
  return document ? mapArticle(document, true) : null;
}

export async function getArticlesForProject(slug: string): Promise<Article[]> {
  const documents = await sanityFetch<SanityArticle[]>(articlesForProjectQuery, { slug });
  return documents.flatMap((document) => mapArticle(document) ?? []);
}

export async function getProjectsForArticle(slugs: readonly string[]): Promise<Project[]> {
  if (!slugs.length) return [];
  const documents = await sanityFetch<SanityProject[]>(projectsForArticleQuery, { slugs: [...slugs] });
  return documents.flatMap((document) => mapProject(document) ?? []);
}
