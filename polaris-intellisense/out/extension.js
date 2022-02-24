"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const PolarisAutocomplete_1 = require("./Polaris/PolarisAutocomplete");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
async function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "shopify-dev-intellisense" is now active!');
    const selector = [
        {
            // only use plugin in css and sass files
            pattern: '**/*.{css,scss}'
        }
    ];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new PolarisAutocomplete_1.PolarisAutocomplete(), 
    // trigger characters
    '*'));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map