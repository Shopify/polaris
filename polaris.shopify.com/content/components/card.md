---
name: Card
category: Structure
platforms:
  - android
  - ios
  - web
keywords:
  - layout
  - container
  - box
  - grid
  - panel
  - card with call to action in the footer
  - card with call to action in the heading
  - card with call to action in a section
  - card with button in the footer
  - card with button in the heading
  - card with multiple sections
  - card with subsections
  - sectioned card
  - card with a subdued section
  - subdued card for secondary content
  - callout
  - call out
examples:
  - fileName: card-default.tsx
    title: Default card
    description: >-
      Use when you have a simple message to communicate to merchants that
      doesn’t require any secondary steps.
  - fileName: card-with-header-actions.tsx
    title: Card with header actions
    description: >-
      Use for less important card actions, or actions merchants may do before
      reviewing the contents of the card. For example, merchants may want to add
      items to a card containing a long list, or enter a customer’s new
      address.Use for less important card actions, or actions merchants may do
      before reviewing the contents of the card.Use an icon for the action, if
      possibleInclude no more than 2 actions
  - fileName: card-with-footer-actions.tsx
    title: Card with footer actions
    description: >-
      Use footer actions for a card’s most important actions, or actions
      merchants should do after reviewing the contents of the card.Use buttons
      with labelsIf you have more than 2 actions, consider using an overflow
      menu on the card
  - fileName: card-with-multiple-footer-actions.tsx
    title: Card with multiple footer actions
  - fileName: card-with-custom-footer-actions.tsx
    title: Card with custom footer actions
    description: >-
      Use to present actionable content that is optional or not the primary
      purpose of the page.
  - fileName: card-with-destructive-footer-action.tsx
    title: Card with destructive footer action
    description: >-
      Use when a card action will delete merchant data or be otherwise difficult
      to recover from.
  - fileName: card-with-multiple-sections.tsx
    title: Card with multiple sections
    description: >-
      Use when you have two related but distinct pieces of information to
      communicate to merchants. Multiple sections can help break up complicated
      concepts to make them easier to scan and understand.
  - fileName: card-with-multiple-titled-sections.tsx
    title: Card with multiple titled sections
    description: >-
      Use when you have two related but distinct pieces of information to
      communicate to merchants that are complex enough to require a title to
      introduce them.
  - fileName: card-section-with-action.tsx
    title: Card section with action
    description: Use when your card section has actions that apply only to that section.
  - fileName: card-with-subsection.tsx
    title: Card with subsection
    description: Use when your card sections need further categorization.
  - fileName: card-section-with-destructive-action.tsx
    title: Card section with destructive action
    description: >-
      Use when a card action applies only to one section and will delete
      merchant data or be otherwise difficult to recover from.
  - fileName: card-with-a-subdued-section.tsx
    title: Card with a subdued section
    description: >-
      Use to indicate when one of the sections in your card contains inactive or
      disabled content.
  - fileName: card-subdued-for-secondary-content.tsx
    title: Subdued card for secondary content
    description: >-
      Use for content that you want to deprioritize. Subdued cards don’t stand
      out as much as cards with white backgrounds so don’t use them for
      information or actions that are critical to merchants.
  - fileName: card-with-separate-header.tsx
    title: Card with separate header
    description: Use to be able to use custom React elements as header content.
  - fileName: card-section-with-custom-react-node-title.tsx
    title: Card section with custom React Node title
    description: >-
      Use to render custom content such as icons, links, or buttons in a card
      section’s header.
  - fileName: card-with-all-of-its-elements.tsx
    title: Card with all of its elements
    description: Use as a broad example that includes most props available to card.
  - fileName: card-with-flushed-sections.tsx
    title: Card with flushed sections
    description: Use when you need further control over the spacing of your card sections.
---

# Card

Cards are used to group similar concepts and tasks together to make Shopify
easier for merchants to scan, read, and get things done.

---

## Best practices

Cards should:

- Use headings that set clear expectations about the card’s purpose
- Prioritize information so the content merchants most need to know comes
  first
- Stick to single user flows or break more complicated flows into multiple
  sections
- Avoid too many call-to-action buttons or links and only one primary call to
  action per card
- Use calls to action on the bottom of the card for next steps and use the
  space in the upper right corner of the card for persistent, optional actions
  (such as an Edit link)

---

## Content guidelines

### Title

Card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what
  actions are available to them (especially something new). Don’t use permissive
  language like “you can”.

<!-- usagelist -->

#### Do

Get performance for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information
  first.
- Clear: use the verb “need” to help merchants understand when they’re required
  to do something.

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

### Call-to-action button

Buttons should be:

- Clear and predictable: merchants should be able to anticipate what will happen
  when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

Action-led: buttons should always lead with a strong verb that encourages
action. To provide enough context to merchants use the {verb}+{noun} format on
buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

Scannable: Avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

### Section titles

Section titles should be:

- Informative: they should label the type of content grouped in the body
  content below
- Like headings: follow the same content guidelines as when you’re writing
  headings

### Action links

Links should be:

- Used for secondary or persistent actions: links should be used to represent
  lower priority actions than buttons, or persistent actions that merchants may
  take at any time (such as a persistent Edit link).
- Clearly labeled: merchants should not need to guess where they’ll end up if
  they click on an action link. Never use “click here” as a link because it
  doesn’t set expectations about what’s next.
- Similar to buttons: Follow the same content guidelines as when you’re writing
  text for buttons.

---

## Related components

- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/structure/layout)
- To highlight a Shopify feature, [use the callout card component](https://polaris.shopify.com/components/structure/callout-card)

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

The required `title` prop gives the card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

If you use the `subdued` prop on a card or section, make sure that the card or section `title` conveys the reason for using `subdued`. This ensures that merchants with low vision, including those who use screen readers, can identify that the content is inactive or less important.

<!-- usageblock -->

#### Do

```
<Card title="Deactivated staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```

#### Don’t

```
<Card title="Staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```

<!-- end -->

<!-- /content-for -->
