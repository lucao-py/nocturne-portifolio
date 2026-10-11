import "server-only";

import { createImageUrlBuilder } from "@sanity/image-url";
import type { PortableTextProps } from "@portabletext/react";
import type { Article, ContentBlock, ContentImage, Project, ProjectCategory } from "@/lib/content/types";
import { isValidExternalUrl } from "@/lib/content/urls";
import { getPublicSanityClient } from "./client";

type SanityImage = {
  _type?: string;
  _key?: string;
  alt?: string;
  caption?: string;
  crop?: { left: number; right: number; top: number; bottom: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  asset?: { _id?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
};

type SanityProject = {
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  technologies?: string[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  body?: Record<string, unknown>[];
  repositoryUrl?: string;
  demoUrl?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

type SanityArticle = {
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: SanityImage;
  body?: Record<string, unknown>[];
  tags?: string[];
  relatedProjectSlugs?: (string | null)[];
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type { SanityArticle, SanityProject };

const categories: readonly ProjectCategory[] = ["analytics", "data-engineering", "machine-learning", "ai"];

function category(value?: string): ProjectCategory | null {
  return categories.find((item) => item === value) ?? null;
}

function validSlug(value?: string): value is string {
  return Boolean(value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value));
}

function validDate(value?: string): string | undefined {
  return value && Number.isFinite(Date.parse(value)) ? value : undefined;
}

function strings(values?: unknown[]): string[] {
  return values?.filter((value): value is string => typeof value === "string" && value.trim().length > 0) ?? [];
}

function imageDimensions(image: SanityImage): { width: number; height: number } | undefined {
  const dimensions = image.asset?.metadata?.dimensions;
  const width = dimensions?.width;
  const height = dimensions?.height;
  if (!width || !height || width <= 0 || height <= 0) return undefined;

  const crop = image.crop;
  const croppedWidth = Math.max(1, width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0)));
  const croppedHeight = Math.max(1, height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0)));
  const scale = Math.min(1, 1600 / croppedWidth);
  return {
    width: Math.max(1, Math.round(croppedWidth * scale)),
    height: Math.max(1, Math.round(croppedHeight * scale)),
  };
}

export function mapImage(image?: SanityImage): ContentImage | undefined {
  if (!image?.asset?._id) return undefined;
  const src = createImageUrlBuilder(getPublicSanityClient())
    .image({ asset: { _id: image.asset._id }, crop: image.crop, hotspot: image.hotspot })
    .width(1600)
    .fit("max")
    .auto("format")
    .url();

  return {
    src,
    alt: image.alt ?? "",
    ...(image.caption ? { caption: image.caption } : {}),
    ...imageDimensions(image),
  };
}

function portableText(body?: Record<string, unknown>[]): ContentBlock[] {
  if (!Array.isArray(body) || !body.length) return [];
  const value = body.flatMap((block) => {
    if (!block || typeof block._type !== "string") return [];
    if (block._type !== "contentImage") return [block];
    const image = mapImage(block as SanityImage);
    return image ? [{ ...block, ...image }] : [];
  });

  return value.length
    ? [{ type: "portableText", value: value as NonNullable<PortableTextProps["value"]> }]
    : [];
}

export function mapProject(document: SanityProject, withBody = false): Project | null {
  const validCategory = category(document.category);
  if (!validSlug(document.slug) || !document.title || !validCategory) return null;

  return {
    slug: document.slug,
    title: document.title,
    excerpt: document.excerpt ?? "",
    category: validCategory,
    technologies: strings(document.technologies),
    coverImage: mapImage(document.coverImage),
    images: document.gallery?.flatMap((image) => mapImage(image) ?? []),
    overview: withBody ? portableText(document.body) : [],
    repositoryUrl: isValidExternalUrl(document.repositoryUrl) ? document.repositoryUrl : undefined,
    demoUrl: isValidExternalUrl(document.demoUrl) ? document.demoUrl : undefined,
    publishedAt: validDate(document.publishedAt),
    seoTitle: document.seoTitle,
    seoDescription: document.seoDescription,
  };
}

export function mapArticle(document: SanityArticle, withBody = false): Article | null {
  if (!validSlug(document.slug) || !document.title) return null;

  return {
    slug: document.slug,
    title: document.title,
    excerpt: document.excerpt ?? "",
    coverImage: mapImage(document.coverImage),
    publishedAt: validDate(document.publishedAt),
    tags: strings(document.tags),
    body: withBody ? portableText(document.body) : [],
    relatedProjectSlugs: strings(document.relatedProjectSlugs ?? []).filter(validSlug),
    seoTitle: document.seoTitle,
    seoDescription: document.seoDescription,
  };
}
