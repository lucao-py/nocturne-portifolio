const imageFields = `{
  alt,
  caption,
  crop,
  hotspot,
  asset->{_id, metadata{dimensions}}
}`;

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  technologies,
  publishedAt,
  repositoryUrl,
  demoUrl,
  "coverImage": coverImage${imageFields}
`;

const articleCardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  tags,
  "coverImage": coverImage${imageFields}
`;

// A perspectiva published é fixada no cliente. Filtros explícitos protegem
// também contra documentos de sistema e documentos sem URL pública.
export const projectCountQuery = `count(*[_type == "project" && defined(slug.current)])`;
export const articleCountQuery = `count(*[_type == "article" && defined(slug.current)])`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true && defined(slug.current)]
  | order(publishedAt desc, _createdAt desc, _id asc)[0...3]
  {${projectCardFields}}`;

export const recentArticlesQuery = `*[_type == "article" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc, _id asc)[0...3]
  {${articleCardFields}}`;

export const projectsPageQuery = `*[_type == "project" && defined(slug.current)]
  | order(publishedAt desc, _createdAt desc, _id asc)[$start...$end]
  {${projectCardFields}}`;

export const articlesPageQuery = `*[_type == "article" && defined(slug.current)]
  | order(publishedAt desc, _createdAt desc, _id asc)[$start...$end]
  {${articleCardFields}}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ${projectCardFields},
  body[]{..., "asset": asset->{_id, metadata{dimensions}}},
  "gallery": gallery[]${imageFields},
  seoTitle,
  seoDescription
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
  ${articleCardFields},
  body[]{..., "asset": asset->{_id, metadata{dimensions}}},
  "relatedProjectSlugs": relatedProjects[]->slug.current,
  seoTitle,
  seoDescription
}`;

export const articlesForProjectQuery = `*[
  _type == "article" && defined(slug.current) && $slug in relatedProjects[]->slug.current
] | order(publishedAt desc, _createdAt desc, _id asc) {${articleCardFields}}`;

export const projectsForArticleQuery = `*[
  _type == "project" && defined(slug.current) && slug.current in $slugs
] | order(publishedAt desc, _createdAt desc, _id asc) {${projectCardFields}}`;
