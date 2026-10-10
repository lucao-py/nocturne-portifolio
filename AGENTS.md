## Gerenciamento de Contexto

A ideia aqui é economizar tokens o máximo que for possível sem perder a qualidade do projeto 

- Leia apenas a documentação relevante para a tarefa atual.
- Não leia todos os arquivos do diretório `docs/` por padrão.
- Consulte `PRD.md` para requisitos e escopo do produto, `DESIGN_SYSTEM.md` para interface e identidade visual, `ARCHITECTURE.md` para decisões técnicas e `CONTENT_MODEL.md` para estruturas de dados e CMS.
- Consulte `ROADMAP.md` ao planejar etapas de desenvolvimento e `ACCEPTANCE_CRITERIA.md` ao implementar ou validar funcionalidades.
- Priorize a leitura de seções específicas em vez de documentos inteiros, sempre que possível.
- Evite reler documentos que não foram alterados durante a mesma tarefa.
- Caso encontre contradições entre documentos, informe o conflito antes de tomar decisões.
- Não carregue documentação adicional sem necessidade justificada pela tarefa.

Estas instruções valem para todo o repositório. O projeto está em fase de definição; não assumir que existe código funcionando.
1. Fontes de verdade e ordem de leitura
Antes de qualquer alteração, consulte:
1. docs/PRD.md — problema, MVP e exclusões;
2. docs/DESIGN_SYSTEM.md — linguagem visual, tokens e acessibilidade;
3. docs/ARCHITECTURE.md — stack, dados e segurança;
4. docs/CONTENT_MODEL.md — schema e regras editoriais;
5. docs/ROADMAP.md e docs/ACCEPTANCE_CRITERIA.md — fase e definições de pronto;
6. docs/DECISIONS.md — decisões e pontos em aberto.
Em conflito, não adivinhe: informe a divergência e proponha correção documentada.
2. Modo de trabalho
- Trabalhe em etapas pequenas e testáveis, uma entrega do roadmap por vez.
- Antes de implementar, apresente objetivo, arquivos impactados e plano curto.
- Não implemente recursos fora do MVP (busca avançada, comentários, login de leitores, newsletter, backend separado).
- Prefira recursos nativos das tecnologias antes de adicionar dependências.
- Use componentes e tokens reutilizáveis; evite códigos duplicados.
- Mantenha textos, labels e mensagens públicas em pt-BR.
- Registre decisões que afetem arquitetura, custos, hospedagem ou estrutura de dados.
- Respeite o lockfile. Não atualize dependências em massa sem necessidade.
3. Regras invariantes
- O Sanity Studio realiza o CRUD; não criar painel CRUD do zero nem implementar login/senhas próprios.
- Dados públicos só vêm da perspectiva published; conteúdo em rascunho não aparece publicamente.
- Nunca usar tokens de leitura privada ou escrita em código cliente, NEXT_PUBLIC_*, logs, README ou commits.
- Não adicionar ações de escrita ao Content Lake expostas em endpoints públicos sem autorização explícita.
- Imagens de Batman/Gotham fornecidas são somente referências locais; não usar em produção e não commitá-las no repositório público.
- Acentos vermelho/ciano devem ser moderados: nunca sacrificar leitura e contraste pela estética.
- Respeitar prefers-reduced-motion, foco visível, navegação por teclado, texto alternativo e HTML semântico.
- Sem dados pessoais de terceiros, segredos corporativos, credenciais AWS ou informações confidenciais em exemplos.
- Não inventar resultados de projetos reais; usar placeholders claramente rotulados até que o proprietário forneça números.
4. Arquitetura do MVP
- Next.js com App Router e TypeScript.
- Tailwind CSS e variáveis/tokens de design.
- Sanity Studio + Content Lake, preferencialmente em /studio no mesmo app; exigir login do Sanity para editar.
- Ler projetos e artigos por consultas GROQ tipadas quando viável.
- Vercel para hospedar o site sujeita à elegibilidade do plano escolhido.
- Apenas bibliotecas adicionais justificadas; animação leve e progressivamente aprimorada.
5. Critérios para propor mudanças
Para cada recurso novo, responder: (a) atende qual requisito do PRD? (b) existe solução nativa? (c) custo de manutenção? (d) como validar? Registrar trade-offs em docs/DECISIONS.md quando significativo.
6. Verificações obrigatórias
Quando houver código de aplicação, executar os comandos correspondentes à etapa, definidos no package.json: lint, checagem de tipos, testes automatizados existentes e build. Não alegar sucesso sem executar. Se faltar acesso, credencial ou infraestrutura, explicitar o bloqueio e indicar passos manuais.
Testar pelo menos os fluxos editoriais principais: criar rascunho, publicar, atualizar, despublicar e excluir projeto/artigo; confirmação de que rascunhos não vazam no frontend; atualização pública sem commit nem novo deploy; funcionamento em tela pequena.
7. Relatório final por tarefa
Ao terminar, informe objetivamente:
1. O que foi implementado;
2. Quais arquivos foram criados/modificados;
3. Quais verificações realmente foram executadas (com resultados);
4. O que ficou pendente ou bloqueado;
5. O próximo passo recomendado no roadmap.
Nunca declarar uma funcionalidade pronta apenas porque o código foi escrito.
