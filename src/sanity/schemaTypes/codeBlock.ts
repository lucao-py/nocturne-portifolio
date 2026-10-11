import { defineField, defineType } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Bloco de código",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Linguagem",
      description: "Identificador curto, por exemplo: python, sql, bash ou json.",
      type: "string",
      validation: (rule) => rule.required().custom((value) =>
        !value || /^[a-z0-9+#.-]{1,30}$/i.test(value)
          ? true
          : "Use um identificador curto, sem espaços."
      ),
    }),
    defineField({
      name: "code",
      title: "Código",
      type: "text",
      rows: 12,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { language: "language", code: "code" },
    prepare: ({ language, code }) => ({
      title: language ? `Código: ${language}` : "Bloco de código",
      subtitle: typeof code === "string" ? code.slice(0, 80) : undefined,
    }),
  },
});
