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
<RollupActions items={[{content: 'Duplicate'}, {content: 'Another one'}]} />
```

### With both items and sections

TODO: Write "Example"

```jsx
<RollupActions
  items={[{content: 'Duplicate'}, {content: 'Another one'}]}
  sections={[
    {
      title: 'First action group',
      items: [
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
      items: [
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
