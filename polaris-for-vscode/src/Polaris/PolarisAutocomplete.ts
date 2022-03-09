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
  }
}
