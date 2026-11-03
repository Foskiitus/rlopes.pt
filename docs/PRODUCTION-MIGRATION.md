# V2.5 — preparação da migração de produção

**Estado: MIGRATION BLOCKED**

> Atualização posterior de 03/11/2026: franchise en base de TVA confirmada pelo proprietário; IVA deixa de ser pendência. A conservação foi corrigida por finalidade (12 meses / referência comercial de 5 anos / contabilidade 10 anos), sem eliminação indiscriminada. A organização e o arquivo ainda precisam de implementação. Ver [DATA-RETENTION.md](DATA-RETENTION.md). Configuração de publicação inalterada nesta correção.

Data: **3 de novembro de 2026**, Europe/Paris. Preparação local concluída em `v2`; **nenhum merge, push ou deploy executado**. A autorização para preparar não é autorização para publicar. O proprietário reiterou que não deve haver merge/publicação antes da aprovação final.

O código e a configuração passaram as verificações técnicas. A publicação permanece bloqueada pelas pendências legais e operacionais confirmadas abaixo. Não se solicita ainda aprovação de um push de produção como se essas pendências estivessem resolvidas.

## 1. Referências Git e estado Netlify

| Elemento | Estado/evidência |
| --- | --- |
| Destino real | **master**, confirmado por Git remoto e pelo proprietário como branch de produção Netlify; não existe branch remota `main`. Nenhuma branch renomeada. |
| Produção Git anterior | **d4b41e8293dc6860f357d345cf2fa76e37afbad1**; `master` e `origin/master` continuam neste commit. |
| Release V2 existente no início | **cca20ee6cd3b2593a554dc4a469b81ef18546960**, com correções legais/RGPD. `v2` e `origin/v2` estavam sincronizadas após fetch; contagem ahead/behind 0/0. |
| Preparação da migração | **baa7915659c462f453b406c49767bda9e4868bae**. A correção posterior de conservação/IVA permanece na mesma branch; consultar `git log -1 --format="%H %s" v2` para o HEAD local atualizado. Nenhuma alteração publicada. |
| Novo commit de produção | **Não existe**: merge bloqueado, `master` preservada. Testes executados sobre o candidato em `v2`, não sobre um merge realizado. |
| Referência de rollback Git | Tag local anotada **rollback/vite-master-2026-11-03**, apontando para `d4b41e8293dc6860f357d345cf2fa76e37afbad1`; não publicada. |
| Deploy ID de produção anterior | **Pendente**, ainda não registado pelo proprietário. A tag Git não é um deploy ID e não prova qual artefacto está atualmente publicado. |
| Deploy/commit atual do Branch Deploy | **Pendente de confirmação no painel**. Último commit que o proprietário verificou anteriormente: `2b83e05`; não assumido como atual. |
| Produção pública | `https://rlopes.pt/`: HTTP 200, recursos `/assets/` Vite e ausência de `/_next/` na resposta inspecionada. V2 ainda não publicada em produção. |
| Configuração remota privada | Sem CLI Netlify/projeto ligado/token disponível nesta sessão; painel não inspecionado pelo agente. Nenhuma definição remota alterada. |

`git fetch origin` foi executado, sem push. `origin/master` é ancestral de `v2`; não há divergência de produção a resolver no estado verificado. Isso não equivale a um merge já realizado. Os endpoints públicos GitHub de statuses, check-runs e deployments não disponibilizaram registos que identificassem os deploys; o estado vazio/pending da API não demonstra um build Netlify pendente.

## 2. Confirmações do proprietário e alterações legais

O proprietário confirmou expressamente em 03/11/2026 os dados abaixo, declarando base no registo empresarial francês. Essa confirmação é a fonte desta atualização; não se afirma ter reinspecionado uma captura que não está incluída neste turno.

| Dado | Valor aplicado |
| --- | --- |
| Nome legal | **Ricardo SILVA LOPES**, com designação EI; nome público/marketing continua Ricardo Lopes. |
| Forma jurídica | Entrepreneur individuel (EI). Removida a afirmação pública de regime microempreendedor não reconfirmado fiscalmente nesta passagem. |
| SIREN | **107 688 467** |
| SIRET | **107 688 467 00011**, fornecido explicitamente; não inferido a partir do SIREN. |
| Inscrição Insee | **15/07/2026**, apresentada em formato localizado. |
| Inscrição RNE/INPI | **01/08/2026**, apresentada em formato localizado. |
| Atividade / APE | Programmation informatique / **62.01Z**, traduzida em PT/EN. |
| Domiciliação | **Bâtiment 13, 390 avenue François Billoux, 13600 La Ciotat, France** |
| IVA | **Franchise en base de TVA confirmada expressamente pelo proprietário em 03/11/2026**. Informação pública: TVA non applicable. Nenhum número intracomunitário inventado nem regime deduzido da ausência de identificador. |

A referência RCS Marseille previamente corroborada no [BODACC](https://www.bodacc.fr/pages/annonces-commerciales-detail/?q.id=id:A20260148253) foi preservada, distinguindo-se dos novos dados RNE fornecidos pelo proprietário. As fontes históricas estão em [V2-FINAL-RELEASE.md](V2-FINAL-RELEASE.md).

`registrationScopeConfirmed` passou a `true` para identidade/registo; a confirmação fiscal permanece separada em **`vatRegimeConfirmed: true`**, atualizada só após confirmação expressa do regime pelo proprietário. `retentionPolicyConfirmed` continua `false`, telefone Netlify continua `null`. Os avisos de alojamento e estado operacional continuam corretos em FR/PT/EN; o regime de IVA já não é apresentado como desconhecido.

A informação de alojamento continua Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, United States, conforme [termos oficiais](https://www.netlify.com/legal/terms-of-use/). Telefone oficial permanece por verificar/completar. Não foi inventado.

## 3. Contacto e privacidade: confirmação não é inferência

Testes comunicados pelo proprietário: **02/11/2026, aproximadamente 23h48–23h53, Europe/Paris**.

| Verificação | Estado |
| --- | --- |
| `project-enquiry` em Active forms | **Confirmado pelo proprietário**. |
| Submissão real efetuada | **Confirmada pelo proprietário**, sem envio adicional pelo agente. |
| Submissão visível na lista do painel | **Pendente de confirmação visual**, conforme esclarecimento específico do proprietário. |
| Notificação recebida no Gmail | **Confirmada pelo proprietário**; não foi acedida a caixa de correio. |
| Email direto para `contact@rlopes.pt` | **Encaminhamento via Cloudflare Email Routing confirmado pelo proprietário**. |
| Respostas enviadas através do Gmail | Escolha intencional do proprietário; preservada. Sem SMTP ou serviço adicional. |
| Destinatário exato da notificação no painel | Não inferido do email apresentado no website. Receção confirmada; não foi alterada a configuração existente. |
| Consentimento/tracking | Nenhum tracker opcional identificado na auditoria existente; sem banner novo. Analytics, snippets, replay, log drains e integrações privadas continuam pendentes de revisão. |
| Conservação | [Política por finalidade](DATA-RETENTION.md): 12 meses propostos apenas para pedidos sem seguimento sem outra razão legal; referência comercial de 5 anos; contabilidade 10 anos. Arquivo separado dos elementos necessários após a relação. Organização/revisão/arquivo **ainda por implementar**. |

A política FR/PT/EN identifica agora os serviços efetivamente confirmados: Netlify Forms → notificação Gmail (Google); email direto ao endereço profissional → Cloudflare Email Routing → Gmail; respostas pelo Gmail. Garantias contratuais/transferências, logs e integrações adicionais continuam sujeitos a revisão. Não foi publicado o endereço pessoal, nem consultadas/eliminadas mensagens reais.

A visualização no painel deve ser feita para a submissão já enviada; não é necessário repetir o teste apenas para produzir mais notificações. Nenhum POST real ou envio de email foi feito nesta intervenção. Um teste adicional em produção exige autorização específica.

## 4. Configuração de produção aplicada localmente

Foi aplicado ao `netlify.toml` da raiz o conteúdo funcional do modelo preparado em `docs/deployment/netlify.production.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"

[context.production.environment]
  NEXT_PUBLIC_DEPLOY_CONTEXT = "production"

[context.deploy-preview.environment]
  NEXT_PUBLIC_DEPLOY_CONTEXT = "deploy-preview"

[context.branch-deploy.environment]
  NEXT_PUBLIC_DEPLOY_CONTEXT = "branch-deploy"
```

O override `[context.v2]` deixou de ser necessário. Depois de uma futura integração em `master`, o build usará `.next` globalmente, sem depender do nome da branch. Headers de segurança/blueprint foram preservados. Não há export estático, `distDir`, fallback Vite `/index.html`, SMTP, plugin legado ou dependência nova.

Esta alteração existe **apenas em `v2` local** até publicação autorizada. A `master` atual não recebeu ficheiros nem alterações de configurações da conta, e continua com Vite/`dist`. Não se modificou globalmente o painel Netlify.

O resolvedor oficial **@netlify/config 25.5.2**, offline, confirmou:

| Branch/contexto | Build | Publish | Node | Contexto SEO |
| --- | --- | --- | --- | --- |
| master / production | npm run build | .next | 22 | production |
| v2 / branch-deploy | npm run build | .next | 22 | branch-deploy |
| v2 / deploy-preview | npm run build | .next | 22 | deploy-preview |

Resolução offline não inclui plugins/variáveis privados nem executa OpenNext. A [Netlify documenta a integração automática OpenNext](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) e a [precedência da configuração do ficheiro/contextos](https://docs.netlify.com/build/configure-builds/file-based-configuration/). Versão efetiva do adaptador e empacotamento devem ser conferidos no próximo deploy autorizado; sucesso de `next build` não comprova runtime remoto.

O 401 anterior de `netlify-purge-cloudflare-on-deploy` continua separado. Nada foi desativado. Rever logs/impacto e necessidade do plugin; não ocultar a falha, alterar credenciais, DNS ou proxy. O eventual sucesso OpenNext e as respostas HTTP devem ser verificados independentemente desse erro.

## 5. Observações públicas de 3 de novembro

Captura HTTP iniciada às **00:17 UTC / 01:17 Europe/Paris**. Evidência local: `.impeccable/review/migration/preflight-remote.json`.

- Preview `/` → 307 `/fr`; nove páginas homepage/legal/privacidade FR/PT/EN → 200.
- `/pt/privacy` → 200 na consulta inicial e nos cinco retestes adicionais. **Causa do 500 de 2 de novembro ainda não identificada**; proprietário não consultou os logs e pediu manter investigação pendente.
- Preview `/robots.txt`, `/sitemap.xml`, `/__forms.html` → 200.
- Páginas do preview: header/metadados noindex e canonicals `https://rlopes.pt`. Robots permite crawling para leitura de noindex. A raiz redireciona para uma página protegida.
- Blueprint público contém os sete campos esperados; o atributo `data-netlify` já não está na resposta. É compatível com processamento da plataforma, mas não prova a presença de uma submissão na lista do painel.
- Conteúdo observado é compatível com as correções recentes; não prova o SHA exato publicado. Git remoto sincronizado não é prova de deploy correspondente.
- Produção atual: HTTP 200 e Vite. **Não há resultado de smoke test de uma V2 publicada em produção**, porque tal publicação não ocorreu.

## 6. Validação local após as confirmações

Node 22.23.4, Next.js 16.4.3. Nada foi redesenhado; homepage, projetos, animações, formulário, seletor e email profissional preservados.

| Verificação | Resultado |
| --- | --- |
| TypeScript e lint | Passaram, sem warnings ESLint. |
| Build production | Passou; 13 páginas estáticas. |
| SEO production | Passou nas nove páginas; index/follow, canonicals/hreflang/sitemap corretos e sem header noindex geral no manifesto. |
| Testes sobre build production | **62 passed (23,0 s)** após alterações legais/privacidade. Inclui desktop GSAP, mobile, idioma, imagens, formulário simulado, acessibilidade e cookies. |
| HTTP do servidor local production | **12 rotas**: raiz, nove páginas localizadas, robots e sitemap; 307/200 esperados, sem noindex geral. |
| Páginas legais atualizadas | FR/PT/EN × 390/1440 px: **seis vistas e seis scans Axe**, zero violações/erros/overflow; SIRET, APE, datas e nomes renderizados; ausência da afirmação art. 293 B. |
| Build e SEO preview | Passaram após os mesmos ajustes; noindex mantido exclusivamente no contexto apropriado. Build local final é de preview. |
| Resolução Netlify offline | Passou nos três contextos indicados. |
| Revisão de ficheiros | 117 ficheiros versionados inventariados, 85 textos verificados por padrões de chaves/credenciais/email pessoal; zero achados. Não equivale a prova absoluta de ausência de segredos. Novos documentos também revistos antes do commit. |
| `npm run check:production` | **Saída 1 intencional:** telefone Netlify e implementação da conservação/arquivo continuam pendentes. IVA foi entretanto confirmado; o comando não é declarado aprovado. |

Não foi repetido Lighthouse nem alterado package/lockfile. Métricas de desempenho anteriores são históricas. Capturas/evidências em `.impeccable/review/migration/` estão ignoradas; sem submissões, credenciais ou caixa de correio.

## 7. Bloqueios antes de merge/publicação

1. **Obter telefone oficial do alojamento.** Identidade/registo e franchise en base de TVA já foram confirmados; não voltar a tratá-los como desconhecidos.
2. **Implementar a conservação e o arquivo por finalidade** conforme [DATA-RETENTION.md](DATA-RETENTION.md) e rever integrações privadas/garantias. Não declarar eliminação/arquivo implementados ou analytics desativado.
3. **Confirmar a submissão existente na lista Netlify.** Notificação e encaminhamento já confirmados; não solicitar novamente esses testes.
4. **Investigar o 500 nos logs**, com rota/horário/evidências da auditoria anterior. Não o declarar resolvido só por retestes 200.
5. **Registar deploy ID de produção para rollback e SHA/deploy ID atual do preview.** Não confundir o `x-nf-request-id` guardado nas evidências com deploy ID.
6. Só então preparar o merge autorizado, repetir verificações sobre o resultado e pedir **aprovação final de publicação** com SHA e comandos exatos.

## 8. Integração e aprovação futura

O método previsto é **merge normal com commit de merge**, preservando ambos os históricos e a branch `v2`. Sem reset, force-push ou eliminação de branches. Nenhum dos comandos de integração/publicação abaixo foi executado.

Depois de resolver os bloqueios e obter autorização para o merge local:

```powershell
git fetch origin
git status --short
git log -1 --format="%H %s" v2
git log -1 --format="%H %s" origin/master
git switch master
git merge --ff-only origin/master
git merge --no-ff v2 -m "Merge V2.5 Next.js portfolio into master"
```

Antes de executar, a árvore tem de estar limpa e as refs têm de coincidir com os SHAs revistos. Se produção avançou ou houver divergência, parar e rever; não forçar. Resolver conflitos apenas após inspeção. A configuração Next.js já acompanha o candidato.

Executar novamente Node 22, typecheck/lint, build/SEO production, 62 testes (ou suite atual), build/SEO preview, check:production e resolução Netlify no resultado integrado. Os testes desta passagem não substituem a validação desse futuro merge.

**Checkpoint final obrigatório:** apresentar `git rev-parse master`, o commit anterior, os resultados do merge e o comando exato que publicará produção. A ação prevista, apenas após resposta explícita de aprovação, é:

```powershell
git -c push.followTags=false push origin master:master
```

Esse push pode disparar deployment automático de produção. Não publicar `v2`, tags ou outras refs implicitamente. Confirmar novamente as refs imediatamente antes do push; sem `--force`. Se o modelo de acesso/painel não permitir acompanhar o deploy, resolver essa limitação antes de publicar.

Depois da aprovação/publicação, monitorizar o deploy real: ID, SHA do merge, contexto production, npm run build, `.next`, Node 22, adaptador OpenNext, Forms, erros e eventual Cloudflare 401. Não concluir sucesso apenas pela indicação Deploy successful.

## 9. Smoke tests de produção ainda por executar

No domínio `https://rlopes.pt`, após publicação autorizada:

- `/`, `/fr`, `/pt`, `/en`, `/fr/legal`, `/pt/legal`, `/en/legal`, `/fr/privacy`, `/pt/privacy`, `/en/privacy`, `/robots.txt`, `/sitemap.xml`.
- Redirects e HTTP 200/307/308 esperados, sem 404/500 inesperado; index/follow sem noindex geral, canonical/hreflang e sitemap de produção.
- Imagens, layout móvel, navegação, idiomas, GSAP desktop, CTAs, links profissionais e ausência de erros de console.
- Blueprint/deteção Forms e configurações de notificação preservadas. **Submissão real de produção apenas com autorização específica**, nunca vários testes inadvertidos.

Registar resultados e deploy ID antes de mudar o estado deste documento para PRODUCTION DEPLOYED AND VERIFIED. Não usar os resultados do Vite atual ou do preview como substituto.

## 10. Rollback

**Referência Git preservada:** `rollback/vite-master-2026-11-03` → `d4b41e8293dc6860f357d345cf2fa76e37afbad1`.

**Deploy Netlify a restaurar: PENDENTE.** O proprietário deve abrir o deployment de produção atualmente publicado e guardar ID/URL/SHA, confirmando que é a versão Vite funcional e que permanece disponível. Até isso acontecer, não há um artefacto remoto de rollback inequivocamente identificado.

Se a migração falhar, com autorização:

1. Abrir na Netlify o deploy anterior identificado, verificar contexto/commit e usar **Publish Deploy** para republicar esse artefacto existente. Não o reconstruir com o novo netlify.toml Next.js.
2. Confirmar HTTPS, domínio e rotas da versão Vite restaurada.
3. Rever publicações automáticas pendentes; considerar lock do deploy mediante autorização, para evitar que um novo build o sobrescreva. Ver [rollback/locked deploys oficiais](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/).
4. Preservar Forms, dados, notificações, DNS e domínio. Restaurar website não é apagar submissões.
5. Se necessário alinhar Git, preparar/rever `git revert -m 1 <SHA_DO_MERGE>` em branch própria, testar e obter aprovação antes de publicar o revert. Não usar reset ou force-push. O SHA só existirá quando houver merge; não inventado neste relatório.

A tag local assegura recuperação do código, mas não substitui o deployment anterior, nem reproduz automaticamente as definições históricas do painel. A produção e o histórico permanecem intactos.
