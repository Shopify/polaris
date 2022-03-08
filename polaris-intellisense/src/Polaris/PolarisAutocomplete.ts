import * as vscode from 'vscode';
import {allTokens} from '../data/allTokens';

export class PolarisAutocomplete implements vscode.CompletionItemProvider {
  get allTokens() {
    return allTokens;
  }

  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ): Promise<vscode.CompletionItem[] | null | undefined> {
    // iterate over all tokens and create completion items
    let completionItems = allTokens.map((token) => {
      const autocompleteValue = `var(${token})`;
      return new vscode.CompletionItem(
        autocompleteValue,
        vscode.CompletionItemKind.Value,
      );
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
