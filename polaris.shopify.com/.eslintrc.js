module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  // `out` is the static export, `public/playroom` the built Playroom bundle —
  // both are build output, not source.
  ignorePatterns: ['out', 'public/playroom'],
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
