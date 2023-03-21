---
title: Accessibility
description: Making commerce better for everyone means caring deeply about making quality products. A quality product should have a fantastic user experience (UX).
icon: AccessibilityMajor
keywords:
  - a11y
  - universal design
  - inclusive
  - inclusivity
  - disability
  - disabilities
  - people with disabilities
  - persons with disabilities
  - accessible markup
  - accessible mark up
  - accessible code
  - accessible
  - diversity
  - diverse
---

This includes:

- A beautiful and functional design
- Consistent and useful [copy](/content/product-content)
- Principles of
  [universal design](https://en.wikipedia.org/wiki/Universal_design) and inclusivity

---

## Usable for everyone

It’s important that Shopify products—and [Partner](https://www.shopify.ca/partners) products—are usable and useful to everyone.

Everyone is a pretty big group. It includes our merchants, their customers, our developer partners, our employees, and the greater tech community at large. That also includes all members of our community who have disabilities.

Disabilities may affect how people move, see, hear, communicate, learn, understand, and process information.
As a result, it’s important to consider how to design and develop your product to support a wide range of needs and experiences.

In the United States, as many as 1 in 4 adults has at least 1 disability [Source: [CDC](https://www.cdc.gov/media/releases/2018/p0816-disability.html)]. In Canada, the estimate is 22%, and elsewhere in the world the estimate is closer to 1 in 7 [Source: [Statistics Canada](https://www150.statcan.gc.ca/n1/pub/11-627-m/11-627-m2018035-eng.htm), [World Bank](https://www.worldbank.org/en/topic/disability)].

---

## Building inclusive experiences

Using our [components](/components) is a way to improve accessibility and consistency when building products for Shopify.

- The component library in this style guide includes code we can use across applications
- This component code includes accessible markup
- Since the code exists in a single component that gets reused, it’s easier to update and fix any bugs

The build-it-once, use-it-everywhere model means the accessibility knowledge of the designers and developers who build these components is available to all of Shopify and our partners. Because of this, merchants get a consistent experience that can be leveraged into accessible products.

Many accessibility features come free in the components. But, it’s important to make sure that components are integrated in a way that doesn't create unforeseen accessibility barriers. Depending how components are used, there may be more design and implementation considerations. Be sure to test user task flows post integration.

### Managing focus to support merchant workflows

Don’t programmatically move focus to new content without merchant input. Polaris components that use controls to display overlays, such as modals and popovers, manage focus automatically.

<DoDont>
<Do>

- When a merchant activates a link that goes elsewhere in the page, move focus to that content
- When a merchant must access an overlay, move focus to it
- When a merchant submits a form that results in an error, move focus to the error message

</Do>
<Dont>

- Move focus when content updates in the background
- Move focus when the user is actively working elsewhere on the page

</Dont>
</DoDont>

The only case where focus should be managed without the merchant’s okay is when the merchant needs to be interrupted because they cannot continue their current workflow.

### Limiting non-standard interactions

Merchants will expect to interact with controls and content in ways that follow the defaults for their browser, platform, and assistive technologies. Introducing non-standard features can give merchants better ways of accomplishing tasks, but they can also create barriers.

For example, merchants who rely on the keyboard will expect that buttons can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key. If buttons are programmed to be used with different keys, merchants will need to be instructed on how to use them.

Before designing or building custom features that use non-standard controls or interactions, first consider whether the goal can be met using native features.

If non-standard interactions _are_ required:

- Carefully follow guidelines and best practices for designing, building, and testing custom features on your platform
- Give merchants clear instructions for using the custom feature
- Provide an additional, standard way to accomplish the task

### Assistive technology support

Our components are tested for accessibility with automated and manual techniques. Merchants should expect to be able to access features built with our components using modern assistive technologies. These include native and third-party tools like:

- Screen readers
- Speech recognition programs
- Supports for low vision and color blindness
- Alternative keyboards
- Switch devices
- Tools for readability

### Coding standards

Polaris components start with web standards for HTML, CSS, and JavaScript. Features from the Accessible Rich Internet Applications (WAI-ARIA or ARIA) specification are used to build functionality that is not available in native HTML.

### Alternative text

To help people who rely on assistive technologies, such as a screen reader or other text to speech programs, our components use [alternative text](/content/alternative-text) for icons and images used to convey information and actions (like buttons and links).

### Meeting the Web Content Accessibility Guidelines (WCAG)

Polaris targets WCAG 2.1 Level A and Level AA success criteria, and seeks to provide a highly usable experience for everyone.

For more information, see the following resources:

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/)
- [Shopify's statement of commitment to accessibility](https://www.shopify.com/accessibility)

### Feedback

Sometimes, building accessible and inclusive experiences can be difficult. If we’ve made any mistakes in this style guide, please
[reach out by creating a GitHub issue](https://github.com/Shopify/polaris-react/issues) and help us make it better.
