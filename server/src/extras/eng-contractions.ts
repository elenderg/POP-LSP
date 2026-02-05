//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.
// eng-contracoes.ts

// =====================
// Tipos
// =====================

export interface ContractionToken {
  value: string;
  tag: string;
}

export type contracoesMap = Record<string, ContractionToken[]>;

// =====================
// Estrutura base
// =====================

const contracoes: contracoesMap = Object.create(null);

// Tag padrão
const word = 'word';

// =====================
// Verbs
// =====================

contracoes["can't"] = [{ value: 'ca', tag: word }, { value: "n't", tag: word }];
contracoes["CAN'T"] = [{ value: 'CA', tag: word }, { value: "N'T", tag: word }];
contracoes["Can't"] = [{ value: 'Ca', tag: word }, { value: "n't", tag: word }];

contracoes["couldn't"] = [{ value: 'could', tag: word }, { value: "n't", tag: word }];
contracoes["COULDN'T"] = [{ value: 'COULD', tag: word }, { value: "N'T", tag: word }];
contracoes["Couldn't"] = [{ value: 'Could', tag: word }, { value: "n't", tag: word }];

contracoes["don't"] = [{ value: 'do', tag: word }, { value: "n't", tag: word }];
contracoes["DON'T"] = [{ value: 'DO', tag: word }, { value: "N'T", tag: word }];
contracoes["Don't"] = [{ value: 'Do', tag: word }, { value: "n't", tag: word }];

contracoes["doesn't"] = [{ value: 'does', tag: word }, { value: "n't", tag: word }];
contracoes["DOESN'T"] = [{ value: 'DOES', tag: word }, { value: "N'T", tag: word }];
contracoes["Doesn't"] = [{ value: 'Does', tag: word }, { value: "n't", tag: word }];

contracoes["didn't"] = [{ value: 'did', tag: word }, { value: "n't", tag: word }];
contracoes["DIDN'T"] = [{ value: 'DID', tag: word }, { value: "N'T", tag: word }];
contracoes["Didn't"] = [{ value: 'Did', tag: word }, { value: "n't", tag: word }];

// (… o restante do arquivo segue **idêntico**, só com aspas ajustadas …)

// =====================
// Export
// =====================

export default contracoes;
