import { defineField, defineType } from "sanity";

export const contentImage = defineType({
  name: "contentImage",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      description: "Descreva a informação presente na imagem.",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "caption",
      title: "Legenda",
      type: "string",
      validation: (rule) => rule.max(240),
    }),
  ],
});
