# Decisões técnicas

## 2026-10-11 — Atualização do conteúdo público do Sanity

- **Estado:** adotada na Fase 3.2.
- **Leitura:** consultas GROQ em componentes de servidor, sem token, com `perspective: "published"`. O cliente usa `useCdn: false` para não acumular o cache de consultas do Sanity com o cache do Next.js.
- **Cache:** cada consulta usa `next.revalidate: 60`. As rotas de projetos e artigos são renderizadas por requisição e não adicionam outro cache de página. Não há webhook nem `generateStaticParams`. Slugs novos são resolvidos em tempo de execução.
- **Atualização esperada:** após publicação, edição, despublicação, exclusão ou troca de slug, o cache fica elegível para atualização em até 60 segundos. O primeiro acesso depois desse prazo pode receber uma resposta antiga enquanto o Next.js atualiza em segundo plano. Com acessos contínuos e Content Lake disponível, espera-se que a mudança apareça em até cerca de 120 segundos. Isso não é um limite garantido quando não há tráfego ou quando há falha de rede; o critério de 120 segundos precisa ser medido em um teste de publicação real.
- **Custo e manutenção:** a estratégia usa somente os recursos já instalados. O custo é uma leitura no Content Lake por consulta após a expiração do cache; se o volume crescer ou o tempo de atualização não atender ao critério, avaliar revalidação dirigida em outra etapa.
