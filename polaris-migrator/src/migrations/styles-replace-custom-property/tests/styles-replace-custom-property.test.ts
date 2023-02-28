import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property';
const fixtures = [
  {
    name: 'with-from-to-flags-basic',
    options: {
      decl: 'color',
      from: '--p-text',
      to: '--p-color-text',
    },
  },
  {
    name: 'with-from-to-flags-regexp',
    options: {
      decl: '/^animation/',
      from: '--p-duration-200',
      to: '--p-motion-duration-200',
    },
  },
  {
    name: 'with-maps-flag',
    options: {
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps',
    },
  },
  {
    name: 'with-replacementMaps-option',
    options: {
      replacementMaps: {decls: {color: {'--p-text': '--p-color-text'}}},
    },
  },
  {
    // Same as `with-from-to-flags-regexp` for atRules
    name: 'with-atRule-replacements',
    options: {
      atRule: '/mixin|include/',
      atRuleParam: exactNamePattern(
        'basic|with-fallback-var|with-fallback-value',
      ),
      from: '--p-text',
      to: '--p-color-text',
    },
  },
  {
    // Same as `with-maps-flag` for atRules
    name: 'with-atRule-replacements',
    options: {
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps',
    },
  },
  {
    // Same as `with-replacementMaps-option` for atRules
    name: 'with-atRule-replacements',
    options: {
      replacementMaps: {
        atRules: {
          '/mixin|include/': {
            [exactNamePattern('basic|with-fallback-var|with-fallback-value')]: {
              '--p-text': '--p-color-text',
            },
          },
        },
      },
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    migration,
    extension: 'scss',
    options: fixture.options,
  });
}

function exactNamePattern(name: string) {
  // Using `^` to match the start of a string since postcss normalizes the input
  // https://regex101.com/r/3tzvIW/1
  return new RegExp(
    String.raw`^([\w-]+\.)?(?<![\w-])${name}(?![\w-])`,
  ).toString();
}
