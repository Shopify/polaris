const path = require('path');

const tokenGroupsDir = path.join(__dirname, '../../src/tokens/token-groups');

/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-fade-in', 'p-spin', etc...]
 */
const getKeyframeNames = () =>
  Object.keys(require(path.join(tokenGroupsDir, 'keyframes'))).map(
    (name) => `p-${name}`,
  );
module.exports = getKeyframeNames;
