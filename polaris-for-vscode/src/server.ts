import {createVar, metaTokens, MetaTokenGroup} from '@shopify/polaris-tokens';
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

const {legacy, ...restTokenGroups} = metaTokens;

const groupedCompletionItemTokenGroups = restTokenGroups;

type GroupedCompletionItemsKey = keyof typeof groupedCompletionItemTokenGroups;

type GroupedCompletionItems = {
  [K in GroupedCompletionItemsKey]: CompletionItem[];
};

/**
 * Grouped VS Code `CompletionItem`s for Polaris custom properties
 */
const groupedCompletionItems = Object.fromEntries(
  Object.entries(groupedCompletionItemTokenGroups).map(
    ([groupedCompletionItemsKey, tokenGroup]: [string, MetaTokenGroup]) => {
      const groupedCompletionItemProperties: CompletionItem[] = Object.entries(
        tokenGroup,
      ).map(
        ([tokenName, tokenProperties]): CompletionItem => ({
          label: createVar(tokenName),
          insertText: `${createVar(tokenName)}`,
          detail: tokenProperties.value,
          documentation: tokenProperties.description,
          filterText: createVar(tokenName),
          kind:
            groupedCompletionItemsKey === 'color'
              ? CompletionItemKind.Color
              : CompletionItemKind.Variable,
        }),
      );

      return [groupedCompletionItemsKey, groupedCompletionItemProperties];
    },
  ),
) as unknown as GroupedCompletionItems;

const allGroupedCompletionItems: CompletionItem[] = Object.values(
  groupedCompletionItems,
).flat();

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type GroupedCompletionItemPatterns = {
  [T in GroupedCompletionItemsKey]: RegExp;
};

const groupedCompletionItemPatterns: GroupedCompletionItemPatterns = {
  breakpoints: /width/,
  colors:
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  spacing: /margin|padding|gap|top|left|right|bottom/,
  typography: /font|line-height/,
  zIndex: /z-index/,
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
    let matchedCompletionItems: CompletionItem[] = [];

    // if the doc can't be found, return nothing
    if (!doc) {
      return [];
    }

    const currentText = doc.getText({
      start: {line: textDocumentPosition.position.line, character: 0},
      end: {line: textDocumentPosition.position.line, character: 1000},
    });

    for (const tokenGroup in groupedCompletionItemPatterns) {
      if (
        Object.prototype.hasOwnProperty.call(
          groupedCompletionItemPatterns,
          tokenGroup,
        )
      ) {
        const category =
          tokenGroup as keyof typeof groupedCompletionItemPatterns;

        if (groupedCompletionItemPatterns[category].test(currentText)) {
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
    return allGroupedCompletionItems;
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
