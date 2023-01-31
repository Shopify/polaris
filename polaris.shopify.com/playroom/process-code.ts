import {compileSync} from '@mdx-js/mdx';

const findLastIndex = (arr, cond) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (cond(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
};

/* We're trying to catch the following permutations:

1. Pass through to Playroom as-is

```
<Foo>bar</Foo>
```

2. Pass through to Playroom as-is

```
<Foo>
bar
</Foo>
```

3. Pass through to Playroom

```
<Foo>

bar

</Foo>
```

4. Pass through to Playroom

```
<Foo>bar</Foo>
<Bar>zip</Bar>
```

5. Pass through to Playroom

```
<Foo>
bar
</Foo>
<Bar>
zip
</Bar>
```

6. Pass through to Playroom

```
<Foo>

bar

</Foo>
<Bar>

zip

</Bar>
```

7. All of the above variants, but with some random non-JSX preceeding it; split at the start of the components, then wrap in `return (<>...</>)`, and wrap the whole thing in an IIFE

8. Anything else, just wrap in an IIFE
*/

export default function processCode(code: string) {
  let mdast;
  debugger;
  try {
    compileSync(code, {
      format: 'mdx',
      remarkPlugins: [
        () => (tree) => {
          mdast = tree;
        },
      ],
    });
  } catch (error) {
    debugger;
    throw error;
  }
  debugger;

  console.log(mdast);

  // const isPureJSX = ast.program.body.every(
  //   (node) =>
  //     node.type === 'ExpressionStatement' &&
  //     node.expression.type === 'JSXElement',
  // );

  // if (isPureJSX) {
  //   return code;
  // }

  const codeLines = code.trim().split('\n\n');
  const jsx = codeLines.pop() || '';
  return `{
      (() => {
        ${codeLines.join('\n\n')}
        ${
          jsx.trim()?.startsWith('return')
            ? jsx
            : `return (
            <>
              ${jsx}
            </>
          )`
        }
      })()
  }`;
}
