---
name: Scrollable
tags:
  - long form
  - text container
  - terms of service
category: Behavior
---

# Scrollable
The scrollable component is a container for long form content, such as terms of service, that allows for scrolling so merchants can expose more text as they read.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

**Problem**

Legal disclaimers such as terms of service can be long and unwieldy. Exposing
the full text in an interface could feel overwhelming and take up a lot of
space.

**Solution**

Scrollable containers hold longer form text and let merchants scroll as they
read to expose more information when they’re ready to see it.

---

## Best practices
Scrollable containers should:

* Be used when it’s helpful to provide an extra visual cue to let merchants
know that content exists below or above the fold
* Only be used for length text such as terms of service or other legal
disclaimers and never for instructional or action-oriented text

---

## Content guidelines
Scrollable containers are cards with scrolling functionality.

### Heading

Headings should be:

* Informative and descriptive: they should label the type of content grouped in
the card.
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep headings to single sentence and avoid using punctuation such as
  periods, commas, or  semicolons
  * Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#headings-and-subheadings) to keep content short and actionable
  * Write in sentence case (first word capitalized, the rest is lowercase)

<!-- usagelist -->
#### Do
Online store dashboard

#### Don’t
This is your online store dashboard
<!-- end -->

### Body content

Body content should be:

* Actionable: start sentences with imperative verbs when telling a merchant
what actions are available to them (especially something new). Don’t use
permissive language like “you can”.

<!-- usagelist -->
#### Do
You need to accept the terms and conditions to continue.

#### Don’t
Now you can accept the terms and conditions.
<!-- end -->

* Structured for merchant success: Always put the most critical information
first.
* Clear: use the verb “need” to help merchants understand when they’re
required to do something.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | React.ReactNode | Content to display in scrollable area |
| vertical | boolean | Scroll content vertically |
| horizontal | boolean | Scroll content horizontally |
| shadow | boolean | Add a shadow when content is scrollable |
| nodeRef | function(node: HTMLElement) | Callback that passes a reference to the scrollable node |

## Examples

### Default scrollable container

Use when you need to make a region within the page independently scrollable. It’s often used in modals and other panes where it’s helpful to provide an extra visual cue that content exists below or above the fold.

```jsx
<Card title="Terms of service" sectioned>
  <Scrollable shadow style={{height: '100px'}}>
  	<p>By signing up for the Shopify service (“Service”) or any of the services of Shopify Inc. (“Shopify”) you are agreeing to be bound by the following terms and conditions (“Terms of Service”). The Services offered by Shopify under the Terms of Service include various products and services to help you create and manage a retail store, whether an online store (“Online Services”), a physical retail store (“POS Services”), or both. Any new features or tools which are added to the current Service shall be also subject to the Terms of Service. You can review the current version of the Terms of Service at any time at https://www.shopify.com/legal/terms. Shopify reserves the right to update and change the Terms of Service by posting updates and changes to the Shopify website. You are advised to check the Terms of Service from time to time for any updates or changes that may impact you.</p>
  </Scrollable>
</Card>
```

---

## Related components

* To put long sections of information under a block that can be expanded or collapsed by the merchant, [use the collapsible component](/components/collapsible)
