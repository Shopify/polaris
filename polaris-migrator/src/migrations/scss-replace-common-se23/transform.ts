import type {API, FileInfo, Options} from 'jscodeshift';
import type {AtRule, Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const plugin = (): Plugin => {
  let commonAtUse: AtRule;

  return {
    postcssPlugin: 'scss-replace-common-se23',
    Rule(rule, helper) {
      if (rule.selector === '#{common.$se23} &') {
        rule.selector = '$(se23) &';

        rule.before(
          helper.decl({prop: '$se23', value: 'env(--polaris-se-23)'}),
        );

        if (commonAtUse) {
          commonAtUse.remove();
        }
      }
    },
    AtRule(atRule) {
      if (atRule.name === 'use' && atRule.params === "'global-styles/common'") {
        commonAtUse = atRule;
      }
    },
  };
};

export default async function transformer(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss([
    stylelint({
      config: {
        extends: [options.config ?? '@shopify/stylelint-polaris'],
      },
    }) as Plugin,
    plugin(),
  ])
    .process(file.source, {
      from: file.path,
      syntax: require('postcss-scss'),
    })
    .then((result) => {
      return result.css;
    });
}
