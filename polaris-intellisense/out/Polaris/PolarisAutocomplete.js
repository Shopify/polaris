"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarisAutocomplete = void 0;
const vscode = require("vscode");
const allTokens_1 = require("../data/allTokens");
class PolarisAutocomplete {
    get allTokens() {
        return allTokens_1.allTokens;
    }
    async provideCompletionItems(document, position, token, context) {
        // iterate over all tokens and create completion items
        const tokenNames = Object.keys(this.allTokens);
        let completionItems = tokenNames.map(token => {
            const autocompleteValue = `var(--p-${token})`;
            return new vscode.CompletionItem(autocompleteValue, vscode.CompletionItemKind.Value);
        });
        return completionItems;
        // -------
        // Junk to narrow completion items by css attributes
        // const currentLine = document.getText(document.lineAt(position))
        // const currentLine = document.getText(document.lineAt(position).range)
        // console.log(currentLine)
        // if (currentLine.includes('color')) {
        //     console.log('found color')
        //     // iterate over all tokens and create completion items
        //     const tokenNames = Object.keys(this.allTokens)
        //     let completionItems = tokenNames.map(token => {
        //         const autocompleteValue = `var(--p-${token})`
        //         return new vscode.CompletionItem(autocompleteValue, vscode.CompletionItemKind.Value)
        //     })
        //     return completionItems;
        // }
    }
}
exports.PolarisAutocomplete = PolarisAutocomplete;
//# sourceMappingURL=PolarisAutocomplete.js.map