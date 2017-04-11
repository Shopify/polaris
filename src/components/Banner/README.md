---
name: Banner
tags:
  - layout
  - container
category: Containers
---

# Banner

Banners are used to draw the merchant’s attention to something that needs their attention. They show at the top of different sections in Shopify and are one of the most prominent ways we have to communicate to merchants.

## Problem

Merchants need to know about high priority information and actions they should take.

## Solution

Banners are a highly visible way to bring something to a merchant’s attention.

---

## Design guidelines

Great banners should:

- Be focused on a single theme, piece or information, or required action to avoid overwhelming merchants
- Be dismissable except for when they contain critical information or an important step a merchant needs to take
- Be concise and scannable—merchants shouldn’t need to spend a lot of time figuring out what they need to know and do
- Be limited to a few important calls to action with no more than one primary action included per banner
- Be used thoughtfully and sparingly for only the most important information. If banners are used for lower priority announcements, merchants may start to ignore them.
- Not be used as the primary entry point or mechanism for merchants to access to information or actions they need to take on a regular basis
- Not be used for marketing information or upsell—have a look at callout cards instead

---

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

---

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | Title content for the banner. |
| status | enum['success', 'info', 'warning', 'critical'] | Sets the status of the banner. |
| children | React.ReactNode | The child elements to render in the banner. |

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
