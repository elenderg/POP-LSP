# Auditoria e roadmap: Windows x64

## Estado observado

- A linha de comando reconhece `para: Windows x64`, mas o ponto de entrada desse destino ainda retorna a mensagem de que a geração não está implementada.
- `windows x64.pop` contém estruturas PE32+, codificação de algumas instruções AMD64 e variantes experimentais para frames, chamadas, endereçamento de imports e alinhamento. Essas rotinas ainda não estão ligadas ao pipeline ativo do compilador.
- O compilador x86 continua sendo o único caminho de compilação utilizável. Não há evidência nesta auditoria de um executável PE32+ completo, carregado pelo Windows e validado em execução.
- `biblioteca x64.pop` é experimental. Define `número grande` como uma estrutura de 8 bytes e tem operações de aritmética; inclui também nove instruções `Decodifique` que usam EBP/EAX/EBX e offsets do ABI x86.

Referências principais: [Código-fonte do compilador.pop](./Código-fonte%20do%20compilador.pop), [windows x64.pop](./windows%20x64.pop), [Biblioteca padrão.pop](./Biblioteca%20padr%C3%A3o.pop) e [biblioteca x64.pop](./biblioteca%20x64.pop).

## Auditoria da implementação atual

### Fluxo do compilador e geração de código

O compilador carrega os arquivos `.pop` do diretório de entrada, constrói o catálogo de tipos e rotinas, calcula tamanhos e deslocamentos, compila os corpos em fragmentos e transforma esses fragmentos em bytes de máquina. O backend x86 também reúne os dados, código e imports e grava o executável PE32.

O carregador de fontes percorre os arquivos com extensão `.pop` sem filtrar pelo destino. Portanto, `biblioteca x64.pop` é carregada também em uma compilação x86 enquanto permanecer nesse diretório. A seleção de fontes por arquitetura — ou outra forma explícita de isolar as bibliotecas — é um pré-requisito para que rotinas e instruções x64 não contaminem o build x86.

No código x86, registradores e formatos de instrução são codificados diretamente nos bytes adicionados aos fragmentos. Endereços e desvios são calculados durante a transformação, com referências entre fragmentos e rotinas resolvidas pelo compilador. Vários passos de tamanhos/deslocamentos, endereçamento da IAT e layout PE ainda pertencem ao fluxo compartilhado e assumem larguras x86.

O arquivo x64 já tem um transformador experimental que usa, entre outros, RAX/RDX/RBP/RSP, endereçamento RIP-relative e deslocamentos `rel32`. Contudo:

- o dispatcher x64 não cobre e integra de forma comprovada todos os fragmentos produzidos pelo compilador;
- tamanhos de fragmentos e posições de relocação precisam corresponder exatamente aos bytes emitidos, incluindo as chamadas e os prólogos/epílogos;
- os helpers novos de ABI ainda não recebem, pelo pipeline ativo, toda a informação necessária. Em particular, a contagem de argumentos das chamadas externas precisa chegar ao fragmento da chamada;
- o cálculo comum de tamanhos e offsets não pode continuar presumindo slots, ponteiros e parâmetros de 4 bytes;
- a compilação x64 no dispatcher principal ainda para antes de executar essas etapas.

### Convenção de chamada e registradores

O backend x86 transmite argumentos pela pilha. Chamadas internas usam a limpeza de argumentos pelo callee; chamadas Win32 seguem a convenção esperada pelas APIs importadas (tipicamente `stdcall`, também com limpeza pelo callee). A confirmação final deve ser feita comparando os bytes gerados para chamadas representativas com o contrato de cada chamada, inclusive as rotinas com convenção especial.

Para chamadas inteiras/ponteiros no Windows x64, o backend deve respeitar a ABI Microsoft x64:

- os quatro primeiros argumentos vão em RCX, RDX, R8 e R9; os seguintes ficam na pilha;
- o caller reserva 32 bytes de *shadow space* e limpa a área de argumentos;
- RSP deve estar alinhado a 16 bytes antes de `CALL`; a entrada da rotina tem o endereço de retorno na pilha;
- RAX é o retorno inteiro/ponteiro; XMM0 é usado para retorno de ponto flutuante;
- RAX, RCX, RDX, R8–R11 e XMM0–XMM5 são voláteis. RBX, RBP, RDI, RSI, RSP, R12–R15 e XMM6–XMM15 são não voláteis;
- estruturas, valores de ponto flutuante, argumentos variádicos e retornos compostos têm regras próprias; não podem ser tratados como uma sequência universal de inteiros de 64 bits.

As variantes atuais de `windows x64.pop` já implementam uma parte do frame baseado em RBP, dos slots de parâmetros, do shadow space e do caller-cleanup. Elas são código experimental: precisam de validação de alinhamento em todos os caminhos, de tipos mistos e de callbacks. A reserva e restauração de registradores, o retorno de valores pointer-sized e o tratamento de XMM ainda não formam um contrato completo.

### Tipos da linguagem e tipos Windows

Os tipos existentes não podem ser alargados indiscriminadamente. `BYTE`, `WORD`, `DWORD`, `UINT`, `INT`, `LONG` e `BOOL` continuam com larguras fixas de 1, 2 ou 4 bytes conforme sua definição. Inteiros de 64 bits precisam continuar distintos de inteiros de 32 bits.

O tipo `ponteiro` da biblioteca atual tem 4 bytes. Também são aliases de 32 bits tipos usados como identificadores de processo/janela e `wParam`/`lParam`. Para x64, devem existir aliases e operações próprios para ponteiros e tipos pointer-sized, sem mudar o significado dos tipos x86:

- 8 bytes: `HANDLE` e seus aliases, `HWND`, `HINSTANCE`, `HMODULE`, ponteiros de dados/funções, `SIZE_T`, `SSIZE_T`, `ULONG_PTR`, `LONG_PTR`, `WPARAM`, `LPARAM` e `LRESULT`;
- larguras fixas mantidas: `DWORD`, `UINT`, `LONG`, `INT`, `BOOL`, `WORD` e `BYTE`;
- inteiros de 64 bits: `LONGLONG`/`ULONGLONG` e tipos de linguagem equivalentes, distintos de ponteiros.

O layout de estruturas precisa incluir alinhamento e padding de acordo com o Windows SDK. Alguns exemplos úteis para conferir os layouts x64 são `STARTUPINFOA` (104 bytes), `PROCESS_INFORMATION` (24 bytes), `WNDCLASSEXA` (80 bytes) e `MSG` (48 bytes). As estruturas atuais usam campos pointer-sized de 4 bytes; `MSG` também define `wParam` e `lParam` como números de largura fixa. As definições x64 devem usar tipos corretos e padding explícito se o cálculo de estrutura do compilador não inserir alinhamento automaticamente.

`biblioteca x64.pop` oferece operações experimentais sobre `número grande`, inclusive soma, subtração, multiplicação, divisão, deslocamentos e conversões. Isso não demonstra ainda semântica correta de sinal, overflow, divisão, comparação, armazenamento, conversão nem compatibilidade com as operações do tipo de 32 bits. Os trechos x86 com `Decodifique` precisam ser substituídos por operações x64 ou por rotinas escritas em Português Puro antes de serem usados no backend x64.

### Biblioteca padrão e APIs do Windows

Uma varredura estática da biblioteca padrão encontrou 209 pares distintos DLL/função em 11 DLLs. Esse inventário exige uma revisão de assinaturas e de larguras; não se deve converter todos os argumentos ou retornos para 64 bits. Em especial, os wrappers abaixo são dependências diretas para iniciar programas e janelas:

| Rotina/uso | Assinatura relevante em x64 | Tipo que não deve ser alargado |
|---|---|---|
| Inicialização do módulo: `GetTempPathA` | DWORD de capacidade, ponteiro de buffer; retorno DWORD | capacidade e retorno |
| Inicialização do módulo: `GetModuleHandleA` | ponteiro de nome; retorno HMODULE (8 bytes) | nome da DLL é ponteiro |
| Inicialização do módulo: `GetModuleFileNameA` | HMODULE (8), buffer (ponteiro), capacidade DWORD; retorno DWORD | capacidade e retorno |
| Inicialização da janela: `RegisterClassExA` | ponteiro para `WNDCLASSEXA`; retorno ATOM de 16 bits | `cbSize`/estilos DWORD |
| Inicialização da janela: `CreateWindowExA` | argumentos inteiros de 32 bits e handles/ponteiros de 8 bytes; retorno HWND (8) | estilos, coordenadas e dimensões |
| Loop de mensagens: `GetMessageA` | ponteiro para `MSG`; retorno BOOL de 32 bits | mensagem/BOOL |
| Loop de mensagens: `DispatchMessageA`, procedimento padrão: `DefWindowProcA` | argumentos `HWND`, `WPARAM`, `LPARAM`; retorno LRESULT de 8 bytes | `UINT message` continua 32 bits |
| Espera por processo: `WaitForSingleObject` | HANDLE de 8 bytes e timeout DWORD; retorno DWORD | timeout e código de espera |
| Fechamento: `CloseHandle` | HANDLE de 8 bytes; retorno BOOL de 32 bits | BOOL |

A rotina de procedimento de janela é um callback do Windows: sua assinatura, passagem de parâmetros e retorno precisam ser ABI x64, inclusive `LRESULT`. Retornar ou armazenar o resultado como `EAX`/inteiro de 32 bits pode truncar o resultado. O mesmo cuidado vale para handles obtidos por `GetModuleHandleA`, `CreateWindowExA`, `GetProcessHeap` e `GetProcAddress`, e para todos os campos pointer-sized de estruturas públicas.

Outras estruturas e wrappers também merecem auditoria direcionada, entre eles `PRINTDLGEXA`, `WSADATA`, COM, sockets, GDI/GDI+, WinHTTP e WinINet. O inventário de imports deve registrar DLL, nome, assinatura, largura e convenção, em vez de inferir tudo a partir do nome do símbolo.

### PE32+

`windows x64.pop` declara um cabeçalho com `Machine=AMD64`, `Magic=PE32+`, `SizeOfOptionalHeader=240`, `ImageBase=0x140000000` e entradas de IAT de 8 bytes. Esses valores são uma base de trabalho, não prova de conformidade.

Antes de habilitar a gravação, revisar e testar:

- o layout byte a byte do DOS/PE, COFF, Optional Header PE32+ e section headers;
- alinhamento de arquivo e memória, `SizeOfHeaders`, `SizeOfImage`, RVAs, offsets de arquivo e limites das seções;
- a distinção entre o diretório de imports (Data Directory índice 1) e o diretório da IAT (índice 12). O campo atualmente denominado `ImageDirectoryEntryImportAddress` é inicializado a partir da seção `.idata`; confirmar que a entrada e seu tamanho representam o diretório correto e preencher a entrada da IAT separadamente;
- que os IMAGE_IMPORT_DESCRIPTOR usem RVAs de 32 bits, mas `IMAGE_THUNK_DATA64` e IAT tenham entradas de 8 bytes, inclusive terminadores e alinhamento;
- política de endereço base e relocações. Se não houver tabela `.reloc`, o executável não pode depender de relocação; flags de ASLR e o endereço-base devem refletir essa decisão;
- dados de unwind x64 (`.pdata`/`.xdata`) para frames e chamadas não-leaf, necessários para unwinding confiável, exceções e depuração;
- características e permissões das seções, especialmente não marcar código como gravável sem necessidade.

O cálculo experimental do tamanho da imagem e dos headers deve ser comparado com as regras do PE, não apenas com a soma dos tamanhos das seções. Ferramentas de inspeção PE devem validar todos os offsets e diretórios antes do teste de execução.

## Roadmap proposto

As fases são ordenadas por dependência. O backend x86 deve permanecer compilável e testável em todas elas.

### Fase 0 — Isolamento e linha de base

1. Registrar um build x86 de referência e seus testes de geração/execução.
2. Separar fontes comuns, x86 e x64; alterar o carregamento ou a organização para que builds x86 não consumam implementações exclusivas x64.
3. Garantir que o destino padrão e a saída x86 permaneçam inalterados.

**Saída verificável:** o compilador x86 ainda compila o projeto e produz os mesmos resultados de referência; o build x64 seleciona somente fontes comuns e x64.

### Fase 1 — Modelo de dados e tipos ABI x64

1. Definir tipos pointer-sized e inteiros de 64 bits distintos, com regras explícitas de conversão, acesso à memória e passagem por referência.
2. Adaptar o cálculo de tamanho/alinhamento de variáveis, parâmetros, campos e estruturas para x64 sem alterar os tipos x86.
3. Criar e validar variantes x64 de estruturas Windows, começando por `MSG`, `STARTUPINFOA`, `PROCESS_INFORMATION`, `WNDCLASSEXA` e `PRINTDLGEXA`.
4. Auditar operações de `número grande`; marcar o que está testado, incompleto ou dependente de instruções x86.

**Saída verificável:** tamanhos, alinhamentos e offsets conferidos contra definições do Windows SDK; testes para leitura/gravação e conversões de 32/64 bits.

### Fase 2 — ABI e geração de código AMD64

1. Ligar o dispatcher x64 ao pipeline real de compilação, preservando um dispatcher x86 separado.
2. Completar codificação e medição de todos os fragmentos usados: valores, endereços, chamadas, desvios condicionais, retorno, operações de memória e relocação de `rel32`.
3. Propagar a quantidade e classificação dos argumentos até chamadas internas e externas; implementar registradores, shadow space, argumentos de pilha, alinhamento e caller-cleanup.
4. Cobrir tipos inteiros de 1/2/4/8 bytes, ponteiros, referências e, se suportados pela linguagem, ponto flutuante, parâmetros variádicos e retornos compostos.
5. Implementar preservação de registradores não voláteis e um modelo de frame compatível com callbacks e unwind.

**Saída verificável:** testes de ABI com 0–N argumentos, valores mistos, chamadas aninhadas, parâmetros por referência, callbacks e alinhamento de RSP observado em execução.

### Fase 3 — PE32+ e imports

1. Separar estruturas/serialização PE32 e PE32+ para não depender de layouts compartilhados.
2. Construir headers, seções e diretórios com alinhamentos e tamanhos PE corretos.
3. Gerar import descriptors, lookup tables e IAT x64, incluindo as duas entradas de diretório relevantes.
4. Decidir e aplicar a política de relocação/ASLR; gerar `.reloc` se necessário.
5. Gerar informação de unwind (`.pdata`/`.xdata`) de acordo com os prólogos/epílogos emitidos.

**Saída verificável:** inspeção independente reconhece AMD64/PE32+, todos os diretórios/RVAs apontam para dados válidos e o Windows carrega o executável.

### Fase 4 — Biblioteca padrão x64

1. Implementar variantes x64 dos aliases pointer-sized e das estruturas usadas pela biblioteca.
2. Adaptar os wrappers de inicialização do módulo, inicialização da janela, loop de mensagens, callbacks e espera/fechamento de processo listados acima.
3. Auditar os demais wrappers Windows por grupos de DLL, preservando parâmetros fixos de 32 bits e retornos pointer-sized.
4. Testar particularmente `GetModuleHandleA`, `CreateWindowExA`, `DefWindowProcA`, `WaitForSingleObject`, funções de heap, COM e sockets.

**Saída verificável:** programas x64 de console e janela usam imports e estruturas reais sem truncamento; a biblioteca x86 permanece intacta.

### Fase 5 — Bootstrap e validação de compatibilidade

1. Antes de gerar um novo `compilador.exe`, renomear o executável em uso para `compilador-antigo.exe` (ou nome único), confirmar que a versão anterior está preservada e só então executar o compilador. Não tentar sobrescrever o processo em execução.
2. Testar bootstrap em pelo menos dois ciclos: compilador anterior gera novo compilador; novo compilador recompila a si próprio.
3. Executar uma matriz x86/x64 de operações aritméticas, condicionais, laços, chamadas, retornos, estruturas, memória, APIs e callbacks.
4. Inspecionar PE com ferramenta independente e executar os binários em Windows x64. Testar endereços acima de 4 GiB quando disponíveis.

**Saída verificável:** x86 continua funcionando; x64 é PE32+ executável; dois ciclos de bootstrap são reproduzíveis e não sobrescrevem o binário em uso.

## Critérios mínimos para declarar suporte x64

- Nenhum destino x64 deve ser anunciado como funcional enquanto o dispatcher continuar no stub.
- Build x86 de referência aprovado antes e depois das mudanças.
- Testes cobrindo chamadas internas, API externa, callbacks, tipos de 32 e 64 bits e funções com mais de quatro argumentos.
- Validação de alinhamento da pilha, preservação de registradores, retornos pointer-sized, imports/IAT, estruturas Windows e unwind.
- PE32+ inspecionado e executado em Windows x64; geração do arquivo, por si só, não é critério suficiente.

## Limitações e itens ainda não implementados

No estado auditado, continuam pendentes: integração do destino x64 no pipeline; cobertura completa de instruções e fragmentos; ABI x64 validada em execução; tipos e estruturas Windows pointer-sized; adaptação da biblioteca padrão; imports/IAT e diretórios PE32+ comprovados; política de relocação; unwind; testes de execução e bootstrap. As rotinas experimentais de `windows x64.pop` e `biblioteca x64.pop` não devem ser tratadas como suporte concluído.
