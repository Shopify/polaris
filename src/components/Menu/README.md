---
name: Menu
category: Actions
platforms:
  - android
  - ios
  - web
keywords:
  - MenuAction
  - CTA
  - call to action
  - call-to-action
  - action
  - basic button
  - outline
  - plain
  - disabled state
  - disabled
  - button
  - link
  - click
  - ios
  - android
---

# Menu

TODO: Write "Summary"

---

## Best practices

TODO: Write "Best practices"

---

## Content guidelines

TODO: Write "Guidelines"

---

## Examples

### Default Menu

TODO: Write "Example"

```jsx
<Menu actions={[{content: 'Duplicate'}, {content: 'Another one'}]} />
```

### With both actions and groups

TODO: Write "Example"

```jsx
<Menu
  actions={[{content: 'Duplicate'}, {content: 'Another one'}]}
  groups={[
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

### Rollup actions

TODO: Write "Example"

```jsx
<Menu actions={[{content: 'Duplicate'}, {content: 'Another one'}]} rollup />
```

---

## Related components

TODO: Write "Related components"
