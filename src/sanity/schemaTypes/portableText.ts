import { defineArrayMember, defineField, defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Conteúdo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Parágrafo", value: "normal" },
        { title: "Título de seção", value: "h2" },
        { title: "Subtítulo", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista com marcadores", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            name: "externalLink",
            title: "Link externo",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) => rule.required().uri({ scheme: ["https"], allowRelative: false }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "contentImage" }),
    defineArrayMember({ type: "codeBlock" }),
  ],
});
