---
name: Text
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

# Text component

A text component is used to set type styles including Display, Heading, Body and their variants.

---

## Best practices

---

## Mapping from previous type components
These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop and that should be determined based on the usage context.

### DisplayText

#### Small

```jsx
<DisplayText size="small">Good evening, Dominic.</DisplayText>
```
Replace with
```jsx
<Text variant="headingXl"
>Good evening, Dominic.</Text>
```
#### Medium
```jsx
<DisplayText size="medium">Good evening, Dominic.</DisplayText>
```
Replace with
```jsx
<Text variant="displaySm"
>Good evening, Dominic.</Text>
```
#### Large
```jsx
<DisplayText size="large">Good evening, Dominic.</DisplayText>
```
Replace with
```jsx
<Text variant="displayMd"
>Good evening, Dominic.</Text>
```
#### Extra large
```jsx
<DisplayText size="extraLarge">Good evening, Dominic.</DisplayText>
```
Replace with
```jsx
<Text variant="displayLg"
>Good evening, Dominic.</Text>
```
### Heading
```jsx
<Heading>Online store dashboard</Heading>
```

Replace with
```jsx
<Text variant="headingLg">Online store dashboard</Text>
```
### Subheading
```jsx
<Subheading>Accounts</Subheading>
```

Replace with
```jsx
<Text variant="headingSm">Accounts</Text>
```
### Caption
```jsx
<Caption>Received April 21, 2017</Caption>
```

Replace with
```jsx
<Text variant="bodySm">Received April 21, 2017</Text>
```
### TextStyle
