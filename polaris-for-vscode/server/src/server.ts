import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
} from 'vscode-languageserver/node';

import {TextDocument} from 'vscode-languageserver-textdocument';

import { allTokens, groupedTokens } from './data/allTokens';

type GroupedTokens = typeof groupedTokens;

type GroupedTokensKey = keyof GroupedTokens;

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type TokenGroup = {
  [T in GroupedTokensKey]: RegExp
};

type TokenArray = {
  [key: string]: any
}

allTokens as TokenArray

let tokenCategories: TokenGroup = {
  color: /color/,
  spacing: /margin|padding/,
  typography: /font|line-height/,
  'z-index': /z-index/,
  shape: /border/,
  depth: /shadow/,
  motion: /something/,
  "legacy-tokens": /\*/
  // need to add depth, motion
};

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        triggerCharacters: ['--'],
      },
    },
  };

  return result;
});

// This handler provides the list of token completion items.
connection.onCompletion(
  (textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    const doc = documents.get(textDocumentPosition.textDocument.uri)

    if (!doc) {
      return []
    }

    const currentText = doc.getText({ start: { line: textDocumentPosition.position.line, character: 0 }, end: { line: textDocumentPosition.position.line, character: 1000}})

    // iterate through
    for (const tokenCategory in tokenCategories) {
      const category = tokenCategory as keyof typeof tokenCategories;

      if(tokenCategories[category].test(currentText)) {
        return groupedTokens[category].map((token: string): CompletionItem => {
          return {
            label: `var(${token})`,
            kind: CompletionItemKind.Variable,
          };
        });
      }
    }

    // iterate through all tokens and create completion items array
    return allTokens.map((token: string): CompletionItem => {
      return {
        label: `var(${token})`,
        kind: CompletionItemKind.Variable,
      };
    });
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
