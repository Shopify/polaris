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

const unwrappedSnippets = [
  `<Foo>bar</Foo>`,
  `<Foo>
bar
</Foo>`,
  `<Foo>

bar

</Foo>`,
];

describe('Playroom code splitter', () => {
  it('does things', () => {
    expect(true).toBe(true);
  });
});
