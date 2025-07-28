# Servidor de Linguagem PoP

Um Servidor de Linguagem (Language Server) para a linguagem de programação **\[Português Puro]**, implementando recursos avançados de navegação e análise de código através do Protocolo de Servidor de Linguagem [Language Server Protocol - LSP](https://microsoft.github.io/language-server-protocol/).

## ✨ Funcionalidades

* **Ir para Definição de Tipo**
  Navegue diretamente até a definição do tipo de uma variável.

* **Ir para Implementação**
  Salte para a implementação concreta de rotinas, funções ou procedimentos.

* **Encontrar Referências**
  Localize todas as referências (usos) de um símbolo no projeto.

* **Espiar Definição / Implementation**
  Visualize rapidamente a definição ou implementação de um símbolo ao passar o cursor, sem sair do contexto atual.

---

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/elenderg/POP-LSP.git
   ```

2. Instale as dependências:

   ```bash
   cd POP-LSP
   npm install
   ```

3. Compile o servidor:

   ```bash
   npm run build
   ```

---

## 🔌 Integração com VSCode

Para testar o servidor de linguagem no VSCode:

1. Abra a pasta do projeto no VSCode.
2. Pressione `F5` para iniciar uma sessão de desenvolvimento (Extensão em modo Debug).
3. Abra um arquivo com extensão `.pop`.
4. As funcionalidades de navegação estarão disponíveis conforme forem implementadas.

---

## 🛠 Tecnologias Utilizadas

* Node.js
* TypeScript
* vscode-languageclient / vscode-languageserver
* Language Server Protocol (LSP)

---

## 📂 Estrutura do Projeto

```
.
├── client // Extensão do Cliente (VS Code)
│   ├── src
│   │   ├── test // Testes para o Cliente / Servidor
│   │   └── extension.ts // Ponto de Entrada para a extensão do Cliente
├── package.json // O arquivo de manifesto para a extensão.
└── server // Servidor de Linguagem
    └── src
        └── server.ts // Ponto de Entrada para o Servidor de Linguagem
```

---

## 📅 Roadmap

* [x] Ir para Definição de Tipo
* [x] ir para Implementação
* [x] Encotrar Referências
* [x] Espiar Definição / Implementação
* [ ] Preenchimento automático (em breve)
* [ ] Detecção de erros e Diagnósticos (em breve)
* [ ] Formatação automática (em breve)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir *issues* ou enviar *pull requests*.


# Documentação

Encontre informações sobre a API utilizada em https://code.visualstudio.com/api/language-extensions/language-server-extension-guide



## Como utilizar

- Execute `npm install` nesta pasta. Isso instalará todos os módulos npm necessários nas pastas do cliente e do servidor.
- Abra o VS Code nesta pasta.
- Pressione Ctrl+Shift+B para iniciar a compilação do cliente e do servidor no [modo de observação](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Alterne para a visualização Executar e Depurar na barra lateral (Ctrl+Shift+D).
- Selecione `Launch Client` no menu suspenso (se ainda não estiver).
- Pressione ▷ para executar a configuração de inicialização (F5).
- Na instância [Extension Development Host](https://code.visualstudio.com/api/get-started/your-first-extension#:~:text=Then%2C%20inside%20the%20editor%2C%20press%20F5.%20This%20will%20compile%20and%20run%20the%20extension%20in%20a%20new%20Extension%20Development%20Host%20window.) do VSCode, abra um documento no modo de linguagem "texto simples".

