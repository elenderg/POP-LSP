Adicionei mensagens de início e conclusão, com duração em milissegundos, nas principais etapas do parsing e da resolução semântica. Também há mensagens para descoberta dos documentos, atualização do catálogo do workspace e solicitações LSP. Elas só são emitidas com `POP_LSP_PROFILE=1`, então ficam desativadas no uso normal.

As mensagens aparecem como registros `[POP-LSP profile]` no Output do servidor. Incluem análise léxica, sintática, catálogo de símbolos, dependências entre tipos, resolução de tipos e variáveis, validações e resolução de rotinas. Os detalhes estão em `server.ts` e `typeParser.ts`; acrescentei cobertura dos logs em `selectiveContextReuse.test.js`.

**Roteiro para identificar funções específicas:** feche as instâncias do VS Code para que o servidor herde as variáveis e abra o workspace pelo PowerShell:

```powershell
$env:POP_LSP_PROFILE = '1'
$env:POP_LSP_CPU_PROFILE = '1'
code C:\POP-LSP
```

Abra um arquivo lento e, no painel **View > Output**, selecione a saída do servidor. Use os registros de fases para localizar qual etapa domina o carregamento inicial. Ao encerrar o servidor, abra o `.cpuprofile` mais recente no Chromium DevTools (**Performance > Load profile**). Na visualização **Bottom-up**, ordene por *self time*: isso aponta as funções que mais consomem CPU diretamente; compare com o tempo total para identificar funções cujo custo está principalmente nos métodos chamados. Repita o carregamento inicial pelo menos três vezes e compare as medianas. A documentação em `README.md` inclui esses passos e o comando para localizar os arquivos de perfil.

**Validação:** compilação concluída e os 47 testes do servidor passaram. O ESLint não iniciou por um erro da instalação local (`Linter is not a constructor`), não por um diagnóstico do código. Não medi novamente o carregamento real de 20 segundos nesta etapa; os novos logs e o perfil de CPU permitirão localizar os métodos responsáveis. O arquivo `portugues-puro.tmLanguage.json` aparece modificado no worktree, mas não o alterei.