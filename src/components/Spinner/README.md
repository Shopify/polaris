---
name: Spinner
category: Feedback indicators
releasedIn: 1.7.0
platforms:
  - android
  - ios
  - web
keywords:
  - spinner
  - loader
  - loading
  - progress indicator
  - android
  - ios
---

# Spinner

Spinners are used to notify merchants that their action is being processed. For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.

---

## Examples

### Default spinner

Use to notify merchants that their requested action is being processed.

```jsx
<Spinner accessibilityLabel="Spinner example" size="large" color="teal" />
```

<!-- content-for: android -->

![Material design spinner for Android](/public_images/components/Spinner/android/default@2x.gif)

<!-- /content-for -->

<!-- content-for: ios -->

![Apple’s spinner for iOS](/public_images/components/Spinner/ios/default@2x.gif)

<!-- /content-for -->

### Small spinner

<!-- example-for: web -->

Smaller than the default spinner.

```jsx
<Spinner accessibilityLabel="Small spinner example" size="small" color="teal" />
```

### Spinner with focus management

Use to direct the focus state from the control to the spinner, to the content.

```jsx
function SpinnerWithFocusManagement() {
  const tabs = useRef([
    {
      id: 'all-customers',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content',
    },
    {
      id: 'accepts-marketing',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content',
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [textFieldFocused, setTextFieldFocused] = useState(false);

  useEffect(() => {
    setTextFieldFocused(!loading);
  }, [loading]);

  const handleTabChange = useCallback((selectedTab) => {
    setLoading(true);
    setSelected(selectedTab);
    setTimeout(() => {
      setValue('');
      return setLoading(false);
    }, 1500);
  }, []);

  const handleUrlChange = useCallback((value) => setValue(value), []);

  const handleSubmit = useCallback((_event) => setValue(''), []);

  const label = selected ? 'Marketing' : 'Customers';
  const sectionMarkup = loading ? (
    <Spinner
      accessibilityLabel="Loading form field"
      hasFocusableParent={false}
    />
  ) : (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={value}
          focused={textFieldFocused}
          onChange={handleUrlChange}
          label={label}
        />
        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );

  return (
    <Card>
      <Tabs tabs={tabs.current} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs.current[selected].content}>
          {sectionMarkup}
        </Card.Section>
      </Tabs>
    </Card>
  );
}
```

---

## Accessibility

<!-- content-for: web -->

SVGs are often conveyed inconsistently to assistive technologies. The `Spinner` component’s accessibility is also highly contextual. When the parent component is focusable, you’ll need to set the `hasFocusableParent` prop for the appropriate `role` attribute to be applied.

For optimal user experience, use the `accessibilityLabel` prop to let assistive technology users know the purpose of the spinner.

<!-- /content-for-->

---

## Best practices

The spinner component should:

- Notify merchants that their request has been received and the action will soon complete.
- Not be used to give feedback for an entire page load.
- White can only be used with small spinners on actionable components like buttons.
- On web, be used in conjunction with skeleton loading to represent non-typographic content. For example, line graphs on the Merchant analytics dashboard.

---

## Content guidelines

### Accessibility label

Spinner accessibility label should:

- Accurately explain the state of the requested action. For example, “Loading”, “Submitting”, “Processing”.
- Use as few words to describe the state as possible.

---

## Related components

- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/feedback-indicators/progress-bar) component.
- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text) components.
