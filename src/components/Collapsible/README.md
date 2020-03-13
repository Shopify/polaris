---
name: Collapsible
category: Behavior
platforms:
  - android
  - ios
  - web
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
  - ios
  - android
---

# Collapsible

The collapsible component is used to put long sections of information under a block that merchants can expand or collapse.

---

## Best practices

The collapsible component should:

- Be used for information that is lower priority or that merchants don’t need
  to see all the time
- Not be used to hide error messages or other critical information that requires
  an immediate action

---

## Content guidelines

Collapsible containers are cards with expandable and collapsible functionality, and should follow the content guidelines for [cards](https://polaris.shopify.com/components/structure/card#section-content-guidelines).

---

## Examples

### Default collapsible component

Use for a basic “show more” interaction when you need to display more content.

```jsx
function CollapsibleExample() {
  const [active, setActive] = useState(true);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  return (
    <div style={{height: '200px'}}>
      <Card sectioned>
        <Stack vertical>
          <Button
            onClick={handleToggle}
            ariaExpanded={active}
            ariaControls="basic-collapsible"
          >
            Toggle
          </Button>
          <Collapsible
            open={active}
            id="basic-collapsible"
            transition={{duration: '150ms', timingFunction: 'ease'}}
          >
            <TextContainer>
              Your mailing list lets you contact customers or visitors who have
              shown an interest in your store. Reach out to them with exclusive
              offers or updates about your products.
            </TextContainer>
          </Collapsible>
        </Stack>
      </Card>
    </div>
  );
}
```

<!-- content-for: android -->

![Collapsible on Android](/public_images/components/Collapsible/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Collapsible on iOS](/public_images/components/Collapsible/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To control a collapsible component, use the [button](https://polaris.shopify.com/components/actions/button) component
- To put long sections of information in a container that allows for scrolling, [use the scrollable component](https://polaris.shopify.com/components/behavior/scrollable)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

Use the collapsible component in conjunction with a [button](https://polaris.shopify.com/components/actions/button). Place the collapsible content immediately after the button that controls it, so merchants with vision or attention issues can easily discover what content is being affected.

- Use the required `id` prop of the collapsible component to give the content a unique `id` value
- Use the `ariaExpanded` prop on the button component to add an `aria-expanded` attribute, which conveys the expanded or collapsed state to screen reader users
- Use the `ariaControls` prop on the button component, and set its value to the `id` value of the collapsible component

<!-- /content-for -->
