---
category: Actions
keywords:
  - index
  - filtering
  - tabs
---

# View Button

The Tab is the singular component rendered within the parent Tabs component. It is a button with an active state, that supports having additional actions associated with it, which are displayed in an ActionList within a Popover when the button is in the active state.

## Examples

```tsx
import {Tab} from 'components/IndexFiltering/components';

const [isActive, setIsActive] = useState(false);
const [activeActionIndex, setActiveActionIndex] = useState<number>();

const permissions = ['rename', 'edit', 'duplicate', 'delete'];

function handleClick() {
  setIsActive(!isActive);
}

function handleActiveClick() {
  analytics.track('Showing Tab Popover');
}

function onRenameView(id: string) {
  analytics.track(`Renaming ${id} View Button`);
}

function onDuplicateView(id: string) {
  analytics.track(`Duplicating ${id} View Button`);
}

function onEditView(id: string) {
  analytics.track(`Editing ${id} View Button`);
}

function onDeleteView(id: string) {
  analytics.track(`Deleting ${id} View Button`);
}

return (
  <Tab
    id="my-tab"
    permissions={permissions}
    isActive={isActive}
    onAction={handleClick}
    onActiveAction={handleActiveClick}
    onRenameView={onRenameView}
    onDuplicateView={onDuplicateView}
    onEditView={onEditView}
    onDeleteView={onDeleteView}
  >
    Unfulfilled
  </Tab>
);
```

## Best practices

This component should never be used outside of the Tabs component.

## Research and development
