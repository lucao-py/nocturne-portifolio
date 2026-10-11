"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export function createSanityConfig(projectId: string, dataset: string) {
  return defineConfig({
    name: "portfolio",
    title: "Portfólio Lucas de Oliveira Santos",
    projectId,
    dataset,
    basePath: "/studio",
    plugins: [
      structureTool({
        structure: (S) =>
          S.list()
            .title("Conteúdo")
            .items([
              S.documentTypeListItem("project").title("Projetos"),
              S.documentTypeListItem("article").title("Artigos"),
            ]),
      }),
    ],
    schema: { types: schemaTypes },
  });
}
