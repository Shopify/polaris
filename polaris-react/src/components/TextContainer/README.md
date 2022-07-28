---
name: Text container
category: Titles and text
releasedIn: 1.9.0
keywords:
  - spacing
  - heading
  - list
  - layout
  - vertical
  - margin
  - padding
---

# Text container

A text container is used to wrap text elements such as paragraphs, headings, and lists to give them vertical spacing.

---

## Best practices

The closer the spacing, the closer the relationship between content topics. The closeness visually represents the relationship.

- Use tight spacing to relate content topics to each other
- Use loose spacing to separate concepts that are independent of each other

---

## Examples

### Default

Use this component for default vertical spacing.

```jsx
<TextContainer>
  <Heading>Install the Shopify POS App</Heading>
  <p>
    Shopify POS is the easiest way to sell your products in person. Available
    for iPad, iPhone, and Android.
  </p>
</TextContainer>
```

### Tight

Use the tight spacing option to relate content topics to each other.

```jsx
<TextContainer spacing="tight">
  <Heading>Install the Shopify POS App</Heading>
  <p>
    Shopify POS is the easiest way to sell your products in person. Available
    for iPad, iPhone, and Android.
  </p>
</TextContainer>
```

### Loose

Use the loose spacing option to separate concepts that are independent of each other.

```jsx
<TextContainer spacing="loose">
  <p>
    Manage your Shopify store on-the-go with real-time notifications, access to
    your dashboard, and order management, all from your smartphone.
  </p>
  <p>
    Shopify POS is the fastest and easiest way to start accepting Visa,
    Mastercard, American Express, and Discover right from your smartphone or
    tablet.
  </p>
</TextContainer>
```

---

## Related components

- For more layout variations, or if you’re looking to vertically space components other than text, use [Stack](https://polaris.shopify.com/components/stack).
