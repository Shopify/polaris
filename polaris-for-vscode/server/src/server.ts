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

import {allTokens, groupedTokens} from './data/allTokens';

type GroupedTokens = typeof groupedTokens;

type GroupedTokensKey = keyof GroupedTokens;

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type TokenGroup = {
  [T in GroupedTokensKey]: RegExp;
};

type TokenArray = {
  [key: string]: any;
};

allTokens as TokenArray;

let tokenGroups: TokenGroup = {
  color:
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  spacing: /margin|padding|gap|top|left|right|bottom/,
  typography: /font|line-height/,
  'z-index': /z-index/,
  shape: /border/,
  depth: /shadow/,
  motion: /animation/,
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
    const doc = documents.get(textDocumentPosition.textDocument.uri);

    // if the doc can't be found, return nothing
    if (!doc) {
      return [];
    }

    const currentText = doc.getText({
      start: {line: textDocumentPosition.position.line, character: 0},
      end: {line: textDocumentPosition.position.line, character: 1000},
    });

    // iterate through token groups and find matches for css attributes
    for (const tokenGroup in tokenGroups) {
      const category = tokenGroup as keyof typeof tokenGroups;

      if (tokenGroups[category].test(currentText)) {
        return groupedTokens[category].map((token: string): CompletionItem => {
          return {
            label: `var(${token})`,
            kind: CompletionItemKind.Variable,
          };
        });
      }
    }

    // if no mateches above, iterate through all tokens and create completion
    // items array
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
