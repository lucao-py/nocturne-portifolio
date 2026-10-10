# Critérios de aceite — Checklist verificável do MVP

Não marcar itens como completos sem evidência (teste, captura de tela, logs ou validação manual documentada).

## AC-01 — Navegação pública

- [ ] `/`, `/projetos`, `/artigos`, `/sobre` carregam sem erro em produção.
- [ ] Pelo menos uma página `/projetos/[slug]` e uma `/artigos/[slug]` existem com dados **reais publicados**.
- [ ] O header e o footer permitem navegação coerente; 404 não retorna tela em branco.
- [ ] Todos os links para GitHub, demo, LinkedIn e e-mail abrem com destino válido (se configurados).

## AC-02 — CRUD: projetos

- [ ] Administrador autenticado cria projeto **pelo Studio** com capa, texto, categoria, tecnologias e slug.
- [ ] Projeto criado como rascunho não aparece na Home, listagem, sitemap ou URL pública.
- [ ] Após publicar, card e detalhe aparecem sem alterar código e sem novo deploy.
- [ ] Editar projeto e republicar atualiza o card e o detalhe.
- [ ] Despublicar remove o projeto do site; URL retorna 404 após invalidação/cache esperado.
- [ ] Excluir projeto pelo Studio (com confirmação) não causa erro público.

## AC-03 — CRUD: artigos

- [ ] Administrador cria artigo com headings, listas, link, imagem e bloco de código no Studio.
- [ ] Rascunho não é público; publicado aparece no índice, detalhe e Home quando recente.
- [ ] Código tem legibilidade, quebra/scroll horizontal segura no mobile.
- [ ] Editar, republicar, despublicar e excluir seguem o comportamento de projetos.
- [ ] Artigo com relação com projeto publicado apresenta link correto; relação com projeto despublicado não deixa link quebrado.

## AC-04 — Tempo de publicação

**Cenário:** com site em produção, modificar um título no Studio e publicar, sem tocar no GitHub ou Vercel.  
**Esperado:** atualizar na Home/listagem/detalhe (conforme aplicável) em **até 120 segundos sob condições normais**, ou registrar motivo, ajustar estratégia de cache e retestar antes de aceitar. Mesmo critério para despublicação.

## AC-05 — Experiência e identidade

- [ ] A Home apresenta azul noturno, ciano/luz fria e **vermelho neon**, com grafismos Art Déco discretos.
- [ ] Não há fotos, logotipos ou personagens do Batman em produção.
- [ ] Versões 360, 768 e 1440 px sem overflow horizontal relevante.
- [ ] Cards, menus, botões e textos têm estados de interação/foco adequados.
- [ ] `prefers-reduced-motion` reduz/remove efeitos decorativos.
- [ ] Contraste textual verificado para WCAG AA nas combinações reais.

## AC-06 — SEO e conteúdo

- [ ] `lang=pt-BR`, titles e descrições por rota.
- [ ] `/sitemap.xml` contém somente URLs publicadas.
- [ ] `/robots.txt` coerente; Studio e páginas privadas não são incluídos no sitemap.
- [ ] Compartilhamento social possui OG title, description e image (fallback quando não houver capa).
- [ ] Slug inexistente ou despublicado responde 404, não um artigo vazio.
- [ ] Não existem placeholders ou dados simulados não sinalizados em produção.

## AC-07 — Segurança

- [ ] `/studio` solicita autenticação para editar e não permite CRUD anônimo.
- [ ] Nenhum segredo no repo, payload público, bundle cliente ou variáveis `NEXT_PUBLIC_*`.
- [ ] Consultas públicas usam a perspectiva de conteúdo publicado.
- [ ] Rich text não permite script/HTML arbitrário sem sanitização.
- [ ] Referências visuais originais não estão no bundle/deploy ou repositório público.

## AC-08 — Qualidade técnica

- [ ] `lint`, `typecheck` e `build` passam no commit de release.
- [ ] Percurso de navegação por teclado completo, foco visível e imagens relevantes com texto alternativo.
- [ ] Lighthouse em páginas representativas, meta >=90 em Performance, Accessibility e SEO, com condições de teste relatadas; resultados abaixo da meta geram issue corretiva.
- [ ] 100 projetos de teste com paginação, sem carregar corpos completos na listagem nem layout quebrado.
- [ ] Instruções mínimas de desenvolvimento, deploy e restauração/export presentes.
- [ ] Custos, limites e elegibilidade da hospedagem revisados antes do deploy.

## Testes manuais recomendados

| ID | Passos | Evidência |
|---|---|---|
| T01 | Criar rascunho de projeto; visitar slug como anônimo | 404 / ausente |
| T02 | Publicar; aguardar até 120 s; acessar sem login | Card + detalhe visíveis |
| T03 | Editar título e republicar | Atualização sem deploy |
| T04 | Despublicar | Cards desaparecem; slug 404 |
| T05 | Criar artigo com Python, imagem e link | Formatação correta no mobile |
| T06 | Abrir menu e navegar só via teclado | Foco perceptível, sem bloqueios |
| T07 | Desativar animação no SO e visitar Home | Motion decorativo suprimido |
| T08 | Listar 100 projetos em teste | Paginação correta |
| T09 | Inspecionar rede/código cliente | Sem tokens secretos |

**Definição de pronto geral:** MVP publicado, critérios acima aprovados, com gestão de conteúdo independente do código e sem credenciais expostas.

