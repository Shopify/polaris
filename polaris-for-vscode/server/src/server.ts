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

import {groupedTokens} from './tmp-tokens/allTokens';

type GroupedTokens = typeof groupedTokens;

type GroupedTokensKey = keyof GroupedTokens;

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type TokenGroupPatterns = {
  [T in GroupedTokensKey]: RegExp;
};

const tokenGroupPatterns: TokenGroupPatterns = {
  color:
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  spacing: /margin|padding|gap|top|left|right|bottom/,
  typography: /font|line-height/,
  'z-index': /z-index/,
  shape: /border/,
  depth: /shadow/,
  motion: /animation/,
};

type GroupedCompletionItem = {
  [T in GroupedTokensKey]?: CompletionItem[];
};

const groupedCompletionItems: GroupedCompletionItem = {};

let allCompletionItems: CompletionItem[] = [];

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

  // initialize grouped completionItems
  for (const tokenGroup in groupedTokens) {
    if (Object.prototype.hasOwnProperty.call(groupedTokens, tokenGroup)) {
      const category = tokenGroup as keyof typeof tokenGroupPatterns;
      const tokensArray = groupedTokens[category];

      const completionItems = tokensArray.map((token): CompletionItem => {
        return {
          label: token.label,
          insertText: token.insertText,
          detail: token.value,
          filterText: `--p-${token.label}`,
          kind:
            category === 'color'
              ? CompletionItemKind.Color
              : CompletionItemKind.Variable,
        };
      });

      groupedCompletionItems[category] = completionItems;

      allCompletionItems = allCompletionItems.concat(completionItems);
    }
  }
  return result;
});

// This handler provides the list of token completion items.
connection.onCompletion(
  (textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    const doc = documents.get(textDocumentPosition.textDocument.uri);
    let matchedCompletionItems: CompletionItem[] = [];

    // if the doc can't be found, return nothing
    if (!doc) {
      return [];
    }

    const currentText = doc.getText({
      start: {line: textDocumentPosition.position.line, character: 0},
      end: {line: textDocumentPosition.position.line, character: 1000},
    });

    for (const tokenGroup in tokenGroupPatterns) {
      if (
        Object.prototype.hasOwnProperty.call(tokenGroupPatterns, tokenGroup)
      ) {
        const category = tokenGroup as keyof typeof tokenGroupPatterns;

        if (tokenGroupPatterns[category].test(currentText)) {
          const currentCompletionItems = groupedCompletionItems[category];
          if (currentCompletionItems) {
            matchedCompletionItems = matchedCompletionItems.concat(
              currentCompletionItems,
            );
          }
        }
      }
    }

    // if there were matches above, send them
    if (matchedCompletionItems.length > 0) {
      return matchedCompletionItems;
    }

    // if there were no matches, send everything
    return allCompletionItems;
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
