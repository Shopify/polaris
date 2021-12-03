/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// Abbreviated example
import {utils, createPlugin} from 'stylelint';
import {unprefixed} from 'stylelint/lib/utils/vendor';

const matchesStringOrRegExp = require('stylelint/lib/utils/matchesStringOrRegExp');

export const ruleName = 'plugin/check-custom-properties';

const messages = utils.ruleMessages(ruleName, {
  rejected: (value, invalid) =>
    `Invalid custom properties [${invalid.join(', ')}] in value [${value}]`,
});

// eslint-disable-next-line import/no-default-export
export default createPlugin(ruleName, (primary) => {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, {
      actual: primary,
      // @ts-ignore
      possible: (value) => Array.isArray(value.props),
    });

    if (!validOptions) {
      throw new Error(
        'Invalid options were provided to the [check-custom-properties] stylelint plugin.',
      );
    }

    root.walkDecls((decl) => {
      const prop = decl.prop;
      const value = decl.value;

      const unprefixedProp = unprefixed(prop);

      const propKey = Object.keys({'/.+/': ''}).find((propIdentifier) =>
        matchesStringOrRegExp(unprefixedProp, propIdentifier),
      );

      if (!propKey) {
        return;
      }

      const allowedProps = primary.props;

      if (!allowedProps.length) {
        return;
      }

      const invalid = [];

      value.split(' ').forEach((val) => {
        const customProperty = val.trim();

        if (
          customProperty.startsWith('var(') &&
          !matchesStringOrRegExp(customProperty.slice(4, -1), allowedProps)
        ) {
          invalid.push(customProperty);
        }
      });

      if (!invalid.length) {
        // Exit if there are no failures.
        return;
      }

      utils.report({
        message: messages.rejected(value, invalid),
        node: decl,
        result,
        ruleName,
      });
    });
  };
});
