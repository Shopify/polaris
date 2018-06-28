import * as React from 'react';
import * as Polaris from '@shopify/polaris';
import {parse} from '@babel/parser';
import generate from '@babel/generator';
import {transform} from '@babel/standalone';

interface Props {
  example: string;
}

export default function Example(props: Props) {
  const scope = {React, ...Polaris};
  const tempScope: Object[] = [];

  Object.keys(scope).forEach((scopeProp) => {
    tempScope.push(scope[scopeProp]);
  });

  const ast = astFromCode(props.example);
  const compiledCode = compileCode(scope, ast);

  // eslint-disable-next-line no-eval
  const Component = eval(compiledCode)(...tempScope);

  return <Component />;
}

function astFromCode(code: string): File {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread'],
  });

  return ast;
}

function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

function compileCode(scope, ast) {
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
