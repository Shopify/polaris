---
name: Card
tags:
  - layout
  - container
category: Structure
---

# Card

Cards are used to group similar concepts and tasks together to make Shopify
easier for merchants to scan, read, and get thing done.

**Problem**

Merchants may be feeling overwhelmed by too much information or too many
different tasks.

**Solution**

Grouping tasks and concepts into digestible sections using cards helps
merchants complete their tasks faster.

> **Not what you’re looking for?**
>* To create page-level layout, [use the layout component](/components/structure/layout).
>* To highlight a Shopify feature, [use the callout card component](/components/structure/callout-card).

---

## Best practices

Cards should:

* Use headings that set clear expectations about the card’s purpose
* Prioritize information so the content the merchant most needs to know comes
first
* Stick to single user flows or break more complicated flows into multiple
sections
* Avoid too many call-to-action buttons or links and only one primary call to
action per card
* Use calls to action on the bottom of the card for next steps and use the
space in the upper right corner of the card for persistent, optional actions
(e.g. an Edit link)


---

## Content guidelines

### Heading

Headings should be:

* Descriptive: Help merchants understand what they’ll find in the card
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep headings to single sentence and avoid using punctuation such as
periods, commas, or semicolons
  * Where possible, avoid articles (the, a, an) to keep content short and
actionable
  * Written in sentence case
  * Informative: They should label the type of content grouped in the body
content below

<!-- usagelist -->
#### Do
Online store dashboard

#### Don't
This is your online store dashboard
<!-- end -->

### Body content

Body content should be:

* Actionable: start sentences with imperative verbs when telling a merchant what
actions are available to them (especially something new). Don’t use permissive
language like “you can”.

<!-- usagelist -->
#### Do
Get performance for all your sales channels.

#### Don't
Now you can get performance data for all your sales channels.
<!-- end -->

* Structured for merchant success: always put the most critical information
first.
* Clear: use the verb “need” to help merchants understand when they’re required
to do something.


<!-- usagelist -->
#### Do
To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don't
To buy a shipping label, you must enter the total weight of your shipment,
including packaging.
<!-- end -->

### Call-to-action button

Buttons should be:

* Clear and predictable: merchants should be able to anticipate what will happen
when they click a button. Never deceive a merchant by mislabeling a button.

<!-- usagelist -->
#### Do
Create order
Buy shipping label

#### Don't
New order
Buy
<!-- end -->

Action-led: buttons should always lead with a strong verb that encourages
action. To provide enough context to merchants use the {verb}+{noun} format on
buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->
#### Do
Activate Apple Pay
View shipping settings

#### Don't
Try Apple Pay
View your settings
<!-- end -->

Scannable: Avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->
#### Do
Add menu item

#### Don't
Add a menu item
<!-- end -->

### Section titles

Section titles should be:

* Informative: they should label the type of content grouped in the body
content below
* Like headings: follow the same content guidelines as when you’re writing
headings


### Action links

Links should be:

* Used for secondary or persistent actions: links should be used to represent
lower priority actions than buttons, or persistent actions that a merchant may
take at any time (e.g. a persistent Edit link).
* Clearly labeled: merchants should not need to guess where they’ll end up if
they click on an action link. Never use “click here” as a link because it
doesn’t set expectations about what’s next.
* Similar to buttons: Follow the same content guidelines as when you’re writing
text for buttons.


| Prop | Type | Description |
| ---- | ---- | ----------- |
| title | string | Title content for the card |
| children | React.ReactNode | Inner content of the card |
| subdued | boolean | A less prominent card |
| sectioned | boolean | Auto wrap content in section |
| actions | Action[] | Card header actions |
| primaryFooterAction | Action | Primary action in the card footer |
| secondaryFooterAction | Action | Secondary action in the card footer |

## Examples

### Default card

Use when you have a simple message to communicate to merchants that doesn’t require any secondary steps.

```jsx
<Card title="Online Store dashboard" sectioned>
  <p>View a summary of your Online Store’s performance.</p>
</Card>
```

### Card with call to action in the the footer

Use when you have a simple message to communicate to merchants that requires them to take an action. Put a call-to-action in the footer when you need merchants to read the content in the card before taking the action.

```jsx
<Card
  title="Online Store dashboard"
  primaryFooterAction={{content: 'View dashboard'}}
>
  <Card.Section>
    <p>View a summary of your Online Store’s performance.</p>
  </Card.Section>
</Card>
```

### Card with call to action in the heading

Use when there’s a persistent action available to merchants (example: an Edit link), or when you want to provide them with a way to navigate to another section of Shopify.

```jsx
<Card title="Online Store dashboard" actions={[{content: 'Edit'}]}>
  <Card.Section>
    <p>View a summary of your Online Store’s performance.</p>
  </Card.Section>
</Card>
```

### Card with an action menu in the heading

Use if there are multiple optional actions a merchant can take on the information in the card. Clicking on the link will open a popover that contains a menu of actions.

```jsx
<Card title="Online Store dashboard" actions={[{content: 'Edit'}]}>
  <Card.Section>
    <p>View a summary of your Online Store’s performance.</p>
  </Card.Section>
</Card>
```

### Card with multiple sections

Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.

```jsx
<Card title="Online Store dashboard">
  <Card.Section>
    <p>View a summary of your Online Store’s performance.</p>
  </Card.Section>

  <Card.Section>
    <p>View a summary of your Online Store’s performance, including sales, visitors, top products, and referrals.</p>
  </Card.Section>
</Card>
```

### Card with multiple titled sections

Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.

```jsx
<Card title="Online Store dashboard">
  <Card.Section title="Reports">
    <p>View a summary of your Online Store’s performance.</p>
  </Card.Section>

  <Card.Section title="Summary">
    <p>View a summary of your Online Store’s performance, including sales, visitors, top products, and referrals.</p>
  </Card.Section>
</Card>
```

### Card with a subdued section

Use to indicate when one of the sections in your card contains inactive or disabled content.

```jsx
<Card title="Staff accounts">
  <Card.Section>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>

  <Card.Section subdued title="Deactivated staff accounts">
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>
</Card>
```

### Subdued card for secondary content

Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.

```jsx
<Card title="Deactivated staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```
