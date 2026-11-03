# Portfolio V2.5 — final release candidate

> **Seguimento de 03/11/2026:** a referência atual é [PRODUCTION-MIGRATION.md](PRODUCTION-MIGRATION.md), estado **MIGRATION BLOCKED**. O proprietário confirmou identidade/registo, notificação Gmail e encaminhamento Cloudflare; a configuração Next.js foi aplicada apenas localmente em v2. Franchise en base de TVA foi entretanto confirmada; permanecem pendentes telefone Netlify, implementação da conservação/arquivo por finalidade, integrações privadas, visualização da submissão, investigação do 500 e identificação dos deploys. A orientação operacional atual está em [DATA-RETENTION.md](DATA-RETENTION.md). Não houve merge/push/deploy. O corpo abaixo conserva a auditoria de 02/11; pontos entretanto confirmados não devem ser tratados como novamente desconhecidos.

**Decisão: OWNER ACTION REQUIRED**

Verificação: 2 de novembro de 2026. Branch de trabalho: `v2`.

As correções locais e a preparação da migração estão concluídas. TypeScript, lint, builds de preview e produção, verificações SEO e 62 testes passaram. Faltam confirmações legais e operacionais externas antes de aprovar produção. Não foi identificado um defeito local persistente que exija redesenhar a aplicação. Este relatório não certifica conformidade jurídica.

Não houve push, merge, deployment, alteração de DNS, da branch de produção ou de definições remotas. A produção Vite em `https://rlopes.pt` foi apenas consultada. Não foram acedidas/eliminadas mensagens, enviadas submissões reais ou revelados destinatários privados de encaminhamento.

## 1. Informação legal e fontes

Fontes consultadas em **2026-11-02**. Uma publicação do próprio empresário não substitui a confirmação da situação fiscal ou um extrato atual do registo.

| Elemento | Evidência e tratamento local | Pendente antes de produção |
| --- | --- | --- |
| Empresário | A [menção legal Loprim3D](https://loprim3d.fr/policies/legal-notice), atualizada em 01/08/2026, identifica Ricardo Lopes EI, micro-entrepreneur. A [API oficial Recherche d’entreprises](https://recherche-entreprises.api.gouv.fr/search?q=107688467) devolveu `RICARDO SILVA LOPES`, natureza jurídica `1000`, estado `A` e `est_entrepreneur_individuel: true`. O rascunho usa Ricardo Silva Lopes EI. | Confirmar nome civil completo: a [publicação BODACC A20260148253](https://www.bodacc.fr/pages/annonces-commerciales-detail/?q.id=id:A20260148253), de 06/08/2026, inclui também o prenome Joao. Não foi presumida a composição final do nome. |
| Estabelecimento | França, La Ciotat; API com atividade `62.01Z` e estabelecimento ativo. A extensão `.pt` não implica estabelecimento português. | Confirmar dados atuais no documento profissional. |
| Domiciliação | Loprim3D publica 390 Avenue François Billoux, 13600 La Ciotat, France; a API acrescenta `BATIMENT 13`. O rascunho usa Bâtiment 13, 390 Avenue François Billoux, 13600 La Ciotat, France. | Uso autorizado para redação; confirmar domiciliação profissional antes de produção. |
| Identificador | SIREN **107 688 467**, coincidente nas três fontes. API com atualização em 02/11/2026. | Validar no extrato atual; não depender só de uma página antiga. |
| Registo | BODACC identifica **RCS Marseille — 107 688 467**, inscrição em 30/07/2026; acrescentado ao aviso legal. | Confirmar situação atual e menção aplicável. Não foi deduzida inscrição RNE ausente da resposta consultada. |
| SIRET | A API retornou um SIRET diretamente. | Não foi necessário acrescentá-lo; nenhum SIRET foi calculado a partir do SIREN. |
| Telefone | **+33 7 66 23 41 10**, publicado na Loprim3D; link `tel:+33766234110` validado. | Confirmar que continua adequado. |
| Email | **contact@rlopes.pt**, definido pelo proprietário e usado nas traduções, links e JSON-LD. | Testar alias/notificação privadamente; encaminhamento pessoal nunca pertence ao repositório. |
| IVA/microempresa | Loprim3D declara micro-entrepreneur e TVA non applicable, art. 293 B du CGI. Declaração preservada com confirmação pendente expressa na nota legal. | Confirmar regime fiscal atual. Não foi inventado, calculado ou copiado de diretórios um número de IVA. |
| Diretor de publicação | Ricardo Silva Lopes, coerente com o rascunho. | Acompanhar confirmação do nome completo. |
| Alojamento | **Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, United States**, confirmado nos [termos oficiais, secção 15](https://www.netlify.com/legal/terms-of-use/). | **Telefone oficial não verificado** nas fontes oficiais consultadas. Pedir contacto verificado ao fornecedor e completar; permanece `null`, com aviso em FR/PT/EN. |

O [Service Public](https://entreprendre.service-public.gouv.fr/vosdroits/F37351) descreve as menções profissionais, incluindo identificação, contacto e alojamento. Não deixam de ser aplicáveis por não haver checkout. Se houver prestação a consumidores, confirmar adesão/identificação do mediador aplicável, conforme [Ministério da Economia](https://www.economie.gouv.fr/mediation-conso/vous-etes-un-professionnel/vos-principales-obligations-0); não foi inventado um mediador.

As três páginas legais incluem identificação francesa, registo, contactos, alojamento, propriedade intelectual, responsabilidade proporcional, links externos, referência à privacidade e reclamações/direito aplicável, preservando direitos imperativos. Dados profissionais não foram acrescentados ao hero.

### SpoolIQ: revisão separada

A [política SpoolIQ](https://spooliq.io/en/privacy) descreve contas, subscrições, Stripe, dados SaaS e analytics próprios; nada disso foi copiado. Os [termos SpoolIQ](https://spooliq.io/en/terms) referem lei e tribunais portugueses: **revisão separada pelo proprietário/apoio jurídico**, atendendo ao estabelecimento francês declarado. Este trabalho não alterou SpoolIQ nem copiou o alojamento Shopify da Loprim3D.

## 2. Privacidade e cookies

A [auditoria RGPD/CNIL](GDPR-COOKIE-AUDIT.md) documenta dependências, scripts, pedidos, cookies, Web Storage, IndexedDB, Cache Storage e service workers. As correções foram preservadas e novamente testadas.

| Mecanismo | Classificação e evidência | Decisão |
| --- | --- | --- |
| `NEXT_LOCALE` após escolha explícita | Preferência funcional solicitada: `fr`, `pt` ou `en`, sem identificador único, Path `/`, SameSite Lax, Secure em HTTPS, até um ano desde a última escolha explícita. | Isento de consentimento prévio para esta finalidade exclusiva, conforme [CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite). Alterável no seletor ou removível/bloqueável no navegador. |
| Cookie automático next-intl | Preview anterior criava cookie de sessão sem escolha explícita em certos idiomas. | `localeCookie: false` elimina escrita redundante. Primeiras visitas locais às nove páginas: zero cookies/Set-Cookie e Web Storage; escolha explícita preservada. |
| Scripts, fontes, imagens e GSAP | Recursos próprios; nenhuma chamada de analytics, pixel, iframe ou tracker opcional nas sessões observadas. | Funcionalidade normal; links externos não são embeds. Sem CMP artificial. |
| Forms/honeypot | POST pedido pelo visitante; contacto e prevenção de abuso. Akismet no servidor descrito pelo fornecedor. | Não bloquear contacto com consentimento de cookies. Obrigações RGPD continuam aplicáveis. |
| Logs/CDN/email e estatísticas no servidor | Tratamentos não inteiramente observáveis no browser. | Ativação, retenção, acessos e contratos privados pendentes. |
| Analytics opcionais, replay, snippets e plugins | Não identificados no código/sessões; painel não verificado. | Não afirmar que estão desativados. Avaliar antes de ativar e bloquear trackers não essenciais até consentimento válido. |

**Não foi implementado banner:** nenhum mecanismo observado justifica esse controlo. Aceitação/rejeição de trackers opcionais: não aplicável. Foram testadas alteração, persistência e remoção da preferência funcional, navegação e envio simulado com gravação de cookies indisponível.

Se surgirem trackers sujeitos a consentimento, implementar antes do carregamento: aceitar/rejeitar igualmente acessíveis, finalidades separadas quando aplicável, acesso permanente à alteração/retirada e navegação/formulário disponíveis após recusa. A [FAQ CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ) recomenda em geral seis meses para memorizar aceitação e recusa, ajustados ao contexto; não confundir com prazo do cookie funcional ou dos contactos.

A política FR/PT/EN identifica responsável, dados obrigatórios/alternativa por email, bases pré-contratuais/interesse legítimo conforme o pedido, destinatários, Forms, antispam, email, logs, direitos/oposição e CNIL. Referencia o [DPA Netlify](https://www.netlify.com/pdf/netlify-dpa.pdf), atualizado em 09/06/2026; garantias efetivas da conta/email ainda exigem revisão. Não afirma que todos os dados ficam na UE ou que não existe tratamento no servidor.

### Checklist privada do proprietário

- [ ] Analytics/Web Analytics: estado, produto contratado, finalidade, dados, retenção e acessos. Estatísticas de logs sem cookies não equivalem automaticamente a conformidade RGPD.
- [ ] Build & deploy/Post processing/Snippet injection, plugins e extensões: inventariar código injetado e contextos.
- [ ] Session Replay, pixels, analytics e embeds: confirmar presença/ausência e funcionamento; repetir rede/armazenamento após alterações.
- [ ] Functions, hooks, webhooks de Forms e log drains: destinos, finalidades, acessos e prazos.
- [ ] Forms: deteção, spam, submissões, notificações, quotas e permissões.
- [ ] Netlify/email: DPA, subprocessadores, países, transferências, logs/backups; refletir categorias verificadas na política.
- [ ] Documentar bases legais, ponderação de interesse legítimo e tratamento de pedidos de direitos.

Menus variam por plano/interface; ausência de um menu não prova inexistência de integração. Não copiar credenciais, payloads ou dados pessoais para evidências públicas. Nenhuma configuração remota foi alterada.

## 3. Conservação por finalidade — orientação atualizada

**Correção de 03/11/2026:** este ponto substitui o anterior procedimento centrado nos 12 meses. Não aplicar esse prazo a toda a correspondência ou a um dossier só por não ter originado um projeto.

- Pedidos sem seguimento, sem outro fundamento de conservação: **12 meses propostos** após o último contacto substantivo, salvo justificação legal documentada.
- Clientes, contratos e correspondência comercial: preservar os elementos necessários à execução, prova dos acordos e defesa de direitos, com **referência de 5 anos** e início/regras de contagem aplicáveis.
- Faturas/comprovativos/documentos contabilísticos: **10 anos a partir do encerramento do exercício**, segundo obrigações aplicáveis; não confundir com prazo do pedido inicial.
- No fim da relação, separar apenas o necessário em arquivo com acesso limitado. Rever exceções, cópias e datas; não eliminar automaticamente por idade ou suporte.

O procedimento simples de Gmail/Netlify, revisão e fontes oficiais está em [DATA-RETENTION.md](DATA-RETENTION.md). Submissões e emails são classificados pelo conteúdo/finalidade. **Organização, revisão e arquivo ainda por implementar; sem automação.** Nenhum dado real foi acedido/movido/eliminado; `retentionPolicyConfirmed` continua falso.

## 4. Preview público e formulário

Preview: `https://v2--deft-frangipane-131671.netlify.app`. Captura principal iniciada em **02/11/2026 às 19:21 UTC (20:21 em Paris)**; evidências em `.impeccable/review/release/remote.json` e `followup.json`, ignoradas pelo Git.

| Rota/elemento | Observado |
| --- | --- |
| `/` | HTTP 307 para `/fr`, destino 200. Antigo 404 da raiz não reproduzido. |
| `/fr`, `/pt`, `/en` | HTTP 200 direto. |
| Nove páginas localizadas no navegador | HTTP 200, sem erros JavaScript, recursos de terceiros ou overflow a 390 px. |
| `/pt/privacy`, primeira consulta HTTP isolada | **Uma resposta 500**; visita posterior no navegador e cinco novas consultas devolveram 200. Causa remota não identificada/corrigida. Rever logs Netlify por rota/horário antes de produção; retestes não demonstram resolução. |
| `/portfolio`, `/fr/portfolio` | HTTP 308 para `/pt#work` e `/fr#work`. |
| `/__forms.html` | HTTP 200, blueprint/sete campos presentes, header `X-Robots-Tag: noindex, nofollow`. |
| Produção `https://rlopes.pt/` | HTTP 200 com recursos Vite `/assets/`, sem `/_next/` na resposta inspecionada. Intacta. |

O commit publicado não foi autenticado no painel. `git ls-remote` confirmou `v2` remota em `2b83e058b07558c006bb81447ed398473de9ddc2` e `master`/HEAD em `d4b41e8293dc6860f357d345cf2fa76e37afbad1`; refs Git não provam qual deploy está publicado. As correções locais deste release candidate ainda não estão nesse preview.

### Níveis de validação Forms

| Nível | Estado |
| --- | --- |
| Estrutura estática | Verificada no código e GET público: `project-enquiry`, honeypot `bot-field`, blueprint separado de React. |
| Campos/envio | `POST /__forms.html`, `application/x-www-form-urlencoded`; `form-name`, `bot-field`, `locale`, `name`, `email`, `project-type`, `message`. Correspondência e fluxo preservados. |
| Simulação | Playwright intercepta POST: validação, erro/repetição, sucesso, foco e funcionamento sem cookies passaram. Não é entrega real. |
| Deteção Netlify | **Pendente no painel**. HTML ainda contém `data-netlify`; não prova processamento. Anterior `Skipping form detection` exige confirmar configuração. |
| POST real aceite | **Não executado**, sem acesso ao painel/email para acompanhar teste completo. |
| Registo no painel | **Não verificado**. |
| Notificação e Reply-To | **Não verificados**. Email visível não configura destinatário Netlify. |

### Ações do proprietário — uma submissão acompanhada

1. Confirmar **Forms → Form detection** no projeto correto. Se necessário ativar, fazê-lo numa alteração remota separada/autorizada: é partilhada pelo projeto, não isolada em `[context.v2]`.
2. Deteção requer **novo build autorizado** após ativação. Confirmar no log e no painel `project-enquiry`/campos. Não acrescentar fallback `/index.html`.
3. Em **Forms → Submission notifications**, criar/verificar notificação para **contact@rlopes.pt**. Confirmar alias privadamente; encaminhamento pessoal nunca no código. Não alterar projeto Loprim3D.
4. No preview aprovado, enviar **um** pedido `TESTE PREVIEW V2.5`, mensagem de teste e email controlado pelo proprietário. Anotar hora/URL; não guardar esse email em fixtures ou relatório.
5. Confirmar HTTP real, depois a mesma submissão no painel e campos. HTTP 200 isolado não prova armazenamento/entrega. Se faltar, verificar spam, quotas, deteção e logs antes de repetir.
6. Confirmar notificação pelo alias, incluindo spam, e **Reply-To** para o email de teste do visitante. O campo `email` não determina o destinatário da notificação.
7. Confirmar feedback/novo pedido e eliminar dados de teste na Netlify/email após validação. Não publicar cabeçalhos ou destinatários privados.

Referências: [Forms setup](https://docs.netlify.com/manage/forms/setup/), [notificações](https://docs.netlify.com/manage/forms/notifications/) e [OpenNext Forms](https://opennext.js.org/netlify/forms). Antispam da plataforma não foi apresentado como validação de servidor personalizada.

## 5. Netlify: configuração ativa e futura

### Ativa, preservada

O `netlify.toml` da raiz **não foi alterado nesta passagem**:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.v2]
  command = "npm run build"
  publish = ".next"

[context.v2.environment]
  NODE_VERSION = "22"
```

`dist` pertence ao contrato da antiga SPA Vite. O Next.js atual não define `distDir` nem `output: "export"`; produz `.next`, que necessita do adaptador Netlify/OpenNext para preparar funções, rotas e recursos. Artefactos internos `server`, `cache` e `build-manifest.json` não constituem, por si, um website estático. Não foi adicionado adaptador legado, servidor personalizado ou fallback SPA `/* /index.html 200`.

A `master` real permanece em `d4b41e8`, sem este `netlify.toml`, usando Vite e as definições existentes do painel. Nenhum ficheiro dessa branch/configuração remota foi modificado. Simular produção com o ficheiro de `v2` também preserva `npm run build`/`dist`.

### Artefacto futuro inativo

[deployment/netlify.production.toml](deployment/netlify.production.toml) contém a substituição completa futura: build global `npm run build`, publish `.next`, Node 22, indicadores production/preview e mesmos headers de segurança/blueprint. Não é lido automaticamente enquanto estiver em `docs/deployment/`.

Quando Next.js passar para `master`, `[context.v2]` deixa de selecionar publish. **A substituição global deve acompanhar o commit de migração antes do merge autorizado.** Não basta promover o commit atual e esperar seleção automática de `.next`.

Resolvedor oficial `@netlify/config@25.5.2`, offline, sem conta Netlify:

| Ficheiro/contexto simulado | Build | Publish | Node | Indicador de ambiente |
| --- | --- | --- | --- | --- |
| Atual, `v2` / branch-deploy | `npm run build` | `.next` | 22 | branch-deploy |
| Atual, `master` / production | `npm run build` | `dist` | sem override no ficheiro | sem override no ficheiro |
| Futuro, `master` / production | `npm run build` | `.next` | 22 | production |
| Futuro, `v2` / branch-deploy | `npm run build` | `.next` | 22 | branch-deploy |
| Futuro, outra branch / deploy-preview | `npm run build` | `.next` | 22 | deploy-preview |

O resolvedor não executa OpenNext, funções, Forms ou post-processing remoto. `next build` também não comprova esse empacotamento. No próximo deploy autorizado, confirmar adaptador, contexto, commit, publish e runtime nos logs. Não havia CLI Netlify instalada, projeto local ligado ou acesso autenticado nesta verificação.

Referências: [Next.js na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [OpenNext](https://opennext.js.org/netlify) e [precedência do ficheiro sobre a UI](https://docs.netlify.com/build/configure-builds/file-based-configuration/).

### Cloudflare

O `401 Unauthorized` de `netlify-purge-cloudflare-on-deploy` é falha separada de build/cache, não prova de erro Next.js. Plugin ausente da configuração local; estado/credenciais privados não inspecionados. Confirmar utilidade/impacto em produção. Se purga for desnecessária nos previews e houver isolamento suportado, considerar desativação apenas nesses contextos após aprovação. Não desativar globalmente por suposição, alterar DNS/proxy ou publicar credenciais.

## 6. SEO

Preview observado: metadados `noindex, nofollow`, canonicals/hreflang de produção e `robots.txt` com `Disallow: /`, mas sem `X-Robots-Tag` geral. A [documentação oficial Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explica que impedir crawling pode impedir leitura de `noindex`.

Correção local: preview recebe `X-Robots-Tag: noindex, nofollow` nas respostas de conteúdo, mantém metadados e permite crawling com `Allow: /` para ler noindex. Os redirects permanentes conduzem às páginas protegidas; não se depende de header no próprio 308. O header/metadados de preview **não existem no build de produção**, verificado nos artefactos gerados.

| Elemento | Preview local | Build de produção |
| --- | --- | --- |
| Páginas FR/PT/EN | `noindex, nofollow` | `index, follow` |
| Header geral noindex | Presente nas páginas/recursos verificados por HTTP | Ausente do manifesto compilado |
| robots.txt | `Allow: /` | `Allow: /`, exclui `/__forms.html` |
| Canonicals, OG, hreflang | Origem `https://rlopes.pt`, FR/PT-PT/EN/x-default | Mesma origem |
| Sitemap | Nove URLs de produção | Nove URLs de produção |

Blueprint conserva metadados/header próprios de noindex. `CONTEXT` tem prioridade sobre `NEXT_PUBLIC_DEPLOY_CONTEXT`; só `production` ativa indexação. Os valores são usados no build: mudar apenas ambiente de `next start` não reconstrói metadados. Não criar noindex global no painel que permaneça em produção; o artefacto futuro explicita contexto production.

Diretivas não são controlo de acesso nem prova de remoção de todos os índices. Melhorias só chegarão ao preview após publicação autorizada; repetir HTTP nesse momento e no domínio final.

## 7. Validação técnica e limites

Node **22.23.4**, Next.js **16.4.3**, Chrome/Playwright. Design, seleção SpoolIQ/Loprim3D/Belofer, homepage, CSS, animações, seletor, proxy e implementação Forms preservados. Package/lockfile e configuração Netlify ativa intactos.

| Verificação | Resultado desta passagem |
| --- | --- |
| TypeScript/lint | Passaram; ESLint sem warnings. |
| Builds production/branch-deploy | Passaram; 13 páginas estáticas em cada build. |
| SEO nos dois builds | Passou nas nove páginas, JSON-LD, sitemap, robots e ausência de noindex geral em produção. |
| Suite + regressões de privacidade | **62 testes passaram**: inclui GSAP desktop, scroll móvel, navegação, idioma, Forms simulado, foco/teclado e movimento reduzido. |
| Browser adicional | **45 vistas**: nove páginas × 360×740, 390×844, 430×932, 768×1024, 1440×900, com movimento reduzido. Todas 200; zero overflow, erros de console/página, imagens quebradas/sem alt, âncoras locais ausentes ou pedidos de terceiros. |
| Axe adicional | **18 scans**, nove páginas a 390/1440 px; zero violações nos critérios automatizados. Não certifica WCAG. |
| Links internos | 21 destinos HTTP, incluindo raiz, nove páginas, quatro redirects, blueprint, robots, sitemap, OG e imagem Belofer. Todos 200 ou redirect esperado; âncoras entre páginas presentes. |
| Contactos | Apenas `mailto:contact@rlopes.pt` e `tel:+33766234110` nos links observados. |
| Links externos | SpoolIQ, Loprim3D, GitHub, Netlify, DPA e CNIL: 200 após redirects. LinkedIn: 999, restrição à inspeção automatizada; verificar manualmente, sem declarar link quebrado. |
| Erro de formulário | `aria-invalid`, associação e mensagem presentes no instante do foco. |
| `npm run check:production` | **Saída 1 esperada**: identidade/regime, telefone Netlify e adoção/execução da retenção pendentes. Não mascarada como teste aprovado. |

Evidências locais ignoradas: `.impeccable/review/release/` (remoto, links, capturas, `local/browser-after.json`) e `.impeccable/review/gdpr/`. Sem submissões reais. Testes duráveis/verificador SEO ficam no Git; builds/capturas não são publicados.

Lighthouse não foi repetido: não houve alteração de composição, CSS, imagens, carregamento GSAP ou runtime ativo; SEO não justifica otimização especulativa. **96 / LCP 2,807 s / CLS 0 são resultados históricos locais**, em [PRELAUNCH-AUDIT.md](PRELAUNCH-AUDIT.md), não uma medição nova ou de campo. Safari/iOS real, Firefox, leitor de ecrã e entrega remota ficam fora da evidência automatizada. Audit de dependências anterior também não repetido, dado package/lockfile intactos; acompanhar aviso dev documentado sem atualizações incompatíveis.

## 8. Transição para produção — só após autorização

1. **Fechar factos/operação:** confirmar nome completo/domiciliação/regime/registo, telefone Netlify e âmbito B2C; adotar retenção; rever integrações/DPA/logs; esclarecer o 500. Atualizar FR/PT/EN e flags apenas com evidência. `check:production` deve passar, sem substituir checklist externa.
2. **Preservar rollback:** registar privadamente ID/URL/commit do último deploy Vite funcional e valores atuais do painel. Manter deploy/histórico Git; não eliminar site, domínio ou recursos antigos.
3. **Configuração em commit próprio de `v2`:** após aprovação, copiar `docs/deployment/netlify.production.toml` para `netlify.toml` na raiz e rever diff/contextos. **Ainda não executado.** Node 22 e `.next` passam a globais para a aplicação migrada, incluindo master; previews conservam noindex. Branch de produção permanece `master`, base permanece raiz.
4. **Validar o commit:** Node 22, typecheck, lint, ambos builds/SEO, suite e resolução offline produção/preview. Rever variáveis por contexto sem imprimir segredos; não adicionar chaves ao browser nem deixar override remoto de preview/noindex na produção.
5. **Publicar preview com autorização específica:** push `v2` e preview/PR segundo processo do proprietário, sem merge. Confirmar log: commit, ficheiro, `npm run build`, `.next`, Node 22, adaptador OpenNext. Não trocar publish do painel da antiga produção para corrigir preview.
6. **Validar deployment:** raiz, idiomas, legal/privacidade, GSAP/mobile, imagens, headers/canonicals e erros. Confirmar Forms e executar único teste acompanhado HTTP → painel → email. Revalidar cookies e integrações; não depender só dos mocks locais.
7. **Aprovação de produção separada:** rever PR/commit final; só com autorização fazer merge/promoção para `master`, levando configuração global Next.js no mesmo estado de código. Preservar histórico por merge/revert normal, sem force-push/reset destrutivo. Não é necessário alterar DNS/domínio/branch de produção para manter `rlopes.pt` no mesmo projeto.
8. **Pós-publicação autorizado:** confirmar production, `.next`, adaptador, raiz/idiomas/redirects/Forms no domínio final; HTTPS, canonical, sitemap, `index, follow` e ausência de noindex geral. Blueprint continua noindex. Rever notificações/logs sem envios repetidos; manter deploy anterior até estabilidade.

Comandos locais reproduzíveis (PowerShell, Node 22; não fazem deploy):

```powershell
npm run typecheck
npm run lint
$env:CONTEXT = 'production'
npm run build
node scripts/check-build-seo.mjs production
$env:CONTEXT = 'branch-deploy'
npm run build
node scripts/check-build-seo.mjs preview
npm test
npm run check:production
Remove-Item Env:CONTEXT
```

Build final permanece de preview. `npm ci` pode preparar um checkout limpo; não é necessário apagar dependências/builds válidos para aprovar o plano.

### Rollback

Se falhar, obter autorização e republicar no painel Netlify **o deploy Vite de produção previamente validado**, sem o reconstruir com configuração Next.js. Confirmar domínio/rotas restaurados. O deploy existente conserva os artefactos antigos; não o eliminar.

Rever publicações automáticas pendentes para não sobrescrever o rollback; pausa/lock remoto exige aprovação própria. Corrigir `v2` e preparar novo preview. Se necessário alinhar Git, preparar **revert revisto da migração**, incluindo configuração/framework; não reescrever histórico/reset/force-push. Preservar submissões Forms/notificações: restaurar website não elimina dados.

## 9. Launch gate

### VERIFIED

- [x] Informação francesa cruzada com Loprim3D, API oficial e BODACC; lacunas explícitas em FR/PT/EN.
- [x] Privacidade/idioma corrigidos; nenhum tracker opcional observado; sem banner desnecessário.
- [x] Procedimento manual de retenção completo, com adoção pendente descrita corretamente.
- [x] Raiz/idiomas do preview acessíveis; ocorrência 500 identificada sem inventar causa.
- [x] Blueprint/fluxo Forms preservados e simulações aprovadas.
- [x] TypeScript, lint, builds, SEO, 62 testes, 45 vistas, 18 scans Axe aprovados.
- [x] Configuração atual isolada; artefacto futuro testado offline e inativo; transição/rollback definidos.
- [x] Produção/DNS/definições remotas intactos.

### REQUIRES OWNER ACTION

- [ ] Confirmar identidade completa, domiciliação, registo atual, telefone profissional, microempresa/IVA e âmbito B2C.
- [ ] Obter telefone oficial Netlify; rever contratos/transferências, logs e integrações privadas.
- [ ] Adotar/executar retenção no email e Netlify, incluindo spam/cópias.
- [ ] Confirmar deteção Forms, notificação `contact@rlopes.pt`, registo no painel e email/Reply-To.
- [ ] Rever logs de `/pt/privacy` no horário indicado; investigar 500 antes de produção.
- [ ] Autorizar separadamente ativação do ficheiro futuro, publicação de preview e posterior promoção de produção.

### PRODUCTION BLOCKERS

- Menções obrigatórias incompletas/por confirmar, sobretudo telefone do alojamento e identidade/domiciliação/regime a publicar.
- Retenção e informação sobre tratamentos privados ainda por operacionalizar/confirmar; não declarar política implementada.
- Canal comercial principal sem prova de deteção, receção e notificação real.
- **Promover Next.js mantendo publish global `dist` seria incorreto.** Substituir configuração ativa pelo artefacto preparado antes da migração aprovada.
- A ocorrência remota 500 exige esclarecimento/revalidação; retestes 200 não excluem falha intermitente.

Impedem aprovação de lançamento agora, mas não significam falha dos testes locais ou routing persistentemente avariado. A decisão é **OWNER ACTION REQUIRED**.

### NON-BLOCKING

- Melhorar LCP se houver ganho medido que preserve imagens; histórico 2,807 s.
- Ampliar Safari/iOS real, Firefox/leitor de ecrã; confirmar LinkedIn manualmente.
- Acompanhar atualização compatível do aviso dev da auditoria anterior.
- Rever plugin Cloudflare separadamente; o 401 não equivale a falha Next.js.
- Rever enquadramento dos termos SpoolIQ separadamente.

## 10. Git e âmbito

Base: `v2` em `2b83e05`; `master` preservada em `d4b41e8293dc6860f357d345cf2fa76e37afbad1`. Alterações pendentes da auditoria RGPD foram incorporadas. O commit local reúne privacidade/menções legais, proteção SEO de preview, testes e documentação, incluindo artefacto futuro inativo. Hash final no relatório de entrega, consultável com `git log -1 --oneline`.

Design, conteúdo comercial, seleção de projetos, implementação Forms e definições remotas não foram alterados. Evidências/temporários permanecem ignorados; emails reais, dumps de conta e segredos não foram guardados no commit.

## Seguimento de 3 de novembro de 2026

O proprietário aprovou o nome legal **Ricardo SILVA LOPES EI**, SIREN **107 688 467**, SIRET **107 688 467 00011**, domiciliação já apresentada, Insee **15/07/2026**, RNE/INPI **01/08/2026** e atividade **Programmation informatique / APE 62.01Z**. Estes valores foram aplicados às três línguas. O nome público Ricardo Lopes permanece. A ausência de número intracomunitário válido no registo não demonstra regime fiscal: retirada a afirmação art. 293 B/microempreendedor e criada confirmação de IVA separada, ainda falsa.

A identidade deixa de ser bloqueio pendente; a fonte da confirmação é a declaração expressa do proprietário de 03/11. `registrationScopeConfirmed` passou a true. Telefone oficial Netlify e adoção da conservação continuam pendentes, conforme reafirmado pelo proprietário.

O proprietário confirmou deteção do formulário e receção da notificação Gmail, bem como encaminhamento Cloudflare de contact@rlopes.pt, em testes de 02/11, 23h48–23h53 Europe/Paris. A visualização do registo na lista Netlify ainda não foi confirmada. A política identifica Gmail/Google e Cloudflare; não houve acesso a mensagens, alteração do email, SMTP ou exposição do encaminhamento privado.

O modelo de configuração futura foi aplicado à raiz apenas localmente em v2. Resolução offline production/master e contextos de preview passaram com .next/Node 22. Build/SEO de produção e preview, 62 testes, 12 rotas HTTP locais e seis vistas/scans Axe legais passaram depois das alterações. A produção permanece Vite, master intacta. Tag local de rollback criada; deploy ID remoto ainda por registar. Não foi feito merge, por persistirem os bloqueios detalhados no relatório de migração.

## Correção posterior de conservação e IVA — 3 de novembro de 2026

A política FR/PT/EN distingue pedidos sem seguimento, correspondência comercial e documentos contabilísticos, com arquivo proporcional e separado. O procedimento atual de [DATA-RETENTION.md](DATA-RETENTION.md) prevalece sobre instruções históricas de retenção. O proprietário confirmou expressamente franchise en base de TVA; `vatRegimeConfirmed` passou a true e nenhum número fiscal foi inventado. A implementação operacional da conservação/arquivo permanece pendente. Publicação, design e funcionalidades não foram alterados.
