// Before:
// import * as styles from './Content.scss';

// After:
// import styles from './Content.scss';

module.exports = function(babel) {
  const {types: t} = babel;
  return {
    visitor: {
      ImportDeclaration(path) {
        const {node} = path;
        if (
           node.specifiers.length === 1 &&
           node.specifiers[0].type === 'ImportNamespaceSpecifier' &&
           node.source.value.endsWith('.scss')
        ) {
          const specifierPath = path.get('specifiers.0');
          const identifier = t.identifier(specifierPath.node.local.name);
          const specifier = t.importDefaultSpecifier(identifier);
          specifierPath.replaceWith(specifier);
        }
      },
    },
  };
};
