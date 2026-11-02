# Portfolio V2.5 — auditoria RGPD, CNIL e ePrivacy

Data: 2 de novembro de 2026. Branch de trabalho: `v2`; base local: `2b83e05`. Preview inspecionado: <https://v2--deft-frangipane-131671.netlify.app/fr>. O commit efetivamente publicado não foi autenticado no painel.

## Conclusão e limites

**Os mecanismos encontrados no código e no navegador não justificam implementar um banner de consentimento.** O único cookie observado foi `NEXT_LOCALE`, usado para a preferência de idioma. A sua finalidade limitada corresponde à personalização de interface que a [CNIL inclui nas isenções](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite). Não foram identificados pixels, publicidade, analytics no navegador ou recursos incorporados que exigissem consentimento prévio.

Esta conclusão abrange o comportamento observado, não certifica conformidade RGPD global. O proprietário confirmou que **ainda não verificou as integrações privadas da Netlify**. Analytics no servidor, snippets condicionais, Session Replay, log drains, fornecedores de email e retenção efetiva não podem ser dados como desativados ou conformes a partir desta inspeção. Não foi alterada nenhuma configuração remota.

A principal correção técnica foi retirar a gravação automática de um cookie de sessão pelo middleware, conservando a gravação de idioma apenas após uma escolha explícita. Não se classificou esse cookie automático como publicidade ou como prova de infração: a correção elimina armazenamento redundante, preserva a preferência pedida e torna a informação pública exata.

## Método e evidência

- Inspeção de `package.json`, lockfile, árvore de dependências de produção, configuração Next.js, `netlify.toml`, proxy, routing, componentes, traduções, scripts e recursos públicos. A árvore contém 111 nomes de dependências de produção/transitivas/opcionais; a pesquisa de nomes de SDKs de tracking não encontrou correspondências. Esta pesquisa foi complementada pela inspeção dos pontos de armazenamento/rede e pelo navegador, não usada isoladamente como prova.
- Chrome real, headless, com contextos novos e sem conta Netlify autenticada: nove páginas desktop — homepage, privacidade e legal em FR/PT/EN —, três homepages móveis de 390 × 844 com movimento reduzido, e `/`. Desktop: 1440 × 900. A língua do navegador era `pt-PT`, com alternativas `pt`, `en-US`, `en`.
- Registo de pedidos e de cabeçalhos `Set-Cookie`; leitura de cookies e respetivos atributos; inspeção de localStorage, sessionStorage, IndexedDB, Cache Storage e service workers. Instrumentação passiva de gravações/remoções de Web Storage e gravações JavaScript de cookies para detetar também escritas transitórias.
- Observação sem interação após `networkidle`, com cinco segundos adicionais no primeiro `/fr` e 1,5 segundos nos restantes casos. Depois, scroll, escolha de português, regresso a `/` e remoção de cookies. Nenhum pedido foi bloqueado para obter o resultado de ausência de terceiros.
- 13 contextos iniciais: documentos HTTP 200, 246 pedidos no conjunto dos percursos, todos ao mesmo domínio. Zero pedidos a terceiros, iframes ou erros JavaScript registados. O teste adicional de `/fr` não encontrou erros HTTP nos recursos nem pedidos falhados.
- Inspeção adicional dos scripts inline: JSON-LD, dados de hidratação do Next.js e inicialização Turbopack. Os scripts externos são chunks do próprio website. Referências a `schema.org` no JSON-LD, a documentação em comentários/licenças e links externos não são pedidos de tracking.
- Evidências locais, ignoradas pelo Git: `.impeccable/review/gdpr/remote-observations.json` (11:28 UTC), `remote-additional.json` (12:53 UTC), `remote-first-visit.png`, `remote-mobile-first-visit.png` e os scripts de inspeção. Os valores de cookies desconhecidos são omitidos; não foram recolhidas submissões reais ou endereços privados.

A janela de observação não exclui mecanismos condicionados por região, utilizador, campanha, tempo superior ao observado ou futuras alterações do painel. O browser não permite auditar o processamento interno dos fornecedores.

## Inventário e classificação

| Mecanismo | Evidência/finalidade | Classificação e decisão |
| --- | --- | --- |
| `NEXT_LOCALE` automático, antes da correção | Observado em primeira visita FR/EN e no redirecionamento `/`; ausente em PT neste navegador. Cookie de sessão (`expires = -1`), Path `/`, SameSite Lax, sem Secure. Código de idioma, não identificador único. | Potencialmente isento pela finalidade linguística; redundante relativamente à escolha explícita. Desativada apenas a escrita automática do `next-intl`. Não fundamenta um banner. |
| `NEXT_LOCALE` após escolha explícita | Criado pelo seletor; `fr`, `pt` ou `en`; domínio atual, Path `/`, SameSite Lax, Secure em HTTPS, Max-Age 31 536 000 segundos. Regresso a `/` recorda o idioma. | Isento de consentimento prévio pela preferência de interface solicitada. Mantido por até um ano desde a última escolha explícita. Navegar não renova nem substitui essa escolha. |
| localStorage/sessionStorage, IndexedDB, Cache Storage, service workers | Nenhuma chave, base, cache de aplicação ou registo observado; nenhuma escrita transitória registada. | Não utilizados na aplicação auditada; não há mecanismo de consentimento a criar. O cache HTTP normal do navegador é distinto de Cache Storage. |
| Next.js, React, next-intl, GSAP/ScrollTrigger, Lucide | Renderização, routing, idioma, scroll, foco, tamanho da janela e preferência de movimento reduzido. Chunks locais; sem SDK de analytics integrado. | Funcionalidade necessária à experiência pedida; não foi observado uso para identificação, fingerprinting ou envio de comportamento a terceiros. |
| Fontes, imagens, CSS, hidratação, JSON-LD e cache HTTP normal | Ficheiros do próprio domínio, incluindo fonte local; sem Google Fonts remoto, mapa, vídeo ou widget social. | Recursos de apresentação/transmissão, não rastreamento comportamental observado. Não necessitam de opt-in de cookies. |
| Links para projetos, LinkedIn, GitHub, CNIL e documentos Netlify | Âncoras normais; imagens dos projetos são capturas locais, não iframes. | Nenhum serviço externo carregado antes de seguir o link. A navegação voluntária para outro site tem o tratamento próprio desse destino. |
| Netlify Forms, campos técnicos e honeypot | Código faz POST URL-encoded ao mesmo domínio em `/__forms.html`; os sete campos continuam iguais. Nenhum reCAPTCHA carregado. | Processamento do pedido iniciado pelo visitante e prevenção de abuso. Não é um tracker opcional a bloquear por consentimento de cookies; obrigações RGPD continuam aplicáveis. |
| Akismet/Automattic | A [documentação Netlify](https://docs.netlify.com/manage/forms/spam-filters/) descreve filtragem das submissões. Não foi observado pedido do navegador a Akismet. | Integração de servidor documentada pelo fornecedor, não medição de entrega real. Avaliar destinatários, base de segurança, minimização e transferências; não presumir um cookie de terceiros. |
| CDN, logs, IP e diagnóstico Netlify | O host recebe necessariamente os pedidos. Visibilidade e retenção internas dependem do serviço e das definições da conta. | Transmissão/segurança necessárias; tratamento RGPD distinto da leitura/escrita de trackers. Não requer automaticamente um banner. Retenção, finalidades e acessos estão pendentes. |
| Netlify Web Analytics/Server Analytics | Ativação desconhecida. A [documentação](https://docs.netlify.com/manage/monitoring/web-analytics/how-web-analytics-works/) descreve estatísticas obtidas de logs, sem JavaScript ou cookies no visitante. | Potencialmente fora do mecanismo de consentimento de armazenamento no terminal, conforme funcionamento efetivo. Não concluir isenção geral RGPD nem ativação/desativação a partir do marketing do fornecedor. |
| Analytics adicionais, pixels, Session Replay, snippets ou embeds opcionais | Não encontrados no código ou na sessão observada; definições privadas não verificadas. | Se existirem, classificar antes de ativar. Publicidade, replay e tracking não essencial exigem consentimento prévio; analytics só beneficia de isenção se todas as condições CNIL forem demonstradas. |
| Plugin de limpeza Cloudflare | Referido no diagnóstico de deployment anterior, ausente do código/configuração local. Nenhum pedido de browser a Cloudflare observado. | Integração de build/cache, não evidência de um tracker de visitantes. Estado e credenciais privados não foram inspecionados nem alterados. |

Next.js dispõe também de telemetria da ferramenta de desenvolvimento/build. Não é um script de analytics inserido no portfolio e não deve ser confundida com tracking dos visitantes. As ferramentas Playwright, Axe, Lighthouse e ESLint são de desenvolvimento; os scripts de captura não são rotas ou recursos públicos.

## Porque não foi criado um banner

O artigo 82 e a orientação CNIL abrangem também armazenamento além de cookies, incluindo Web Storage e fingerprinting. A ausência de cookies publicitários, por si só, não basta: foram também verificados pedidos, scripts e outros mecanismos de armazenamento. A evidência disponível apenas suporta funcionalidade linguística e recursos de execução normais.

A isenção do cookie de idioma exige manter a finalidade exclusiva; reutilizá-lo para analytics ou perfis exigiria nova avaliação. Não foi acrescentado cookie de “consentimento”, botão fictício de aceitação/rejeição ou dependência de CMP. O seletor de idioma existente e as definições do navegador permitem mudar/apagar a preferência funcional.

Se uma futura verificação do painel revelar trackers não essenciais, bloquear o carregamento antes do consentimento e implementar uma interface com aceitar e rejeitar igualmente acessíveis, finalidades separadas quando aplicável, funcionamento integral após rejeição e acesso permanente à alteração/retirada. A [FAQ CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ) recomenda, em geral, conservar tanto a aceitação como a recusa durante seis meses, ajustando ao contexto. Essa recomendação não é um limite universal de seis meses para o cookie funcional de idioma nem a regra de conservação dos contactos.

## Formulário e informação RGPD

O fluxo permanece: campos no navegador → POST ao domínio Netlify → processamento/armazenamento Netlify Forms → eventuais notificações de email → resposta de Ricardo Lopes. Campos: `form-name`, `bot-field`, `locale`, `name`, `email`, `project-type`, `message`. A validação e os estados de envio/sucesso/erro não foram alterados. O endereço profissional continua `contact@rlopes.pt`; nenhum endereço pessoal de encaminhamento foi consultado ou publicado.

A atualização PT/FR/EN informa quem trata os dados, campos obrigatórios e alternativa por email, finalidade, destinatários, antispam, dados técnicos, direitos e conservação. Diferencia medidas pré-contratuais pedidas pelo próprio potencial contratante (art. 6.1.b) de outros contactos profissionais, incluindo representantes de empresas (interesse legítimo, art. 6.1.f). Acrescenta o direito de oposição relevante para interesse legítimo. Não se exige consentimento de marketing ou aceitação da política para pedir uma resposta. Bases e ponderação do interesse legítimo devem ser validadas/documentadas pelo responsável, segundo as orientações da [CNIL sobre contrato](https://www.cnil.fr/fr/les-bases-legales/contrat) e [interesse legítimo](https://www.cnil.fr/fr/les-bases-legales/interet-legitime).

O GET público de `/__forms.html` devolveu 200, o formulário esperado e `X-Robots-Tag: noindex, nofollow`, mas ainda contém `data-netlify`. Isto não demonstra que o serviço tenha detetado o formulário ou aceite submissões. A deteção no painel e uma submissão real autorizada continuam por verificar. Os testes locais intercetam o POST; não enviaram emails nem provaram receção pela plataforma.

A [CNIL exige informação transparente no momento da recolha](https://www.cnil.fr/fr/informer-les-personnes). Por isso, foi corrigida a anterior afirmação incondicional de eliminação aos 12 meses: o proprietário confirmou que hoje as mensagens permanecem na caixa de correio sem calendário formal.

## Conservação proposta e ações operacionais pendentes

Regra solicitada pelo proprietário: eliminar periodicamente os pedidos que não resultem em projetos até 12 meses após o último contacto; para clientes efetivos, conservar segundo necessidades contratuais e obrigações legais aplicáveis. **A regra é uma proposta ainda não implementada ou automatizada**, expressamente identificada assim nas três línguas. `retentionPolicyConfirmed` permanece `false`.

Antes de declarar este processo operacional:

1. Definir responsável, calendário de revisão e critérios do último contacto; a revisão periódica deve permitir cumprir o prazo de 12 meses, não acrescentar automaticamente mais um período depois desse prazo.
2. Aplicar a regra à caixa de correio, notificações, Netlify Forms (incluindo separador de spam), exportações e outras cópias. Apagar um email não apaga a submissão na Netlify. A [Netlify recomenda gerir e eliminar regularmente os dados dos formulários](https://docs.netlify.com/manage/forms/submissions/).
3. Na Netlify, rever **Forms → project-enquiry**, identificar os registos a eliminar e usar a eliminação das submissões selecionadas. Não eliminar o próprio formulário. Rever separadamente spam e cópias/exportações; qualquer eliminação real deve ser autorizada pelo proprietário.
4. Distinguir correspondência de trabalho, documentos contratuais, faturação e eventuais litígios. Confirmar os prazos legais concretos aplicáveis com apoio profissional; não aplicar um prazo genérico a todos os dados de clientes.
5. Registar a execução da política com o mínimo de dados necessário, tratar pedidos de direitos e confirmar as limitações de backups dos fornecedores. Só então atualizar a informação pública e o indicador de verificação.

Verificações adicionais da conta e dos tratamentos:

- Inventariar Netlify Analytics/Web Analytics, snippets, Session Replay, plugins, funções de submissão, webhooks, log drains e serviços ligados. O proprietário declarou a verificação pendente; nenhum deles foi assumido como desativado. Repetir a inspeção de navegador se as definições mudarem.
- Confirmar se existe análise de logs e a sua finalidade; documentar retenção, acesso e fornecedores. Não inferir um prazo de logs a partir do prazo do formulário.
- Rever os contratos/DPA dos fornecedores de email e Netlify, subprocessadores e países efetivos. O [DPA Netlify de 9 de junho de 2026](https://www.netlify.com/pdf/netlify-dpa.pdf) prevê mecanismos de transferência conforme o caso; a [lista publicada](https://www.netlify.com/trust-center/) inclui Automattic/Akismet nos EUA. Isto não prova a configuração contratual da conta nem o mecanismo aplicável a todos os emails.
- Documentar bases legais, minimização, ponderação de interesse legítimo, acesso às caixas de correio e tratamento de direitos. Confirmar os elementos de identidade profissional ainda pendentes no lançamento. Não há evidência que permita declarar estas operações plenamente conformes só por não haver banner.

## Alterações e validação local

Alterações limitadas a `src/i18n/routing.ts` (`localeCookie: false`), conteúdo de privacidade/nota de recolha em `messages/{pt,fr,en}.json`, apresentação das secções na página de privacidade, testes de regressão e documentação. O cookie escolhido pelo utilizador, Next.js, GSAP, Netlify Forms, metadados e design existente permanecem preservados. Não foram adicionadas dependências, serviços ou CMP.

Com Node 22.23.4:

| Verificação | Resultado |
| --- | --- |
| TypeScript e lint | Aprovados |
| Build Next.js | Aprovado; 13 páginas estáticas geradas |
| SEO de preview | Aprovado nas nove páginas: canonicals, idiomas, metadados, JSON-LD, sitemap e robots |
| `check:production` | Saída 1 esperada: identidade profissional, telefone do alojamento e aplicação da política de conservação continuam pendentes; não é um lançamento aprovado |
| Suite Playwright | 62 testes aprovados, incluindo nove novos de privacidade |
| Primeira visita FR/PT/EN, home/legal/privacidade | Sem cookies, Set-Cookie, Web Storage ou recursos de terceiros na versão local corrigida |
| Aceitar/rejeitar cookies opcionais | Não aplicável: nenhum tracker sujeito a consentimento identificado; não foi criada uma interface fictícia |
| Escolha/alteração/remoção de idioma | Testadas com teclado a 390 e 1440 px; persistência num novo contexto; visita direta a outra língua e reload não renovam nem substituem o cookie |
| Gravação de cookies indisponível | Navegação e envio simulado do formulário funcionam; sem checkbox de consentimento obrigatório |
| Acessibilidade da política | Seis verificações Axe (FR/PT/EN × mobile/desktop), sem violações nos critérios testados; sem overflow e com movimento reduzido |

A versão remota mantém o comportamento observado antes destas alterações; não houve push, merge, deploy ou alteração de definições remotas. A avaliação humana/jurídica dos pontos pendentes e a verificação da conta continuam necessárias. Esta auditoria distingue ausência de evidência de tracking no navegador de prova de ausência de todo o tratamento de dados.

## Seguimento no release candidate final — 2 de novembro de 2026

A [revisão final](V2-FINAL-RELEASE.md) preservou `localeCookie: false`, informação de privacidade FR/PT/EN e os nove testes desta auditoria. A suite completa voltou a passar **62 testes**; foram novamente verificadas primeiras visitas sem cookies/armazenamento/terceiros, escolha por teclado, persistência, alteração/remoção, movimento reduzido e funcionamento sem gravação de cookies. Mais **45 vistas** e **18 scans Axe** não encontraram erros, overflow ou violações nos critérios automatizados.

A identidade do responsável foi alinhada com a API oficial francesa e o aviso legal passou a incluir RCS Marseille conforme BODACC. Nome civil completo, domiciliação/regime fiscal e telefone do alojamento continuam por confirmar. Fontes e limites constam do relatório final; não se tratou a informação da Loprim3D como prova fiscal definitiva.

A secção 3 do relatório final contém agora o **procedimento manual pronto a adotar**: classificação dos pedidos sem projeto, último contacto substantivo, prazo de 12 meses, revisão mensal sem acrescentar um mês ao limite, eliminação no email/Netlify Forms/spam/exportações/cópias e separação de documentos de clientes. **Não adotado nem executado nesta intervenção.** Redação pública proposta e `retentionPolicyConfirmed: false` preservados; nenhuma mensagem foi acedida/eliminada.

As integrações privadas Netlify, retenção de logs, DPA/email/transferências continuam pendentes. O relatório final fornece checklist do painel; não afirma que analytics/replay/snippets estão desativados. Nenhum banner foi acrescentado e nenhum endereço pessoal foi revelado.

Nova consulta pública do preview confirmou raiz/idiomas acessíveis e blueprint 200, mas não demonstra deteção, armazenamento ou entrega Forms. Uma consulta a `/pt/privacy` devolveu 500 e cinco retestes 200; investigar logs, sem inventar a causa. Não houve POST real. O commit do deployment não foi autenticado no painel e as alterações locais continuam sem push/deploy.

A proteção SEO foi refinada separadamente: preview com header/metadados noindex e robots permitindo crawling para leitura dessas diretivas; produção compilada sem noindex geral. Não altera a conclusão de cookies nem prova remoção de todos os índices. Ambos os builds/contextos passaram. A configuração Netlify ativa e o design permanecem intactos.
