export default {
  process() {
    return `export default new Proxy({}, {get: (_, key) => (key === '__esModule' ? false : key)})`;
  },
};
