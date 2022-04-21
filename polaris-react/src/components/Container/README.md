---
name: Container
category: Layout
platforms:
  - android
  - ios
  - web
---

# Container

The container is a foundational element for centering content horizontally and includes controls for setting the `max-width` to various breakpoints and a toggle for default padding.

---

## Best practices

- Use for setting max-width for content layouts
- Use for the root element of grid layouts
- Use across sections of a page for consistent spacing
- Use to contain content over backgrounds that span the full page

---

## Examples

### Default container

Contains content at the largest breakpoint and applies default gutter spacing.

```jsx
function ContainerDefault() {
  const root = {
    marginTop: '40px',
    color: 'var(--p-interactive-hovered)',
    border: '2px solid currentColor',
  };

  const content = {
    minHeight: '65vh',
    border: 'inherit',
    backgroundColor: '#e5e5f7',
    background:
      'repeating-linear-gradient(45deg, currentColor, currentColor, 2px, #e5e5f7 2px, #e5e5f7 10px )',
    opacity: 0.4,
  };

  return (
    <Container style={root}>
      <div style={content} />
    </Container>
  );
}
```

### Explicit max-width container

Contains content at a defined breakpoint and applies default gutter spacing.

```jsx
function ContainerExplicitMaxWidth() {
  const root = {
    marginTop: '40px',
    color: 'var(--p-interactive-hovered)',
    border: '2px solid currentColor',
  };

  const content = {
    minHeight: '65vh',
    border: 'inherit',
    backgroundColor: '#e5e5f7',
    background:
      'repeating-linear-gradient(45deg, currentColor, currentColor, 2px, #e5e5f7 2px, #e5e5f7 10px )',
    opacity: 0.4,
  };

  return (
    <Container maxWidth="md" style={root}>
      <div style={content} />
    </Container>
  );
}
```

### No max-width container

Applies default gutter spacing without containing content to a given max-width.

```jsx
function ContainerNoMaxWidth() {
  const root = {
    marginTop: '40px',
    color: 'var(--p-interactive-hovered)',
    border: '2px solid currentColor',
  };

  const content = {
    minHeight: '65vh',
    border: 'inherit',
    backgroundColor: '#e5e5f7',
    background:
      'repeating-linear-gradient(45deg, currentColor, currentColor, 2px, #e5e5f7 2px, #e5e5f7 10px )',
    opacity: 0.4,
  };

  return (
    <Container maxWidth={false} style={root}>
      <div style={content} />
    </Container>
  );
}
```

### Disabled gutters container

Contains content at the largest breakpoint without gutter spacing.

```jsx
function ContainerDisabledGutters() {
  const root = {
    marginTop: '40px',
    color: 'var(--p-interactive-hovered)',
    border: '2px solid currentColor',
  };

  const content = {
    minHeight: '65vh',
    border: 'inherit',
    backgroundColor: '#e5e5f7',
    background:
      'repeating-linear-gradient(45deg, currentColor, currentColor, 2px, #e5e5f7 2px, #e5e5f7 10px )',
    opacity: 0.4,
  };

  return (
    <Container disableGutters style={root}>
      <div style={content} />
    </Container>
  );
}
```

### Consistent spacing across sections

Contains content at the largest breakpoint across page sections.

```jsx
function ContainerMultipleSections() {
  const sectionOne = {
    minHeight: '30vh',
    display: 'grid',
    alignContent: 'center',
    color: 'snow',
  };

  const sectionTwo = {
    minHeight: '70vh',
    backgroundColor: 'var(--p-surface-selected-pressed)',
    paddingTop: 20,
  };

  const content = {
    color: 'var(--p-interactive-hovered)',
  };

  return (
    <>
      <div style={{background: 'var(--p-interactive-hovered)'}}>
        <Container style={sectionOne}>
          <h1>Heading 1</h1>
          <br />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex sit
            commodi, sint hic eaque veritatis delectus voluptates sequi
            aspernatur fuga magni repudiandae maiores exercitationem ducimus eos
            cupiditate, corrupti iure. Debitis?
          </p>
        </Container>
      </div>
      <Container style={sectionTwo}>
        <div style={content}>
          <h2>Heading 2</h2>
          <br />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex sit
            commodi, sint hic eaque veritatis delectus voluptates sequi
            aspernatur fuga magni repudiandae maiores exercitationem ducimus eos
            cupiditate, corrupti iure. Debitis?
          </p>
          <br />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex sit
            commodi, sint hic eaque veritatis delectus voluptates sequi
            aspernatur fuga magni repudiandae maiores exercitationem ducimus eos
            cupiditate, corrupti iure. Debitis?
          </p>
        </div>
      </Container>
    </>
  );
}
```
