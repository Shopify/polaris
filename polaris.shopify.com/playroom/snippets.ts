const snippets = [
  {
    group: 'Templates',
    name: 'Single Component',
    code: `<Button primary>Button</Button>`,
  },
  {
    group: 'Templates',
    name: 'Multiple Components',
    code: ` <Button primary>First</Button>
<Button>Second</Button>`,
  },
  {
    group: 'Templates',
    name: 'Component with state',
    code: `// 👇 Everything after the last blank line will be rendered.
// State not updating? Try refreshing your browser
const [count, setCount] = useState(0);

<div>Foo</div>
<Button primary onClick={() => setCount(count + 1)}>Count: {count}</Button>`,
  },
];

export default snippets;
