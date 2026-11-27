# Auditoria técnica inicial do compilador Português Puro

Este documento registra a auditoria dos dois arquivos presentes em `server/src/compilador`.

## Estado encontrado

O compilador é escrito em Português Puro e não é executado pela implementação TypeScript do LSP. Os arquivos .pop são a implementação-fonte do compilador, cujo executável está disponível em `c:\compilador.exe`.

Consequentemente, não é tecnicamente seguro afirmar que o backend descrito abaixo pode ser compilado ou executado neste checkout.

## Backend existente de 32 bits

- Gera fragmentos intermediários com 22 etiquetas.
- Produz texto hexadecimal diretamente a partir de cada fragmento.
- Usa `EAX` como acumulador de resultados.
- Usa `EDX` como registrador temporário de endereços e valores.
- Usa `EBP` como ponteiro da base do frame.
- Usa `ESP` como ponteiro da pilha.
- Usa `PUSH`/`POP`, `CALL rel32`, `JMP rel32`, `MOV`, `LEA` e instruções relacionadas.
- Passa parâmetros internamente pela pilha.
- O primeiro parâmetro fica em `EBP+8`, o segundo em `EBP+12`, seguindo 4 bytes por argumento.
- Preserva `EBX`, `ESI` e `EDI` em callbacks marcados como compatíveis.
- Usa `RET imm16` no epílogo para limpar os parâmetros empilhados.
- Trata parâmetros como referências por padrão.
- Permite apenas tipos de 1, 2 ou 4 bytes em vários caminhos de empilhamento e armazenamento.
- Usa o tipo lógico `número` como inteiro de 32 bits.
- Define `ponteiro` como estrutura de 4 bytes.

## Formato PE32 existente

- Cabeçalho DOS de 64 bytes com ponteiro PE em 0x100.
- Assinatura PE `PE\0\0`.
- COFF machine I386 `0x014C`.
- Optional Header PE32 magic `0x010B`.
- Tres seções `.idata`, `.data` e `.text`.
- Alinhamento de seção e arquivo baseado em 4096 bytes.
- Import Directory e IAT ligadas às DLLs catalogadas pelo compilador.
- Chamadas externas produzidas como `FF15` com endereço absoluto do IAT.
- EntryPoint calculado como RVA da rotina de inicialização.
- `ImageBase` fixa em `0x00400000`.

## Convenção externa observada

Chamadas externas usam `Processe "dll.dll" "Função" com ...`, mas os argumentos são empilhados pela convenção interna. Isso não implementa automaticamente a ABI Windows x64. No backend x64, funções externas exigiriam:

- registradores `RCX`, `RDX`, `R8`, `R9` para os quatro primeiros argumentos inteiros/ponteiros;
- `XMM0`–`XMM3` para os quatro primeiros argumentos de ponto flutuante, ainda não representados por tipos primitivos;
- shadow space de pelo menos 32 bytes;
- pilha alinhada a 16 bytes antes de `CALL`;
- argumentos adicionais empilhados acima do shadow space;
- `RAX` como retorno inteiro/ponteiro e `XMM0` para retorno real;
- preservação dos registradores não voláteis `RBX`, `RBP`, `RDI`, `RSI`, `R12`–`R15`;
- preservação de `XMM6`–`XMM15`;
- correções ABI para callbacks.

## Dependências x86 identificadas

- Estruturas PE32 e campos `BaseOfData`.
- `DWORD` implícito em vários buffers e deslocamentos.
- Ponteiros definidos como 4 bytes.
- Contagem de locais dividida por 4.
- Frame em `EBP`.
- Retorno `RET imm16`.
- Instruções hard-coded com `EAX`, `EDX`, `EBX`, `ESI` e `EDI`.
- Relativos `E8`/`E9` e endereços absolutos de IAT.
- Carregamento e gravação apenas para 1, 2 e 4 bytes em vários fragmentos.

## Implementação adicionada

Foi criada uma infraestrutura auxiliar separada do backend .pop:

- seleção explícita de destino x86/x64;
- definição de tamanho de ponteiro sem alterar o tamanho do tipo `número`;
- encoders x64 para `MOV RAX, imm64` e `SUB RSP, imm32`;
- construtor de imagem PE32 e PE32+;
- testes de headers PE32/PE32+, machine type e encoder.

## Limitações conhecidas

- Não existe um backend x64 integrado ao compilador `.pop`.
- Não existem operações x64 completas para todos os tipos e aritmética de 64 bits.
- Não existem imports PE32+ integrados ao parser/gerador existente.
- Não existe seleção de arquitetura na interface de linha de comando da implementação `.pop`.
- Não existe validação por execução em Windows de 64 bits.
- Valores de 64 bits ainda não são um tipo da linguagem neste checkout.
- Esta infraestrutura não deve ser apresentada como substituto funcional do compilador original.

## Validação adicional realizada

- A ambiguidade da biblioteca padrão que bloqueava a autocompilação foi corrigida no repositório.
- `C:\compilador.exe C:\POP-LSP\server\src\compilador` recompilou o próprio compilador com sucesso.
- O executável resultante foi identificado como PE32/I386: Machine `0x14C`, Magic `0x10B`.
- Um projeto mínimo com biblioteca padrão foi compilado, executado e terminou com código de saída `0`.
- Esse mesmo projeto produziu um PE32 com três seções, entry point e `ImageBase` compatíveis com o backend existente.
- A suíte completa do servidor passou 109 testes; o primeiro teste integrado apresentou uma falha não reproduzível e passou integralmente quando executado isoladamente.
- Um projeto amplo em `server/testes` parou em `graficos.pop` por um erro sintático preexistente em qualificador iniciado sem parêntese.

## Estado após integração no fonte do compilador

- Foi adicionado um sinalizador global do destino x64 no fonte `.pop`.
- O cabeçalho COFF passou a selecionar AMD64 `0x8664` quando esse sinalizador estiver ativo.
- O campo `SizeOfOptionalHeaderInBytes` passou a usar `0x00F0` para x64.
- O Optional Header passou a selecionar Magic `0x020B` para PE32+.
- O alinhamento de variáveis locais passou a aceitar alinhamento de 8 bytes no destino x64.
- O backend continua mantendo o caminho PE32/I386 como padrão e os testes confirmaram `0x14C`/`0x10B`.
- A seleção da arquitetura pela linha de comando não foi integrada nesta etapa: os métodos novos de parsing encontraram incompatibilidades entre tipos `string`/`subtexto` no próprio compilador.
- O backend x64 não gera código AMD64 completo nesta versão. Em particular, continuam pendentes o frame/prologue, ABI Windows x64, shadow space, IAT RIP-relative, operações de 64 bits e a estrutura PE32+ completa.

## Implementação adicional de seleção e tipos

- `C:\compilador.exe C:\projeto --x64` ativa a seleção do destino x64.
- `C:\compilador.exe C:\projeto --architecture=x64` possui suporte equivalente.
- O padrão continua sendo x86/PE32.
- Quando `--x64` é usado, o COFF Machine passa a ser `0x8664`.
- O Optional Header recebe Magic `0x20B` e tamanho `0x00F0`.
- Foi adicionada a estrutura `Um endereço amplo é uma estrutura com 8 bytes`.
- Foram adicionadas rotinas básicas de zerar e copiar endereços amplos.
- A prova com o projeto amplo em `server/testes` produziu PE32+ com Machine AMD64 e Magic PE32+.

## Limitação arquitetural efetiva

A imagem PE32+ produzida por esta etapa não contém ainda um backend AMD64 completo. O gerador continua produzindo instruções x86 nos fragmentos existentes e não implementa a ABI Windows x64. Portanto, o PE32+ atual é uma etapa de integração/header, não um executável AMD64 validado para execução.

## Implementação posterior do backend AMD64

- Foram adicionados encoders testáveis para o frame AMD64:
  - `push rbp`
  - `mov rbp,rsp`
  - `sub rsp,imm32`
  - `mov rsp,rbp`
  - `pop rbp`
  - `ret imm16`
- Foram adicionados encoders para a ABI Windows x64 em chamadas externas:
  - shadow space de 32 bytes;
  - preparação de `RCX`, `RDX`, `R8` e `R9`;
  - limpeza da pilha após chamadas;
  - operações básicas de memória e 64 bits.
- Foram adicionados tipos e rotinas da biblioteca padrão:
  - `endereço amplo` com 8 bytes;
  - `número amplo` com 8 bytes;
  - atribuição, limpeza, soma, subtração e multiplicação de valores amplos.
- Os testes focados compilam e passam para o frame AMD64, ABI externa e operações de 64 bits.
- O formato PE32+ auxiliar continua sendo construído separadamente no TypeScript.

## Limitações restantes

- A integração desses encoders ao fluxo completo dos fragmentos `.pop` ainda precisa ser concluída.
- A seleção pelo CLI não deve ser considerada normalizada até o recorte da opção não destruir o caminho do projeto.
- O IAT PE32+ completo, os deslocamentos RIP-relative e as correções de endereçamento das DLLs ainda não estão vinculados ao gerador `.pop`.
- O backend `.pop` não deve ser descrito como AMD64 executável antes de executar um programa simples em Windows x64.
