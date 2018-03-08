---
name: Collapsible
category: Behavior
keywords:
  - hide
  - show
  - low priority
  - less important
  - disclosure
  - accordion
  - accordian
  - expand content
  - toggle
  - toggleable
  - reveal
  - show more
  - show all button
  - show hide
  - expanding view
  - collapse
---

# Collapsible
The collapsible component is used to put long sections of information under a
block that can be expanded or collapsed by the merchant. Generally this is
used for lower priority information or content that merchants don’t need to see
all the time.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants may occasionally need access to information that might overwhelm
the interface or push important details too far down the page.

### Solution

The collapsible component lets merchants read longer form information on their own time.

---

## Best practices
The collapsible component should:

* Be used for information that is lower priority or that merchants don’t need
to see all the time
* Be shown by default in an expanded state when a merchant loads a screen
* Not be used to hide error messages or other critical information that requires
an immediate action

---

## Content guidelines
There are no content elements that are specific to the collapsible component. Follow the [content guidelines for cards](/components/structure/card) to make sure your headings, body content, links, and buttons are written consistently and clearly.

## Examples

### Default collapsible component

Use for a basic “show more” interaction when you need to display more content.

```jsx
class CollapsibleExample extends React.Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state;

    return (
      <div style={{height: '200px'}}>
        <Card sectioned>
          <Stack vertical>
            <Button
              onClick={this.handleToggleClick}
              aria-expanded={open}
            >
              Toggle
            </Button>
            <Collapsible open={open}>
              <TextContainer>
                Your mailing list lets you contact customers or visitors who have shown an interest in your store. Reach out to them with exclusive offers or updates about your products.
              </TextContainer>
            </Collapsible>
          </Stack>
        </Card>
      </div>
    );
  }

  handleToggleClick = () => {
    this.setState((state) => {
      const open = !state.open;
      return {
        open,
      }
    });
  }
}
```

---

## Related components

* To put long sections of information in a container that allows for scrolling, [use the scrollable component](/components/behavior/scrollable)
