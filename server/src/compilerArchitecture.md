# Auditoria e plano do backend x64

## Escopo e estado real

Esta auditoria separa a implementação do compilador escrito em Português Puro dos auxiliares TypeScript do servidor. O backend executado pelo usuário é o fonte `.pop`; os auxiliares TypeScript não são chamados pelo pipeline desse compilador.

| Componente | Estado verificado |
|---|---|
| Compilador `.pop` Windows x86 | Backend PE32 existente |
| Compilador `.pop` Windows x64 | Ainda rejeitado explicitamente; não gera executáveis AMD64 |
| Auxiliar TypeScript `peImage.ts` | Constrói imagens PE32/PE32+ com imports por nome e correções de chamadas à IAT |
| Auxiliares TypeScript `x64Encoder.ts` | Codificadores de instruções e preparação de chamadas; não integrados ao compilador `.pop` |
| Linux x86/x64 | Não implementados |

O sucesso de um teste de `peImage.ts` não significa que o compilador Português Puro gere programas x64.

## Auditoria do backend `.pop` x86

### Fluxo de código e endereços

O IR usa fragmentos lógicos com etiquetas para chamadas internas/externas, chamadas indiretas, desvios, prólogo/epílogo, carga e gravação de valores, entre outras operações. O código de cada fragmento é construído como texto hexadecimal e depois convertido em bytes para a seção de código.

- Chamadas internas usam `E8 rel32`; saltos e retornos entre fragmentos usam `E9 rel32`; o desvio condicional observado usa `0F 84 rel32`.
- O deslocamento relativo é calculado a partir do endereço seguinte à instrução. O endereço de cada fragmento é obtido a partir do tamanho codificado, com comprimentos de opcode mantidos explicitamente nas rotinas de endereçamento.
- Chamadas externas usam `FF 15 addr32`, com o endereço absoluto da entrada da IAT.
- Globais e literais são endereçados por imediato absoluto de 32 bits; variáveis locais e temporárias usam deslocamentos em relação a `EBP`.
- A implementação de fragmentos contém opcodes x86 explícitos. As rotinas de análise, resolução de nomes e construção do IR são em grande parte independentes da ISA, mas o endereçamento dos fragmentos, as larguras de campos e a serialização PE não são.

### Convenção de chamada x86 observada

- `EAX` é o acumulador/retorno; `EDX` carrega endereços e valores temporários; `ECX` é usado, entre outros usos, na inicialização de locais.
- O prólogo usa `push ebp; mov ebp,esp`; locais são reservados em unidades de 4 bytes. O primeiro parâmetro está em `[EBP+8]`, o próximo em `[EBP+12]`.
- Os argumentos são transmitidos pela pilha. O padrão da linguagem é passar parâmetros por referência; existe um sinalizador de passagem por valor usado em parâmetros de callbacks.
- O epílogo restaura `EBP` e emite `RET imm16`; portanto, a rotina chamada remove os argumentos da pilha. Chamadas externas usam `CALL [IAT]`, sem metadado explícito de convenção por função.
- `EBX`, `ESI` e `EDI` são preservados apenas no caminho de rotina marcado como compatível. Não há alocador geral de registradores.
- Os caminhos de empilhamento/armazenamento escalar reconhecem tamanhos de 1, 2 e 4 bytes. O número tem 4 bytes; o ponteiro é definido com 4 bytes.

Isso não pode ser reaproveitado como ABI x64. No Windows x64, os quatro primeiros argumentos inteiros/ponteiros usam `RCX`, `RDX`, `R8` e `R9`; os seguintes ocupam slots na pilha, com 32 bytes de shadow space. O chamador mantém `RSP` alinhado a 16 bytes antes de `CALL` e limpa a própria área de argumentos. Retornos inteiros e ponteiros usam `RAX`. `RAX`, `RCX`, `RDX`, `R8`–`R11` e `XMM0`–`XMM5` são voláteis; `RBX`, `RBP`, `RDI`, `RSI`, `R12`–`R15` e `XMM6`–`XMM15` são não voláteis. Argumentos/retornos de ponto flutuante usam registradores XMM conforme a posição do argumento. O backend atual não implementa essas regras.

### Formato PE do compilador `.pop`

O fonte do compilador define uma estrutura única para o cabeçalho PE32 e inicializa:

- `Machine=0x014C` (I386), Optional Header de `0xE0` bytes e Magic `0x010B` (PE32).
- `ImageBase=0x00400000`, `BaseOfData` presente e campos de ponteiro/stack/heap de 32 bits.
- Três seções: imports, dados e código; alinhamentos de seção e arquivo de 4096 bytes.
- Import descriptors e thunks com endereços de 32 bits; nenhuma tabela de relocação é construída. As referências absolutas dependem da imagem ser carregada na base fixa.

PE32+ requer uma estrutura distinta: `Machine=0x8664`, Optional Header de `0xF0`, Magic `0x020B`, ausência de `BaseOfData`, `ImageBase` e campos de stack/heap de 64 bits, thunks de importação de 64 bits e referências de código compatíveis com RIP-relative ou relocations. Alterar apenas o `Machine` ou o Magic não produziria um backend AMD64 funcional.

## Tipos e API do Windows

Na biblioteca padrão, `ponteiro` ocupa 4 bytes e `número` ocupa 4 bytes; há estruturas pontuais com 8 bytes, como `FILETIME`, mas não há um tipo geral de inteiro/pointer-size de 64 bits nem rotinas gerais de aritmética qword. A biblioteca define layouts de estruturas e declara imports diretamente com `Processe`; os nomes canônicos `DWORD`, `SIZE_T`, `ULONG_PTR`, `WPARAM` e similares não são a base uniforme das assinaturas. Isso exige uma auditoria das assinaturas e do layout das estruturas antes de reutilizá-las em x64: `DWORD`, `LONG`, `UINT` e `INT` permanecem 32-bit; `HANDLE`, `SIZE_T`, `SSIZE_T`, `ULONG_PTR`, `LONG_PTR`, `WPARAM`, `LPARAM` e `LRESULT` acompanham a largura de ponteiro.

Inventário de imports únicos na biblioteca padrão (as declarações/argumentos atuais estão nos usos de `Processe` em [Biblioteca padrão.pop](<./compilador/Biblioteca padrão.pop>)):

- `advapi32.dll` (9): CryptAcquireContextA, CryptCreateHash, CryptDecrypt, CryptDeriveKey, CryptDestroyHash, CryptDestroyKey, CryptEncrypt, CryptHashData, CryptReleaseContext.
- `comdlg32.dll` (1): PrintDlgExA.
- `gdi32.dll` (58): AddFontMemResourceEx, BeginPath, BitBlt, CreateCompatibleBitmap, CreateCompatibleDC, CreateFontA, CreatePen, CreatePolygonRgn, CreateRoundRectRgn, CreateSolidBrush, DPtoLP, DeleteDC, DeleteObject, Ellipse, EndDoc, EndPage, EndPath, ExtSelectClipRgn, GetCharABCWidthsA, GetCharacterPlacementA, GetClipRgn, GetCurrentObject, GetDeviceCaps, GetFontData, GetOutlineTextMetricsA, GetPixel, GetStockObject, GetTextExtentPoint32A, GetTextMetricsA, LPtoDP, LineTo, MoveToEx, PathToRegion, Polygon, PtInRegion, Rectangle, RemoveFontMemResourceEx, ResetDCA, RestoreDC, RoundRect, SaveDC, SelectClipRgn, SelectObject, SetBkColor, SetBkMode, SetGraphicsMode, SetMapMode, SetPixelV, SetPolyFillMode, SetTextCharacterExtra, SetTextColor, SetViewportExtEx, SetViewportOrgEx, SetWindowExtEx, SetWindowOrgEx, StartDocA, StartPage, TextOutA.
- `gdiplus.dll` (21): GdipBitmapLockBits, GdipBitmapUnlockBits, GdipCloneBitmapAreaI, GdipCreateBitmapFromScan0, GdipCreateBitmapFromStream, GdipCreateFromHDC, GdipCreateImageAttributes, GdipDeleteGraphics, GdipDisposeImage, GdipDisposeImageAttributes, GdipDrawImageRectRectI, GdipGetDC, GdipGetImageGraphicsContext, GdipGetImageHeight, GdipGetImageWidth, GdipImageRotateFlip, GdipReleaseDC, GdipSetImageAttributesColorMatrix, GdipSetPageUnit, GdiplusShutdown, GdiplusStartup.
- `kernel32.dll` (49): AllocConsole, Beep, CloseHandle, CopyFileA, CreateDirectoryA, CreateFileA, CreateProcessA, CreateThread, DeleteFileA, FileTimeToSystemTime, FindClose, FindFirstFileA, FindNextFileA, FreeConsole, GetConsoleMode, GetDriveTypeA, GetEnvironmentVariableA, GetFileAttributesA, GetFileAttributesExA, GetFileSize, GetLastError, GetLocalTime, GetModuleFileNameA, GetModuleHandleA, GetProcAddress, GetProcessHeap, GetStdHandle, GetTempPathA, GetTickCount, GetVolumeInformationA, GlobalAlloc, GlobalFree, GlobalLock, GlobalUnlock, HeapAlloc, HeapFree, HeapReAlloc, LoadLibraryA, MoveFileA, MulDiv, ReadFile, RemoveDirectoryA, SetConsoleOutputCP, SetFileAttributesA, SetFilePointer, Sleep, TerminateProcess, WaitForSingleObject, WriteFile.
- `ole32.dll` (5): CLSIDFromString, CoCreateInstance, CoInitializeEx, CoUninitialize, CreateStreamOnHGlobal.
- `shlwapi.dll` (2): ColorHLSToRGB, ColorRGBToHLS.
- `user32.dll` (40): BeginPaint, ClipCursor, CloseClipboard, CreateCursor, CreateWindowExA, DefWindowProcA, DestroyCursor, DestroyWindow, DisableProcessWindowsGhosting, DispatchMessageA, DrawFocusRect, EmptyClipboard, EndPaint, GetAsyncKeyState, GetClipboardData, GetCursorPos, GetDC, GetForegroundWindow, GetKeyState, GetMessageA, GetSystemMetrics, GetWindowRect, IsClipboardFormatAvailable, MapVirtualKeyA, MessageBeep, MessageBoxA, MoveWindow, OpenClipboard, PeekMessageA, PostMessageA, PostQuitMessage, RegisterClassExA, ScreenToClient, SetClipboardData, SetCursor, SetFocus, ShowCursor, ShowWindow, TranslateMessage, ValidateRect.
- `winhttp.dll` (8): WinHttpCloseHandle, WinHttpConnect, WinHttpOpen, WinHttpOpenRequest, WinHttpReadData, WinHttpReceiveResponse, WinHttpSendRequest, WinHttpqueryDataAvailable.
- `wininet.dll` (5): InternetCloseHandle, InternetCrackUrlA, InternetOpenA, InternetOpenUrlA, InternetReadFile.
- `winmm.dll` (1): PlaySound.
- `ws2_32.dll` (10): WSACleanup, WSAGetLastError, WSAStartup, closesocket, connect, inet_ntoa, recv, send, setsockopt, socket.

O compilador-fonte também importa `GetCommandLineA` e `GetCurrentDirectoryA` de `kernel32.dll`; `SetConsoleOutputCP` já aparece na biblioteca padrão. A lista identifica 211 imports únicos combinados, mas ainda não é uma validação ABI, parâmetro por parâmetro, de cada assinatura.

## Auxiliares TypeScript: mudanças e limites

`peImage.ts` é uma ferramenta isolada que recebe bytes de código já gerados; ela não compila `.pop` nem é chamada pelo executável do compilador. Agora:

- Constrói PE32 e PE32+ com `.text` e, quando há imports, `.idata`.
- Cria descriptors, ILT/IAT de 4 bytes em x86 e 8 bytes em x64, imports por nome e diretórios de importação/IAT.
- Corrige chamadas `FF 15` para IAT: endereço absoluto em x86 e deslocamento RIP-relative em x64.
- Usa Optional Header PE32+ com machine AMD64 e flags COFF sem `IMAGE_FILE_32BIT_MACHINE`; corrige os offsets de stack/heap/NumberOfRvaAndSizes PE32.

`x64Encoder.ts` contém codificadores independentes. A preparação de chamadas inteiras/ponteiros assume argumentos qword previamente empilhados em ordem de origem; calcula shadow space, alinhamento, copia argumentos além de quatro para a área de saída e deixa a limpeza a cargo do chamador. `x64Epilogue` emite `RET` simples. Isso ainda não implementa preservação de todos os registradores não voláteis, XMM, callbacks, agregados ou integração com fragmentos.

Validação deste auxiliar: os testes focados verificam PE32/PE32+, diretórios e IAT, chamadas x86 absolutas e x64 RIP-relative e os encoders. No Windows, foram executados executáveis mínimos PE32/I386 e PE32+/AMD64 que chamam `kernel32!ExitProcess`, ambos com código 0. Outro executável AMD64 usou os helpers para chamar `FormatMessageA` com sete argumentos e `ExitProcess`; o retorno indicou sucesso. Isso valida apenas a camada auxiliar, não o compilador `.pop`.

## Plano de integração no compilador `.pop`

1. Manter a rotina x86 e suas saídas como baseline; criar estado de destino explícito e uma estrutura PE64 separada, sem alargar os tipos PE32 existentes.
2. Definir o layout alvo de tipos e estruturas: número continua 32-bit; ponteiros e tipos Windows pointer-sized passam a 64-bit no alvo x64; aplicar alinhamento/padding Windows nas estruturas ABI.
3. Implementar codificação AMD64 dos fragmentos: frame, locais e parâmetros, aritmética de números de 32-bit, carga/gravação de ponteiros de 64-bit, chamadas internas, desvios e endereços RIP-relative.
4. Implementar uma convenção x64 consistente para rotinas da linguagem e callbacks; para chamadas externas, passar os quatro primeiros argumentos em registradores, reservar shadow space, alinhar RSP, encaminhar argumentos adicionais e preservar registradores não voláteis utilizados.
5. Integrar imports PE32+ e a seleção `para: Windows x64` ao pipeline `.pop`; manter `para: Windows x86`/sem flags no backend PE32 existente. Recusar explicitamente destinos que ainda não têm backend.
6. Adicionar testes graduais: compilar o compilador, executar regressões x86, inspecionar cabeçalhos, rodar programas x64 com operações/rotinas e, por fim, testar a biblioteca padrão e chamadas Windows representativas.

### Funcionalidades ainda pendentes

- O fonte `.pop` não gera código AMD64 nem PE32+; `Windows x64` ainda retorna diagnóstico de não implementação.
- Não há tipo-alvo de ponteiro de 64 bits nem operações gerais de inteiros de 64 bits na biblioteca padrão.
- As 212 funções importadas ainda precisam de verificação de assinaturas e layout de estruturas conforme Windows x64; callbacks e `XMM` não foram implementados.
- Os auxiliares TypeScript não estão integrados à compilação da linguagem e não devem ser usados para afirmar suporte x64 do compilador.
