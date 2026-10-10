# Content Model — Contrato editorial para Sanity

## 1. Conceitos

Dois tipos principais de documento (`project`, `article`) e um documento `siteSettings` para textos globais. Não criar tabela SQL nem API CRUD customizada: tudo persiste no **Sanity Content Lake** e é editado no **Sanity Studio**.

Nomes de tipos/campos **preferencialmente em inglês no código**, títulos e descrições em pt-BR no CMS.

Sanity já distingue rascunhos e publicados. **Não** inventar um campo `status` concorrente com o workflow nativo de publicação; se surgir necessidade de arquivamento editorial, avaliar em ADR posterior.

## 2. Schema `project`

| Campo | Tipo Sanity | Obrigatório | Validação/uso |
|---|---|---|---|
| `title` | `string` | Sim | 5–100 caracteres |
| `slug` | `slug` | Sim | A partir de `title`, único dentro de `project` |
| `excerpt` | `text` | Sim | Até 240 caracteres para cards e SEO fallback |
| `coverImage` | `image` + `alt` | Sim | Upload; texto alternativo obrigatório para conteúdo informativo |
| `category` | `string` com lista | Sim | `analytics`, `data-engineering`, `machine-learning`, `ai` |
| `technologies` | `array` de strings | Sim | Ao menos 1 tecnologia; remover duplicatas |
| `body` | Portable Text | Sim | Problema, abordagem, visualizações, resultados; headings, links e imagens |
| `repositoryUrl` | `url` | Não | HTTPS; GitHub esperado, mas sem hardcode |
| `demoUrl` | `url` | Não | HTTPS, aplicação publicada quando existir |
| `featured` | `boolean` | Não | Default `false`; Home mostra até 3 destacados |
| `completedAt` | `date` | Não | Data aproximada de conclusão |
| `publishedAt` | `datetime` | Sim ao publicar | Data editorial de exibição; edição não muda automaticamente |
| `seoTitle` | `string` | Não | Sobrescreve title em metadata |
| `seoDescription` | `text` | Não | Até ~160 caracteres |

**Regras:** `slug` imutável após publicação por padrão (se editar, planejar redirect). A página de projeto mostra links apenas se informados e válidos. A Home pode escolher os 3 primeiros projetos `featured`, em ordem `publishedAt desc`, com fallback para os últimos publicados caso não haja suficientes. `completedAt` não é a data de publicação.

## 3. Schema `article`

| Campo | Tipo Sanity | Obrigatório | Validação/uso |
|---|---|---|---|
| `title` | `string` | Sim | 5–120 caracteres |
| `slug` | `slug` | Sim | Único dentro de `article` |
| `excerpt` | `text` | Sim | Até 240 caracteres |
| `coverImage` | `image` + `alt` | Não | Placeholder visual coerente se ausente |
| `body` | Portable Text | Sim | Cabeçalhos, listas, links, citações, imagens e blocos de código |
| `tags` | `array` de strings | Não | Até 8, sem duplicações por caixa |
| `relatedProjects` | `array` de `reference` para `project` | Não | Apenas projeto(s) existentes; links visíveis quando publicados |
| `publishedAt` | `datetime` | Sim ao publicar | Ordenação editorial |
| `seoTitle` | `string` | Não | Title alternativo |
| `seoDescription` | `text` | Não | Até ~160 caracteres |

### Rich text

O editor precisa suportar:

- Parágrafo, H2, H3, ênfase, negrito, links com validação básica.
- Listas numeradas e não numeradas.
- Citações (blockquote).
- Imagem inline com `alt` e `caption` opcionais de acordo com contexto, *alt* obrigatório quando a imagem transmite informação.
- **Bloco de código** com linguagem (ex.: python, sql, bash, json) e conteúdo textual, renderizado com `pre/code` e rolagem horizontal na tela pequena. Usar schema/plugin simples e mantido, não construir editor customizado.
- Link interno para projeto relacionado via campo `relatedProjects`; não precisa renderizar conteúdo dos projetos dentro do artigo.

**Não** habilitar HTML livre ou scripts no conteúdo.

## 4. Schema `siteSettings` (singleton)

| Campo | Tipo | Obrigatório | Exemplo |
|---|---|---|---|
| `siteTitle` | string | Sim | NOCTURNE (provisório) |
| `headline` | string | Sim | Construindo inteligência a partir de dados |
| `intro` | text | Sim | Pequeno texto de apresentação |
| `about` | Portable Text simples | Sim | Biografia e áreas de atuação |
| `contactEmail` | string | Não | E-mail profissional público |
| `githubUrl` | url | Não | Perfil GitHub |
| `linkedinUrl` | url | Não | Perfil LinkedIn |
| `seoDescription` | text | Não | Descrição global |
| `socialImage` | image | Não | Open Graph própria/autoral |

Não permitir múltiplos documentos `siteSettings`. Configuração inicial precisa de fallback seguro se singleton ainda não existir.

## 5. Publicação e permissões

- **Rascunhos:** ficam somente no Studio; visitantes nunca recebem campos não publicados.
- **Publicar:** Sanity oferece operação nativa; exigir title, slug, body e demais campos definidos para publicar. Validar data `publishedAt` — a experiência do Studio deve preenchê-la quando apropriado ou exigir preenchimento antes de publicar, sem quebrar fluxo.
- **Editar:** atualizar documento; se estiver publicado, alteração segue comportamento nativo de rascunho até republicação, conforme configurações do Sanity.
- **Despublicar:** remover versão publicada mantendo rascunho quando possível; página pública deixa de responder com conteúdo.
- **Excluir:** procedimento seguro do Studio com confirmação, respeitando referências e estado de publicação.
- **Imagens:** textos alternativos descritivos e dimensões otimizadas; crédito/licença quando necessário.

## 6. Relacionamentos

- `article.relatedProjects[] -> project`.
- Em `/projetos/[slug]`, buscar artigos publicados cujo `relatedProjects` contém o projeto.
- Em `/artigos/[slug]`, listar projetos relacionados **apenas se publicados**.
- Evitar dependências circulares nas projeções GROQ. Relação única no artigo é suficiente.

## 7. Consultas e ordenação (contrato)

- Listagem de projetos: publicados, `defined(slug.current)`, ordenados por `publishedAt desc`, paginação.
- Listagem de artigos: publicados, mesmo filtro e ordenação.
- Detalhes por slug: um único documento do tipo esperado; `notFound()` se ausente/despublicado.
- Home: 3 projetos destacados (com fallback documentado) + 3 artigos mais recentes.
- Consultas e metadata **não** retornam rascunhos para usuários públicos.

## 8. Slugs e URLs

Rotas possuem prefixos independentes, portanto mesmo slug pode existir em `project` e `article` sem colisão: `/projetos/analise-airbnb` e `/artigos/analise-airbnb`. Slugs em minúsculas ASCII, hífens, sem acentos nem espaços. Mudança após publicação é uma operação excepcional, requer redirect/avaliação de SEO.

## 9. Exemplos de documentos **fictícios**

```json
{
  "_type": "project",
  "title": "Análise Exploratória de Airbnb no Rio",
  "slug": { "current": "airbnb-rio" },
  "excerpt": "Exemplo de resumo para validar um card do portfólio.",
  "category": "analytics",
  "technologies": ["Python", "Pandas", "Streamlit"],
  "featured": true
}
```

**Importante:** snippet deliberadamente parcial, **não** pronto para ingestão/publicação — `body`, capa e demais obrigatórios devem ser preenchidos. Não inferir métricas, histórias ou resultados reais a partir do título.

## 10. Casos que o Codex deve validar

- Rascunho isolado de visitante e de metadata/sitemap.
- Title/slug inválidos bloqueados na publicação; links inválidos recebem feedback.
- URLs com caracteres especiais, normalização/duplicatas de slugs.
- Conteúdo com imagem, código e referências renderiza em mobile.
- Sem capa de artigo, UI tem fallback; sem capa de projeto, validação impede publicação.
- Artigo vinculado a projeto despublicado não exibe link quebrado.
- 100 projetos em dataset de teste não causam listagem excessivamente pesada.

