---
name: Banner
category: Feedback indicators
keywords:
  - inform
  - update
  - changes
  - conditions
  - dismissable banners
  - banner with footer call-to-action
  - banner with footer button
  - banner with button
  - informational banners
  - success banners
  - warning banners
  - critical banners
  - banner width
  - banner headings
  - banner content
  - banner buttons
  - banner links
  - banner body content
  - banner text
  - banner body text
  - full-width alert
---

# Banner

Banners are used to inform merchants about important changes or persistent
conditions. They’re one of the most prominent ways to communicate to merchants.
Banners show at the top of the page or section they apply to.

---

## Best practices

Banners should:

* Be placed in the appropriate context:
  * Banners relevant to an entire page should show at the top of that page at
    full-width
  * Banners related to a specific section or element of a page (such as a card,
    popover, or modal) should show inside of that element
* Focus on a single theme, piece of information, or required action to avoid
  overwhelming merchants
* Be dismissible unless they contain critical information or an important step
  a merchant needs to take
* Be concise and scannable—merchants shouldn’t need to spend a lot of time
  figuring out what they need to know and do
* Be limited to a few important calls to action with no more than one primary
  action
* Be used thoughtfully and sparingly for only the most important information
* Not be used as the primary entry point or mechanism to access information or
  actions a merchant needs to take on a regular basis
* Not be used for marketing information or upsell—[use callout cards](/components/structure/callout-card) instead

---

## Content guidelines

### Headings

Banner headings should be:

* Descriptive: help merchants understand what they’ll find in the card.
  * Communicate when a situation is serious enough to warrant using a critical or
    warning banner. People who are unable to see the color of the banner need to
    clearly understand the importance of the situation without the benefit of
    seeing the color of the banner. Learn more about [accessibility](/guides/accessibility).

<!-- usagelist -->

#### Do

You’ve received a chargeback

#### Don’t

Have a look at this

<!-- end -->

* Concise and scannable:

  * Use simple, clear language that can be read at a glance
  * Keep headings to a single sentence and avoid using punctuation such as
    periods, commas, or semicolons
  * Where possible, avoid articles (the, a, an) to keep content short and
    actionable

* Informative:
  * Label the type of information in the body content
  * Sentence case: capitalize only the first word in the heading and proper
    nouns

<!-- usagelist -->

#### Do

Order archived

#### Don’t

Your Order was Archived Today

<!-- end -->

### Body content

Body content should:

* Be concise: keep content to 1 to 2 sentences where possible
* Clarify the benefit of the main task
* Be written in sentence case and use appropriate punctuation
* Avoid repeating the heading
* Explain how to resolve the issue, particularly for warning and critical
  banners

<!-- usagelist -->

#### Do

Your online store has a maximum of 20 themes. Delete unused themes to add more.

#### Don’t

You have reached your theme limit. Your online store has reached its maximum
of 20 themes. To add more themes, delete themes you’re no longer using.

<!-- end -->

### Button and links

Buttons and links should be:

* Clear and predictable: merchants should be able to anticipate what will
  happen when they click a button. Never deceive a merchant by mislabeling a
  button.

<!-- usagelist -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

* Action-led: buttons should always lead with a strong verb that encourages
  action. To provide enough context to merchants use the {verb}+{noun} format on
  buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

Activate Apple Pay

#### Don’t

Try Apple Pay

<!-- end -->

* Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

Link text should:

* Set the expectation of where the merchant will be taken

<!-- usagelist -->

#### Do

Order #001

#### Don’t

Order

<!-- end -->

* Use consistent content to label navigation. For example, if a navigational
  link leads to a page called Orders, label the link Orders.

<!-- usagelist -->

#### Do

Payments

#### Don’t

Finance section

<!-- end -->

### Secondary body content

Body content should be:

* Actionable: start sentences with imperative verbs when telling a merchant
  what actions are available to them (especially something new). Don’t use
  permissive language like “you can”.

<!-- usagelist -->

#### Do

Get performance data for all your sales channels.

#### Don’t

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

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

## Examples

### Default banners

Use to convey general information or actions that aren’t critical. For example, you might show a banner that asks for merchant feedback. Default banners contain lower priority information and should always be dismissible.

```jsx
<Banner title="Order archived">
  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
</Banner>
```

### Dismissible banner

Make all banners dismissible, unless they contain critical information or an important action that a merchant is required to take.

```jsx
<Banner onDismiss={() => {}}>
  <p>
    Use your finance report to get detailed information about your business.{' '}
    <Link url="">Let us know what you think.</Link>
  </p>
</Banner>
```

### Banner with footer call-to-action

Use when you want merchants to take an action after reading the banner.

```jsx
<Banner
  title="Some of your product variants are missing weights"
  status="warning"
  action={{content: 'Edit variant weights'}}
>
  <p>
    Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.
  </p>
</Banner>
```

### Informational banners

Use to update merchants about a change or give them advice.

```jsx
<Banner
  title="USPS has updated their rates"
  action={{content: 'Learn more'}}
  status="info"
>
  <p>Make sure you know how these changes affect your store.</p>
</Banner>
```

### Success banner

Use to inform merchants when actions are successfully completed. Include next steps if applicable. If the feedback is delayed, persistent or has a call to action, use this banner.

```jsx
<Banner
  title="Your shipping label is ready to print."
  status="success"
  action={{content: 'Print label'}}
/>
```

### Warning banners

Use to display information that needs attention or that the merchant needs to take action on. Seeing these banners can be stressful for merchants so be cautious about using them.

```jsx
<Banner
  title="Before you can purchase a shipping label, this change needs to be made:"
  action={{content: 'Edit address'}}
  status="warning"
>
  <List>
    <List.Item>
      The name of the city you’re shipping to has characters that aren’t
      allowed. City name can only include spaces and hyphens.
    </List.Item>
  </List>
</Banner>
```

### Critical banners

Use to communicate problems that have to be resolved immediately for merchants to complete a task, or for the highest priority issues such as orders with high fraud risk. Seeing these banners can be stressful for merchants so be cautious about using them.

```jsx
<Banner
  title="High risk of fraud detected"
  action={{content: 'Review risk analysis'}}
  status="critical"
>
  <p>
    Before fulfilling this order or capturing payment, please{' '}
    <Link url="">review the Risk Analysis</Link> and determine if this order is
    fraudulent.
  </p>
</Banner>
```

---

## Related components

* To inform merchants about a new feature or opportunity, [use callout cards](/components/structure/callout-card)
* To group similar concepts together in the interface, [use a card](/components/structure/card)
