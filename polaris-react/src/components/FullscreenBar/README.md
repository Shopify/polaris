---
name: Fullscreen bar
category: Navigation
keywords:
  - topbar
  - top bar
  - header
  - bar
  - app
---

# Fullscreen bar

The Fullscreen bar is a header component that should be presented at the top of an app when it is in fullscreen mode. This is designed to ensure a uniform placement for a button to exit that mode. The Fullscreen bar can be customized by adding `children`.

---

## Best practices

The Fullscreen bar component should:

- Be presented when an App is in fullscreen mode as a means of exiting that mode.
- Fire an action to exit fullscreen mode.

---

## Examples

### With children

Use to provide structure for the top of an application while in fullscreen mode.

```jsx
function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <Badge status="info">Draft</Badge>
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <DisplayText size="small">Page title</DisplayText>
        </div>
        <ButtonGroup>
          <Button onClick={() => {}}>Secondary Action</Button>
          <Button primary onClick={() => {}}>
            Primary Action
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <div style={{height: '250px'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <DisplayText size="small">Page content</DisplayText>
      </div>
    </div>
  );
}
```

### No children

Use this default to show ONLY the Back button.

```jsx
function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = <FullscreenBar onAction={handleActionClick} />;

  return (
    <div style={{height: '250px'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <DisplayText size="small">Page content</DisplayText>
      </div>
    </div>
  );
}
```

---

## Related components

- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/toast) component.
- To indicate to merchants that a page is loading or an upload is processing, use the [loading](https://polaris.shopify.com/components/loading) component.
