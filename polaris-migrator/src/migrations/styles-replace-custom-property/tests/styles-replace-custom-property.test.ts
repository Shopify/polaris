import {check} from '../../../utilities/testUtils';

const colorMap = {'--p-text': '--p-color-text'};

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
      replacementMaps: {decls: {color: colorMap}},
    },
  },
  {
    // Replaces all custom properties if no namespace is provided
    name: 'with-atRule-replacements-all',
    options: {
      namespace: undefined,
      atRule: 'include',
      atRuleIdentifier: 'basic',
      decl: 'color',
      from: '--p-text',
      to: '--p-color-text',
    },
  },
  {
    // Same as `with-from-to-flags-basic` for atRules
    name: 'with-atRule-replacements-namespaced',
    options: {
      namespace: 'legacy-polaris-v8',
      atRule: 'include',
      atRuleIdentifier:
        'basic,with-fallback-var,with-fallback-value,namespaced',
      decl: 'color',
      from: '--p-text',
      to: '--p-color-text',
    },
  },
  {
    // Same as `with-maps-flag` for atRules
    name: 'with-atRule-replacements-namespaced',
    options: {
      namespace: 'legacy-polaris-v8',
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps',
    },
  },
  {
    // Same as `with-replacementMaps-option` for atRules
    name: 'with-atRule-replacements-namespaced',
    options: {
      namespace: 'legacy-polaris-v8',
      replacementMaps: {
        decls: {color: colorMap},
        atRules: {
          include: {
            basic: colorMap,
            namespaced: colorMap,
            'with-fallback-var': colorMap,
            'with-fallback-value': colorMap,
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
