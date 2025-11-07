# Plano de Implementação: Ir Para Definição - POP-LSP

[Visão Geral]
Implementar funcionalidade "Ir Para Definição" (Go to Definition) para linguagem Português Puro no servidor LSP. A funcionalidade deve localizar definições de variáveis, tipos, rotinas e funções em arquivos .pop dentro do projeto, considerando que o compilador de Português Puro não usa namespaces e treata todos os arquivos como um escopo global unificado.

[Tipos]
Implementar tipos TypeScript para símbolos de código Português Puro com seus metadados.

Definições detalhadas de tipos:
- SymbolInfo: { nome: string, tipo: 'variável'|'tipo'|'rotina'|'função', caminhoArquivo: string, linha: number, coluna: number, intervalo: Intervalo }
- SymbolCache: Map<string, SymbolInfo[]> para cache de símbolos por nome

[Arquivos]
Modificar arquivos existentes do diretório irPara e criar utilitários para análise de símbolos.

Detalhamento específico:
- server/src/irPara/definicao.ts - Expandir função irParaDefinição existente com busca multi-arquivo
- server/src/irPara/definicaoDeOrigem.ts - Implementar handler para definição de origem
- server/src/irPara/definicaoDeTipo.ts - Implementar handler para definição de tipo
- server/src/irPara/implementacoes.ts - Implementar handler para navegação de implementações
- server/src/irPara/referencias.ts - Implementar handler para busca de referências

[Funções]
Implementar e expandir funções para análise de símbolos e navegação de definições.

Detalhamento específico:
- escanearSímbolosProjeto(): Analisar todos os arquivos .pop no workspace e construir cache de símbolos
- parsearSímbolosArquivo(conteúdoArquivo): Extrair todas as definições de símbolos de um único arquivo
- encontrarDefinição(nomeSímbolo, arquivoAtual): Encontrar localização de definição para um símbolo dado
- obterPadrõesSímbolos(): Retornar padrões regex para cada tipo de definição
- irParaDefinição(termo, documento): MODIFICAR - Adicionar capacidade de busca multi-arquivo
- onDefinition(): EXPANDIR - Usar novo sistema de cache de símbolos

[Classes]
Não são necessárias novas classes TypeScript para esta implementação.

Detalhamento específico:
- Nenhuma nova classe será criada
- As funcionalidades serão implementadas como funções utilitárias

[Dependências]
Nenhuma nova dependência externa será adicionada, usando apenas módulos internos já disponíveis.

Detalhes de novos pacotes, mudanças de versão e requisitos de integração:
- Usar apenas módulos 'vscode-languageserver' já disponíveis
- Usar apenas módulos Node.js padrão (fs, path, url)
- Não adicionar dependências npm externas

[Testes]
Implementar testes unitários e de integração para validar funcionalidade de navegação de definições.

Requisitos de arquivos de teste, modificações de testes existentes e estratégias de validação:
- Testes unitários para funções de parsing de definições (arquivos .pop simulados)
- Testes de integração para busca multi-arquivo
- Validação de padrões regex com casos de uso reais da linguagem
- Testes de performance com projetos grandes
- Testes de casos extremos: definições duplicadas, símbolos não encontrados

[Ordem de Implementação]
Implementar funcionalidade seguindo ordem lógica para garantir integração bem-sucedida.

Passos numerados mostrando a ordem lógica de mudanças para minimizar conflitos e garantir integração bem-sucedida:
1. **Criar utilitários base** - symbols.ts e utils.ts com tipos e funções core
2. **Implementar parsing de definições** - obterPadrõesSímbolos() e parsearTipoDefinição()
3. **Expandir função principal** - Modificar irParaDefinição() com busca multi-arquivo
4. **Implementar sistema de cache** - escanearSímbolosProjeto() e gerenciamento de cache
5. **Completar handler principal** - onDefinition() usando novo sistema
6. **Implementar handlers auxiliares** - definição de origem, tipo, implementações, referências
7. **Testar funcionalidade core** - Validar parsing de definições e busca
8. **Otimizar e refinar** - Performance, tratamento de erros, edge cases
