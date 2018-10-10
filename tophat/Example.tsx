/* eslint-disable import/no-unresolved */
import * as React from 'react';
import * as Polaris from '@shopify/polaris';
import {parse} from '@babel/parser';
import generate from '@babel/generator';
import {transform} from '@babel/standalone';
import {Heading} from '@shopify/polaris';

export interface ExampleProps {
  name: string;
  code: string;
}

export default function Example(props: ExampleProps) {
  const scope = {React, ...Polaris};
  const tempScope: Object[] = [];

  Object.keys(scope).forEach((scopeProp) => {
    tempScope.push(scope[scopeProp]);
  });

  const ast = astFromCode(props.code);
  const compiledCode = compileCode(scope, ast);

  // eslint-disable-next-line no-eval
  const Component = eval(compiledCode)(...tempScope);

  return (
    <React.Fragment>
      <Heading>{props.name}</Heading>
      <Component />
    </React.Fragment>
  );
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
