import type { Article, Project } from "./types";

// Registros fictícios de interface. Substituir pelo conteúdo publicado do Sanity na Fase 3.
export const exampleProjects: Project[] = [
  {
    slug: "projeto-exemplo",
    title: "Projeto de exemplo",
    excerpt: "Registro fictício para validar cartões, navegação e a página de detalhe.",
    category: "analytics",
    technologies: ["Tecnologia A", "Tecnologia B"],
    isExample: true,
    overview: [
      { type: "paragraph", spans: [{ text: "[EXEMPLO: descrição detalhada do projeto.]" }] },
    ],
    challenges: [
      { type: "paragraph", spans: [{ text: "[EXEMPLO: desafios encontrados.]" }] },
    ],
    implementation: [
      { type: "paragraph", spans: [{ text: "[EXEMPLO: etapas de implementação.]" }] },
    ],
    results: [
      { type: "paragraph", spans: [{ text: "[EXEMPLO: resultados verificados.]" }] },
    ],
  },
];

export const exampleArticles: Article[] = [
  {
    slug: "artigo-exemplo",
    title: "Artigo de exemplo",
    excerpt: "Registro fictício para validar leitura, formatação e relações entre conteúdos.",
    tags: ["Tag de exemplo"],
    relatedProjectSlugs: ["projeto-exemplo"],
    isExample: true,
    body: [
      { type: "paragraph", spans: [{ text: "Este artigo é um exemplo de interface. Não representa uma publicação de Lucas de Oliveira Santos." }] },
      { type: "heading", level: 2, text: "Seção de exemplo" },
      { type: "paragraph", spans: [{ text: "A estrutura aceita parágrafos, listas, links, imagens e blocos de código." }] },
      { type: "list", ordered: false, items: ["Item de exemplo A", "Item de exemplo B"] },
      { type: "code", language: "javascript", code: "const exemplo = true;" },
      {
        type: "paragraph",
        spans: [
          { text: "Consulte o " },
          { text: "projeto de exemplo", href: "/projetos/projeto-exemplo" },
          { text: " associado a este registro." },
        ],
      },
    ],
  },
];
