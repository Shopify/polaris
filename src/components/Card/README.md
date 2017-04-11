---
name: Card
tags:
  - layout
  - container
category: Structure
---

# Card

Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and take action on.

_Not what you’re looking for?_

To create page-level layout, [use the layout component](../Layout/).
To highlight a Shopify feature, [use the callout card component](../CalloutCard/).

## Problem

Merchants may be feeling overwhelmed by too much information or too many different kinds of tasks.

## Solution

Grouping tasks and concepts into digestible sections using cards can help alleviate merchant anxiety.
Guidelines
Great cards communicate concepts clearly and avoid overwhelming merchants by:

Using headings that set clear expectations about the card’s purpose
Sticking to single user flows or breaking more complicated flows into multiple sections
Prioritizing information so the content the merchant most needs to know comes first
Avoiding too many call-to-action buttons or links
Using calls-to-action on the bottom of the card for next steps and using the space in the upper right corner of the card for persistent, optional actions (example: an Edit link)

| Prop | Type | Description |
| ---- | ---- | ----------- |
| title | string | Title content for the card |
| subdued | boolean | A less prominent card |
| sectioned | boolean | Auto wrap content in section |
| actions | Action[] | Card header actions |

## Content guidelines

### Heading — `<Card.Title>`

Headings should be:

Descriptive: Help merchants understand what they’ll find in the card.

Concise and scannable:
Use simple, clear language that can be read at a glance
Keeping headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
Where possible, avoid articles (the, a, an) to keep content short and actionable

### Body content — `<Card.Section>`

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

### Section titles — `<Section.Title>`

Section titles should be:

Informative: They should label the type of content grouped in the body content below.

Need do and don’t exampl

### Action links — `<Card.Action>`

Links should be:

Secondary or persistent actions: Links should be used to represent lower priority actions than buttons, or persistent actions that a merchant may take at any time (example: a persistent Edit link).

Need do and don’t example

Clearly labeled: Merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.

Need do and don’t example

Like buttons: Follow the same content guidelines as <when you’re writing buttons>.
Need do and don’t example

---

## Examples

### Basic card

Use this when you have a simple message to communicate to merchants that doesn’t require any secondary steps.

```jsx
<Card title="Online Store dashboard" sectioned>
  <p>View a summary of your Online Store's performance.</p>
</Card>
```

### Card with call-to-action in the footer

Use this when you have a simple message to communicate to merchants that requires them to take an action. Put a call-to-action in the footer when you need merchants to read the content in the card before taking the action.

```jsx
<Card title="Online Store dashboard">
  <Card.Section>
    <p>View a summary of your Online Store's performance.</p>
  </Card.Section>

  <Card.Footer>
    <Button>View dashboard</Button>
  </Card.Footer>
</Card>
```

### Card with call-to-action in the heading
Use a link in the heading when there’s a persistent action available to merchants (example: an Edit link), or when you want to provide them with a way to navigate to another section of Shopify.

```jsx
<Card title="Online Store dashboard" actions={[{content: 'Edit'}]}>
  <Card.Section>
    <p>View a summary of your Online Store's performance.</p>
  </Card.Section>
</Card>
```

### Card with an action menu in the heading
Use this if there are multiple optional actions a merchant can take on the information in the card. Clicking on the link will open a popover that contains a menu of actions.

### Card with multiple sections
Use this when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.

### Card with multiple titled sections
Use this when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.

### Card with a subdued section
Use a subdued section to indicate when one of the sections in your card contains inactive or disabled content.

### Subdued card for secondary content
Use a subdued card for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
