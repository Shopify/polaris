// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {Autocomplete} from './Autocomplete';

export async function activate(context: vscode.ExtensionContext) {
  const selector: vscode.DocumentSelector = [
    {
      // only use plugin in css and sass files
      pattern: '**/*.{css,scss}',
    },
  ];

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      selector,
      new Autocomplete(),
      // trigger characters
      '--p',
    ),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
