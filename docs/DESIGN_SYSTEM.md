# Design System — Gotham Noir / Midnight Art Déco

**Direção validada pelas referências do proprietário:** cidade noturna, céu azul petróleo e violeta, luar frio/ciano, arquitetura Art Déco, fachadas escuras e letreiros **vermelhos luminosos**. **Não utilizar o dourado como cor principal.**

## 1. Declaração criativa

> O silêncio de uma cidade às 2h da manhã encontra a precisão de um laboratório de dados.

O visual deve ser autoral, profissional e editorial. A atmosfera é noir/cinematográfica; o produto é um portfólio de tecnologia. Nada de emblemas de morcego, personagens, cópias de Gotham ou letras reproduzindo propriedade intelectual de terceiros.

**Palavras-chave:** midnight, noir, fog, moonlight, neon, skyline, geometry, restraint, precision.

## 2. Paleta de cores sugerida (tokens iniciais, ajustáveis após testes)

| Token | Hex | Uso |
|---|---|---|
| `--bg-0` | `#070A10` | Fundo global quase preto |
| `--bg-1` | `#0D1624` | Painéis, cartões e seções |
| `--bg-2` | `#14283A` | Superfícies elevadas; tons de edifício noturno |
| `--night-blue` | `#243D60` | Gradientes de céu / profundidade |
| `--moon-cyan` | `#79D6E4` | Reflexos frios, pequenos detalhes e estados ativos |
| `--neon-red` | `#F34D47` | Accent principal, CTA, linhas neon seletivas |
| `--red-glow` | `#C92E37` | Brilho secundário, não como cor de texto longo |
| `--mist` | `#AAB8CB` | Texto secundário |
| `--paper` | `#E9EDF2` | Texto principal / off-white |
| `--outline` | `#294052` | Bordas discretas |

**Regra de proporção:** ~80% bases escuras; ~15% texto/azul/ciano; ~5% vermelho neon como ponto focal. São diretrizes visuais, não cotas de pixels.

**Atenção:** validar contraste por *combinação real*. Vermelho/ciano sobre fundos escuros nem sempre atendem WCAG AA em texto pequeno. Se necessário, adaptar tonalidade ou usar off-white no texto e deixar o vermelho apenas decorativo.

## 3. Luz, atmosfera e composição

- **Hero da Home:** espaço negativo generoso, uma skyline Art Déco abstrata/autoral ao fundo, neblina sutil, halo frio como luar, e vermelho luminoso em 1 ou 2 detalhes.
- **Fundos:** escuros e profundos, jamais preto uniforme em todas as seções.
- **Geometria:** linhas verticais, grades inspiradas em fachadas, cantos levemente recortados e filetes; evitar uma interface inteira cheia de molduras decorativas.
- **Neon:** usar para sinalizar CTAs, underlines, foco, badges ocasionais e destaques; **não** fazer grandes blocos de parágrafo vermelho.
- **Textura:** gradiente discreto ou ruído muito sutil, sem comprometer leitura. Evitar downloads grandes e efeitos pesados.
- **Conteúdo técnico:** imagens e dashboards devem ser mostrados com fidelidade, sem filtros que mudem gráficos/valores.

## 4. Tipografia (licenças abertas)

- **Título/display:** considerar `Cinzel` ou `Marcellus`, testando legibilidade com caracteres portugueses. São referências de estilo, não imposição de fonte antes do protótipo.
- **Corpo/UI:** `Inter` ou `Manrope`.
- **Código:** `JetBrains Mono`.
- Carregar no máximo **duas famílias + mono**, com subsets e pesos necessários.
- Título H1 no desktop ~56–80px `clamp`, mobile ~38–48px; corpo editorial 16–19px; linha ~1.6–1.75; limite de largura de leitura ~68–75 caracteres.
- Maiúsculas espaçadas em pequenas *eyebrows*, nunca em longos parágrafos.
- Respeitar hierarquia sem saltar headings; não substituir texto por imagens.

## 5. Componentes essenciais

| Componente | Especificação |
|---|---|
| `SiteHeader` | Wordmark provisório, Projetos, Artigos, Sobre, CTA de contato opcional |
| `Hero` | H1 declarativo + subtítulo + CTA primário + CTA secundário; fundo cinematográfico discreto |
| `ProjectCard` | Capa 16:10, categoria, título, descrição curta, 2–4 tecnologias, link; hover sutil |
| `ArticleCard` | Data, título, resumo, tags; leitura editorial |
| `SectionHeading` | Eyebrow pequena + heading + divisor geométrico discreto |
| `Tag/Badge` | Alto contraste e legibilidade; somente quando informativo |
| `Button` | Primário vermelho contido; secundário outline azul/ciano; estados hover, focus, disabled |
| `ArticleBody` | Tipografia de leitura, headings, links, listas, imagens, citações e código responsivo |
| `Footer` | Links profissionais, copyright, frase curta |
| `EmptyState` | Sem conteúdo, amigável e coerente com a marca |

## 6. Motion e efeitos

- Duração base 140–240ms para hover/entrada; entradas leves com opacidade/translate curto (8–16px).
- Não colocar animação essencial à compreensão ou navegação.
- **`prefers-reduced-motion: reduce`:** desativar transições decorativas e parallax.
- Nada de vídeo de skyline ou canvas pesado no MVP. Preferir CSS e imagens estáticas otimizadas.
- Vermelho neon pode ter **glow leve**, mas evitar flicker/pulsação contínua.

## 7. Layout responsivo

- **360–767px:** uma coluna, navegação acessível, CTAs empilháveis, headings sem corte.
- **768–1023px:** grades de 2 colunas quando houver espaço.
- **>=1024px:** grade de 3 projetos, conteúdo central com largura máxima ~1200px; artigos com coluna de leitura mais estreita.
- Margens laterais generosas; no mobile mínimo ~20px.
- Fotos/capas mantém proporção; `object-fit: cover` apenas se não cortar visualização crítica.

## 8. Acessibilidade

- Navegação por teclado; foco sempre evidente; skip link.
- **WCAG AA** como meta e contraste verificado em todas as combinações.
- Ícones com nome acessível quando forem controles; imagens relevantes com `alt` descritivo.
- Nada depende apenas de cor; uso de texto/ícones de status.
- Não impor efeitos que causam desconforto ou flashes.

## 9. Regras de proteção de propriedade intelectual

As referências fornecidas são **estudos privados de direção artística**. Não colocar nos assets de produção nem copiar personagens, símbolos, marcas, composição exata de cartaz ou tipografia licenciada. A arte do site deve ser nova: skyline abstrata, linhas geométricas, feixes de luz, cores e estilo genérico de arquitetura noir.

## 10. Design QA (antes de integrar o CMS)

- [ ] Home tem identidade forte **sem depender de personagem ou imagem licenciada**.
- [ ] Vermelho neon atrai o olhar apenas para ações/destaques.
- [ ] Ciano da lua e azul noite são reconhecíveis.
- [ ] Conteúdo técnico continua sendo o protagonista.
- [ ] Layout testado em 360, 768 e 1440 px.
- [ ] Contraste validado, estado de foco visível, movimento reduzido.
- [ ] A versão sem imagens e animações continua funcional.

Consulte `REFERENCES.md` para a interpretação das imagens originais.

