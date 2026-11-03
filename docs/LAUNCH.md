# Portfolio V2.5 — lançamento

Atualizado em **3 de novembro de 2026**. Estado: **MIGRATION BLOCKED**.

A preparação técnica local está concluída em `v2`; faltam os pontos operacionais/legais abaixo. O [relatório de migração](PRODUCTION-MIGRATION.md) é a referência atual. O [release candidate de 2 de novembro](V2-FINAL-RELEASE.md) e a [auditoria RGPD](GDPR-COOKIE-AUDIT.md) conservam fontes/evidências anteriores.

`master` é o destino real, confirmado pelo Git e pelo proprietário no painel Netlify. Continua em `d4b41e8293dc6860f357d345cf2fa76e37afbad1`, com a produção Vite intacta. A V2 publicada no Git no início era `cca20ee`; a preparação desta passagem ainda não foi publicada. **Sem push, merge, deployment, DNS ou alterações de conta.**

## Confirmado e aplicado

- Identidade/registo confirmados pelo proprietário: Ricardo SILVA LOPES EI, SIREN 107 688 467, SIRET 107 688 467 00011, Insee 15/07/2026, RNE/INPI 01/08/2026, atividade programação informática/APE 62.01Z e domiciliação em Bâtiment 13, 390 avenue François Billoux, La Ciotat. Menções atualizadas em FR/PT/EN; nome público Ricardo Lopes preservado.
- O proprietário confirmou **franchise en base de TVA** em 03/11/2026. Menção FR/PT/EN atualizada para TVA/IVA não aplicável; `vatRegimeConfirmed: true`. Nenhum número intracomunitário foi inventado.
- O proprietário confirmou `project-enquiry` em Active forms, teste real, notificação recebida no Gmail e encaminhamento de `contact@rlopes.pt` via Cloudflare. Testes em 02/11/2026, aproximadamente 23h48–23h53, Europe/Paris. **Apenas a visualização da submissão na lista continua pendente.**
- Respostas através do Gmail são intencionais. Política identifica Gmail/Google e Cloudflare Email Routing; não foi acrescentado SMTP ou revelado destinatário pessoal. Garantias/transferências privadas ainda precisam de revisão.
- Nenhum tracker opcional demonstrado; sem banner. `NEXT_LOCALE` permanece funcional, apenas após escolha explícita, até um ano; navegar não renova a preferência.

## Pendências antes de merge/publicação

- [ ] Rever âmbito B2C/mediação se aplicável. O regime de franchise en base de TVA já foi confirmado.
- [ ] Obter telefone oficial Netlify; nome/morada estão verificados nos [termos oficiais](https://www.netlify.com/legal/terms-of-use/), telefone continua `null`.
- [ ] Aplicar a [conservação por finalidade e arquivo separado](DATA-RETENTION.md): 12 meses propostos só para pedidos sem seguimento sem outra justificação legal; referência de 5 anos para contratos/correspondência comercial; 10 anos para documentos contabilísticos a partir do encerramento do exercício. Rever Gmail, Netlify Forms e cópias, preservando prova necessária. Organização/revisão/arquivo ainda por implementar; nenhuma eliminação automática.
- [ ] Rever Analytics/Web Analytics, snippets, replay, pixels, webhooks, log drains, plugins, contratos/transferências e retenção de logs. Estado privado desconhecido, não presumido desativado.
- [ ] Localizar no painel a submissão já testada, verificando também spam. Evitar repetir pedidos reais desnecessariamente; notificação/encaminhamento já confirmados.
- [ ] Investigar logs do 500 de `/pt/privacy` observado em 02/11/2026. As seis consultas de 03/11 devolveram 200; causa ainda não identificada pelo proprietário.
- [ ] Guardar deploy ID/URL/commit da produção Vite atual e do preview atual. Último commit verificado anteriormente no painel era `2b83e05`; não considerado necessariamente atual.

`registrationScopeConfirmed: true` reflete confirmação de identidade/registo. `vatRegimeConfirmed: true` regista o regime agora confirmado. `retentionPolicyConfirmed: false` e telefone Netlify nulo mantêm **check:production com saída 1 esperada**. Só atualizar com confirmação factual; esse comando não substitui o checklist externo.

## Netlify: configuração preparada na raiz

O modelo `docs/deployment/netlify.production.toml` foi aplicado ao `netlify.toml` **local de v2**: `npm run build`, publish global `.next`, Node 22 global e contexto production explícito. O override `[context.v2]` deixou de ser necessário. Os previews preservam os seus contextos de SEO.

Isto permite que a futura `master` Next.js use `.next`, sem depender do nome `v2`. Não altera a `master` atual nem o publish do painel enquanto não houver integração/publicação autorizada. O modelo guardado em docs passa a referência, não a configuração ativa do build.

Resolvedor oficial @netlify/config 25.5.2, offline: production/master, branch-deploy/v2 e deploy-preview/v2 resolveram `.next`, Node 22 e indicadores de ambiente corretos. Não há fallback `/index.html`, export estático ou adaptador legado. A [integração OpenNext é automática](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), mas runtime/versão/empacotamento efetivos devem ser confirmados no próximo deploy autorizado.

O 401 do plugin Cloudflare é separado. Rever logs e impacto sem desativar globalmente, alterar credenciais, DNS ou proxy. Não tratar Deploy successful como prova suficiente.

## Forms e SEO preservados

Blueprint `public/__forms.html`, `project-enquiry`, honeypot, endpoint `POST /__forms.html` e URL encoding preservados. Sete campos: form-name, bot-field, locale, name, email, project-type, message. Testes locais intercetam POST; não enviam emails. Email visível não configura destinatário de notificações; não alterar a conta existente por suposição.

Preview público: raiz 307 para FR, nove páginas 200, blueprint/robots/sitemap 200. Blueprint já sem `data-netlify`, compatível com processamento pela plataforma. Confirmar a submissão no painel, independentemente desse indício.

Preview: metadados/header noindex e robots `Allow: /` para permitir leitura da diretiva. Produção compilada/HTTP local: index/follow e sem noindex geral. Canonicals, hreflang e sitemap continuam `https://rlopes.pt`; português `pt-PT`. Blueprint mantém exclusão própria. `CONTEXT` prevalece sobre `NEXT_PUBLIC_DEPLOY_CONTEXT`; contexto é decidido no build.

## Validação e aprovação final

Após as últimas alterações: TypeScript/lint, builds/SEO production e preview, **62 testes**, 12 rotas HTTP locais e seis vistas/scans Axe das páginas legais passaram. Resolução Netlify offline aprovada. O build local final voltou a preview. Evidências ignoradas em `.impeccable/review/migration/`.

O merge ainda não ocorreu. Quando os bloqueios forem resolvidos e o proprietário autorizar, fazer merge normal em `master` e repetir a suite sobre esse resultado. Apresentar SHA e comando exato antes da aprovação final do push:

```powershell
git -c push.followTags=false push origin master:master
```

**Não executado.** Publica apenas master, sem tags/branches adicionais ou force-push. O push poderá disparar produção; exige confirmação expressa. Monitorizar commit/contexto/build/OpenNext e executar smoke tests reais de todas as rotas, imagens, GSAP/mobile, SEO e Forms. Novo teste real de formulário em produção requer autorização específica. Comandos e etapas completos em [PRODUCTION-MIGRATION.md](PRODUCTION-MIGRATION.md).

## Rollback

Tag local `rollback/vite-master-2026-11-03` preserva o commit `d4b41e8293dc6860f357d345cf2fa76e37afbad1`. **Deploy ID Netlify ainda pendente**: obter antes de aprovar produção; tag Git não o substitui.

Se necessário e autorizado, republicar o deploy Vite anterior pelo botão Publish Deploy, sem reconstruí-lo com configuração Next.js. Rever auto publishing/lock para evitar sobrescrita. Preservar Git, recursos antigos, dados Forms, notificações e DNS. Eventual revert do merge deve ser revisto/testado; nunca reset/force-push. Procedimento e limites no relatório de migração.
