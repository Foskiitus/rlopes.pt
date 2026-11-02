# Portfolio V2.5 — preparação do lançamento

Atualizado em **2 de novembro de 2026**. Estado: **OWNER ACTION REQUIRED**.

O [relatório final](V2-FINAL-RELEASE.md) é a referência atual: fontes legais, observações locais/remotas, retenção, formulário, migração e rollback. A [auditoria anterior](PRELAUNCH-AUDIT.md) conserva medições históricas; a [auditoria RGPD/CNIL](GDPR-COOKIE-AUDIT.md) detalha cookies e tratamentos.

Trabalho apenas em `v2`. `master` permanece em `d4b41e8`, com Vite. O preview público foi consultado em `https://v2--deft-frangipane-131671.netlify.app`; produção `https://rlopes.pt` permanece intacta. Não houve push, merge, deployment, alteração de DNS ou configurações remotas. As correções locais ainda precisam de publicação autorizada para chegar ao preview.

## Antes de aprovar produção

- [ ] Confirmar nome civil completo, domiciliação profissional, telefone, registo atual e regime microempreendedor/IVA. Loprim3D, API oficial e BODACC foram cruzados; o BODACC inclui um prenome adicional. Fontes e diferenças estão no relatório final. Confirmar âmbito B2C/mediação se aplicável.
- [ ] Completar telefone oficial da Netlify. Nome/morada confirmados nos [termos oficiais, secção 15](https://www.netlify.com/legal/terms-of-use/); não inventar contacto.
- [ ] Adotar e executar a rotina manual de retenção proposta: pedidos sem projeto até 12 meses após último contacto substantivo, revisão mensal que respeite o prazo, email/Netlify Forms/spam/exportações/cópias. Clientes seguem necessidades contratuais e legais próprias. Procedimento completo na secção 3 do relatório final; não está implementado nem automatizado.
- [ ] Verificar Analytics/Web Analytics, snippets, Session Replay, pixels, plugins, webhooks, log drains, DPA/email/transferências e retenção de logs no painel. Estado privado continua desconhecido; não presumir desativação.
- [ ] Confirmar deteção e entrega Forms com o teste acompanhado abaixo.
- [ ] Rever logs da resposta 500 isolada em `/pt/privacy` observada em 02/11/2026, captura iniciada às 19:21 UTC. Visita no browser e cinco retestes deram 200; causa não estabelecida.
- [ ] Levar a mudança global Next.js para a configuração de produção **antes** do merge autorizado; `[context.v2]` não se aplica a `master`.

Só após confirmação factual atualizar `registrationScopeConfirmed`, `retentionPolicyConfirmed`, telefone do alojamento e textos FR/PT/EN. `npm run check:production` devolve atualmente **1 esperado**. É uma verificação limitada de campos locais; mesmo depois de passar não substitui validação operacional/jurídica.

## Configuração atual: produção antiga protegida

O `netlify.toml` ativo mantém `[build]` com `npm run build` e `dist`. Apenas `[context.v2]` substitui publish por `.next`, com Node 22 em `[context.v2.environment]`. A `master` real continua sem este ficheiro, com Vite e definições existentes do painel. Não alterar publish global da conta para corrigir preview.

O Next.js atual não usa `distDir` ou export estático. `.next` contém output interno que o adaptador Netlify/OpenNext processa; não basta publicar os ficheiros `server`, `cache` e manifests como website estático. Não usar fallback `/* /index.html 200`, servidor personalizado ou adaptador legado fixado.

A resolução oficial offline confirmou atual `v2` → `.next`/Node 22, e produção simulada com ficheiro atual → `dist`. O [ficheiro futuro](deployment/netlify.production.toml) resolve `.next`/Node 22 em production, branch-deploy e deploy-preview. **Está inativo:** não substituir `netlify.toml` agora. O [relatório final, secções 5 e 8](V2-FINAL-RELEASE.md) descreve a ativação em commit separado aprovado.

`next build` e resolução offline não validam empacotamento OpenNext ou post-processing remoto. No próximo deploy autorizado confirmar commit, branch/contexto, ficheiro carregado, build, publish, Node, versão do adaptador e logs. Valores do [ficheiro prevalecem sobre UI](https://docs.netlify.com/build/configure-builds/file-based-configuration/).

O erro 401 de `netlify-purge-cloudflare-on-deploy` é separado. Rever necessidade/credenciais privadamente; considerar exclusão de previews apenas se suportada e após avaliar impacto. Não alterar plugin partilhado, DNS ou proxy sem autorização.

## Forms e notificações: validação obrigatória

Blueprint `public/__forms.html`, nome `project-enquiry`, honeypot e `POST /__forms.html` preservados. Envio `application/x-www-form-urlencoded` com `form-name`, `bot-field`, `locale`, `name`, `email`, `project-type`, `message`. Endpoint fora do proxy de idiomas. Não basta colocar atributos num componente React.

1. Confirmar/ativar deteção em **Forms → Form detection**, se necessário e autorizado. A definição é partilhada pelo projeto. O anterior `Skipping form detection` não prova deteção ativa; GET 200 do blueprint também não.
2. Gerar novo preview autorizado após ativação; confirmar log e formulário/campos no painel. Deteção não é retroativa.
3. Em **Forms → Submission notifications**, configurar/verificar destinatário **contact@rlopes.pt**. Confirmar alias no fornecedor privado. O email apresentado no website não altera a notificação; `netlify.toml` não contém destinatário. Não publicar encaminhamento pessoal nem alterar projeto Loprim3D.
4. Enviar **uma** submissão `TESTE PREVIEW V2.5` com email controlado pelo proprietário e mensagem de teste. Não guardar esse endereço no repositório. Anotar hora/URL.
5. Confirmar sucessivamente HTTP real, registo no painel, campos, notificação recebida e Reply-To para o visitante de teste. Se faltar, rever spam/quotas/logs/deteção antes de repetir.
6. Confirmar feedback e possibilidade de novo pedido; eliminar dados de teste na Netlify/email após validação.

**Estado atual:** estrutura e simulações aprovadas; POST real, deteção no painel, registo e email não verificados. Playwright interceta pedidos, não envia mensagens. `next start` não processa Netlify Forms. Referências: [setup](https://docs.netlify.com/manage/forms/setup/), [notificações](https://docs.netlify.com/manage/forms/notifications/), [OpenNext Forms](https://opennext.js.org/netlify/forms).

## SEO, idiomas e cookies

- `/` abre FR ou a escolha explícita guardada; `/fr`, `/pt`, `/en` funcionam diretamente. Redirects permanentes antigos preservados; sem fallback SPA.
- Canonicals, Open Graph, hreflang e sitemap usam `https://rlopes.pt`; PT usa `pt-PT`. Sitemap contém nove páginas.
- Preview local: metadados/header `noindex, nofollow` com robots `Allow: /` para permitir leitura de noindex. O antigo `Disallow: /` impedia essa leitura; ver [orientação Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- Produção compilada: `index, follow`, sem header noindex geral, robots crawlable; blueprint mantém exclusão própria. Reconfirmar HTTP no deploy real: `next start` não aplica os headers de `netlify.toml`.
- `CONTEXT` prevalece sobre `NEXT_PUBLIC_DEPLOY_CONTEXT`; apenas production ativa indexação. Metadados são decididos no build, não ao mudar variáveis de um servidor já compilado.
- Noindex não controla acesso. Se preview precisar de privacidade, avaliar proteção do host separadamente.
- Nenhum tracker não essencial encontrado; sem banner. Cookie `NEXT_LOCALE` apenas por escolha explícita, até um ano; navegar não o renova. Painel privado ainda pendente.

## Verificação local e publicação futura

Com Node 22, executar typecheck/lint, build com `CONTEXT=production` e `node scripts/check-build-seo.mjs production`; depois build com `CONTEXT=branch-deploy`, verificador `preview`, `npm test` e `npm run check:production`. Comandos PowerShell completos no relatório final. Resultados atuais: **62 testes, 45 vistas, 18 scans Axe**, dois builds e ambos os contextos SEO aprovados. Lighthouse 96/LCP 2,807 s/CLS 0 são medições históricas, não refeitas nesta passagem.

Após fechar as pendências, preparar o commit da configuração global Next.js e repetir validações. Obter autorização para push/preview, validar deployment e Forms, e **autorização separada** para merge/promoção de `master`. Manter domínio/DNS/branch de produção. Não presumir que o ficheiro ativo específico de `v2` funcionará em `master`.

Antes da migração, registar o deploy Vite funcional para rollback. Se necessário, republicar esse artefacto existente mediante autorização, sem reconstrução com configuração Next.js; rever publicações automáticas que o possam substituir. Preservar histórico, recursos antigos e dados Forms; eventual revert de Git deve ser revisto, sem reset/force-push. Plano exato no relatório final.

## Verificações complementares

Confirmar LinkedIn manualmente (HTTP 999 automatizado), Safari/iOS real e leitor de ecrã. Investigar LCP só com ganho demonstrado que preserve imagens. Acompanhar aviso dev histórico sem `npm audit fix --force` ou override incompatível. Rever termos portugueses da SpoolIQ numa intervenção própria.
