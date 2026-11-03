# V2.5 — propostas de composição

Estado: exploração concluída; o proprietário selecionou C — Interactive Showcase com a tipografia de B. 31 de outubro de 2026.

Este diretório contém três protótipos de hero e apresentação dos projetos. São artefactos locais independentes de Next.js, sem novas dependências, fora de `src/app` e `public`. Permanecem fora das rotas do site. A direção aprovada foi integrada na aplicação Next.js; consulte ../../docs/V2.5.md.

## Abrir e reproduzir

A partir da raiz do repositório:

```powershell
node design-proposals/v2.5/server.mjs
```

Comparação: http://localhost:3250

- A: http://localhost:3250/a
- B: http://localhost:3250/b
- C: http://localhost:3250/c

O servidor liga apenas a 127.0.0.1 e serve uma lista explícita de ficheiros. Os documentos têm `noindex`. As imagens e a fonte são lidas dos originais no repositório; GSAP é servido da dependência já instalada. Não existe publicação, submissão ou armazenamento de dados. O contacto do protótipo usa o email público existente através de `mailto:`.

```powershell
node design-proposals/v2.5/capture.mjs
node design-proposals/v2.5/validate.mjs
```

A comparação usa as capturas geradas pelo primeiro comando. Evidência local em `.impeccable/review/v25/`, ignorada pelo Git.

## Decisões comuns, ainda em exploração

Modo Experience, com conversão para contacto. Empresários e profissionais independentes devem perceber que Ricardo desenvolve websites e aplicações a partir de La Ciotat. Mantêm-se DM Sans, fundo claro, tinta escura e lime para leitura diurna. As três composições foram indicadas expressamente pelo proprietário; não houve seleção aleatória de direção nem aprovação presumida.

O mesmo conteúdo factual permite comparar composição: SpoolIQ, Loprim3D e Belofer. Belofer é uma captura de arquivo e demonstra websites empresariais; o seu campo claro e fotografia de escritório acrescentam diversidade à aplicação e à loja. Não são alegados resultados comerciais, clientes adicionais ou implementação atual desse site. Os restantes registos e imagens permanecem intactos.

## A — Product Canvas

**Tese:** o produto demonstra capacidade antes de uma longa explicação. O plano grande da interface lidera a composição.

**Primeiro ecrã:** no mobile, título, interface a toda a largura, identificação do produto e uma proposta curta com contacto. No desktop, título e proposta partilham a margem superior; a interface ocupa um plano largo abaixo.

**Projetos:** SpoolIQ integra a abertura; Loprim3D ocupa uma faixa de imagem; Belofer tem uma composição mais pequena com legenda lateral em desktop.

**Movimento demonstrado:** escala controlada de 1,035 para 1 durante o scroll, apenas em desktop. Sem pinning.

**Conversão:** evidência direta de aplicação real, seguida de convite claro para discutir o negócio do visitante. Risco: menor surpresa visual do que as outras propostas.

## B — Creative Typography

**Tese:** a tipografia dá personalidade e a imagem atravessa o discurso, ligando palavras a trabalho real.

**Primeiro ecrã:** no mobile, a interface ocupa o intervalo entre “Du sens.” e “Du concret.”. No desktop, as três linhas formam uma composição diagonal, com a janela da aplicação integrada no lado direito. O corpo comercial e o CTA mantêm escala de leitura normal.

**Projetos:** SpoolIQ surge entre as palavras; o título grande Loprim3D encontra uma captura inclinada da loja; Belofer usa uma composição mais contida e alinhada.

**Movimento demonstrado:** a janela alinha-se gradualmente; uma máscara abre a imagem da loja. As letras permanecem estáveis.

**Conversão:** identidade memorável, serviço explicado em linguagem direta e acesso ao contacto. Risco: os títulos exigirão composições específicas em PT e EN, sem reduzir mecanicamente o tamanho da letra.

## C — Interactive Showcase

**Tese:** a página é uma exposição contínua que conduz do primeiro produto ao projeto do visitante.

**Primeiro ecrã:** proposta breve acima de uma navegação pelos três projetos e uma interface grande. No desktop, a navegação torna-se lateral e o espaço expositivo cresce com o ecrã.

**Projetos:** uma sequência contínua de aplicação, loja e website. No mobile, os três permanecem no fluxo normal. No desktop, partilham o mesmo espaço durante uma passagem curta pelo scroll.

**Movimento demonstrado:** ScrollTrigger fixa a exposição durante 1100px de scroll; opacidade e deslocação curta coordenam as transições. A navegação salta para o projeto escolhido. Teclado e opção “Lire sans animation” devolvem o fluxo documental. Movimento reduzido e ausência de JavaScript mantêm os três projetos legíveis.

**Conversão:** curiosidade e exploração conduzem a “Votre projet entre en scène”. Risco: maior complexidade de foco e movimento; merece validação adicional em dispositivos reais se for escolhida.

## Imagens e proveniência

- SpoolIQ: `public/projects/spooliq-dashboard.webp`, interface pública autêntica já usada na V2.4.
- Loprim3D: `public/projects/loprim3d.webp`, captura autêntica da loja já existente.
- Belofer: `public/portfolio/web/belofer.webp`, imagem original de arquivo.
- Fonte: `src/fonts/dm-sans.woff2`, instalada e licenciada no repositório.

As imagens não foram redesenhadas nem geradas por IA. Enquadramentos e recortes são CSS. As capturas dos conceitos provêm de páginas HTML efetivamente renderizadas no Chrome.

## Verificação desta etapa

- 18 combinações: três conceitos em 360×740, 375×812, 390×844, 430×932, 768×1024 e 1440×900.
- Sem overflow horizontal ou erros de runtime; imagens iniciais carregadas.
- GSAP/ScrollTrigger não transferidos nas larguras mobile/tablet ensaiadas.
- 56 controlos do script passaram, incluindo seis análises Axe WCAG, toque no CTA, navegação dos três projetos de C, teclado, mudança de viewport, movimento reduzido e leitura sem JavaScript.
- ESLint dos protótipos passou.
- Impeccable executado uma vez: 52 avisos consultivos de diferenças face aos tokens V2.4 (36 tipográficos, 13 raios, 3 cores), sem resultados principais. Naquela etapa, a escala expressiva e os tratamentos eram candidatos; a atualização do sistema de produção foi realizada após a seleção C + B.
- Revisão visual identificou e corrigiu uma sobreposição no tablet de B e uma margem insuficiente no CTA de A a 360px.

Capturas `a-mobile.png`, `b-mobile.png`, `c-mobile.png` e equivalentes `*-desktop.png` representam os primeiros ecrãs pedidos. `*-mobile-full.png` e `*-desktop-full.png` mostram o percurso completo dos protótipos; em desktop, estas capturas de página completa usam movimento reduzido para tornar todos os projetos inspecionáveis. `c-transition-store.png` e `c-transition-business.png` mostram o movimento desktop em estados estáveis.

Limites: conceitos em francês, Chrome/Chromium emulado, sem ensaio físico ou Safari. Os protótipos não são a homepage completa; Sobre, proposta de valor, idiomas, navegação final e formulário Netlify foram integrados depois na aplicação principal. Não se compararam métricas Lighthouse de HTML estático com o build Next.js. A validação completa de produção, traduções, testes existentes e desempenho aplica-se à implementação selecionada.

## Decisão e implementação

O proprietário aprovou C com a força tipográfica de B. A homepage final está em http://localhost:3100/fr; estes protótipos preservam a exploração original. A branch permanece `v2`, sem commit, merge, push ou deploy.

A primeira revisão visual independente confirmou a diferença entre as três direções e pediu a correção de B no tablet. A segunda passagem independente terminou por limite de utilização; a confirmação das correções foi feita diretamente com as novas capturas segundo o roteiro de contingência do Impeccable. O veredicto local refere-se apenas aos ajustes avaliados e à entrega dos conceitos para escolha, não à aprovação de uma direção.
