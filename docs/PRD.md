Produto: NOCTURNE (nome provisório)
Versão: 0.1 — especificação do MVP
Responsável: proprietário do portfólio
Público: recrutadores, profissionais de tecnologia e dados, colegas e leitores técnicos
Idioma: português brasileiro
1. Problema
O proprietário precisa de um lugar autoral para apresentar projetos de dados/IA e publicar artigos sem editar o código nem depender do Codex em cada publicação. Soluções convencionais de portfólio são visualmente genéricas; manter textos diretamente no repositório gera fricção editorial.
2. Proposta de valor
Um portfólio com identidade visual cinematográfica Gotham Noir / Art Déco, rápido e legível, com gerenciamento editorial próprio pelo navegador, onde projetos e artigos se conectam.
3. Objetivos do MVP
1. Apresentar competências técnicas por meio de projetos reais e estudos de caso.
2. Publicar, atualizar e despublicar artigos e projetos pela interface do CMS.
3. Oferecer navegação agradável em celular, tablet e desktop.
4. Garantir links para código-fonte, demos e contatos profissionais.
5. Suportar funcionalmente 100 projetos sem revisão de arquitetura (paginação quando necessária).
6. Manter infraestrutura e manutenção simples, de preferência em plano gratuito elegível.
4. Perfis e permissões
Perfil	Pode	Não pode
Visitante anônimo	Navegar e ler conteúdo publicado; abrir links externos	Ler rascunhos; escrever, editar ou excluir conteúdo
Administrador (único editor)	Entrar no Sanity Studio e gerenciar projetos/artigos, imagens e configurações editoriais	Publicar tokens/senhas em páginas públicas


Observação: autenticação e interface de gerenciamento serão fornecidas pelo Sanity Studio, não por um sistema customizado.
5. Mapa de rotas (contrato do MVP)
Rota	Responsabilidade
/	Hero pessoal, mini-bio, tecnologias/áreas, 3 projetos destacados, 3 artigos recentes, CTAs
/projetos	Lista de projetos publicados, paginação simples se necessário
/projetos/[slug]	Detalhe: problema, abordagem, tecnologias, resultados, imagens, links
/artigos	Lista de artigos publicados por data decrescente
/artigos/[slug]	Artigo com formatação, imagens, links e blocos de código
/sobre	Biografia, atuação, interesses e links profissionais
/studio	Sanity Studio embutido, acesso editorial autenticado
not-found	404 coerente com identidade visual


6. Requisitos funcionais
RF-01 — Projetos: cadastro com título, resumo, descrição detalhada, slug, imagem de capa, tecnologias, categoria, links opcionais para repositório e demo, flag de destaque, data e SEO básico. Exibir card e detalhe.
RF-02 — Artigos: cadastro com título, resumo, slug, capa opcional, data, tags, corpo rich text com headings, listas, links, imagens com alt e blocos de código; associação opcional a projetos.
RF-03 — CRUD: administrador pode criar, visualizar no Studio, editar, publicar, despublicar e excluir registros sem alterar o repositório. Exclusões com confirmação oferecida pelo CMS.
RF-04 — Publicação: rascunhos permanecem invisíveis a visitantes. Alterações publicadas devem aparecer no site sem commit nem novo deploy; mecanismo e atraso máximo precisam ser documentados.
RF-05 — Relacionamentos: página do projeto mostra artigos vinculados quando existirem; artigo pode apontar para projeto relacionado.
RF-06 — Navegação: menu principal, rodapé, breadcrumbs ou retorno contextual em páginas de detalhe; links externos indicados claramente.
RF-07 — Responsividade: layouts úteis em 360 px, 768 px e 1440 px, sem rolagem horizontal involuntária.
RF-08 — SEO: metatítulos, descrições, imagem social padrão, URLs amigáveis, canonical quando pertinente, sitemap e robots.
RF-09 — Estados: páginas vazias, imagem ausente, URL inválida, erro de carregamento e conteúdo indisponível têm tratamento apropriado.
7. Requisitos não funcionais
- Acessibilidade: WCAG 2.2 AA como meta para contraste, foco, teclado e conteúdo; respeitar preferência por redução de movimento.
- Desempenho: visar Lighthouse >= 90 em Performance, Accessibility e SEO em páginas representativas (medição e ambiente registrados); evitar vídeo pesado em background no MVP.
- Segurança: nenhum token secreto no cliente; permissão de edição por login Sanity; páginas públicas apenas com dados publicados.
- Qualidade: lint, types, build e testes de fluxos críticos.
- Disponibilidade: depende dos provedores SaaS; documentar tratamento de falhas e backups periódicos.
- Custos: monitorar limites de plano; não prometer custo zero perpetuamente.
8. Jornada principal
1. Proprietário entra em /studio autenticando-se pela conta Sanity.
2. Escolhe Projeto ou Artigo e cria rascunho com campos obrigatórios.
3. Visualiza os dados no editor, revisa e publica.
4. Visitante navega por /projetos ou /artigos e acessa o conteúdo.
5. Proprietário corrige um texto e republica sem mexer em código.
6. Proprietário despublica conteúdo e ele deixa de aparecer em listagens e URL pública (404 ou comportamento explicitamente definido).
9. Conteúdo inicial sugerido (a validar)
- Projeto de análise de Airbnb no Rio de Janeiro (aplicação Streamlit, se material estiver pronto).
- Projeto de análise de confiança em IA (se conteúdo estiver pronto e revisado).
- Projeto de detecção de fraude com Machine Learning (somente resultados autorizados e conferidos).
- Artigo explicando decisões metodológicas de um desses projetos.
São ideias de seed, não afirmações publicadas nem dados para inventar.
10. Fora de escopo (MVP)
Login de leitores, comentários, curtidas, newsletter, editor WYSIWYG customizado, formulários de contato que armazenem dados, upload de notebooks executáveis, tradução automática, filtro sofisticado de busca, painel de analytics customizado, e-commerce, chat com IA, visualização 3D/WebGL, vídeo autoplay, pipelines de deploy para cada post.
11. Métricas de sucesso
- Publicar um artigo ou projeto completo apenas pelo Studio, sem código.
- Editar conteúdo e ver atualização pública em prazo documentado.
- Conteúdo despublicado não acessível por URL pública.
- Validar 100 projetos publicados em ambiente de teste/seed, incluindo paginação.
- Concluir revisão de responsividade, contraste, SEO e fluxos críticos.
12. Decisões ainda abertas
Nome final, bio e foto, links de redes, domínio, necessidade de pré-visualizar rascunhos no frontend (pós-MVP por padrão), preferência de hospedagem caso Hobby não seja elegível, se haverá galeria de imagens além da capa. Ver docs/DECISIONS.md.
