import { exampleArticles, exampleProjects } from "./fixtures";
import type { Article, PageResult, Project } from "./types";

const PROJECTS_PER_PAGE = 9;
const ARTICLES_PER_PAGE = 8;

export function parsePage(value?: string | string[]): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

function paginate<T>(items: readonly T[], page: number, pageSize: number): PageResult<T> {
  const offset = (page - 1) * pageSize;
  return {
    items: items.slice(offset, offset + pageSize),
    page,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    totalItems: items.length,
  };
}

// Este módulo é o único ponto de leitura; a Fase 3 substituirá as fixtures por consultas publicadas.
export async function listProjects(page = 1): Promise<PageResult<Project>> {
  return paginate(exampleProjects, page, PROJECTS_PER_PAGE);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return exampleProjects.find((project) => project.slug === slug) ?? null;
}

export async function listArticles(page = 1): Promise<PageResult<Article>> {
  return paginate(exampleArticles, page, ARTICLES_PER_PAGE);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return exampleArticles.find((article) => article.slug === slug) ?? null;
}

export async function getArticlesForProject(slug: string): Promise<Article[]> {
  return exampleArticles.filter((article) => article.relatedProjectSlugs?.includes(slug));
}

export async function getProjectsForArticle(slugs: readonly string[]): Promise<Project[]> {
  return exampleProjects.filter((project) => slugs.includes(project.slug));
}
