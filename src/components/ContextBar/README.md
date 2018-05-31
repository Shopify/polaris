---
name: Context Bar
category: Forms
keywords:
  - form
  - forms
  - action
  - actions
  - save
  - cancel
  - logo
  - branding
---

# Context Bar

This component provides an easy, declarative way for changing the context bar in the frame of the admin from a page. Used to need to be able to provide page-level UI for saving and discarding in-progress changes.

---

## Best practices

The context bar component should be used to:

* save and discard in-progress changes
* forward the message, primary action, and cancel action

---

## Examples

### Form actions

Use primary action and second action to control your form

```jsx
<Frame>
  <ContextBar
    visible
    message="Unsaved changes"
    primaryAction={{
      content: 'Save',
      onAction: () => console.log('add form submit logic'),
      loading: false,
      disabled: false,
    }}
    cancelAction={{
      content: 'Discard',
      onAction: () => console.log('add clear form logic'),
    }}
    branding={{
      id: 'shopifyPlus',
      src: 'add image source',
    }}
  />
</Frame>
```

---

## Related components

* To wrap around your app for higher level control, use the [Frame](/components/edit-after-frame-readme/frame)
