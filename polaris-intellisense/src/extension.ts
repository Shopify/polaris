// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PolarisAutocomplete } from './Polaris/PolarisAutocomplete';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "shopify-dev-intellisense" is now active!');

	const selector: vscode.DocumentSelector = [
		{
			// only use plugin in css and sass files
			pattern: '**/*.{css,scss}'
		}
	]


	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			selector,
			new PolarisAutocomplete(),
			// trigger characters
			'*'
		)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
