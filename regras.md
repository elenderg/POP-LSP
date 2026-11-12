Ajustar o arquivo de gramática da linguagem. Vamos iniciar pela declaração de tipos simples.

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

Obedeça as regras a seguir:
1) Artigos indefinidos devem receber a regra `storage.type.language.article.pop`.
2) O nome do tipo derivado deve receber a regra `entity.name.type.pop`.
3) O operador de atribuição deve receber a regra `meta.type.declaration.simple.pop`.
4) O ponto final deve receber a regra `punctuation.terminator.pop`.
5) Esta regra não deve identificar outras declarações de tipo, como declarações de tipo ponteiro, declarações de tipo escalares ou declarações de tipos estruturados/listas.


