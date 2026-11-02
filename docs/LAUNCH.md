# Portfolio V2.5 — preparação do lançamento

Atualizado em 2 de novembro de 2026. Estado: **READY FOR PREVIEW**. Consultar [a auditoria](PRELAUNCH-AUDIT.md) para resultados e limitações.

A branch de trabalho é `v2`. O checkpoint local da implementação aprovada é `792f529`; as correções da auditoria ficam num commit separado. `master` mantém-se em `d4b41e8`. Não houve push, merge, alteração da conta Netlify ou deployment. A consulta pública do GitHub não encontrou um PR aberto de `v2`; não foi disponibilizado um URL de preview nem acesso ao projeto Netlify. Isto não prova que não exista um branch deploy na conta.

## A — Bloqueios antes de substituir a produção

- [ ] **Identidade e registo:** confirmar o nome civil completo com a designação EI, a domiciliação profissional, o telefone, o SIREN e a inscrição RNE/RCS aplicável à atividade de desenvolvimento. Os dados existentes provêm das páginas públicas da Loprim3D; estas usam duas formas do nome. Confirmar também a aplicação do regime microempreendedor e da declaração de IVA apresentada. Completar as menções aplicáveis com dados autorizados, sem inventar SIRET ou número de IVA.
- [ ] **Alojamento:** obter o telefone oficial da Netlify. A morada foi confirmada nos [termos oficiais, secção 15](https://www.netlify.com/legal/terms-of-use/): 101 2nd Street, San Francisco, CA 94105, United States. O telefone continua `null` e a página de preview assinala a verificação pendente.
- [ ] **Privacidade operacional:** confirmar e aplicar a política proposta de eliminação de pedidos sem seguimento até 12 meses após o último contacto. Abranger Netlify Forms e as caixas de correio utilizadas. Este prazo é uma decisão do responsável, não uma obrigação legal universal. Rever o DPA, os fornecedores de email, os subprocessadores e as transferências internacionais da configuração efetivamente utilizada.
- [ ] **Contacto real:** observar uma submissão do preview no painel Netlify, a notificação através de `contact@rlopes.pt` e o Reply-To correto. Os testes locais não demonstram receção pela plataforma ou entrega de email.
- [ ] **Se houver clientes consumidores:** confirmar a adesão e as menções do mediador de consumo aplicável. A ausência de pagamento online, por si só, não afasta esta obrigação. Para atividade exclusivamente B2B, documentar essa situação. Ver [orientação oficial do Ministério da Economia](https://www.economie.gouv.fr/mediation-conso/vous-etes-un-professionnel/vos-principales-obligations-0).

As exigências de identificação e alojamento são descritas no [Service Public](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr). As informações de recolha e direitos seguem a [orientação da CNIL](https://www.cnil.fr/fr/informer-les-personnes). Esta checklist não certifica conformidade jurídica.

Só depois da confirmação factual, atualizar `registrationScopeConfirmed` e `retentionPolicyConfirmed` em `src/data/site.ts` e completar o telefone do alojamento. Executar `npm run check:production`: o código de saída 1 atual é esperado. Este comando verifica apenas os campos pendentes no repositório; não substitui os restantes pontos desta lista.

## B — Verificações e decisões do proprietário

- [ ] Autorizar explicitamente o push e a criação de um preview. A autorização desta auditoria abrange commits locais, não publicação.
- [ ] Confirmar no painel que a branch de produção continua `master` e que previews estão permitidos. Preservar o publish global `dist` da produção Vite; no log de `v2`, confirmar a leitura de `netlify.toml` do commit correto e o publish `.next` de `[context.v2]`, sem fallback SPA.
- [ ] Confirmar receção e encaminhamento do alias `contact@rlopes.pt` no fornecedor de email. A caixa pessoal de destino deve permanecer apenas nas definições privadas desse fornecedor.
- [ ] Validar o formulário e as notificações com o procedimento abaixo; verificar quotas, spam e o estado da conta.
- [ ] Rever o site num telemóvel real, incluindo Safari/iOS, teclado aberto, seleção de idioma, zoom, foco e movimento reduzido. Os testes desta auditoria usam Chrome com emulação e gestos sintetizados.
- [ ] Confirmar manualmente o perfil LinkedIn original; a inspeção automatizada recebeu HTTP 999, que não demonstra um link quebrado.
- [ ] Autorizar separadamente a promoção para produção, depois de resolver A e validar o preview.

## C — Melhorias opcionais

- Investigar LCP móvel abaixo de 2,5 s sem degradar a imagem principal. O resultado local atual e as condições de medição constam da auditoria; não há dados reais de utilizadores.
- Atualizar as ferramentas de lint quando houver uma solução compatível para [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). O aviso está nas dependências de desenvolvimento; não executar `npm audit fix --force` nem impor minimatch 11 às dependências que exigem a API 3.
- Ampliar cobertura Firefox/WebKit e testes com leitor de ecrã. Uma futura CSP deve começar com avaliação de compatibilidade/report-only, não com regras copiadas que bloqueiem a hidratação do Next.js.

## Criar um preview após autorização

1. Rever `git status` e os commits locais em `v2`. Após autorização para publicar, fazer push e abrir PR para `master`, sem merge.
2. No projeto Netlify existente, confirmar a branch de produção e as regras de Deploy Previews. Um branch deploy de `v2` é alternativa; não associar `rlopes.pt` a esse preview.
3. Confirmar a branch `v2`, `npm run build`, publish `.next`, Node 22 e o adaptador OpenNext automático no log. O comando e o publish devem indicar origem `config`, através de `[context.v2]`. A aplicação usa Next.js 16.4.3 e não precisa de servidor personalizado, base de dados ou adaptador legado fixado.
4. Ativar deteção de formulários antes do build autorizado. Confirmar o blueprint e `project-enquiry` no artefacto estático/painel.
5. Abrir o URL devolvido pelo deployment e repetir as verificações de rotas, imagens, animação, formulário e SEO. A execução local de `next build` não gera nem valida o pacote final do adaptador Netlify.

Configuração conferida com [Next.js na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) e [OpenNext Forms](https://opennext.js.org/netlify/forms), consultados durante a auditoria de 1–2 de novembro de 2026. Não foram alteradas definições remotas.

## Isolamento do deployment de `v2`

O diagnóstico comunicado pelo proprietário mostrou `npm run build`, publish `dist`, base `/` e HTTP 404, com `server`, `cache` e `build-manifest.json` no File Explorer. Estes são artefactos internos do Next.js, não um website estático pronto a servir. O código local não define `distDir` nem `output: "export"`: `next build` gera `.next`, que precisa do adaptador OpenNext para preparar funções, rotas e ficheiros públicos.

Antes desta correção, o `netlify.toml` local já definia `.next` e Node 22 globalmente. A diferença relativamente ao deployment observado não pode ser explicada só pelos valores do painel: [as definições do ficheiro prevalecem sobre as da UI](https://docs.netlify.com/build/configure-builds/file-based-configuration/). No próximo build autorizado, confirmar o commit, a branch, o caminho do ficheiro de configuração, o contexto e a configuração resolvida. Se continuar a resolver `dist` para `v2`, investigar por que não está a carregar este ficheiro/contexto; não mudar o publish global da produção.

A correção conserva `npm run build` e `dist` em `[build]`. Apenas `[context.v2]` substitui o publish por `.next`, com Node 22 em `[context.v2.environment]`. Os contextos de preview mantêm os indicadores de não indexação. Não há fallback para `/index.html`, configuração de exportação estática ou adaptador legado fixado. O [OpenNext recomenda `.next` e deteção automática do framework](https://opennext.js.org/netlify).

Validação local com o resolvedor oficial `@netlify/config@25.5.2`, em modo `--offline`, sem consultar nem alterar a conta:

| Branch simulada | Contexto | Build | Publish resolvido | Node definido pelo ficheiro |
| --- | --- | --- | --- | --- |
| `v2` | `branch-deploy` | `npm run build` | `.next` | `22` |
| `v2` | `deploy-preview` | `npm run build` | `.next` | `22` |
| `master` | `production` | `npm run build` | `dist` | nenhum |

Esta comparação aplica o ficheiro atual aos três contextos; não é uma leitura da configuração remota. A `master` real permanece em `d4b41e8`, sem `netlify.toml`, com o seu build Vite e as definições existentes do painel. Nenhum ficheiro dessa branch nem configuração da conta foi alterado. A validação offline também não executa o adaptador nem o post-processing da Netlify.

O erro 401 do plugin de limpeza Cloudflare é separado desta correção. Não existe configuração desse plugin no repositório; verificar a instalação e as credenciais privadas no painel numa intervenção própria, sem alterar agora os plugins ou definições globais que servem a produção.

`Skipping form detection` significa que a deteção não foi executada naquele deployment. O blueprint e o POST estático já seguem a integração OpenNext; confirmar **Forms → Form detection → Enable form detection** antes de um novo deployment autorizado. Esta é uma definição do projeto, não uma definição isolada de `[context.v2]`, e não foi alterada. A deteção real e a entrega de notificações continuam por validar no preview, seguindo o procedimento abaixo.

## Formulário e notificações — verificação obrigatória no preview

O formulário mantém `POST /__forms.html`, `Content-Type: application/x-www-form-urlencoded` e sete campos: `form-name`, `bot-field`, `locale`, `name`, `email`, `project-type`, `message`. O nome é `project-enquiry`. `public/__forms.html` é o blueprint estático com `data-netlify="true"` e honeypot; atributos colocados apenas num componente React não bastam. O endpoint está fora do proxy de idiomas.

1. Ativar a deteção em **Forms**, depois gerar o preview autorizado. A deteção não é retroativa. Confirmar o formulário e os sete campos.
2. Em **Forms → Submission notifications**, criar/editar a notificação por email de `project-enquiry`, com destinatário **contact@rlopes.pt**. Não alterar as notificações do projeto separado Loprim3D.
3. Enviar no preview um pedido claramente identificado, por exemplo nome “TESTE PREVIEW V2.5” e uma mensagem explicando que é uma verificação autorizada. Usar um email controlado pelo proprietário, sem o guardar em fixtures ou relatórios públicos.
4. Confirmar o registo em Netlify Forms e os valores dos campos. Se não aparecer, consultar spam, deteção, logs e quotas.
5. Confirmar a notificação recebida através do alias profissional, incluindo a pasta de spam. O campo do visitante `name="email"` fornece Reply-To; não define o destinatário da notificação.
6. Verificar no cliente de email que uma resposta se dirige ao endereço de teste do visitante. Não publicar cabeçalhos da mensagem nem o destinatário privado do encaminhamento.
7. Testar erro de rede/repetição, navegação por teclado, mensagem de sucesso, novo pedido e contacto direto. Eliminar os dados de teste do painel e das caixas de correio após a validação.

O endereço visível não configura notificações. `netlify.toml` não contém destinatário. Referências: [deteção e envio](https://docs.netlify.com/manage/forms/setup/) e [notificações](https://docs.netlify.com/manage/forms/notifications/).

A validação cliente facilita o preenchimento; não é validação de servidor personalizada. A filtragem de spam/honeypot pertence à plataforma. Em `next start`, um POST real não é processado pelo Netlify Forms. Playwright interceta esses pedidos; a auditoria não enviou emails nem confirmou entrega real.

## Indexação, rotas e ambiente

- Canonicals, Open Graph e sitemap usam sempre `https://rlopes.pt`, em FR/PT/EN; o português usa `pt-PT`.
- `/` usa francês ou a escolha explícita guardada. `/portfolio` redireciona permanentemente para `/pt#work`; os equivalentes localizados preservam o idioma.
- O sitemap contém nove páginas: homepage, legal e privacidade em cada idioma.
- `isPreview()` lê `CONTEXT` antes de `NEXT_PUBLIC_DEPLOY_CONTEXT`. Só `production` ativa indexação. `netlify.toml` define o fallback dos previews e branch deploys. Não definir uma variável global de preview que substitua o contexto correto do build.
- Os metadados estáticos são decididos no build. Uma mudança de contexto exige reconstrução; não basta mudar a variável em `next start`.
- O blueprint tem `noindex,nofollow`; propostas de design, `.env` e `.git` não são rotas públicas. `noindex` não constitui controlo de acesso; usar proteção de acesso do host se o preview tiver de ser privado.
- Confirmar no preview HTTPS os headers configurados (`nosniff`, Referrer-Policy, Permissions-Policy, X-Robots-Tag do blueprint), porque `next start` não aplica `netlify.toml`.

Verificação local reproduzível, com Node 22:

```sh
npm ci
npm run typecheck
npm run lint
npm run build
node scripts/check-build-seo.mjs preview
npm test
npm audit --omit=dev
npm audit
npm run check:production
```

Para testar exclusivamente o contexto de produção em PowerShell:

```powershell
$env:CONTEXT = 'production'
npm run build
node scripts/check-build-seo.mjs production
Remove-Item Env:CONTEXT
npm run build
node scripts/check-build-seo.mjs preview
```

Os dois últimos comandos restauram um build local não indexável. As medições e capturas da auditoria estão em `.impeccable/review/prelaunch/`, ignoradas pelo Git.

## Promoção e recuperação

Uma futura migração de Next.js para `master` exige preparar e rever a configuração de produção própria: a correção atual aplica-se apenas a `v2`. Após resolver A, validar B e receber autorização explícita, seguir o processo normal de revisão/merge para a branch de produção. Confirmar o commit publicado, indexação, headers e formulário no domínio real. Manter o deployment anterior disponível para rollback no painel Netlify. Nenhuma destas ações remotas foi executada nesta auditoria.