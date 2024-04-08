import type {MetaTheme, MetaTokenGroupShape} from '@shopify/polaris-tokens';
import {
  createVarName,
  metaThemeDefault,
  isTokenName,
} from '@shopify/polaris-tokens';
import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  CompletionItemKind,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import type {
  CompletionItem,
  TextDocumentPositionParams,
  InitializeResult,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

const excludedTokenGroupNames = [] as const;

type ExcludedTokenGroupName = typeof excludedTokenGroupNames[number];

type TokenGroupName = Exclude<keyof MetaTheme, ExcludedTokenGroupName>;

const tokenGroups = Object.fromEntries(
  Object.entries(metaThemeDefault).filter(
    ([tokenGroupName]) =>
      !excludedTokenGroupNames.includes(
        tokenGroupName as ExcludedTokenGroupName,
      ),
  ),
) as unknown as Omit<MetaTheme, ExcludedTokenGroupName>;

type TokenGroupCompletionItems = {
  [T in TokenGroupName]: CompletionItem[];
};

/**
 * Grouped VS Code `CompletionItem`s for Polaris custom properties
 */
const tokenGroupCompletionItems = Object.fromEntries(
  Object.entries(tokenGroups).map(
    ([tokenGroupName, tokenGroup]: [string, MetaTokenGroupShape]) => {
      const completionItems: CompletionItem[] = Object.entries(tokenGroup).map(
        ([tokenName, tokenProperties]): CompletionItem => {
          if (!isTokenName(tokenName)) {
            throw new Error(`Invalid token name: ${tokenName}`);
          }

          return {
            label: createVarName(tokenName),
            insertText: `${createVarName(tokenName)}`,
            detail: tokenProperties.value,
            documentation: tokenProperties.description,
            filterText: createVarName(tokenName),
            kind:
              tokenGroupName === 'color'
                ? CompletionItemKind.Color
                : CompletionItemKind.Variable,
          };
        },
      );

      return [tokenGroupName, completionItems];
    },
  ),
) as unknown as TokenGroupCompletionItems;

const allTokenGroupCompletionItems: CompletionItem[] = Object.values(
  tokenGroupCompletionItems,
).flat();

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

type TokenGroupPatterns = {
  [T in TokenGroupName]: RegExp;
};

const tokenGroupPatterns: TokenGroupPatterns = {
  border: /border/,
  breakpoints: /width/,
  color:
    /color|background|shadow|border|column-rule|filter|opacity|outline|text-decoration/,
  text: /font|letter-spacing|line-height/,
  font: /font|letter-spacing|line-height/,
  height: /height|min-height|max-height/,
  motion: /animation/,
  shadow: /shadow/,
  space: /margin|padding|gap|top|left|right|bottom/,
  width: /width|min-width|max-width/,
  zIndex: /z-index/,
};

connection.onInitialize(() => {
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
      tokenGroupPatterns,
    )) {
      if (!pattern.test(currentText)) continue;

      const currentCompletionItems =
        tokenGroupCompletionItems[
          tokenGroupName as keyof typeof tokenGroupPatterns
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
    return allTokenGroupCompletionItems;
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
