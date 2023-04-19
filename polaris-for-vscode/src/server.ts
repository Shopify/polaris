import {createVar, metadata} from '@shopify/polaris-tokens';
import type {MetadataGroup} from '@shopify/polaris-tokens';
import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  CompletionItemKind,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import type {
  InitializeParams,
  CompletionItem,
  TextDocumentPositionParams,
  InitializeResult,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

const excludedTokenGroupNames = ['colors', 'depth', 'legacy', 'shape'] as const;

type ExcludedTokenGroupName = typeof excludedTokenGroupNames[number];

type FilteredTokenGroupName = Exclude<
  keyof typeof metadata,
  ExcludedTokenGroupName
>;

const filteredTokenGroups = Object.fromEntries(
  Object.entries(metadata).filter(
    ([tokenGroupName]) =>
      !excludedTokenGroupNames.includes(
        tokenGroupName as ExcludedTokenGroupName,
      ),
  ),
) as unknown as Omit<typeof metadata, ExcludedTokenGroupName>;

type FilteredTokenGroupCompletionItems = {
  [F in FilteredTokenGroupName]: CompletionItem[];
};

/**
 * Grouped VS Code `CompletionItem`s for Polaris custom properties
 */
const filteredTokenGroupCompletionItems = Object.fromEntries(
  Object.entries(filteredTokenGroups).map(
    ([filteredTokenGroupName, tokenGroup]: [string, MetadataGroup]) => {
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
            filteredTokenGroupName === 'color'
              ? CompletionItemKind.Color
              : CompletionItemKind.Variable,
        }),
      );

      return [filteredTokenGroupName, groupedCompletionItemProperties];
    },
  ),
) as unknown as FilteredTokenGroupCompletionItems;

const allFilteredTokenGroupCompletionItems: CompletionItem[] = Object.values(
  filteredTokenGroupCompletionItems,
).flat();

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type FilteredCompletionItemPatterns = {
  [F in FilteredTokenGroupName]: RegExp;
};

const filteredCompletionItemPatterns: FilteredCompletionItemPatterns = {
  border: /border/,
  breakpoints: /width/,
  color:
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  font: /font|line-height/,
  motion: /animation/,
  shadow: /shadow/,
  spacing: /margin|padding|gap|top|left|right|bottom/,
  zIndex: /z-index/,
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

    for (const [tokenGroupName, pattern] of Object.entries(
      filteredCompletionItemPatterns,
    )) {
      if (!pattern.test(currentText)) continue;

      const currentCompletionItems =
        filteredTokenGroupCompletionItems[
          tokenGroupName as keyof typeof filteredCompletionItemPatterns
        ];

      matchedCompletionItems = matchedCompletionItems.concat(
        currentCompletionItems,
      );
    }

    // if there were matches above, send them
    if (matchedCompletionItems.length > 0) {
      return matchedCompletionItems;
    }

    // if there were no matches, send everything
    return allFilteredTokenGroupCompletionItems;
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
