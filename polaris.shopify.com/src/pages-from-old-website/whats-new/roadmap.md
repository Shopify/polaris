---
name: What’s new?/Roadmap
slug: roadmap
icon: IconShipment
keywords:
  - upcoming
  - new features
  - updates
---

# Roadmap

Here’s what the Polaris design system team is working on right now.

---

## Deprecating Sass functions, mixins, variables

Historically, component libraries at Shopify have been heavily reliant on Sass helpers such as mixins, functions, and overridable variables to promote consistency between the design system and apps consuming it. Sadly, this Sass-based styling API in Polaris React can make it easy to do the wrong thing. For example, consumers could abuse Sass mixins to make a `<div>` look like a button, which would come without any of the accessibility requirements.

In order to both discourage accessibility anti-patterns and put the library on the path towards more composability and customizability, we’ve decided to move Polaris React to an architecture where its theming is happening on the client, rather than at Sass-compilation time.

In practice, this means the Sass functions, mixins, and variables that are currently public will be gradually replaced with other means of achieving similar goals. We’ll propose a migration path in later announcements, with the main goal of minimizing disruption for consuming apps.

---

## Improving accessibility documentation

To help people that design and develop with Polaris, we’re working on adding improved documentation around building accessible features with the system. Style guide documentation will clarify which accessibility supports are built into components, how components are expected to work for people using assistive technologies, and what might additionally need to be considered or implemented based on how components are being used.
