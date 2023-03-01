const colorMap = {
  '--p-text': '--p-color-text',
  '--p-black': '#000',
};

const durationMap = {
  '--p-duration-200': '--p-motion-duration-200',
  '--p-fast': '100ms',
};

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default {
  decls: {
    color: colorMap,
    '/^animation/': durationMap,
  },
  atRules: {
    include: {
      basic: colorMap,
      namespaced: colorMap,
      'with-fallback-var': colorMap,
      'with-fallback-value': colorMap,
    },
  },
};
