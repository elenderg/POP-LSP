export default function pluralize(word: string): string {
  const lowerWord = word.toLocaleLowerCase('pt-BR');
  switch (lowerWord) {
    case 'caráter':{
      return 'carateres';
      break;
    }
    case 'júnior':{
      return 'juniores';
      break;
    }
    case 'sênior':{
      return 'seniores';
      break;
    }
    case 'muito':
    case 'pouco':
    case 'mais':
    case 'menos':
    case 'bastante':
    case 'quase':
    case 'demais':
    case 'bem':
    case 'deveras':
    {
      return lowerWord;
      break;
    }
  }
  if (lowerWord.endsWith('ão')) {
    return pluralizeAo(lowerWord);
  }
  if (lowerWord.endsWith('l')) {
    return pluralizeL(lowerWord);
  }
  if (lowerWord.endsWith('m')) {
    return lowerWord.slice(0, -1) + 'ns';
  }
  if (lowerWord.endsWith('n')) {
    return lowerWord + 'es';
  }
  if (lowerWord.endsWith('r')) {
    if (lowerWord === 'fecho-éclair'){
      return 'fechos-éclair';
    }
    if (lowerWord === 'ecler') {
      return lowerWord;
    }    
    return lowerWord + 'es';    
  }
  if (lowerWord.endsWith('s')) {
    if (lowerWord === 'ônibus' || 
        lowerWord === 'vírus'  ||
        lowerWord === 'ânus'   ||
        lowerWord === 'cais'   ||
        lowerWord === 'arrais' ||
        lowerWord === 'atlas'  ||
        lowerWord === 'lápis'  ||
        lowerWord === 'ônus'   
    ) 
    {
      return lowerWord;
    }
    if (lowerWord.endsWith('as') || 
        lowerWord.endsWith('es') || 
        lowerWord.endsWith('os') ||
        lowerWord.endsWith('aís')
    ) 
    {
      return lowerWord + 'es';
    }
    if (lowerWord.endsWith('ás') ||
        lowerWord.endsWith('âs'))
    {
      return lowerWord.slice(0, -2) + 'ases';
    }
    if (lowerWord.endsWith('és') || 
        lowerWord.endsWith('ês')) 
    {
      return lowerWord.slice(0, -2) + 'eses';
    }
    if (lowerWord.endsWith('ís')) {
      return lowerWord.slice(0, -2) + 'ises';
    }
    if (lowerWord.endsWith('ós') || 
        lowerWord.endsWith('ôs')) 
    {
      return lowerWord.slice(0, -2) + 'oses';
    }
    if (lowerWord.endsWith('ús')) {
      return lowerWord.slice(0, -2) + 'uses';
    }    
    return lowerWord + 'es';
  }
  if (lowerWord.endsWith('x')) {
    if (lowerWord === 'px') {
      return 'pxs';
    }
    if (lowerWord === 'fax') {
      return 'faxes';
    }
    if (lowerWord === 'córtex') {
      return 'córtices';
    }
    if (lowerWord === 'cérvix') {
      return 'cérvices';
    }
    return lowerWord;
  }
  if (lowerWord.endsWith('z')) {
    return lowerWord + 'es';
  }      
  return lowerWord + 's';
}

function pluralizeAo(word: string): string {
  switch (word) {
    case 'cidadão':
    case 'irmão':
    case 'cristão':
    case 'refrão':
    case 'mão': {
      return word + 's';
    }
    case 'pão':
    case 'capitão':
    case 'alemão':
    case 'charlatão': { 
      return word.slice(0, -2) + 'ões';
    }
  }
  const subtext = word.slice(0, -2);
  if (hasAccentedVowel(subtext)) {
    return word + 's';
  }
  return word.slice(0, -2) + 'ões';
}

function hasAccentedVowel(word: string): boolean {
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i];    
    if ('áéíóúâêôãõà'.includes(char)) {
      return true;
    }
  }
  return false;
}

function pluralizeL(word: string): string {
  if (word === 'mal') {
    return 'males';
  }
  if (word.endsWith('al')) {
    return word.slice(0, -1) + 'is';
  }
  if (word.endsWith('el')) {
    const subtext = word.slice(0, -2);
    if (hasAccentedVowel(subtext)) {
      return word.slice(0, -1) + 'is';
    }
    return word.slice(0, -2) + 'éis';
  }
  if (word.endsWith('il')) {
    const subtext = word.slice(0, -2);
    if (hasAccentedVowel(subtext)) {
      return word.slice(0, -2) + 'eis';
    }
    return word.slice(0, -1) + 's';
  }
  if (word.endsWith('ol')) {
    const subtext = word.slice(0, -2);
    if (hasAccentedVowel(subtext)) {
      return word.slice(0, -1) + 'is';
    }
    return word.slice(0, -2) + 'óis';
  }
  if (word.endsWith('ul')) {
    if (word === 'cônsul') {
      return 'cônsules';
    }
    return word.slice(0, -1) + 'is';
  }
  return word + 's';
}

/*

Rotina para que se aplique o plural adequado para uma string:
  \# https://www.normaculta.com.br/singular-e-plural/
  \# palavras que são exceções às regras
  Se a string for "caráter",
    Atribua "carateres" à string;
    Retorne.
  Se a string for "júnior",
    Atribua "juniores" à string;
    Retorne.
  Se a string for "sênior",
    Atribua "seniores" à string;
    Retorne.
  \# advérbios principais
  Se a string for "muito", retorne.
  Se a string for "pouco", retorne.
  Se a string for "mais", retorne.
  Se a string for "menos", retorne.
  Se a string for "bastante", retorne.
  Se a string for "quase", retorne.
  Se a string for "demais", retorne.
  Se a string for "bem", retorne.
  Se a string for "deveras", retorne.
  Se a string for "mal", retorne.
  Se a string for "melhor", retorne.
  Se a string for "pior", retorne.
  \# palavras terminadas com "ão"
  Se a string termina com "ão",
    Pluralize a string (terminada com "ão");
    Retorne.
  \# palavras terminadas com "d"
  Se a string termina com "d",
    Pluralize a string (terminada com outras letras);
    Retorne.
  \# palavras terminadas com "l"
  Se a string termina com "l",
    Pluralize a string (terminada com "l");
    Retorne.
  \# palavra terminadas com "m"
  Se a string termina com "m",
    Remova o último caractere desde a string;
    Acrescente "ns" para a string;
    Retorne.
  \# palavra terminadas com "n" (essa regra é preferível porque mantém o acento da palavra, se houver)
  Se a string termina com "n",
    Acrescente "es" para a string;
    Retorne.
  \# palavras terminadas com "r"
  Se a string termina com "r",
    Pluralize a string (terminada com "r");
    Retorne.
  \# palavras terminadas com "s"
  Se a string termina com "s",
    Pluralize a string (terminada com "s");
    Retorne.
  \# palavras terminadas com "t"
  Se a string termina com "t",
    Pluralize a string (terminada com outras letras);
    Retorne.
  \# palavra terminadas com "x"
  Se a string termina com "x",
    Pluralize a string (terminada com "x");
    Retorne.
  \# palavras terminadas com "z"
  Se a string termina com "z",
    Pluralize a string (terminada com "z");
    Retorne.
  Se a string termina com "#",
    Acrescente "s" para a string;
    Retorne.
  Se a string não termina com alguma vogal ou com alguma consoante,
    Acrescente "s" para a string;
    Retorne.
  \# regra padrão
  [Caso contrário,]
  Acrescente "s" para a string. \ Só acrescenta o "s" caso nenhuma das condições acima tenha siddo correspondida.
  \Volte.

Rotina para que se pluralize uma string (terminada com "ão"):
  \A formação do plural dos substantivos terminados -ão pode ser feita de três formas distintas: -ões, -ãos, -ães.
  \Alguns substantivos terminados em -ão admitem duas (ou até três) formas no plural:
  \refrão - refrãos ou refrães;
  \corrimão - corrimões ou corrimãos;
  \guardião - guardiões ou guardiães;
  \vilão - vilões, vilãos ou vilães.
    \TODOS os substantivos paroxítonos terminados em -ão formam o plural com -ãos.
  \ALGUNS substantivos oxítonos também têm o seu plural formado segundo essa regra:
  \órfão - órfãos;
  \sótão - sótãos;
  \órgão - órgãos;
  \cidadão - cidadãos;
  \irmão - irmãos;
  \cristão - cristãos.
  Se a string for "cidadão",
    Acrescente "s" para a string;
    Retorne.
  Se a string for "irmão",
    Acrescente "s" para a string;
    Retorne.
  Se a string for "cristão",
    Acrescente "s" para a string;
    Retorne.
  Se a string for "refrão",
    Acrescente "s" para a string;
    Retorne.
  Se a string for "mão",
    Acrescente "s" para a string;
    Retorne.
  Se a string for "são",
    Acrescente "s" para a string;
    Retorne.
  \-ão no singular para -ães no plural:
  \Alguns substantivos terminados em -ão formam o plural com -ães.
  Se a string for "pão",
    Remova o último caractere desde a string;
    Acrescente "es" para a string;
    Retorne.
  Se a string for "capitão",
    Remova o último caractere desde a string;
    Acrescente "es" para a string;
    Retorne.
  Se a string for "alemão",
    Remova o último caractere desde a string;
    Acrescente "es" para a string;
    Retorne.
  Se a string for "charlatão",
    Remova o último caractere desde a string;
    Acrescente "es" para a string;
    Retorne.
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.   \ remova o "ão". Acho que não precisa
  \caso encontre acentos em sílabas prévias, faça o seguinte
  Se o subtexto possui alguma vogal acentuada,
    Acrescente "s" para a string;
    Retorne. \-> exemplo: órgão
  \# regra padrão
  \A maioria dos substantivos terminados em -ão forma o plural com -ões:
  \opinião - opiniões;
  \coração - corações;
  \eleição - eleições.
  Remova os dois últimos caracteres desde a string. 
  Acrescente "ões" para a string.\ Retorne.

Função para que se determine se uma string possui alguma vogal acentuada:
  Preserve a string.
  Itere.
    Se a string estiver em branco, diga não.
    Se o conteúdo deste caractere final desta string for alguma vogal acentuada, diga sim.
    Subtraia 1 desde o caractere final desta string.
  Reitere.

Rotina para que se pluralize uma string (terminada com outras letras):
  Acrescente "s" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "l"):
  \# palavras terminadas com "al"
  Se a string termina com "al",
    Pluralize a string (terminada com "al");
    Retorne. \ MAL -> MALES
  \# palavras terminadas com "el"
  Se a string termina com "el",
    Pluralize a string (terminada com "el");
    Retorne. \PASTEL - PASTÉIS
  \# palavras terminadas com "il"
  Se a string termina com "il",
    Pluralize a string (terminada com "il");
    Retorne. \-> FUZIL -> FUZIS
  \# palavras terminadas com "ol"
  Se a string termina com "ol",
    Pluralize a string (terminada com "ol");
    Retorne. \- LENÇOL -> LENÇÓIS
  \# palavras terminadas com "ul"
  Se a string termina com "ul",
    Pluralize a string (terminada com "ul");
    Retorne. \ AZUL -> AZUIS \ Cônsul - cônsules
  [Caso a string seja uma sigla, tipo URL]
  Acrescente "s" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "al"):
  Se a string for "mal",
    Atribua "males" para a string;
    Retorne.
  Remova o último caractere desde a string. \remova a letra L
  Acrescente "is" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "el"):
  \Se a string for "pixel", atribua "pixels" para a string; Retorne.
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto. \ remova o el
  Se o subtexto possui alguma vogal acentuada,
    Remova o último caractere desde a string;
    Acrescente "is" para a string;
    Retorne.
  Remova os dois últimos caracteres desde a string.
  Acrescente "éis" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "il"):
  \Se a string for "canil", atribua "canis" para a string; Retorne.
  \Se a string for "covil", atribua "covis" para a string; Retorne.
  \Se a string for "funil", atribua "funis" para a string; Retorne.
  \Se a string for "barril", atribua "barris" para a string; Retorne.
  \Se a string for "fuzil", atribua "fuzis" para a string; Retorne.
  \Se a string for "redil", atribua "redis" para a string; Retorne.
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.
  Se o subtexto possui alguma vogal acentuada,
    Remova os dois últimos caracteres desde a string;
    Acrescente "eis" para a string;
    Retorne.
  Remova o último caractere desde a string. \ remova a letra L
  Acrescente "s" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "ol"):
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.
  Se o subtexto possui alguma vogal acentuada,
    Remova o último caractere desde a string;
    Acrescente "is" para a string;
    Retorne.
  Remova os dois últimos caracteres desde a string.
  Acrescente "óis" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "ul"):
  Se a string for "cônsul",
    Atribua "cônsules" à string;
    Retorne.
  Remova o último caractere desde a string. \ remova o L
  Acrescente "is" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "r"):
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.
  Se o subtexto possui alguma vogal acentuada,
    Acrescente "es" para a string;
    Retorne.
  \# hiatos
  Se a string termina com "air",
    Remova os dois últimos caracteres desde a string;
    Acrescente "íres" para a string;
    Retorne.
  Se a string termina com "aur",
    Remova os dois últimos caracteres desde a string;
    Acrescente "úres" para a string;
    Retorne.
  \# regra padrão
  Acrescente "es" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "s"):
\Quando os substantivos terminados em -s são paroxítonos, a formação do plural fica invariável:.
  \# proparoxítonas/paroxítonas terminadas com "as", "es", "os"
  Se a string termina com "as",
    Acrescente "es" para a string;
    Retorne. \atlas
  Se a string termina com "es",
      Acrescente "es" para a string;
    Retorne. \atlas
  Se a string termina com "os",
      Acrescente "es" para a string;
    Retorne. \atlas
  \# hiatos acentuados
  Se a string termina com "aís",
    Acrescente "es" para a string;
    Retorne.
  Se a string termina com "aús",
    Acrescente "es" para a string;
    Retorne.
  \# oxítonas terminadas com "ás", "âs", "és", "ês", "ís", "ós", "ôs", "ús"
  Se a string termina com "ás",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ases" para a string;
    Retorne.
  Se a string termina com "âs",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ases" para a string;
    Retorne.
  Se a string termina com "és",
    Remova os dois últimos caracteres desde a string;
    Acrescente "eses" para a string;
    Retorne.
  Se a string termina com "ês",
    Remova os dois últimos caracteres desde a string;
    Acrescente "eses" para a string;
    Retorne.
  Se a string termina com "ís",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ises" para a string;
    Retorne.
  Se a string termina com "ós",
    Remova os dois últimos caracteres desde a string;
    Acrescente "oses" para a string;
    Retorne.
  Se a string termina com "ôs",
    Remova os dois últimos caracteres desde a string;
    Acrescente "oses" para a string;
    Retorne.
  Se a string termina com "ús",
    Remova os dois últimos caracteres desde a string;
    Acrescente "uses" para a string;
    Retorne.
  \# palavras terminadas com "is", "us"
  Se a string termina com "is",
    Pluralize a string (terminada com "is" ou com "us");
    Retorne.
  Se a string termina com "us",
    Pluralize a string (terminada com "is" ou com "us");
    Retorne. \ônibus / vírus
  \Se a string termina com "ts", exit.
  \# regra padrão
  Acrescente "es" para a string. \ Retorne.

Rotina para que se pluralize uma string (terminada com "is" ou com "us"):
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.
  Se o subtexto possui alguma vogal acentuada, retorne.
  \# hiatos
  Se a string termina com "ais",
    Remova os dois últimos caracteres desde a string;
    Acrescente "íses" para a string;
    Retorne. \cais não varia….
  Se a string termina com "aus",
    Remova os dois últimos caracteres desde a string;
    Acrescente "úses" para a string;
    Retorne.
  \# regra padrão
  Acrescente "es" para a string. \ Retorne.

Rotina para que se pluralize uma string  (terminada com "x"):
  \Se a string for "px",
    \acrescente "pxs" para a string;
    \Retorne.
  Se a string for "fax",
    Acrescente "es" para a string;
    Retorne.
  Acrescente "s" para a string. \ tratamento de exceções
   \ Retorne.

Rotina para que se pluralize uma string (terminada com "z"):
  \# hiatos acentuados
  Se a string termina com "aíz",
    Acrescente "es" para a string;
    Retorne.
  Se a string termina com "aúz",
    Acrescente "es" para a string;
    Retorne.
  \# palavras terminas em "áz", "âz", "éz", "êz", "íz", "óz", "ôz", "úz"
  Se a string termina com "áz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "azes" para a string;
    Retorne.
  Se a string termina com "âz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "azes" para a string;
    Retorne.
  Se a string termina com "éz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ezes" para a string;
    Retorne.
  Se a string termina com "êz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ezes" para a string;
    Retorne.
  Se a string termina com "íz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "izes" para a string;
    Retorne.
  Se a string termina com "óz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ozes" para a string;
    Retorne.
  Se a string termina com "ôz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ozes" para a string;
    Retorne.
  Se a string termina com "úz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "uzes" para a string;
    Retorne.
  \# acentos em sílabas prévias
  Lance um subtexto sobre a string.
  Subtraia 2 desde o caractere final deste subtexto.
  Se o subtexto possui alguma vogal acentuada,
    Acrescente "es" para a string;
    Retorne.
  \# hiatos
  Se a string termina com "aiz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "ízes" para a string;
    Retorne.
  Se a string termina com "auz",
    Remova os dois últimos caracteres desde a string;
    Acrescente "úzes" para a string;
    Retorne.
  \# regra padrão
  Acrescente "es" para a string. \ Retorne.

Função para que se determine se uma string termina com alguma vogal ou com alguma consoante:
  Se a string terminar com algum vogal, diga sim.
  Se a string terminar com alguma consoante, diga sim.
  Diga não.

Função para que se determine se uma string termina com algum vogal:
  Se a string estiver em branco, diga não.
  Se o conteúdo deste caractere final desta string não for algum vogal, diga não.
  Diga sim.

Função para que se determine se uma string termina com alguma consoante:
  Se a string estiver em branco, diga não.
  Se o conteúdo deste caractere final desta string não for alguma consoante, diga não.
  Diga sim.
*/