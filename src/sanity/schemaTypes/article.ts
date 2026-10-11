import { defineArrayMember, defineField, defineType } from "sanity";
import { hasDuplicateValues, isValidSlug, slugify } from "./validation";

export const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Identificador da URL. Alterações após a publicação exigirão um redirecionamento.",
      type: "slug",
      options: { source: "title", slugify },
      validation: (rule) => rule.required().custom((value) =>
        !value?.current || isValidSlug(value.current)
          ? true
          : "Use até 96 caracteres minúsculos, números e hífens, sem hífens nas extremidades."
      ),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "portableText",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "contentImage",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({
        type: "string",
        validation: (rule) => rule.required().min(2).max(40),
      })],
      validation: (rule) => rule.max(8).custom((values) =>
        !hasDuplicateValues(values) ? true : "Remova tags duplicadas."
      ),
    }),
    defineField({
      name: "relatedProjects",
      title: "Projetos relacionados",
      description: "Referências fortes: remova a associação antes de excluir um projeto.",
      type: "array",
      of: [defineArrayMember({
        type: "reference",
        to: [{ type: "project" }],
        options: { disableNew: true },
      })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      description: "Preencha antes de publicar. O rascunho pode ser salvo sem esta data.",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Título para busca",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Descrição para busca",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
