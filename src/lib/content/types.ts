import type { PortableTextProps } from "@portabletext/react";

export type ContentImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type TextSpan = {
  text: string;
  href?: string;
  strong?: boolean;
  emphasis?: boolean;
};

export type ContentBlock =
  | { type: "paragraph"; spans: TextSpan[] }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "image"; image: ContentImage }
  | { type: "portableText"; value: NonNullable<PortableTextProps["value"]> };

export type ProjectCategory = "analytics" | "data-engineering" | "machine-learning" | "ai";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  analytics: "Análise de dados",
  "data-engineering": "Engenharia de dados",
  "machine-learning": "Machine Learning",
  ai: "Inteligência Artificial",
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  category: ProjectCategory;
  technologies: string[];
  coverImage?: ContentImage;
  images?: ContentImage[];
  overview: ContentBlock[];
  challenges?: ContentBlock[];
  implementation?: ContentBlock[];
  results?: ContentBlock[];
  repositoryUrl?: string;
  demoUrl?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  isExample?: boolean;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: ContentImage;
  publishedAt?: string;
  tags?: string[];
  body: ContentBlock[];
  relatedProjectSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  isExample?: boolean;
};

export type PageResult<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
};
