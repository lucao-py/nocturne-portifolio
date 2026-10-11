import { defineArrayMember, defineField, defineType } from "sanity";
import { hasDuplicateValues, isValidSlug, slugify } from "./validation";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required().min(5).max(100),
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
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Análise de dados", value: "analytics" },
          { title: "Engenharia de dados", value: "data-engineering" },
          { title: "Machine Learning", value: "machine-learning" },
          { title: "Inteligência Artificial", value: "ai" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias",
      type: "array",
      of: [defineArrayMember({
        type: "string",
        validation: (rule) => rule.required().min(2).max(50),
      })],
      validation: (rule) => rule.required().min(1).custom((values) =>
        !hasDuplicateValues(values) ? true : "Remova tecnologias duplicadas."
      ),
    }),
    defineField({
      name: "body",
      title: "Descrição detalhada",
      description: "Apresente contexto, desafios, implementação e resultados verificados.",
      type: "portableText",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      description: "Opcional nesta etapa; informe texto alternativo ao adicionar uma imagem.",
      type: "contentImage",
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      of: [defineArrayMember({ type: "contentImage" })],
    }),
    defineField({
      name: "repositoryUrl",
      title: "URL do repositório",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "demoUrl",
      title: "URL da demonstração",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "featured",
      title: "Destacar na Home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "completedAt",
      title: "Data de conclusão",
      type: "date",
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
