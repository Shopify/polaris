import valueParser from 'postcss-value-parser';

import {getFunctionArgs} from '../sass';

describe('getFunctionArgs', () => {
  it('zero args', () => {
    const node = parseFunction('rem()');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual([]);
  });

  it('one arg', () => {
    const node = parseFunction('rem(1px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px']);
  });

  it('one arg (trailing comma)', () => {
    const node = parseFunction('rem(1px,)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px']);
  });

  it('two args', () => {
    const node = parseFunction('rem(1px, 2px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2px']);
  });

  it('three args', () => {
    const node = parseFunction('rem(1px, 2px, 3px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2px', '3px']);
  });

  it('nested functions', () => {
    const node = parseFunction('rem(1px, func(2px), func(func(3px)))');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', 'func(2px)', 'func(func(3px))']);
  });

  it('interpolated args', () => {
    const node = parseFunction('rem(1px, #{2 + $var}, $var)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '#{2 + $var}', '$var']);
  });

  it('trimmed', () => {
    const node = parseFunction('rem( 1px , \n func( 2px) , \t #{ $var })');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', 'func( 2px)', '#{ $var }']);
  });

  it('nested comments', () => {
    const node = parseFunction('rem(1px, /* comment */ 2px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '/* comment */ 2px']);
  });

  it('separates args by comma dividers', () => {
    const node = parseFunction('rem(1px, 2/3, 4:5)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2/3', '4:5']);
  });
});

function parseFunction(value: string): valueParser.FunctionNode {
  const parsedValue = valueParser(value);

  if (parsedValue.nodes[0]?.type !== 'function') {
    throw new Error(`Expected ${value} to be a function`);
  }

  return parsedValue.nodes[0];
}
