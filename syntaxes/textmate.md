Abaixo está uma **organização completa**, agrupando **todos os escopos** em **categorias típicas do TextMate**.
Agrupei por função semântica: **Comentários**, **Constantes**, **Entidades**, **Keywords**, **Markup**, **Meta**, **Pontuação**, **Armazenamento**, **Strings**, **Suporte**, **Variáveis**, **Tokens especiais**, **Outros / Fontes / Scopes específicos**, etc.

Se quiser, posso gerar também **uma tabela**, **um JSON**, **uma taxonomia hierárquica**, ou **mapear cada escopo a cores típicas de temas**.

---

# ? **ORGANIZAÇÃO POR CATEGORIAS**

---

## **1. Comentários**

```
comment
comment.block.documentation
comment markup.link
comment.line.double-slash
```

---

## **2. Constantes**

```
constant
constant.character.character-class.regexp.xi
constant.character.entity
constant.character.escape
constant.character.format.placeholder.other.python
constant.character.xi
constant.keyword.clojure
constant.language.symbol.elixir
constant.language.symbol.ruby
constant.numeric
constant.other.character-class.regexp
constant.other.color.rgb-value.xi
constant.other.symbol
constant.regexp.xi
```

---

## **3. Palavras-chave (keywords)**

```
keyword
keyword.control
keyword.control.flow.python
keyword.control.import.python
keyword.control.xi
keyword.operator
keyword.operator.address.go
keyword.operator.arithmetic
keyword.operator.arithmetic.go
keyword.operator.arithmetic.php
keyword.operator.assignment
keyword.operator.assignment.c
keyword.operator.assignment.cpp
keyword.operator.assignment.compound
keyword.operator.assignment.compound.js
keyword.operator.assignment.compound.ts
keyword.operator.assignment.go
keyword.operator.bitwise
keyword.operator.bitwise.php
keyword.operator.bitwise.shift.c
keyword.operator.bitwise.shift.cpp
keyword.operator.c
keyword.operator.channel
keyword.operator.comparison
keyword.operator.comparison.c
keyword.operator.comparison.cpp
keyword.operator.comparison.php
keyword.operator.cpp
keyword.operator.css
keyword.operator.decrement
keyword.operator.decrement.c
keyword.operator.decrement.cpp
keyword.operator.delete
keyword.operator.error-control.php
keyword.operator.expression.delete
keyword.operator.expression.import
keyword.operator.expression.in
keyword.operator.expression.instanceof
keyword.operator.expression.keyof
keyword.operator.expression.of
keyword.operator.expression.typeof
keyword.operator.expression.void
keyword.operator.heredoc.php
keyword.operator.increment
keyword.operator.increment.c
keyword.operator.increment.cpp
keyword.operator.instanceof.java
keyword.operator.less
keyword.operator.logical
keyword.operator.logical.php
keyword.operator.logical.python
keyword.operator.misc.rust
keyword.operator.module
keyword.operator.new
keyword.operator.nowdoc.php
keyword.operator.optional
keyword.operator.quantifier.regexp
keyword.operator.regexp.php
keyword.operator.relational
keyword.operator.scss
keyword.operator.sigil.rust
keyword.operator.sizeof.c
keyword.operator.sizeof.cpp
keyword.operator.ternary
keyword.operator.type.php
keyword.other.array.phpdoc.php
keyword.other.special-method
keyword.other.substitution.begin
keyword.other.substitution.end
keyword.other.template.begin
keyword.other.template.end
keyword.other.type.php
keyword.other.unit
```

---

## **4. Entidades (nomes de classes, funções, atributos, etc.)**

```
entity.global.clojure
entity.name.class
entity.name.class.identifier.namespace.type
entity.name.class.xi
entity.name.function
entity.name.function.xi
entity.name.goto-label.php
entity.name.label.cs
entity.name.lifetime.rust
entity.name.namespace
entity.name.package.go
entity.name.scope-resolution.function.call
entity.name.scope-resolution.function.definition
entity.name.section
entity.name.section.markdown
entity.name.tag
entity.name.type
entity.name.type.class
entity.name.type.module
entity.name.type.namespace
entity.name.variable.local.cs
entity.other.alias.php
entity.other.attribute-name
entity.other.attribute-name.class.css
entity.other.attribute-name.id
entity.other.attribute-name.js
entity.other.attribute-name.jsx
entity.other.attribute-name.pseudo-class
entity.other.attribute-name.pseudo-element
entity.other.attribute-name.ts
entity.other.attribute-name.tsx
entity.other.inherited-class
```

---

## **5. Funções / Parâmetros**

```
function.brace
function.parameter
function.parameter.cs
function.parameter.ruby
```

---

## **6. Marcação (Markdown, Diff, etc.)**

```
accent.xi
emphasis md
inline-color-decoration rgb-value
less rgb-value
markup.bold
markup.changed.diff
markup.deleted.diff
markup.heading
markup.heading punctuation.definition.heading
markup.heading.setext
markup.heading.setext.1.markdown
markup.heading.setext.2.markdown
markup.inline.raw.markdown
markup.inline.raw.string.markdown
markup.inserted.diff
markup.italic
markup.italic.markdown
markup.quote.markdown
markup.underline.link.image.markdown
markup.underline.link.markdown
string.other.link.title.markdown
string.other.link.description.markdown
wikiword.xi
```

---

## **7. Seção “meta.*” (estruturas, AST, blocos)**

```
meta.arguments.coffee
meta.brace.square
meta.definition.class.inherited.classes.groovy
meta.definition.variable.name.groovy
meta.definition.variable.name.java
meta.diff.header.from-file
meta.diff.header.to-file
meta.function.cpp
meta.function.c
meta.function-call.generic.python
meta.function-call.object.php
meta.function-call.php
meta.function-call.static.php
meta.function.decorator.identifier.python
meta.function.decorator.python
meta.interface.php
meta.method.body.java
meta.method-call.java
meta.method.groovy
meta.method.identifier.java
meta.object-literal.key
meta.other.type.phpdoc.php
meta.property.object
meta.require
meta.scope.prerequisites.makefile
meta.selector
meta.symbol.clojure
meta.tag
meta.template.expression
```

---

## **8. Pontuação (punctuation.*)**

Incluo todas juntas, organizadas por tipo:

### **Definições**

```
punctuation.definition.ability.begin.unison
punctuation.definition.ability.end.unison
punctuation.definition.annotation.java
punctuation.definition.arguments.begin.bracket.round.php
punctuation.definition.arguments.begin.python
punctuation.definition.arguments.end.bracket.round.php
punctuation.definition.arguments.end.python
punctuation.definition.array.begin.bracket.round.php
punctuation.definition.array.end.bracket.round.php
punctuation.definition.begin.bracket.curly.php
punctuation.definition.begin.bracket.round.php
punctuation.definition.block.sequence.item.yaml
punctuation.definition.bold
punctuation.definition.bold.markdown
punctuation.definition.comment
punctuation.definition.constant
punctuation.definition.delayed.unison
punctuation.definition.end.bracket.curly.php
punctuation.definition.end.bracket.round.php
punctuation.definition.from-file.diff
punctuation.definition.hash.unison
punctuation.definition.heading.markdown
punctuation.definition.italic
punctuation.definition.list.begin.markdown
punctuation.definition.list.begin.python
punctuation.definition.list.begin.unison
punctuation.definition.list.end.python
punctuation.definition.list.end.unison
punctuation.definition.list.markdown
punctuation.definition.metadata.markdown
punctuation.definition.method-parameters.begin.java
punctuation.definition.method-parameters.end.java
punctuation.definition.parameters.begin.bracket.round.php
punctuation.definition.parameters.end.bracket.round.php
punctuation.definition.section.switch-block.begin.bracket.curly.php
punctuation.definition.section.switch-block.end.bracket.curly.php
punctuation.definition.section.switch-block.start.bracket.curly.php
punctuation.definition.storage-type.begin.bracket.round.php
punctuation.definition.storage-type.end.bracket.round.php
punctuation.definition.string.begin
punctuation.definition.string.begin.markdown
punctuation.definition.string.end
punctuation.definition.string.end.markdown
punctuation.definition.tag.xi
punctuation.definition.template-expression.begin
punctuation.definition.template-expression.end
punctuation.definition.to-file.diff
```

### **Parênteses / blocos / seções**

```
punctuation.parenthesis.begin.python
punctuation.parenthesis.end.python
punctuation.section.array.begin.php
punctuation.section.array.end.php
punctuation.section.block.begin.bracket.curly.c
punctuation.section.block.begin.bracket.curly.cpp
punctuation.section.block.begin.java
punctuation.section.block.end.bracket.curly.c
punctuation.section.block.end.bracket.curly.cpp
punctuation.section.block.end.java
punctuation.section.class.begin.bracket.curly.java
punctuation.section.class.begin.java
punctuation.section.class.end.bracket.curly.java
punctuation.section.class.end.java
punctuation.section.embedded
punctuation.section.embedded.begin
punctuation.section.embedded.end
punctuation.section.inner-class.begin.java
punctuation.section.inner-class.end.java
punctuation.section.method.begin.bracket.curly.java
punctuation.section.method.begin.java
punctuation.section.method.end.bracket.curly.java
punctuation.section.method.end.java
punctuation.section.parameters.begin.bracket.round.c
punctuation.section.parameters.end.bracket.round.c
punctuation.section.parens.begin.bracket.round.c
punctuation.section.parens.end.bracket.round.c
punctuation.section.scope.begin.php
punctuation.section.scope.end.php
```

### **Separadores**

```
punctuation.separator.arguments.python
punctuation.separator.c
punctuation.separator.cpp
punctuation.separator.delimiter
punctuation.separator.delimiter.php
punctuation.separator.delimiter.unison
punctuation.separator.element.python
punctuation.separator.key-value
punctuation.separator.list.comma.css
punctuation.separator.period.java
punctuation.separator.period.python
punctuation.separator.pipe.unison
```

### **Operadores / Terminadores**

```
punctuation.operator.assignment.as.unison
punctuation.terminator.expression.php
punctuation.terminator.java
punctuation.terminator.statement.c
punctuation.bracket.angle.java
punctuation.quasi.element
```

---

## **9. Armazenamento (storage.*)**

```
storage
storage.modifier.import.java
storage.modifier.import.groovy
storage.modifier.lifetime.rust
storage.type.annotation.java
storage.type.cs
storage.type.generic.java
storage.type.haskell
storage.type.java
storage.type.object.array.java
storage.type.php
```

---

## **10. Strings**

```
string
string.other.link.title.markdown
string.other.link.description.markdown
string.regexp
```

---

## **11. Suporte (support.*)**

```
support.class
support.constant.color.w3c-standard-color-name.css
support.constant.color.w3c-standard-color-name.scss
support.constant.core.php
support.constant.core.rust
support.constant.edge
support.constant.elm
support.constant.ext.php
support.constant.font-name
support.constant.json
support.constant.math
support.constant.parser-token.php
support.constant.property-value
support.constant.property-value.css
support.constant.property-value.scss
support.constant.property.math
support.constant.std.php
support.function
support.function.any-method
support.function.console
support.function.std.rust
support.module.node
support.other.namespace.use.php
support.other.namespace.php
support.other.namespace.use-as.php
support.other.php
support.type.object.console
support.type.object.dom
support.type.builtin.ts
support.type.builtin.tsx
support.type.fx.hlsl
support.type.object.hlsl
support.type.object.hlsl
support.type.object.module
support.type.object.rw.hlsl
support.type.posix-reserved.c
support.type.posix-reserved.cpp
support.type.prelude.elm
support.type.primitive
support.type.primitive.ts
support.type.primitive.tsx
support.type.property-name
support.type.property-name.json
support.type.property-name.json punctuation
support.type.python
support.type.sampler.hlsl
support.type.swift
support.type.texture.hlsl
support.type.type.flowtype
support.type.vb.asp
support.variable.dom
support.variable.magic.python
support.variable.object.node
support.variable.object.process
support.variable.property
support.variable.property.dom
support.variable.semantic.hlsl
```

---

## **12. Variáveis (variable.*)**

```
variable
variable.c
variable.function
variable.interpolation
variable.language
variable.language.rust
variable.language.super
variable.other.class.js
variable.other.class.php
variable.other.class.ts
variable.other.constant
variable.other.generic-type.haskell
variable.other.readwrite
variable.parameter
variable.parameter.function
variable.parameter.function.coffee
variable.parameter.function.js
variable.parameter.function.language.python
variable.parameter.function.language.special.self.python
variable.parameter.function.python
```

---

## **13. Tokens especiais**

```
token.debug-token
token.error-token
token.info-token
token.package
token.package.keyword
token.storage
token.storage.type.java
token.variable.parameter.java
token.warn-token
```

---

## **14. Outros / Modo de linguagem / blocos**

```
block.scope.begin
block.scope.end
control.elements
function.brace
import.storage.java
meta.require
selector.sass
source.java
source.json meta.structure.dictionary.json > constant.language.json
source.json meta.structure.dictionary.json > string.quoted.json
source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string
source.json meta.structure.dictionary.json > value.json > string.quoted.json
source.ini
source.json meta.structure.array.json > constant.language.json
source.json meta.structure.array.json > value.json > string.quoted.json
source.json meta.structure.array.json > value.json > string.quoted.json > punctuation
source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation
source.makefile
text.bracketed
text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade
text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade
text.variable
todo.bold
todo.emphasis
```

---

