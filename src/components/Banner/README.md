---
name: Banner
tags:
  - layout
  - container
category: Containers
---

# Banner

Banner description

_Not what you’re looking for?_

To group tasks and concepts into digestible sections, [use the card component](../Card/).

## Problem

A message needs to be communicated to a merchant.

## Solution

Banners highlight the information to be communicated to a merchant.

## API
| Prop  | Type   | Default | Required |
| --- | --- | --- | --- |
| title | string | none | true |
| status | enum: 'success', 'subdued', 'info', 'attention', 'warning', 'critical' | none | false |
| children | React.ReactNode | none | false |

## Content guidelines

### Heading

Headings should be:

Descriptive: Help merchants understand what they’ll find in the banner.

Concise and scannable:
Use simple, clear language that can be read at a glance
Keeping headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
Where possible, avoid articles (the, a, an) to keep content short and actionable

### Body content

Body content should be:

Actionable: Start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don't use permissive language like "you can".

Structured for merchant success: Always put the most critical information first.
Need do and don’t example.
Clear: Use the verb “need” to help merchants understand when they’re required to do something.


### Call-to-action button — `<Button>`

Buttons should be:

Clear and predictable: Merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling a button.

Need do and don’t example

Action-led: Buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

Need do and don’t example

Scannable: Avoid unnecessary words and articles such as the, an, or a.

Need do and don’t example

## Examples

### Default banner

Use this when you have a simple message to communicate to merchants that doesn’t require any secondary steps.

```jsx
<Banner title="Default banner">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</Banner>
```

### Error banner

Use this when you have a simple message to communicate to merchants that requires them to take an action. Put a call-to-action in the footer when you need merchants to read the content in the card before taking the action.


```jsx
<Banner title="Error banner" status="critical">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</Banner>
```
