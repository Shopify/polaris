const colorMap = {
  '--p-text': '--p-color-text',
  '--p-black': '#000',
};

const durationMap = {
  '--p-duration-200': '--p-motion-duration-200',
  '--p-fast': '100ms',
};

const atRuleMap = {
  '--p-text': '--p-color-text',
};

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default {
  decls: {
    color: colorMap,
    '/^animation/': durationMap,
  },
  atRules: {
    '/mixin|include/': {
      [exactNamePattern('basic|with-fallback-var|with-fallback-value')]:
        atRuleMap,
    },
    // mixin: {
    //   [exactNamePattern('basic')]: atRuleMap,
    //   [exactNamePattern('with-fallback-var')]: atRuleMap,
    //   [exactNamePattern('with-fallback-value')]: atRuleMap,
    // },
    // include: {
    //   [exactNamePattern('basic')]: atRuleMap,
    //   [exactNamePattern('with-fallback-var')]: atRuleMap,
    //   [exactNamePattern('with-fallback-value')]: atRuleMap,
    // },
  },
};

function exactNamePattern(input) {
  // Using `^` to match the start of a string since postcss normalizes the input
  // https://regex101.com/r/3tzvIW/1
  return new RegExp(String.raw`^([\w-]+\.)?(?<![\w-])${input}(?![\w-])`);
}
