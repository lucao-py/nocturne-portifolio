# Roadmap — Evolução por entregas verticais

**Princípio:** cada etapa termina com um resultado executável e verificável. O Codex **não** deve desenvolver todas as etapas em um único pedido.

## Fase 0 — Decisões e documentação (agora)

**Entregáveis:** `AGENTS.md`, PRD, Design System, Architecture, Content Model, Roadmap, Acceptance Criteria, Decisions, References.  
**Validação:** documentos não se contradizem, stack definida, nome tratado como provisório, referências são apenas uso privado.

## Fase 1 — Fundação técnica

**Objetivo:** projeto rodando localmente.

**Tarefas:** inicializar Next.js App Router + TS + Tailwind; conferir versões Node e pacotes; scripts lint/typecheck/build; organizar pasta `src`, layout, tokens CSS, fontes e README. Configurar `.env.example`, `.gitignore`, deploy-preview opcional.

**Critério de saída:** `npm run dev` abre home provisória; build/lint/typecheck passam; nenhuma credencial em Git; portfólio ainda não precisa de CMS.

## Fase 2 — Identidade visual e páginas com fixtures

**Objetivo:** validar a direção noir antes das integrações.

**Tarefas:** Header/Footer, Hero, ProjectCard, ArticleCard, SectionHeading, DetailPage, ArticleBody; Home, Projetos, Detalhe de projeto, Artigos, Detalhe de artigo e Sobre usando dados de teste isolados; 404, estados de vazio; responsive; CSS tokens; a11y; motion reduzido.

**Critério de saída:** design é coerente com `DESIGN_SYSTEM.md`, navegação funciona em 360/768/1440 px, content placeholders facilmente trocáveis por consultas, assets só próprios/livres.

## Fase 3 — Sanity e CRUD editorial

**Objetivo:** substituir fixtures por documentos do CMS.

**Tarefas:** configurar projeto/dataset Sanity, Studio em `/studio`, schemas (`project`, `article`, `siteSettings`), validações, editor Portable Text/código/imagem; consultas GROQ; listagens/detalhes/Home/metadata alimentadas por dados publicados; cache/invalidação com prazo de atualização testável; controle de edição via login Sanity.

**Critério de saída:** criar, publicar, atualizar, despublicar e excluir projeto/artigo **somente pelo Studio**; mudanças refletidas no site sem commit/deploy; drafts não aparecem; links não quebram.

## Fase 4 — Confiabilidade e deploy

**Objetivo:** colocar no ar com qualidade e segurança.

**Tarefas:** sitemap, robots, metadados e OG, otimização de imagens, testagem dos principais fluxos, verificação a11y, Lighthouse, deploy Vercel (ou hospedagem aprovada), domínio opcional, check de segredos, instruções de export de dados.

**Critério de saída:** site HTTPS público, CMS com edição autenticada, conteúdo correto, critérios de aceite aprovados, custos/termos de hospedagem analisados.

## Fase 5 — Lançamento editorial

**Objetivo:** substituir placeholders por conteúdo profissional.

**Tarefas:** bio/links oficiais, capas originais, pelo menos 3 projetos e 1 artigo, revisão ortográfica e factual, teste completo como visitante externo, compartilhar o portfólio.

**Critério de saída:** sem conteúdo fictício em produção; URLs públicas compartilháveis; processo editorial documentado.

## Pós-MVP — Backlog explícito

- Pré-visualização de rascunhos no frontend com Draft Mode e Visual Editing, se fizer diferença editorial.
- Busca e filtros avançados.
- Newsletter, comentários, i18n, analytics e dashboards internos.
- Migração para domínio definitivo.
- Refinamentos de animação e narrativa visual, sempre preservando desempenho.

## Regras de corte

Se o prazo apertar, **preservar** CRUD editorial, páginas fundamentais, publicação sem código, SEO essencial e segurança. Cortar primeiro efeitos especiais, galeria ampliada, componentes exóticos e animações.

## Registro de trabalho

Ao final de cada fase, incluir em PR/commit ou notas de entrega: escopo realizado, telas e rotas, comandos de validação executados e riscos/pendências.

