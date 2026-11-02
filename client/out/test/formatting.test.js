"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const assert = require("assert");
const helper_1 = require("./helper");
suite('Português Puro document formatting', () => {
    const docUri = (0, helper_1.getDocUri)('formatting.pop');
    async function format(source) {
        await (0, helper_1.activate)(docUri);
        await (0, helper_1.setTestContent)(source);
        const edits = await vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', docUri, { tabSize: 2, insertSpaces: true });
        if (edits?.length) {
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(docUri, edits);
            await vscode.workspace.applyEdit(workspaceEdit);
        }
        return (await vscode.workspace.openTextDocument(docUri)).getText()
            .replace(/\r\n/gu, '\n');
    }
    test('Formats structure fields, statements, conditionals, and loops structurally', async () => {
        const formatted = await format([
            'Uma string é uma estrutura com um caractere inicial e um caractere final.',
            'Uma caixa é uma estrutura com um byte.',
            'Rotina para que se exemplifique:',
            'Se válido,',
            'Faça y;',
            'Faça z.',
            'Itere.',
            'Pare.',
            'Reitere.'
        ].join('\n'));
        assert.equal(formatted, [
            'Uma string é uma estrutura com',
            '  um caractere inicial e',
            '  um caractere final.',
            'Uma caixa é uma estrutura com',
            '  um byte.',
            'Rotina para que se exemplifique:',
            '  Se válido,',
            '    Faça y;',
            '    Faça z.',
            '  Itere.',
            '    Pare.',
            '  Reitere.'
        ].join('\n'));
    });
    test('Wraps arithmetic and concatenation operators with one continuation indent', async () => {
        const formatted = await format([
            'A quantidade é um byte.',
            'Rotina para que se exemplifique:',
            'Atribua 1 mais 2 menos 3 vezes 4 para a quantidade.',
            'Atribua "a" junto com "b" para a quantidade.',
            'Atribua 8 dividido por 2 para a quantidade.'
        ].join('\n'));
        assert.equal(formatted, [
            'A quantidade é um byte.',
            'Rotina para que se exemplifique:',
            '  Atribua 1 mais',
            '    2 menos',
            '    3 vezes',
            '    4 para a quantidade.',
            '  Atribua "a" junto com',
            '    "b" para a quantidade.',
            '  Atribua 8 dividido por 2 para a quantidade.'
        ].join('\n'));
    });
    test('Wraps expressions and returning clauses, preserving literals and comments', async () => {
        const source = [
            'A variável X é um byte.',
            'A variável Y é um byte.',
            'A variável Z é um byte.',
            'Rotina para que se exemplifique:',
            '\tProcesse "NomeBiblioteca" "NomeDaFunção" com a variável X e a variável Y e a variável Z retornando um byte denominado resultado. [Comentário e mais]',
            'Escreva "mais e menos vezes junto com retornando".'
        ].join('\n');
        const formatted = await format(source);
        assert.equal(formatted, [
            'A variável X é um byte.',
            'A variável Y é um byte.',
            'A variável Z é um byte.',
            'Rotina para que se exemplifique:',
            '  Processe "NomeBiblioteca" "NomeDaFunção" com a variável X e',
            '    a variável Y e',
            '    a variável Z',
            '  retornando',
            '    um byte denominado resultado. [Comentário e mais]',
            '  Escreva "mais e menos vezes junto com retornando".'
        ].join('\n'));
        const formattedAgain = await format(formatted);
        assert.equal(formattedAgain, formatted);
    });
    test('Corrects inconsistent indentation for fields and routine statements', async () => {
        const formatted = await format([
            'Uma caixa é uma estrutura com',
            '\tUm byte denominado primeiro,',
            '       Um byte denominado segundo.',
            'Rotina para que se faça algo:',
            '       Retorne.'
        ].join('\n'));
        assert.equal(formatted, [
            'Uma caixa é uma estrutura com',
            '  Um byte denominado primeiro,',
            '  Um byte denominado segundo.',
            'Rotina para que se faça algo:',
            '  Retorne.'
        ].join('\n'));
    });
});
//# sourceMappingURL=formatting.test.js.map