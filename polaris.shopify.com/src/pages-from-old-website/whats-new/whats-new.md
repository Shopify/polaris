---
name: What’s new?/What’s new?
slug: whats-new
icon: IconConfetti
keywords:
  - release notes
  - updates
---

# What’s new?

The latest news, updates, and changes to the Polaris design system.

For the latest component changes, read the
[Polaris React release notes](https://github.com/Shopify/polaris-react/releases).

---

## March 2022

### Content and guidelines

- Added [Tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens) guidelines with a new context video.
- Added [All tokens](https://polaris.shopify.com/tokens/all-tokens#navigation) section under the Tokens page.
- Renamed Experiences page to [Patterns](https://polaris.shopify.com/patterns/layout).

---

## February 2022

### Polaris React v9.0.0

Polaris React v9.0.0 is a major release that introduces breaking changes, primarily due to removing Sass functions and mixins and replacing the ThemeProvider with a simple CustomProperties component.

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0) for more information.

For instructions on updating from v8 to v9, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v8-to-v9.md).

---

## January 2022

### Polaris React v8.0.0

Polaris React v8.0.0 is a major release that introduces breaking changes, primarily due to build changes to the required node version and root font size.

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v8.0.0) for more information.

For instructions on updating from v7 to v8, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v7-to-v8.md).

---

## September 2021

### Polaris React v7.0.0

Polaris React v7.0.0 is a major release that introduces breaking changes, primarily due to build changes to add dual support for React 16 and 17 and updates to the Autocomplete component.

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v7.0.0) for more information.

For instructions on updating from v6 to v7, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v6-to-v7.md).

---

## July 2021

- Added text field guidelines to the admin experience

---

## June 2021

- Removed deprecated Sketch design resources
- Removed the Chat bots and messaging platforms from Conversational experiences.

---

## February 2021

- Added [“Command-line interfaces”](https://polaris.shopify.com/experiences/command-line-interfaces) section under Experiences

---

## January 2021

### Polaris React v6.0.0

Polaris React v6.0.0 is a major release that introduces breaking changes, primarily due to the new visual style.

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v6.0.0) for more information.

For instructions on updating from v5 to v6, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v5-to-v6.md).

---

## September 2020

- Added [“Billing”](https://polaris.shopify.com/experiences/billing) section under Experiences

---

## August 2020

### Polaris Internationalization Foundations 2.0

- Updated the [Internationalization guidelines](/foundations/internationalization#navigation) with our latest best practices, more details, and better examples
- Added [App Release Notes](/content/app-release-notes) content guidelines

---

## July 2020

### Polaris React v5.0.0

Polaris React v5.0.0 is a major release that introduces breaking changes, primarily due to removing integrated App Bridge support as consumers using App Bridge should use the [@shopify/app-bridge-react package](https://shopify.dev/tools/app-bridge/react-components).

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v5.0.0) for more information.

For instructions on updating from v4 to v5, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v4-to-v5.md).

---

## June 2020

- Added [information architecture principles](/foundations/information-architecture) to the foundations section

---

## April 2020

- Updated the [font stack](https://polaris.shopify.com/design/typography#section-font-stack) to prioritize Segoe UI over Roboto
- Removed links to the Polaris Telescope Sketch plugin, as Shopify has switched to Figma (for reference, you can find the [source code on GitHub](https://github.com/shopify/polaris-telescope))

---

## March 2020

- Added [“Selling in person”](https://polaris.shopify.com/experiences/selling-in-person) section under Experiences

---

## February 2020

- Added definition for the term “Customers” to the Vocabulary page

---

## January 2020

- Deactivated inline editing within the code block on a component page

---

## December 2019

- Updated the information architecture by breaking up the Patterns and guides section into two sections: Foundations and Experiences. High-level guidelines applicable to all Shopify experiences were migrated to the Foundations section. Specific guidance for Shopify experiences, like the Shopify admin, are located in the Experiences section. This will allow for the future contribution of documentation for areas other than the admin, and help people form mental models around the different types of patterns and guides documentation in the style guide.
- Added [Merchant to customer content guidelines](https://polaris.shopify.com/content/merchant-to-customer).
- Added guidelines for [formatting localized currencies](https://polaris.shopify.com/foundations/formatting-localized-currency) in the Patterns and guides section.

---

## November 2019

- Reordered the [Content section](/content/voice-and-tone) to prepare for some information architecture changes and additions.

---

## October 2019

- The [Sketch UI kit](https://polaris.shopify.com/downloads/Sketch.UI.Kit.zip), [illustrations](https://polaris.shopify.com/downloads/Illustrations.zip) and [Sass files zip bundle](https://polaris.shopify.com/downloads/Sass.zip), which used to be hosted on the [Shopify/polaris-react releases page](https://github.com/Shopify/polaris-react/releases), are now hosted on this website.

---

## September 2019

### Content and guidelines

- Added [directional language guidelines](https://polaris.shopify.com/content/actionable-language#section-directional-language) to the Actionable language section.

### Components

- Released [ResourceItem](/components/lists-and-tables/resource-item) as its own component with Polaris React v4.1.0

---

## August 2019

### Polaris React v4.0.0

Polaris React v4.0.0 is a major release that introduces breaking changes, primarily due to updates made to component internals. This builds a stronger foundation that ensures readiness for future React performance improvements.

This release doesn’t include any new components, but it does update some components to use [React Hooks](https://reactjs.org/docs/hooks-intro.html). It also deletes several deprecated features and removes dependencies on legacy context and unsafe lifecycle methods. Thanks to these improvements, Polaris React is [React Strict Mode](https://reactjs.org/docs/strict-mode.html) compliant.

Read the [full release notes](https://github.com/Shopify/polaris-react/releases/tag/v4.0.0) for more information.

For instructions on updating from v3 to v4, read the [migration guide](https://github.com/Shopify/polaris-react/blob/main/documentation/guides/migrating-from-v3-to-v4.md).

### Website updates

- Added links to the GitHub source and ChromaUI example previews in component pages

### Content and guidelines

- Updated the principles page with our new [Shopify experience values](https://polaris.shopify.com/foundations/experience-values). These values help guide how we build experiences at Shopify.
- Added [In-card list](/patterns-and-guides/mobile-patterns#section-in-card-lists) to the Mobile Patterns section.

---

## July 2019

### Components

- Released [Filters](/components/lists-and-tables/filters) with Polaris React v3.19.0

---

## June 2019

### Content and guidelines

- Added conversational experiences guidelines to help you craft and deliver exceptional chat bot and messaging experiences.

### Tooling

- Launched [Polaris icons](https://polaris-icons.shopify.com), a collection of simple and informative icons that draw on the visual language of the Polaris design system. Use these icons in your projects or third-party apps to promote a consistent experience across the Shopify platform.

---

## April 2019

### Content and guidelines

- Added content guidelines for [home cards](/patterns-and-guides/home-cards)

---

## March 2019

### Content and guidelines

- Added new accessibility recommendations to the [banner](/components/feedback-indicators/banner), [inline error](/components/forms/inline-error), [loading](/components/feedback-indicators/loading), [toast](https://polaris.shopify.com/components/feedback-indicators/toast), [checkbox](https://polaris.shopify.com/components/forms/checkbox), [radio button](https://polaris.shopify.com/components/forms/radio-button), and [choice list](https://polaris.shopify.com/components/forms/choice-list) components
- Updated the accessibility recommendations for the [button](/components/actions/button) component
- Added guidelines for [designing onboarding flows](https://polaris.shopify.com/patterns-and-guides/designing-onboarding-flows) to the [Patterns and guides section](https://polaris.shopify.com/foundations/experience-values)

---

## February 2019

### Content and guidelines

- Added new accessibility recommendations to the [button](/components/actions/button), [link](/components/navigation/link), [text field](/components/forms/text-field), and [autocomplete](/components/forms/autocomplete) components
- Added [writing guidelines for confirmations](/content/actionable-language#section-confirmations) to the [Actionable language section](https://polaris.shopify.com/content/actionable-language)

### Components

- Released [Skeleton thumbnail](/components/feedback-indicators/skeleton-thumbnail) with Polaris React v3.8.0

---

## January 2019

### Content and guidelines

- Added new accessibility recommendations to the [data visualizations page](/design/data-visualizations)

---

## December 2018

### Content and guidelines

- The Patterns section and Guides section of the style guide were combined into one. See the combined [Patterns and guides section](/foundations/experience-values).

---

## November 2018

### Content and guidelines

- Polaris icons should be used purposefully. The updated [icons guidelines](/design/icons) include more detailed principles and guidelines with visual examples.

### v3.0.0

#### Components

The following components released with Polaris React v3.0.0:

- [Autocomplete](/components/forms/autocomplete)
- [Contextual save bar](/components/forms/contextual-save-bar)
- [Frame](/components/structure/frame)
- [Loading](/components/feedback-indicators/loading)
- [Toast](/components/feedback-indicators/toast)
- [Top bar](/components/structure/top-bar)

#### Embedded apps

- Updated Page, Modal, and Resource picker to use the new [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) (formerly EASDK).
- The new Toast and Loading components now also provide a wrapper around the Shopify App Bridge.
- Removed the embedded bundle, and there is no longer a distinction between embedded components and regular components. Just import the component needed and it will do the right thing based on its context.
- For more information see the [embedded apps documentation](https://github.com/Shopify/polaris-react/blob/main/documentation/Embedded%20apps.md) and [how to initialize the Shopify App Bridge](/components/structure/app-provider#initializing-the-shopify-app-bridge).

---

## October 2018

### Open development

- Polaris React now welcomes pull requests. See the [contribution guidelines](https://github.com/Shopify/polaris-react/blob/main/.github/CONTRIBUTING.md) for more information.

### License

- Updated the Polaris React license. The source code is now under a [custom license](https://github.com/Shopify/polaris-react/blob/main/LICENSE.md) based on MIT. The license restricts Polaris React usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- Added the [Polaris Design Guidelines License Agreement](/legal/license). The license restricts Polaris Design Guidelines usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications and embedded applications.

---

## September 2018

### Content and guidelines

- Using clear, consistent terminology in buttons helps merchants know what actions to take. The [actionable language guidelines](/content/actionable-language) explain what to label buttons for different states in web, iOS, and Android.

---

## August 2018

### Website updates

- Added new links to resources on the [homepage](/)
- [Component status](/components/component-status): added links to the GitHub issues related to components under consideration and in development
- Examples for iOS and Android are gradually being rolled out to components, starting with:
  - [Card](/components/structure/card)
  - [Radio button](/components/forms/radio-button)
  - [Banner](/components/feedback-indicators/banner)
  - [Button](/components/actions/button)
  - [Button group](/components/actions/button-group)
  - [Badge](/components/images-and-icons/badge)
  - [Caption](/components/titles-and-text/caption)
  - [Collapsible](/components/behavior/collapsible)
  - [Display text](/components/titles-and-text/display-text)
  - [Empty state](/components/structure/empty-state)
  - [Heading](/components/titles-and-text/heading)
  - [List](/components/lists-and-tables/list)
  - [Pagination](/components/navigation/pagination)
  - [Popover](/components/overlays/popover)
  - [Select](/components/forms/select)
  - [Subheading](/components/titles-and-text/subheading)
  - [Tabs](/components/navigation/tabs)
  - [Tag](/components/forms/tag)
  - [Text container](/components/titles-and-text/text-container)
  - [Text field](/components/forms/text-field)
  - [Text style](/components/titles-and-text/text-style)
  - [Thumbnail](/components/images-and-icons/thumbnail)

### Content and guidelines

- Error messages can be scary. The new [error message guidelines](/patterns-and-guides/error-messages) help make errors visible to merchants, easy to understand, and helpful.
- Apply consistent spacing to improve the quality of the user interface with the new [spacing guidelines](/design/spacing).
- [Type scale](/design/typography#section-type-scale): changed “Display regular” to “Display medium”.
- Struggling to come up with the right data viz? Take a look at the new “Five core traits” section in [data visualizations](/design/data-visualizations) to learn how to evaluate an effective viz.
- The new [Keyboard accessories](/components/forms/keyboard-accessories) page describes how to handle the keyboard on mobile devices.

### Components

- [Inline error](/components/forms/inline-error) is released with Polaris React v2.6.1.

---

## July 2018

### Content and guidelines

- Discover how sounds are used to enhance the overall experience of our product in the new [sounds section](/design/sounds)

### Components

- Released [option list](https://polaris.shopify.com/components/lists-and-tables/option-list) with Polaris React v2.3.0

---

## June 2018

### Website updates

- Added a [CodeSandbox](https://codesandbox.io/) integration on the component playground to make it easier to take code from the examples and continue prototyping with it in a React app.
- Scrolling should now feel more natural, and works a lot better on small screens.
- You can now search for terms such as “dropshipping” or “POS” to discover the meaning
  behind the vocabulary used at Shopify. Thanks to Lucas C. at Algolia for the help in
  making this happen.
- To improve the transparency of our roadmap, the [component status](https://polaris.shopify.com/components/component-status#navigation)
  page now features components in development and under consideration.
  It also shows a list of components that are _not_ planned.

### Components

- [Range slider](/components/forms/range-slider) is released with Polaris React v2.2.0

---

## May 2018

### Components

Polaris React v2.0.0. This is the first major version of Polaris React since
launch. Included in this release are:

- Several new components, including data table, drop zone, app provider, and
  modal
- Improved existing components, such as resource list, choice list, and
  cards
- A few breaking API changes

[Full v2.0.0 release notes](https://github.com/Shopify/polaris-react/releases)

### Sketch UI kit

We’ve also released a new version of the Sketch UI kit to reflect the new and
updated components. The new UI kit includes more Polaris icons, as well as new
layout templates for common page types. We’ve also revised how the kit is
organized, so it’s now easier to use as a
[Sketch library](https://sketchapp.com/docs/libraries/).

We’ll keep updating the UI kit to ensure that the components in Sketch match the
latest versions in React.

[Download UI Kit](https://polaris.shopify.com/downloads/Sketch.UI.Kit.zip)

### Content and guidelines

- Introduced the [interaction states](/design/interaction-states) guide, here
  to help merchants understand what to expect while interacting with Shopify
- Added the all new [internationalization](/patterns-and-guides/internationalization) guide.
  Learn how to build interfaces that work for Shopify merchants in every part of
  the world.
- Introduced the guide to [crafting the Shopify admin](/patterns-and-guides/crafting-admin).
  The Shopify admin is where merchants set up their store and manage their
  business. These guidelines have practical ideas to help people who work for
  Shopify create a better admin for merchants.
- Created the guide to [designing apps for Shopify](/patterns-and-guides/designing-apps), to
  help you design apps that merchants trust, understand, and ultimately fall in
  love with.

---

## April 2018

### Content and guidelines

- Added an all-new “What’s new” page (the one you’re currently reading 🙃)
- Added guidelines for timestamp formats in
  [grammar and mechanics](https://polaris.shopify.com/content/grammar-and-mechanics#section-dates-numbers-and-addresses)
- Added “pick up” (verb) and “pickup” (noun) to the
  [vocabulary page](https://polaris.shopify.com/content/vocabulary#section-p-password-page-payment-)

### Resources

- The [GraphQL API](https://polaris.shopify.com/resources/graphql-api) now
  surfaces design tokens (colors, spacing, and font stacks):
  ```
  {
    designTokens {
      name
      value
      originalValue
      comment
      type
      category
    }
  }
  ```
  [Try this query in your browser](https://polaris.shopify.com/api?query=%7B%0A%20%20designTokens%20%7B%0A%20%20%20%20name%0A%20%20%20%20value%0A%20%20%20%20originalValue%0A%20%20%20%20comment%0A%20%20%20%20type%0A%20%20%20%20category%0A%20%20%7D%0A%7D%0A)

---

## March 2018

### Content and guidelines

- Removed the “Purpose” sections on all component pages, as they often
  overlapped with existing content.
- Updated embedded component pages to feature more detailed usage guides. Also
  added some screenshots showing what embedded components look like in a Shopify
  app (in v2 and up, refer to the
  [app provider component](/components/structure/app-provider)).

### Component playground

- Improved the component playground to display more detailed information about
  props and their respective types
- Components with an `icon` prop (such as the
  [Banner component](/components/feedback-indicators/banner)) now show a list of
  all available icons in the playground
- We tamed the text editor’s cursor so it doesn’t jump around unexpectedly
  anymore

### Resources

- `Polaris.ase` (Adobe Swatch Exchange) and `Polaris.clr` (macOS) color palettes
  are distributed alongside the Sketch UI kit and `Polaris.sketchpalette` that
  you’ll find in the
  [GitHub releases page](https://github.com/Shopify/polaris-react/releases) –
  [Download the UI Kit and palettes](https://polaris.shopify.com/downloads/Sketch.UI.Kit.zip).
- The GraphQL API powering this site was opened to the public at
  https://polaris.shopify.com/api –
  [Read the API documentation](https://polaris.shopify.com/resources/graphql-api).

---

## Notable previous updates

We’re constantly updating the style guide and releasing new content for Polaris,
but before March 2018, we didn’t have a place to share those updates. Here are a
few you may have missed:

- Naming is hard: that’s why we documented the names we give our products,
  features, and icons in the new [naming guidelines](/content/naming) page
- [Polaris Telescope](https://github.com/shopify/polaris-telescope): access Polaris from Sketch
  to speed up your design or development workflow
