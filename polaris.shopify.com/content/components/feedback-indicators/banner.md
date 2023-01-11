---
title: Banner
description: Informs merchants about important changes or persistent conditions. Use this component if you need to communicate to merchants in a prominent way. Banners are placed at the top of the page or section they apply to, and below the page or section header.
category: Feedback indicators
keywords:
  - inform
  - update
  - changes
  - conditions
  - dismissible banners
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
examples:
  - fileName: banner-default.tsx
    title: Default
    description: Use to convey general information or actions that aren’t critical. For example, you might show a banner that asks for merchant feedback. Default banners contain lower priority information and should always be dismissible.
  - fileName: banner-dismissible.tsx
    title: Dismissible
    description: Make all banners dismissible, unless they contain critical information or an important action that merchants are required to take.
  - fileName: banner-with-footer-call-to-action.tsx
    title: With footer call-to-action
    description: Use when you want merchants to take an action after reading the banner.
  - fileName: banner-informational.tsx
    title: Informational
    description: Use to update merchants about a change or give them advice.
  - fileName: banner-success.tsx
    title: Success
    description: Default to using toasts for success messages, unless the feedback is delayed, persistent, or has a call to action. Include next steps if applicable.
  - fileName: banner-warning.tsx
    title: Warning
    description: Use to display information that needs attention or that merchants need to take action on. Seeing these banners can be stressful for merchants so be cautious about using them.
  - fileName: banner-critical.tsx
    title: Critical
    description: Use to communicate problems that have to be resolved immediately for merchants to complete a task. For example, you will show this banner for orders with high fraud risk. Seeing these banners can be stressful for merchants so be cautious about using them.
  - fileName: banner-in-a-modal.tsx
    title: In a modal
    description: Banners inside of modals render with less spacing and a pared-back design to fit within a content context.
  - fileName: banner-with-focus.tsx
    title: With focus
    description: Banner can programmatically receive focus. Use this functionality to draw the merchant’s attention to the banner.
  - fileName: banner-in-a-card.tsx
    title: In a card
    description: Banners inside of cards render with less spacing and a pared-back design to fit within a content context.
---

## Best practices

Banners should:

- Be used thoughtfully and sparingly for only the most important information.
- Not be used to call attention to what a merchant needs to do in the UI instead of making the action clear in the UI itself.
- Not be the primary entry point to information or actions merchants need on a regular basis.
- Be dismissible unless they contain critical information or an important step merchants need to take.
- Use the default icon for `success`, `info`, `warning` and `critical` statuses. If the icon is changed, use only [major, duotone icons](https://polaris.shopify.com/design/icons#using-icons-in-your-designs).

### Placement

Banners should be placed in the appropriate context:

- Banners relevant to an entire page should be placed at the top of that page, below the page header. They should occupy the full width of the content area.
- Banners related to a section of a page (like a card, popover, or modal) should be placed inside that section, below any section heading. These banners have less spacing and a pared-back design to fit within a content context.
- Banners related to an element more specific that a section should be placed immediately above or below that element.

---

## Content guidelines

Banners should:

- Focus on a single theme, piece of information, or required action to avoid overwhelming merchants.
- Be concise and scannable—merchants shouldn’t need to spend a lot of time figuring out what they need to know and do.
- Be limited to a few important calls to action with no more than one primary action.
- Not be used for marketing information or upsell—[use callout cards](https://polaris.shopify.com/components/callout-card) instead.

To learn about writing helpful and accessible error message text, see the guidelines for [error messages](https://polaris.shopify.com/patterns/error-messages).

### Title

Banner titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

### Body content

Body content should:

- Be concise: keep content to 1 to 2 sentences where possible
- Clarify the benefit of the main task
- Be written in sentence case and use appropriate punctuation
- Avoid repeating the heading
- Explain how to resolve the issue, particularly for warning and critical banners

<!-- dodont -->

#### Do

Your online store has a maximum of 20 themes. Delete unused themes to add more.

#### Don’t

You have reached your theme limit. Your online store has reached its maximum of 20 themes. To add more themes, delete themes you’re no longer using.

<!-- end -->

### Button and links

Buttons and links should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- dodont -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- dodont -->

#### Do

Activate Apple Pay

#### Don’t

Try Apple Pay

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- dodont -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

Link text should:

- Set the expectation of where merchants will be taken

<!-- dodont -->

#### Do

Order #001

#### Don’t

Order

<!-- end -->

- Use consistent content to label navigation. For example, if a navigational link leads to a page called Orders, label the link Orders.

<!-- dodont -->

#### Do

Payments

#### Don’t

Finance section

<!-- end -->

### Secondary body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.

<!-- dodont -->

#### Do

Get performance data for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- dodont -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

---

## Related components

- To inform merchants about a new feature or opportunity, [use callout cards](https://polaris.shopify.com/components/callout-card)
- To group similar concepts together in the interface, [use a card](https://polaris.shopify.com/components/card)

---

## Accessibility

Banners provide context and assist workflows for merchants with disabilities.

- Critical and warning banners have a `role=”alert”` and are announced by assistive technologies when they appear.
- All other banners have a `role=”status”` and are read after any critical announcements.
- All banners have an `aria-live` attribute and are announced by assistive technologies when their content is updated. These announcements can be disabled by using the prop `stopAnnouncements`.
- Banners use `aria-describedby` to describe their purpose to assistive technologies when they’re announced or receive focus. If a banner has a `title`, then the title content is used for the `aria-describedby`. If the banner doesn’t have a `title`, then all of the banner content is used for the `aria-describedby`.
- Banner containers have a `tabindex=”0”` and display a visible keyboard focus indicator. Because of this, merchants can discover banners while tabbing through forms or other interactions, and developers can programmatically move focus to banners.
- Banners use a combination of [icons](https://polaris.shopify.com/design/icons) and [colors](https://polaris.shopify.com/design/colors) to show their meaning and level of importance to merchants.

### Error notifications in forms

#### Critical banners

When merchants submit long or complex forms with errors, use a critical banner to summarize what went wrong. Place the banner at the top of the form and move focus to the banner when the form is submitted. This allows all merchants to move through the form in a logical order to correct the issues.

#### Inline errors

Always include [inline error](https://polaris.shopify.com/components/inline-error) messages for specific form fields so that merchants know what to do in context as they correct their mistakes.

To learn about creating helpful and accessible error message text, see the guidelines for [error messages](https://polaris.shopify.com/patterns/error-messages).

<!-- dodont -->

#### Do

- Put banners close in context to the problem they’re referring to
- Give banners with a lot of information a clear title that summarizes their content
- Move focus to banners if they’re relevant to the merchant’s current workflow and need to be addressed immediately

#### Don’t

- Move focus to banners if they appear on page load, or outside the merchant’s current workflow
- Use warning or critical (`role=”alert”`) banners to convey information that the merchant doesn’t need to address immediately

<!-- end -->
