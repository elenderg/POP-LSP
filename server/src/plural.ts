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
