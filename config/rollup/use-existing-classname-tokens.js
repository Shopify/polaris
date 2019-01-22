module.exports = function createExistingClassnameTokensUser(tokens) {
  return function useExistingClassnameTokens(localName, filePath) {
    return tokens[filePath][localName];
  };
};
