# Portfolio V2.5 — auditoria antes do lançamento

**Decisão: READY FOR PREVIEW**

Auditoria local realizada em 1–2 de novembro de 2026. Branch: `v2`. Skills aplicados: `security-audit` e Impeccable, no âmbito de revisão técnica. A orientação visual aprovada foi preservada.

## Resumo executivo

O repositório está tecnicamente preparado para um preview Netlify autorizado. TypeScript, lint, build em Node 22 e **53 testes Playwright** passaram. A revisão adicional cobriu **45 combinações de página/ecrã**, **18 verificações Axe** e os estados da galeria desktop. Não foram observados erros de hidratação, imagens quebradas ou overflow nos tamanhos pedidos após as correções.

A produção continua dependente da confirmação da identidade/registo profissional e do regime fiscal, do telefone do alojamento, da aplicação da política de retenção e da verificação real do formulário/notificações. A eventual atividade B2C exige também verificar as menções de mediação. Os passos estão separados em A/B/C em [LAUNCH.md](LAUNCH.md).

Não houve push, merge, deployment, alteração de DNS ou de definições da Netlify. Nenhum email de teste foi enviado. O endereço pessoal que recebe o encaminhamento não foi consultado nem incluído nos ficheiros da auditoria.

## Alterações efetuadas

| Ficheiros | Correção e motivo |
| --- | --- |
| `src/components/ContactForm.tsx` | O foco de validação passa a ocorrer depois da atualização do DOM: a associação `aria-describedby` e a mensagem já existem quando o campo recebe foco. Erros de envio usam live region assertiva; “novo pedido” devolve foco ao nome. |
| `src/app/globals.css` | Três declarações permitem reflow dos títulos quando o tamanho de texto raiz é duplicado. Corrigem overflow em PT/EN e títulos legais longos sem alterar a tipografia normal. |
| `src/app/[locale]/privacy/page.tsx` | Substituído o link Netlify DPA que devolvia 404 pelo PDF oficial, confirmado com HTTP 200. |
| `messages/{fr,pt,en}.json` | Clarificados os campos obrigatórios e a consequência da sua falta, o envio do idioma, a categoria dos fornecedores de email, o contacto para exercer direitos e o formato PDF do DPA. |
| `src/data/site.ts`, página legal | Preenchida a morada oficial atual da Netlify, mantendo o telefone pendente e a respetiva indicação no preview. Nenhum novo dado pessoal do proprietário foi acrescentado. |
| `package.json`, `package-lock.json`, `src/fonts/newsreader-*`, licença Newsreader | Removidos um pacote de desenvolvimento e os ficheiros de uma fonte sem referências. DM Sans, imagens e projetos mantidos. Nenhuma outra versão foi atualizada no lockfile. |
| `.gitignore` | Acrescentadas exclusões para chaves, ficheiros de credenciais e exportações de bases de dados. Nenhum desses ficheiros foi encontrado entre os candidatos ao checkpoint. |
| `tests/portfolio.spec.ts` | Reforçados os três testes de formulário para observar ARIA no instante do foco e o reinício; acrescentados três testes de reflow nas nove páginas a 360/390 px. |
| `scripts/check-build-seo.mjs` | Nova verificação reproduzível dos artefactos gerados, separando explicitamente preview e produção. |
| `docs/LAUNCH.md`, `docs/SOURCES.md`, `README.md`, este relatório | Procedimento de lançamento, fontes e evidência atualizados. |

O método de envio, endpoint, codificação, nomes dos campos, honeypot, bloqueio de pedidos duplicados, timeout, tratamento de resposta e blueprint do Netlify Forms foram preservados. Não houve redesign.

## Segurança

### Stack e superfície

Versões efetivamente instaladas e verificadas no lockfile: Next.js **16.4.3**, React/React DOM **19.2.8**, next-intl **4.14.9**, GSAP **3.15.0**, Playwright **1.64.1**, Lighthouse **13.5.0**. App Router com `src/proxy.ts`, conforme a convenção do Next 16. Foram lidos os guias instalados em `node_modules/next/dist/docs/` antes das alterações.

Foram revistos os imports e componentes de produção, fronteiras server/client e referências a assets. Não foram encontrados rasters/fontes com conteúdo binário duplicado. As variantes PNG/WebP e os nove registos históricos de projetos são intencionais; não foram removidos como suposto código morto.

O fluxo público é: formulário → validação cliente → URLSearchParams → POST para o ficheiro estático → Netlify Forms. Não existem autenticação, base de dados, uploads, pagamentos, Server Actions ou Route Handlers personalizados. Não há razão para introduzir controlos de sessão ou uma API própria neste escopo.

### Resultado de dependências

| Âmbito | Críticas | Altas | Moderadas | Resultado |
| --- | ---: | ---: | ---: | --- |
| `npm audit --omit=dev` | 0 | 0 | 0 | Passou |
| `npm audit` completo | 0 | 0 | 16 entradas | Um advisory transitivo, propagado pela árvore de lint |

**MEDIUM, confiança alta quanto à presença:** [GHSA-g3hv-75wg-m249 / CVE-2026-118764](https://github.com/advisories/GHSA-g3hv-75wg-m249), amplificação de padrões em minimatch. Estão instalados minimatch 3.1.5 e 10.2.6 nas ferramentas ESLint/TypeScript-ESLint; a versão corrigida indicada é 11.0.1. Não foi identificado um caminho de entrada pública para esses globs: os padrões são locais e essas dependências não integram o runtime. O impacto nesta aplicação é de desenvolvimento/CI, não uma vulnerabilidade observada no site público.

O npm sugere alterações principais/incompatíveis para eliminar toda a cadeia. Não foi aplicado `audit fix --force` nem um override de minimatch 11 para consumidores da API 3. Acompanhar uma atualização compatível. `npm outdated` identificou versões mais recentes de algumas ferramentas, tipos, React e ícones; ausência de atualização não foi tratada como vulnerabilidade sem advisory.

### Segredos e privacidade

- Inspecionados 114 ficheiros existentes candidatos ao checkpoint, incluindo 90 novos; sem correspondências de segredos de alto risco, caminhos sensíveis ou ficheiros acima de 5 MB. O único email não profissional encontrado nesses textos pertencia a fixtures sintéticas de teste; não se trata de caixa pessoal.
- Varredura por padrões de segredos nos 17 snapshots Git então existentes: sem candidatos. É uma verificação por padrões, não uma garantia absoluta de ausência de qualquer segredo possível.
- `.env.example` contém apenas comentários de configuração. `.env*`, `.netlify`, outputs de build/teste, screenshots, traces e recursos locais do skill ficam fora do commit. Novas exclusões reforçam chaves e backups.
- Apenas `CONTEXT` e `NEXT_PUBLIC_DEPLOY_CONTEXT` são usados para o contexto de indexação. Não há credenciais de email, variáveis privadas serializadas, logs de pedidos ou scripts externos no runtime inspecionado.
- Nenhuma chamada a domínio externo ocorreu ao carregar as nove páginas no browser local. Após escolha explícita do idioma, observou-se apenas `NEXT_LOCALE`, com SameSite=Lax; o código acrescenta Secure em HTTPS e duração de um ano.
- Não foi acrescentado um banner de cookies: não há analytics/publicidade na implementação, e a [CNIL identifica a personalização de idioma como suscetível de dispensa de consentimento](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi). Confirmar que o painel do host não injeta serviços adicionais.

Headers `nosniff`, Referrer-Policy e Permissions-Policy estão declarados em `netlify.toml`; o blueprint tem X-Robots-Tag. A sua aplicação real, HTTPS e eventuais headers da plataforma exigem o preview. Não se acrescentou CSP/HSTS especulativa. Uma CSP estrita exige testar os scripts inline/hidratação do Next 16 e não é condição automática de bloqueio deste portfolio.

### Falsos positivos descartados

O JSON-LD usa dados internos, escapa `<` e não incorpora HTML do visitante: `dangerouslySetInnerHTML` aqui não constitui XSS demonstrado. A ausência de `middleware.ts` é esperada com `proxy.ts`. A falta de backend de autenticação não é falha num formulário público. O HTTP 999 do LinkedIn é uma restrição de acesso automatizado, não prova de inexistência do perfil.

## Netlify e formulário

Configuração compatível com o caminho documentado: build `npm run build`, publish `.next`, Node 22, adaptador OpenNext automático e contextos separados para deploy-preview/branch-deploy. Referências consultadas: [Netlify Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) e [OpenNext Forms](https://opennext.js.org/netlify/forms).

O sistema local tinha Node **26.12.1**. Para verificar o destino configurado, também foram executados build e servidor com **Node 22.23.4**, através de um executável temporário no cache npm, sem mudar o Node do sistema ou acrescentar dependência ao projeto.

Verificados o blueprint público, os sete campos coincidentes, `form-name=project-enquiry`, honeypot `bot-field`, POST para `/__forms.html` e codificação URL-encoded. O servidor local devolve o blueprint sem redirecionamento de idioma. Os testes cobrem validação, erro, preservação dos valores, estado pendente, sucesso, foco e novo pedido. Estes POSTs são intercetados pelos testes.

**Ainda não verificado:** deteção no build Netlify, pacote gerado pelo adaptador, dashboard, quotas, filtragem real, receção do pedido e entrega de email. Não há projeto Netlify ligado neste workspace nem URL de preview fornecido. A consulta read-only à API pública do GitHub encontrou zero PRs abertos de `v2`; branch deploys da conta continuam desconhecidos.

As [notificações](https://docs.netlify.com/manage/forms/notifications/) configuram-se separadamente em **Forms → Submission notifications**, para `project-enquiry`, com destino **contact@rlopes.pt**. O email exibido e `netlify.toml` não configuram esse destinatário. [LAUNCH.md](LAUNCH.md) contém o teste real passo a passo e a proteção da caixa de encaminhamento.

## SEO, idiomas e links

- Nove páginas com títulos, descrições, lang, canonical, quatro hreflang, Open Graph e Twitter/X; URLs de produção sempre em `https://rlopes.pt`.
- `scripts/check-build-seo.mjs` passou sobre builds de preview e de produção. No contexto production, as nove páginas também devolveram `index, follow` por HTTP; o preview final voltou a `noindex, nofollow`. Robots e sitemap são consistentes com cada contexto.
- Sitemap com exatamente as nove páginas públicas; imagens OG presentes; JSON-LD Person/WebSite com email oficial e localização La Ciotat/FR, sem empresa, cargos ou instalações inventados.
- Propostas de design não fazem parte das rotas de produção. `/design-proposals/v2.5/a.html`, `/fr/design-proposals`, `/.env` e `/.git/config` devolveram 404. O blueprint mantém noindex.
- FR/PT/EN têm chaves idênticas e nenhum valor vazio. Copy, validação e páginas legais revistos; PT usa vocabulário europeu. Os nomes Ricardo Lopes, SpoolIQ, Loprim3D e Belofer foram preservados.
- Mudança de idioma preserva rota/hash, incluindo páginas legais. Testados raiz com preferência, redirects antigos, 404 localizada e histórico do browser.
- **22 destinos internos** com resposta correta e hashes existentes. **18 mailto** distintos por ocorrência nas nove páginas, todos para `contact@rlopes.pt`; a mesma morada consta dos três Person JSON-LD. O mailto é ASCII, sem assunto ou parâmetros que exijam codificação adicional. Não foi aberto um cliente de email nem verificada entrega.
- SpoolIQ, Loprim3D, GitHub, Netlify, CNIL e o novo DPA responderam 200, seguindo redirecionamentos normais. LinkedIn devolveu 999 e permanece para verificação manual. A captura Belofer está disponível localmente, sem inventar um destino ativo.

## Informação legal — França

A revisão usa [Service Public](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr), [Ministério da Economia](https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter) e [CNIL](https://www.cnil.fr/fr/informer-les-personnes). Não é certificação de conformidade.

| Tema | Situação e ação necessária |
| --- | --- |
| Identificação EI, contacto, domiciliação e registo | Menções profissionais obrigatórias, mesmo num site sem checkout. Confirmar o nome completo e o âmbito dos dados públicos existentes; completar o registo aplicável. |
| IVA | Informação condicionada ao regime aplicável. Confirmar a frase atual de isenção; não foi inventado um número. |
| Diretor de publicação | Já identificado; deve acompanhar a confirmação da identidade completa. |
| Alojamento | Nome e morada oficial disponíveis; falta telefone verificado. Bloqueio de produção. |
| Recolha de dados | Aviso acessível no formulário e política em três línguas; finalidade, base pré-contratual, obrigatoriedade, destinatários, prazo, direitos e CNIL descritos. Confirmar a prática operacional. |
| Retenção | Os 12 meses são a política proposta pelo responsável e não um prazo legal universal. Falta confirmar e executar a eliminação. |
| DPA e transferências | Link corrigido para o [DPA oficial de 9 de junho de 2026](https://www.netlify.com/pdf/netlify-dpa.pdf); a configuração contratual real e os fornecedores de email ainda exigem revisão do proprietário. |
| Mediação B2C | Obrigação condicionada ao serviço a consumidores; o proprietário deve esclarecer a aplicabilidade e fornecer o mediador, se necessário. Ver [orientação oficial](https://www.economie.gouv.fr/mediation-conso/vous-etes-un-professionnel/vos-principales-obligations-0). |

A morada da Netlify foi confirmada nos [termos oficiais, secção 15](https://www.netlify.com/legal/terms-of-use/). Não foi localizado um telefone em fonte oficial suficiente para o preencher. Os flags de confirmação permanecem falsos. Não se copiaram dados privados ou registos presumidos para remover artificialmente os bloqueios.

## Acessibilidade, responsive e revisão Impeccable

**Integridade: passou.** A homepage mantém a exposição de três trabalhos reais, o posicionamento local, o mesmo percurso de contacto e a mesma animação. As capturas da homepage francesa antes/depois têm **pixels idênticos nos cinco tamanhos pedidos**, em fluxo sem animação. As alterações de CSS só afetam situações de texto ampliado que antes ultrapassavam o espaço disponível.

| Dimensão | Nota | Evidência/limite |
| --- | ---: | --- |
| Acessibilidade | 3/4 | Axe sem violações, foco/teclado/estados revistos; sem sessão real de leitor de ecrã |
| Desempenho | 3/4 | Lighthouse 96; LCP ainda acima de 2,5 s |
| Tema | 4/4 | Identidade clara e tokens coerentes; tema claro intencional |
| Responsive | 4/4 | Cinco tamanhos, gestos sintetizados, viewport de teclado e reflow corrigido |
| Integridade | 4/4 | Composição aprovada preservada, imagens autênticas, sem achados primários |
| **Total** | **18/20** | Avaliação técnica local, não declaração de conformidade WCAG |

O detector Impeccable foi executado uma vez nesta fase sobre `src` e `/fr` a 390×844: **0 achados primários**, 40 avisos sobre tamanhos literais/fluidos face à rampa documentada. Revistos no contexto do CSS e do design aprovado; não justificaram alterações estéticas.

Foram corrigidos três grupos de achados P2: associação do erro no instante do foco/reinício do formulário, reflow com texto raiz duplicado e link DPA indisponível/informação de privacidade incompleta. Não restam defeitos locais confirmados desses grupos. As lacunas legais e a entrega real continuam bloqueios operacionais de produção.

Cobertura: semântica/headings, labels, nomes de links, foco visível, contraste via Axe e inspeção, navegação com Tab/Escape, menu móvel, idioma, estados do formulário e redução de movimento. GSAP só carrega nas condições desktop; seleção por teclado pode regressar ao fluxo normal, sem prender o foco. Os testes exercitam scroll nos dois sentidos, next/previous, hashes e saída para contacto.

Axe foi aplicado às nove rotas a 390 e 1440 px. As 45 combinações incluem **360×740, 390×844, 430×932, 768×1024 e 1440×900** nas três línguas e em homepage/legal/privacidade. A ampliação usa `html { font-size: 200% }` como teste de robustez, não como alegação de teste manual completo de zoom em todos os browsers. Safari, Firefox, dispositivos físicos e leitores de ecrã permanecem fora da evidência automatizada.

## Desempenho

| Medição móvel | Lighthouse | LCP | CLS | JS transferido |
| --- | ---: | ---: | ---: | ---: |
| Referência V2.5 anterior | 96 | 2,793 s | 0 | 164 020 B |
| Antes desta auditoria | 96 | 2,808 s | 0 | 164 020 B |
| Final | **96** | **2,807 s** | **0** | **164 049 B** |

Condições comparáveis: Lighthouse 13.5.0, Chrome 156 headless, Windows, build otimizado local em `/fr`, perfil mobile 412×823/DPR 1,75, CPU ×4, RTT 150 ms, throughput simulado 1638,4 Kbps. O primeiro servidor usava Node 26; o final usa Node 22.23.4. São medições pontuais de laboratório, com variabilidade, não percentis de utilizadores reais.

O LCP é `article#spooliq > div.project-art > div.project-image > img`. A imagem é descoberta no HTML inicial, tem `loading=eager`, `fetchpriority=high`, dimensões explícitas e `sizes/srcset` responsivos. As três verificações de descoberta do Lighthouse passaram. Não há GSAP descarregado no mobile nem pedidos a terceiros; a única fonte transferida é DM Sans local. O relatório inicial não apontou poupança de LCP na descoberta do recurso.

Resultado final: 318 015 B totais, 99 132 B de imagens, 37 232 B de fonte, TBT 16,5 ms e sem avisos Lighthouse. **A meta de LCP ≤2,5 s não foi atingida.** Não foi estabelecida uma melhoria segura e mensurável que justificasse recomprimir a imagem ou alterar a composição. A remoção de Newsreader limpa ficheiros/dependências; como já não era carregada, não é apresentada como ganho de transferência.

## Comandos e resultados

| Validação executada | Resultado |
| --- | --- |
| Baseline `npm run typecheck`, `npm run lint`, `npm run build`, `npm test` | Passou; 50 testes |
| Final TypeScript e lint com zero warnings ESLint | Passou |
| Build/servidor com Node 22.23.4 | Passou, 13 páginas estáticas geradas |
| `node scripts/check-build-seo.mjs production` | Passou; nove rotas e artefactos |
| `node scripts/check-build-seo.mjs preview` | Passou; build local final não indexável |
| Final `npm test` | **53 passed (14,5 s)** |
| Browser adicional + Axe | 45 vistas, 18 scans, zero violações/erros de página/overflow |
| Links, idiomas, cookie e histórico | Passou; 22 destinos internos e respetivos hashes |
| `npm audit --omit=dev` | Passou, zero vulnerabilidades |
| `npm audit` | Exit 1: 16 entradas moderadas do mesmo advisory dev, documentado acima |
| `npm run check:production` | Exit 1 esperado: âmbito dos dados profissionais, telefone do alojamento e retenção |
| `git diff --check` | Passou |

Evidência local ignorada: `.impeccable/review/prelaunch/`, incluindo relatórios Lighthouse antes/depois, npm audit, detector, capturas finais, estados de animação, inspeção HTTP e observação do foco. Não foi adicionada ao Git. Os comandos de browser auxiliares nesse diretório são diagnósticos locais; os testes de regressão e o verificador SEO ficam no repositório.

## Git e decisão final

- Branch: `v2`.
- Base `master` preservada: `d4b41e8`.
- Checkpoint da V2.5: `792f529` — `feat: checkpoint portfolio V2.5 interactive showcase`.
- As correções e este relatório são guardados no commit local `fix: address prelaunch accessibility and privacy findings`. O seu hash pode ser consultado com `git log -2 --oneline`.
- As alterações da migração anterior foram preservadas no checkpoint. Ficheiros de evidência temporária ficaram ignorados. No fecho, não ficam alterações de trabalho pendentes; `git status --short` é verificado após o commit.
- Nenhum push, merge ou deployment foi realizado.

**READY FOR PREVIEW.** O próximo passo depende de autorização para publicar um preview e das verificações A/B de [LAUNCH.md](LAUNCH.md). Não há evidência para declarar READY FOR PRODUCTION REVIEW.