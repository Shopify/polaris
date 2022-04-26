const path = require('path');

const tokenGroupsDir = path.join(__dirname, '../src/token-groups');

/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-keyframes-fade-in', 'p-keyframes-spin', etc...]
 */
const getKeyframeNames = () =>
  Object.keys(require(path.join(tokenGroupsDir, 'motion')))
    .map((name) => (name.startsWith('keyframes') ? `p-${name}` : null))
    .filter(Boolean);

module.exports = getKeyframeNames;
