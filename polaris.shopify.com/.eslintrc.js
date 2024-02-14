module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['public/playroom'],
  rules: {},
  overrides: [
    {
      files: ['pages/examples/*.tsx'],
      rules: {
        '@next/next/no-img-element': 'off',
      },
    },
  ],
};
