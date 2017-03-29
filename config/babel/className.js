const getClassName = require('../classname');

module.exports = function getClassNameBabel(localName, filePath) {
  return getClassName(localName, filePath);
};
