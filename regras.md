Vamos ajustar o arquivo de gramática da linguagem. Se necessário utilize o parser para entender mais sobre a linguagem. Você também pode usar o arquivo de gramática do Typescript para testar idéias. Vamos iniciar pela declaração de tipos simples.

A sintaxe para a declaração de tipo simples é a seguinte:
```
<tipo simples> : <artigo indefinido><nome do tipo derivado><operador de atribuição><artigo indefinido><nome do tipo base><ponto final>;
```
onde
```
<artigo indefinido>: 'um' | 'uma' | 'uns' | 'umas' | 'esse' | 'essa' | 'esses' | 'essas';
<operador de atribuição>: 'é' | 'são';
<ponto final>: '.';
```
Exemplo:
`Um nome do tipo derivado é um nome do tipo base.`

É importante notar que:
1) o nome do tipo derivado e tipo base podem conter espaços. 
2) quebras de linha podem aparecer em qualquer lugar da declaração
3) comentários de bloco - iniciados por `[` e terminados por `]` - podem aparecer em qualquer lugar da declaração - desde que antecedidos e sucedidos por espaços.
Exemplo:
`Um [comentário1] nome [comentário2] do [comentário3] tipo [comentário4] derivado [comentário5] é [comentário6] um [comentário7] nome [comentário8] do [comentário9] tipo [comentário10] base [comentário11] .`
meta.type.name.pop
entity.name.type.pop

Obedeça as regras a seguir:
1) Artigos indefinidos devem receber a regra `storage.type.language.article.pop`.
2) O nome do tipo derivado deve receber a regra `entity.name.type.pop`.
3) O operador de atribuição deve receber a regra `meta.type.declaration.simple.pop`.
4) O ponto final deve receber a regra `punctuation.terminator.pop`.
5) Esta regra não deve identificar outras declarações de tipo, como declarações de tipo ponteiro, declarações de tipo escalares ou declarações de tipos estruturados/listas.

As informações abaixo servem para que a gramática possa identificar as diferentes declarações de tipo, sem fazer corespondências indevidas. Depois eu informarei as regras para serem aplicadas nelas.
A sintaxe para a declaração de tipo ponteiro é a seguinte:
```
<tipo ponteiro> : <artigo indefinido><nome do tipo derivado><operador de atribuição><artigo indefinido><nome do tipo ponteiro>'para'<artigo indefinido><nome do tipo apontado><ponto final>;
```
Exemplo: 
`Um pchar é um ponteiro para um byte.`
A sintaxe para a declaração de tipos escalares é a seguinte:
```
<tipo escalar> : <artigo indefinido><nome do tipo escalar><operador de atribuição><número ou fração literal><nome do tipo base><ponto final>;
```
Exemplo: 
`Um centímetro são 254/100 polegadas.`
A sintaxe para a declarações de tipos estruturados e listas  é a seguinte:
```
<tipo estruturado> : <artigo indefinido><nome do tipo esttruturado><operador de atribuição><artigo indefinido><nome do tipo base><com><campos><ponto final>;
```
onde
```
campos: campo (pausa campo)*
campo: (artigo_indefinido | numero_inteiro 'bytes') 
       (denominacoes nome | 'sob' artigo_definido nome | '(referência)')?;
pausa: ',' | ';' | 'e' | 'ou';
pausas: pausa+;
denominacoes:
      'denominado'
    | 'denominada'
    | 'denominados'
    | 'denominadas';
```
Exemplos: 
```
Uma word é uma estrutura com
  Um byte denominado byte inicial  e
  Um byte denominado byte final .

Uma string é uma estrutura com
  Um caractere inicial e
  Um caractere final.

Um ponteiro é uma estrutura com 4 bytes.

Uma referência é uma lista com
  Uma string e
  Um ponteiro (referência).

```