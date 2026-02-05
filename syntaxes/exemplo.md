# Example.md
# ============================================
# MARKUP HEADING
# ============================================

# Meu Projeto               // markup.heading

Este projeto demonstra **vários tokens**  
// markup.bold

> Uma citação                 // markup.quote.markdown

[link](https://exemplo.com)   // markup.underline.link.markdown


// ============================================
// CÓDIGO JAVASCRIPT
// ============================================
<script>
/* Comentário de documentação        comment.block.documentation
 * TODO: melhorar isso               todo.emphasis
 */

/// Comentário comum                 comment.line.double-slash

class Pessoa {                      // storage.type + entity.name.type.class
    constructor(nome, idade) {      // meta.function + entity.name.function
        this.nome = nome            // variable.language + variable.other.readwrite
        this.idade = idade          // variable.other.readwrite
    }

    falar() {                       // entity.name.function
        console.log("Oi!");         // support.function.console + string.quoted
    }
}

// Variáveis comuns
let x = 10;                         // storage.type + variable.other.readwrite + constant.numeric
const PI = Math.PI;                 // storage.type + entity.name.variable + support.constant.math

// Função externa do runtime
setTimeout(() => {                  // support.function
    x++;                            // keyword.operator.increment
}, 1000);

// Operadores
let ok = x instanceof Number;       // keyword.operator.expression.instanceof
let y = x + 2 * 3;                  // keyword.operator.arithmetic

// Palavra-chave de controle
if (ok) {                           // keyword.control
    console.log("OK");              // support.function.console
} else {
    throw new Error("Falhou");      // keyword.control + support.class
}

// Erro proposital
let 9invalido = 0;                  // invalid.illegal

// Expressão template
let s = `Olá, ${x}`;                // string + meta.template.expression

// Chamada de método
pessoa.falar();                     // meta.method-call + entity.name.function

// ============================================
// HTML
// ============================================

<div class="box" id="main">         <!-- entity.name.tag + entity.other.attribute-name -->
    <p>Olá mundo!</p>               <!-- string + markup -->
</div>

</script>