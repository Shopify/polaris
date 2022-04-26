import {
  createVar,
  getCustomPropertyNames,
  tokens,
} from '@shopify/polaris-tokens';

const {colorSchemes, legacyTokens, ...restOfTokens} = tokens;

/**
 * Create an object of grouped custom properties as VS Code CompletionItems
 */
const getGroupedCustomPropertyCompletionItems = () => {
  return Object.fromEntries(
    Object.entries({color: colorSchemes.light, ...restOfTokens}).map(
      ([tokenGroupName, tokenGroup]) => {
        const customPropertyCompletionItems = Object.keys(tokenGroup).map(
          (token) => {
            return {
              label: token,
              insertText: `var(${createVar(token)})`,
              value: tokenGroup[token],
            };
          },
        );

        return [tokenGroupName, customPropertyCompletionItems];
      },
    ),
  );
};

export const allTokens = getCustomPropertyNames();

export const groupedTokens = getGroupedCustomPropertyCompletionItems();
