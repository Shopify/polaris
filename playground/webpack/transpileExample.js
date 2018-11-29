const parse = require('@babel/parser').parse;
const generate = require('@babel/generator').default;
const transform = require('@babel/standalone').transform;

module.exports = function transpileExample(string) {
  const scope = {SCOPE_VARIABLES_PLACEHOLDER: ''};
  const tempScope = [];

  Object.keys(scope).forEach((scopeProp) => {
    tempScope.push(scope[scopeProp]);
  });

  const ast = astFromCode(string);
  return transpiledCodeFromAst(scope, ast);
};

function astFromCode(code) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread'],
  });

  return ast;
}

function transpiledCodeFromAst(scope, ast) {
  const code = generate(ast)
    .code.replace(/;$/, '')
    .replace(/\\\\/, '\\');

  const rawCode = unicodeToChar(code);

  const classPattern = /class (\w+) extends React.Component/g;
  const classMatch = classPattern.exec(code);

  if (classMatch) {
    return transform(
      `
        ((${Object.keys(scope).join(', ')}, mountNode) => {
          ${rawCode}
          return ${classMatch[1]};
        });
      `,
      {presets: ['es2015', 'react', ['stage-1', {decoratorsLegacy: true}]]},
    ).code;
  } else {
    return transform(
      `
      ((${Object.keys(scope).join(', ')}, mountNode) => {
        class Comp extends React.Component {
          render() {
            return (
              ${rawCode}
            );
          }
        }
        return Comp;
      });
    `,
      {presets: ['es2015', 'react', ['stage-1', {decoratorsLegacy: true}]]},
    ).code;
  }
}

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}
