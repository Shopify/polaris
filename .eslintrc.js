const path = require('path');

const packages = require('./package.json').workspaces.packages;

module.exports = {
  root: true,
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/react',
    'plugin:@shopify/jest',
    'plugin:@shopify/node',
    'plugin:@shopify/polaris',
    'plugin:@shopify/prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.eslint.json',
      ...packages.map((pkg) => `./${pkg}/tsconfig.json`),
    ],
  },
  settings: {
    react: {
      version: '16.8',
    },
    next: {
      rootDir: 'polaris.shopify.com',
    },
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'polaris-react/build',
    'polaris-react/build-internal',
  ],
  rules: {
    'func-style': 'off',
    'no-process-env': 'off',
    'no-warning-comments': 'off',
    'no-negated-condition': 'off',
    'no-console': 'error',
    'consistent-return': 'off',
    'match-default-export-name': 'off',
    'jsx-use-translation-function': 'off',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        allowBlockStart: false,
      },
    ],
    '@babel/no-unused-expressions': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/named': 'off',
    'import/no-default-export': ['error'],
    'react/button-has-type': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unsafe': ['error', {checkAliases: true}],
    '@shopify/jsx-no-complex-expressions': 'off',
    '@shopify/jsx-prefer-fragment-wrappers': 'off',
    '@shopify/no-ancestor-directory-import': 'error',
    '@shopify/react-prefer-private-members': 'off',
    '@typescript-eslint/array-type': ['error', {default: 'array'}],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/naming-convention': 'off',
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['useLayoutEffect'],
            message:
              'Please use useIsomorphicLayoutEffect from the utilities directory instead',
          },
        ],
      },
    ],
  },
  overrides: [
    ...packages.map((packageDir) => noExtraneousDependenciesConfig(packageDir)),
    {
      files: ['polaris-cli/src/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['polaris-migrator/src/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['polaris-migrator/src/**/tests/*.{ts,tsx}'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@shopify/jsx-no-hardcoded-content': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['polaris-react/src/**/*.{ts,tsx}'],
      extends: ['plugin:@shopify/typescript-type-checking'],
      rules: {
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
    {
      files: ['*/rollup.config.mjs'],
      rules: {
        'import/extensions': 'off',
        'import/no-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
        // We could omit this if we set `engines` fields properly
        // As we don't set them then eslint thinks we're using node 8
        'node/no-unsupported-features/node-builtins': [
          'error',
          {version: '>=16.0.0'},
        ],
      },
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        'jest/no-truthy-falsy': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        '@shopify/jsx-no-hardcoded-content': 'off',
        '@shopify/no-ancestor-directory-import': 'off',
        '@shopify/react-require-autocomplete': 'off',
      },
    },
    {
      files: [
        'polaris-react/playground/*.tsx',
        'polaris-react/src/components/**/*.stories.tsx',
      ],
      rules: {
        'react/prefer-stateless-function': 'off',
        '@shopify/jsx-no-hardcoded-content': 'off',
        '@shopify/react-initialize-state': 'off',
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['polaris-tokens/**/*'],
      rules: {
        'node/no-unsupported-features/node-builtins': 'off',
      },
    },
    {
      files: ['polaris.shopify.com/**/*'],
      extends: 'plugin:@next/eslint-plugin-next/recommended',
      rules: {
        'react/react-in-jsx-scope': 'off',
        '@shopify/jsx-no-hardcoded-content': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['polaris.shopify.com/next-env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'spaced-comment': 'off',
      },
    },
    {
      files: ['stylelint-polaris/**/*.test.js'],
      globals: {
        testRule: 'readonly',
      },
    },
  ],
};

function noExtraneousDependenciesConfig(packageDir) {
  return {
    files: [`${packageDir}/rollup.config.*`, `${packageDir}/config/**/*`],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {packageDir: [__dirname, path.join(__dirname, packageDir)]},
      ],
    },
  };
}
