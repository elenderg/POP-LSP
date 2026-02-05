/* Comentário de documentação        comment.block.documentation
 * TODO: melhorar isso               todo.emphasis
 */

/// Comentário comum                 comment.line.double-slash

class Pessoa {                      // storage.type + entity.name.type.class
    constructor(nome:string, idade:number) {      // meta.function + entity.name.function
        //this.nome = nome;            // variable.language + variable.other.readwrite
        //this.idade = idade;          // variable.other.readwrite
        this.falar();                 // entity.name.function
    }

    falar() {                       // entity.name.function
        console.log("Oi!");         // support.function.console + string.quoted
    }
}


// Variáveis comuns
let x: number = 10 ;                         // storage.type + variable.other.readwrite + constant.numeric
const PI = Math.PI;                 // storage.type + entity.name.variable + support.constant.math

// Função externa do runtime
setTimeout(() => {                  // support.function
    x++;                            // keyword.operator.increment
}, 1000);

// Operadores
let ok = true // x instanceof Number; // keyword.operator.expression.instanceof
let y = x + 2 * 3;                    // keyword.operator.arithmetic

// Palavra-chave de controle
if (ok) {                           // keyword.control
    console.log("OK");              // support.function.console
} else {
    throw new Error("Falhou");      // keyword.control + support.class
}

// Erro proposital #invalido
let invalido = 0;                  // invalid.illegal

// Expressão template
let s = `Olá, ${x}`;                // string + meta.template.expression

let pessoa = new Pessoa("João",42);

// Chamada de método
pessoa.falar();                     // meta.method-call + entity.name.function

type teste = string | number;        // storage.type + entity.name.type.

type Pessoa2 = {
    nome: string;
    idade: number;
}

function demonstraUsoDeParametros(primeiroParametro:teste,segundoParametro:any):void {
  //console.log(primeiroParametro);
  if (segundoParametro) {
    console.log(segundoParametro);
  }
  if (segundoParametro=null) {
      console.log(segundoParametro);
  }
  
  return;
}