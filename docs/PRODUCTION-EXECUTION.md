# V2.5 — execução autorizada da migração

Registo de 03/11/2026, Europe/Paris, preparado após a validação do resultado integrado e antes do push. Este documento substitui as instruções de aprovação dos relatórios anteriores, que ficam como histórico. Não constitui prova de publicação remota.

## Autorização atual

O proprietário autorizou expressamente o merge normal de v2 para master e o push de master, permitindo o deployment automático Netlify. Revogou a condição anterior de bloquear auto-publishing e dispensou nova aprovação para esse push/deploy. A ausência de acesso autenticado à Netlify ou de deploy ID remoto não deve impedir o push. Não alterar DNS, domínios, auto-publishing, notificações ou dados Forms; não eliminar v2, reescrever histórico ou fazer force-push.

As pendências operacionais/legais já registadas continuam factualmente pendentes; a autorização de publicação não as resolve. A rotina de conservação/arquivo não foi implementada nesta passagem, o telefone Netlify continua por confirmar, e não foram verificados os serviços privados nem os logs do antigo 500 intermitente.

## Referências preservadas

- Produção Git anterior: **d4b41e8293dc6860f357d345cf2fa76e37afbad1**, confirmada por fetch e API pública GitHub antes da integração.
- Candidato v2: **3395eadc97f8dcfab248f7eee9a5bf78e81df8e7**, incluindo as correções legais, privacidade, conservação por categoria e franchise en base de TVA.
- Tag anotada local **rollback/vite-master-2026-11-03**: objeto **dbc6a69737c78e238abe68a844703cbb82e29dc4**, destino **d4b41e8293dc6860f357d345cf2fa76e37afbad1**. Preservada sem substituição/publicação implícita.
- O commit que contém este registo é o merge normal de master com v2; consultar os seus dois pais com git show --no-patch --format=fuller --format='%H %P %s'. O SHA é apurado após criar o commit, não inventado no próprio documento.

O merge foi preparado com --no-ff --no-commit, sem conflitos. Antes de acrescentar este registo, a árvore integrada correspondia exatamente a v2. O Next.js regenerou next-env.d.ts removendo a referência de compatibilidade Pages Router; o build e os testes validaram esse ficheiro gerado. Não foram alterados componentes, design, idiomas, política ou funcionalidades nesta integração.

## Configuração e testes locais

- netlify.toml: npm run build, publish .next, Node 22 e contexto production explícito; previews mantêm o seu contexto próprio. .nvmrc também indica 22.
- Nenhum fallback /index.html, distDir personalizado, output export ou regra Vite ativa. O código Vite antigo é removido pela integração já existente em v2.
- OpenNext automático conforme a [documentação Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/). Nenhum adaptador legado/pin foi acrescentado; versão e execução efetivas dependem do build remoto, ainda não observado nesta etapa.
- Resolvedor oficial @netlify/config, offline: production/master, branch-deploy/v2 e deploy-preview/v2 resolveram npm run build, .next e Node 22, sem fallback SPA. Não equivale a inspeção das integrações do painel.
- Node **22.23.4**, Next.js **16.4.3**: typecheck e lint aprovados; build production aprovado, 13 páginas estáticas.
- SEO production aprovado: nove páginas FR/PT/EN, canonicals, hreflang, JSON-LD, sitemap e robots; sem noindex geral de preview.
- Suite existente: **62 testes Playwright aprovados (24,6 s)** no resultado integrado, incluindo mobile, desktop/GSAP, teclado, movimento reduzido, cookies, idiomas, acessibilidade e tratamento simulado do formulário. Nenhuma submissão real enviada.
- Higiene: 119 ficheiros versionados, 87 textos revistos por padrões, sem achados; não é uma garantia absoluta de ausência de segredos.
- check:production mantém **saída 1** pelo telefone do alojamento e pela rotina operacional de conservação/arquivo ainda pendentes. Este resultado não foi apresentado como teste aprovado nem como falha de compilação.

Blueprint public/__forms.html, project-enquiry, honeypot, sete campos, endpoint e notificações preservados. PT/FR/EN, contacto profissional e histórico de projetos preservados. Sem novas dependências.

## Push e verificação remota

Push autorizado apenas de master: git -c push.followTags=false push origin master:master. Rever imediatamente antes as refs, os dois pais, a tag e a árvore limpa. Não publicar tags nem v2 implicitamente.

Antes do push, https://rlopes.pt/ respondeu HTTP 200 com a aplicação Vite anterior. Não existiam deployments na resposta pública GitHub consultada. O painel/API Netlify autenticado não está disponível nesta sessão.

Depois do push: confirmar SHA remoto, consultar checks/statuses públicos do commit, acompanhar o domínio e inspecionar as rotas FR/PT/EN, legais, privacidade, SEO, assets e blueprint Forms. Registar separadamente o que o GitHub, o HTTP público e o navegador demonstram. Um novo commit no GitHub não prova build/publicação Netlify; HTML atualizado também não prova o SHA exato sem metadados de deploy. Não inventar deploy ID, runtime observado ou resultado de plugin Cloudflare.

O relatório final da execução deve fornecer o SHA publicado, resultados públicos observados, limitações e qualquer problema. Não repetir submissões reais de formulário. O proprietário pode recuperar o deploy anterior no painel; um rollback Git deve usar um revert normal do merge, nunca reset/force-push.
