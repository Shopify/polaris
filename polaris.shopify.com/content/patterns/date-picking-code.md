# Building a Polaris Date Range picker

The date-range picker is a complicated component with a lot of moving parts.
This guide will step you through the key points to help you build a date-range picker suitable for Shopify/web.

Polaris has most of the core UI needed to piece together a really good date-range picker component.
Let's start with some of the core UI necessary.

```tsx
import {  Button, Date picker, Option list, Popover, Textfield } from '@shopify/polaris'
```

With these core components, we should be able to build a pattern that effectively [helps our merchants](/date-range/principles).

```tsx
<Popover>
  <Popover.Pane>
    <OptionList />
    <TextField label="Since" />
    <TextField label="Until" />
  </Popover.Pane>
  <Popover.Pane>
    <Popover.Section>
      <Button>Apply</Button>
      <Button>Cancel</Button>
    </Popoover.Section>
  </Popover.Pane>
</Popover>
```
