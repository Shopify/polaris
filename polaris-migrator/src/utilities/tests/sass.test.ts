import valueParser from 'postcss-value-parser';

import {createInlineComment, getFunctionArgs} from '../sass';

describe('createInlineComment', () => {
  it('inline and contains starting space', () => {
    const text = 'padding: var(--p-space-4);';
    const comment = createInlineComment(text);
    expect(comment.raws.inline).toBe(true);
    expect(comment.raws.left).toBe(' ');
  });

  it('formats single line text', () => {
    const text = 'padding: var(--p-space-4);';
    const comment = createInlineComment(text);
    expect(comment.text).toStrictEqual(text);
  });

  it('formats multiple line text', () => {
    const text = `
      padding: calc(-1 * var(--p-space-4))
        var(--p-space-4);
      `;
    const formatted = 'padding: calc(-1 * var(--p-space-4)) var(--p-space-4);';
    const comment = createInlineComment(text);
    expect(comment.text).toStrictEqual(formatted);
  });
});

describe('getFunctionArgs', () => {
  it('zero args', () => {
    const node = getFunctionNode('rem()');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual([]);
  });

  it('one arg', () => {
    const node = getFunctionNode('rem(1px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px']);
  });

  it('one arg (trailing comma)', () => {
    const node = getFunctionNode('rem(1px,)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px']);
  });

  it('two args', () => {
    const node = getFunctionNode('rem(1px, 2px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2px']);
  });

  it('three args', () => {
    const node = getFunctionNode('rem(1px, 2px, 3px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2px', '3px']);
  });

  it('nested functions', () => {
    const node = getFunctionNode('rem(1px, func(2px), func(func(3px)))');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', 'func(2px)', 'func(func(3px))']);
  });

  it('interpolated args', () => {
    const node = getFunctionNode('rem(1px, #{2 + $var}, $var)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '#{2 + $var}', '$var']);
  });

  it('trimmed', () => {
    const node = getFunctionNode('rem( 1px , \n func( 2px) , \t #{ $var })');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', 'func( 2px)', '#{ $var }']);
  });

  it('nested comments', () => {
    const node = getFunctionNode('rem(1px, /* comment */ 2px)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '/* comment */ 2px']);
  });

  it('separates args by comma dividers', () => {
    const node = getFunctionNode('rem(1px, 2/3, 4:5)');
    const args = getFunctionArgs(node);
    expect(args).toStrictEqual(['1px', '2/3', '4:5']);
  });
});

/** Test utility to quickly access the first `valueParser.FunctionNode` */
function getFunctionNode(value: string): valueParser.FunctionNode {
  const parsedValue = valueParser(value);

  if (parsedValue.nodes[0]?.type !== 'function') {
    throw new Error(`Expected ${value} to be a function`);
  }

  return parsedValue.nodes[0];
}
