---
name: View Buttons
category: Actions
keywords:
  - index
  - filtering
---

# View Buttons

The Tabs renders multiple Tab components, and are used to control the currently visible view

## Examples

```tsx
import {Tabs} from 'components/Tabs';

const [selected, setSelected] = useState(0);
const items = [
  'All',
  'Unpaid',
  'Open',
  'Closed',
  'Local delivery',
  'Local pickup',
].map((item, index) => ({
  name: item,
  onAction: () => console.log('Clicked'),
  id: `${item}-${index}`,
  permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
}));

function handleClickNewTab() {
  console.log('Opened the new view modal');
}

return (
  <Tabs
    items={items}
    selected={selected}
    onSelect={setSelected}
    disabled={false}
    showNewTab
    newViewAccessibilityLabel="Add a new view"
  />
);
```

## Best practices

## Research and development
