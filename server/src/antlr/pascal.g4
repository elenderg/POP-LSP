// $antlr-format alignTrailingComments true, columnLimit 150, minEmptyLines 1, maxEmptyLinesToKeep 1, reflowComments false, useTab false
// $antlr-format allowShortRulesOnASingleLine false, allowShortBlocksOnASingleLine true, alignSemicolons hanging, alignColons hanging

grammar pascal;

options {
    caseInsensitive = true;
}

program
    : cabecalhoDoPrograma (INTERFACE)? bloco DOT EOF
    ;

cabecalhoDoPrograma
    : PROGRAM identificador (PARENTESESESQUERDO listaDeIdentificadores PARENTESESDIREITO)? SEMI
    | UNIT identificador SEMI
    ;

identificador
    : IDENT
    ;

bloco
    : (
        labelDeclarationPart
        | constantDefinitionPart
        | typeDefinitionPart
        | variableDeclarationPart
        | procedureAndFunctionDeclarationPart
        | usesUnitsPart
        | IMPLEMENTATION
    )* compoundStatement
    ;

usesUnitsPart
    : USES listaDeIdentificadores SEMI
    ;

labelDeclarationPart
    : LABEL label (VIRGULA label)* SEMI
    ;

label
    : inteiroSemSinal
    ;

constantDefinitionPart
    : CONST (constantDefinition SEMI)+
    ;

constantDefinition
    : identificador IGUAL_A constante
    ;

constantChr
    : CHR PARENTESESESQUERDO inteiroSemSinal PARENTESESDIREITO
    ;

constante
    : numeroSemSinal
    | sinal numeroSemSinal
    | identificador
    | sinal identificador
    | string
    | constantChr
    ;

numeroSemSinal
    : inteiroSemSinal
    | fracaoSemSinal
    ;

inteiroSemSinal
    : NUM_INT
    ;

fracaoSemSinal
    : NUM_REAL
    ;

sinal
    : SINAL_DE_ADICAO
    | SINAL_DE_SUBTRACAO
    ;

bool_
    : TRUE
    | FALSE
    ;

string
    : STRING_LITERAL
    ;

typeDefinitionPart
    : TYPE (definicaoDeTipo SEMI)+
    ;

definicaoDeTipo
    : identificador IGUAL_A (tipo_ | functionType | procedureType)
    ;

functionType
    : FUNCTION (listaFormalDeParametros)? DOIS_PONTOS tipoDeRetorno
    ;

procedureType
    : PROCEDURE (listaFormalDeParametros)?
    ;

tipo_
    : tipoSimples
    | tipoEstruturado
    | tipoPonteiro
    ;

tipoSimples
    : tipoEscalar
    | tipoDeSubIntervalo
    | identificadorDeTipo
    | tipoTextual
    ;

tipoEscalar
    : PARENTESESESQUERDO listaDeIdentificadores PARENTESESDIREITO
    ;

tipoDeSubIntervalo
    : constante PONTO_E_PONTO constante
    ;

identificadorDeTipo
    : identificador
    | (CHAR | BOOLEAN | INTEGER | REAL | STRING)
    ;

tipoEstruturado
    : PACKED tipoEstruturadoNaoEmpacotado
    | tipoEstruturadoNaoEmpacotado
    ;

tipoEstruturadoNaoEmpacotado
    : tipoMatriz
    | tipoEstrutura
    | tipoConjunto
    | tipoArquivo
    ;

tipoTextual
    : STRING COLCHETE_ESQUERDO (identificador | numeroSemSinal) COLCHETE_DIREITO
    ;

tipoMatriz
    : ARRAY COLCHETE_ESQUERDO listaDeTipos COLCHETE_DIREITO OF tipoComponente
    | ARRAY LBRACK2 listaDeTipos RBRACK2 OF tipoComponente
    ;

listaDeTipos
    : tipoDeIndice (VIRGULA tipoDeIndice)*
    ;

tipoDeIndice
    : tipoSimples
    ;

tipoComponente
    : tipo_
    ;

tipoEstrutura
    : RECORD listaDeCampos? END
    ;

listaDeCampos
    : parteFixa (SEMI parteVariante)?
    | parteVariante
    ;

parteFixa
    : secaoDaEstrutura (SEMI secaoDaEstrutura)*
    ;

secaoDaEstrutura
    : listaDeIdentificadores DOIS_PONTOS tipo_
    ;

parteVariante
    : CASE etiqueta OF variante (SEMI variante)*
    ;

etiqueta
    : identificador DOIS_PONTOS identificadorDeTipo
    | identificadorDeTipo
    ;

variante
    : constList DOIS_PONTOS PARENTESESESQUERDO listaDeCampos PARENTESESDIREITO
    ;

tipoConjunto
    : SET OF tipoBase
    ;

tipoBase
    : tipoSimples
    ;

tipoArquivo
    : FILE OF tipo_
    | FILE
    ;

tipoPonteiro
    : PONTEIRO identificadorDeTipo
    ;

variableDeclarationPart
    : VAR variableDeclaration (SEMI variableDeclaration)* SEMI
    ;

variableDeclaration
    : listaDeIdentificadores DOIS_PONTOS tipo_
    ;

procedureAndFunctionDeclarationPart
    : procedureOrFunctionDeclaration SEMI
    ;

procedureOrFunctionDeclaration
    : procedureDeclaration
    | functionDeclaration
    ;

procedureDeclaration
    : PROCEDURE identificador (listaFormalDeParametros)? SEMI bloco
    ;

listaFormalDeParametros
    : PARENTESESESQUERDO formalParameterSection (SEMI formalParameterSection)* PARENTESESDIREITO
    ;

formalParameterSection
    : parameterGroup
    | VAR parameterGroup
    | FUNCTION parameterGroup
    | PROCEDURE parameterGroup
    ;

parameterGroup
    : listaDeIdentificadores DOIS_PONTOS identificadorDeTipo
    ;

listaDeIdentificadores
    : identificador (VIRGULA identificador)*
    ;

constList
    : constante (VIRGULA constante)*
    ;

functionDeclaration
    : FUNCTION identificador (listaFormalDeParametros)? DOIS_PONTOS tipoDeRetorno SEMI bloco
    ;

tipoDeRetorno
    : identificadorDeTipo
    ;

statement
    : label DOIS_PONTOS unlabelledStatement
    | unlabelledStatement
    ;

unlabelledStatement
    : simpleStatement
    | structuredStatement
    ;

simpleStatement
    : assignmentStatement
    | procedureStatement
    | gotoStatement
    | emptyStatement_
    ;

assignmentStatement
    : variable ASSIGN expression
    ;

variable
    : (AT identificador | identificador) (
        COLCHETE_ESQUERDO expression (VIRGULA expression)* COLCHETE_DIREITO
        | LBRACK2 expression (VIRGULA expression)* RBRACK2
        | DOT identificador
        | PONTEIRO
    )*
    ;

expression
    : simpleExpression (relationaloperator expression)?
    ;

relationaloperator
    : IGUAL_A
    | NOT_EQUAL
    | LT
    | LE
    | GE
    | GT
    | IN
    ;

simpleExpression
    : term (additiveoperator simpleExpression)?
    ;

additiveoperator
    : SINAL_DE_ADICAO
    | SINAL_DE_SUBTRACAO
    | OR
    ;

term
    : signedFactor (multiplicativeoperator term)?
    ;

multiplicativeoperator
    : STAR
    | SLASH
    | DIV
    | MOD
    | AND
    ;

signedFactor
    : (SINAL_DE_ADICAO | SINAL_DE_SUBTRACAO)? factor
    ;

factor
    : variable
    | PARENTESESESQUERDO expression PARENTESESDIREITO
    | functionDesignator
    | unsignedConstant
    | set_
    | NOT factor
    | bool_
    ;

unsignedConstant
    : numeroSemSinal
    | constantChr
    | string
    | NIL
    ;

functionDesignator
    : identificador PARENTESESESQUERDO parameterList PARENTESESDIREITO
    ;

parameterList
    : actualParameter (VIRGULA actualParameter)*
    ;

set_
    : COLCHETE_ESQUERDO elementList COLCHETE_DIREITO
    | LBRACK2 elementList RBRACK2
    ;

elementList
    : element (VIRGULA element)*
    |
    ;

element
    : expression (PONTO_E_PONTO expression)?
    ;

procedureStatement
    : identificador (PARENTESESESQUERDO parameterList PARENTESESDIREITO)?
    ;

actualParameter
    : expression parameterwidth*
    ;

parameterwidth
    : DOIS_PONTOS expression
    ;

gotoStatement
    : GOTO label
    ;

emptyStatement_
    :
    ;

empty_
    :
    /* empty */
    ;

structuredStatement
    : compoundStatement
    | conditionalStatement
    | repetetiveStatement
    | withStatement
    ;

compoundStatement
    : BEGIN statements END
    ;

statements
    : statement (SEMI statement)*
    ;

conditionalStatement
    : ifStatement
    | caseStatement
    ;

ifStatement
    : IF expression THEN statement (: ELSE statement)?
    ;

caseStatement
    : CASE expression OF caseListElement (SEMI caseListElement)* (SEMI ELSE statements)? END
    ;

caseListElement
    : constList DOIS_PONTOS statement
    ;

repetetiveStatement
    : whileStatement
    | repeatStatement
    | forStatement
    ;

whileStatement
    : WHILE expression DO statement
    ;

repeatStatement
    : REPEAT statements UNTIL expression
    ;

forStatement
    : FOR identificador ASSIGN forList DO statement
    ;

forList
    : initialValue (TO | DOWNTO) finalValue
    ;

initialValue
    : expression
    ;

finalValue
    : expression
    ;

withStatement
    : WITH recordVariableList DO statement
    ;

recordVariableList
    : variable (VIRGULA variable)*
    ;

AND
    : 'AND'
    ;

ARRAY
    : 'ARRAY'
    ;

BEGIN
    : 'BEGIN'
    ;

BOOLEAN
    : 'BOOLEAN'
    ;

CASE
    : 'CASE'
    ;

CHAR
    : 'CHAR'
    ;

CHR
    : 'CHR'
    ;

CONST
    : 'CONST'
    ;

DIV
    : 'DIV'
    ;

DO
    : 'DO'
    ;

DOWNTO
    : 'DOWNTO'
    ;

ELSE
    : 'ELSE'
    ;

END
    : 'END'
    ;

FILE
    : 'FILE'
    ;

FOR
    : 'FOR'
    ;

FUNCTION
    : 'FUNCTION'
    ;

GOTO
    : 'GOTO'
    ;

IF
    : 'IF'
    ;

IN
    : 'IN'
    ;

INTEGER
    : 'INTEGER'
    ;

LABEL
    : 'LABEL'
    ;

MOD
    : 'MOD'
    ;

NIL
    : 'NIL'
    ;

NOT
    : 'NOT'
    ;

OF
    : 'OF'
    ;

OR
    : 'OR'
    ;

PACKED
    : 'PACKED'
    ;

PROCEDURE
    : 'PROCEDURE'
    ;

PROGRAM
    : 'PROGRAM'
    ;

REAL
    : 'REAL'
    ;

RECORD
    : 'RECORD'
    ;

REPEAT
    : 'REPEAT'
    ;

SET
    : 'SET'
    ;

THEN
    : 'THEN'
    ;

TO
    : 'TO'
    ;

TYPE
    : 'TYPE'
    ;

UNTIL
    : 'UNTIL'
    ;

VAR
    : 'VAR'
    ;

WHILE
    : 'WHILE'
    ;

WITH
    : 'WITH'
    ;

SINAL_DE_ADICAO
    : '+'
    ;

SINAL_DE_SUBTRACAO
    : '-'
    ;

STAR
    : '*'
    ;

SLASH
    : '/'
    ;

ASSIGN
    : ':='
    ;

VIRGULA
    : ','
    ;

SEMI
    : ';'
    ;

DOIS_PONTOS
    : ':'
    ;

IGUAL_A
    : '='
    ;

NOT_EQUAL
    : '<>'
    ;

LT
    : '<'
    ;

LE
    : '<='
    ;

GE
    : '>='
    ;

GT
    : '>'
    ;

PARENTESESESQUERDO
    : '('
    ;

PARENTESESDIREITO
    : ')'
    ;

COLCHETE_ESQUERDO
    : '['
    ;

LBRACK2
    : '(.'
    ;

COLCHETE_DIREITO
    : ']'
    ;

RBRACK2
    : '.)'
    ;

PONTEIRO
    : '^'
    ;

AT
    : '@'
    ;

DOT
    : '.'
    ;

PONTO_E_PONTO
    : '..'
    ;

LCURLY
    : '{'
    ;

RCURLY
    : '}'
    ;

UNIT
    : 'UNIT'
    ;

INTERFACE
    : 'INTERFACE'
    ;

USES
    : 'USES'
    ;

STRING
    : 'STRING'
    ;

IMPLEMENTATION
    : 'IMPLEMENTATION'
    ;

TRUE
    : 'TRUE'
    ;

FALSE
    : 'FALSE'
    ;

WS
    : [ \t\r\n] -> skip
    ;

COMMENT_1
    : '(*' .*? '*)' -> skip
    ;

COMMENT_2
    : '{' .*? '}' -> skip
    ;

IDENT
    : ('A' .. 'Z') ('A' .. 'Z' | '0' .. '9' | '_')*
    ;

STRING_LITERAL
    : '\'' ('\'\'' | ~ ('\''))* '\''
    ;

NUM_INT
    : ('0' .. '9')+
    ;

NUM_REAL
    : ('0' .. '9')+ (('.' ('0' .. '9')+ (EXPONENT)?)? | EXPONENT)
    ;

fragment EXPONENT
    : ('E') ('+' | '-')? ('0' .. '9')+
    ;