---
name: Rollup Actions
category: Actions
platforms:
  - android
  - ios
  - web
keywords:
  - RollupActions
  - action
  - choices
  - decision
  - call-to-action
  - CTA
  - grouped actions
  - set of buttons
  - set of actions
  - horizontal arrangement of buttons
  - stacked
  - ios
  - android
---

# RollupActions

TODO: Write "Summary"

---

## Best practices

TODO: Write "Best practices"

---

## Content guidelines

TODO: Write "Guidelines"

---

## Examples

### Default RollupActions

TODO: Write "Example"

```jsx
<RollupActions
  secondaryActions={[{content: 'Duplicate'}, {content: 'Another one'}]}
/>
```

### With both secondaryActions and actionGroups

TODO: Write "Example"

```jsx
<RollupActions
  secondaryActions={[{content: 'Duplicate'}, {content: 'Another one'}]}
  actionGroups={[
    {
      title: 'First action group',
      actions: [
        {content: 'Share on Facebook'},
        {
          content: 'Share on Twitter',
          helpText: 'Tweet tweet tweet!',
          active: true,
        },
      ],
      details: 'Here are some details for my action group.',
    },
    {
      title: 'Promote',
      actions: [
        {content: 'Content one'},
        {content: 'Content two'},
        {
          content: 'And finally, content three',
          ellipsis: true,
        },
      ],
    },
  ]}
/>
```

---

## Related components

TODO: Write "Related components"
