---
name: Typography udpates
keywords:
  - typography
  - type
  - fonts
  - text
  - type styles
---

# Polaris typography updates

Learn about what changes are coming to Polaris typography

---

This is an Alpha release of the new type system. That means we’re making the new Text component and Figma text styles available to use but there could still be significant changes made. Our goal is to share the work so that you can: understand what’s changing, start using the type updates, and provide feedback to help us improve.

Ready to learn what’s changing? Let’s dive in!

## Why are we making changes?

As the Shopify admin gets more and more merchants using it to run their businesses, we need to evolve to feel less like a website and more like a power tool. In order to do this, we need to establish a strong foundation at the center of our design system and typography plays an important role.

Earlier this year, we invested a lot of time in [building up our design tokens](https://ux.shopify.com/putting-the-system-back-in-our-design-system-b2c55a392dea) as a first step in strengthening the foundation and increasing Polaris token coverage. After that release, we saw that there was still only ~8% coverage of typography in custom components in `shopify/web`.

A lack of flexibility in our 7+ typography components, little guidance on how to design with typography, and a lack of range in font weights and sizes is leading teams to diverge from Polaris and create new components or hard coded css values for type.

Simplifying our components and improving our foundation will help our product teams make significant and sweeping changes quickly across Shopify’s admin.

## What's changing

### Type styles

Polaris typography is getting a refresh. Currently, there are **4 Display**, **1 Heading**, **1 Subheading**, **1 Button**, **1 Body**, and **1 Caption** variants.

_add image_

The updates will simplify type into three categories: **Display**, **Heading**, and **Body**. Each category has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the UI.

_add image_

## Type scale

We’re moving from two type scales to one for both desktop and mobile web.

We looked at how type changes between the different screen sizes and found that it’s often a difference of 1px. While 1px can make a visual difference, after talking to designers and developers, we came to the conclusion that the added complexity of having two distinct scales and two sets of text styles, just wasn’t worth it. Designers and developers often didn’t even realize a change in size happened or expected the size to actually decrease instead of increase as it does now.

_add image_

The larger Display styles respond automatically at certain breakpoints but all other sizes will stay the same unless specified otherwise.

_add image_

## Typography components

We’re moving from seven type components to a singular Text component.

Notes on why:
One component to learn and read documentation on
Autocompleting props helps developers to learn the different typography options quickly
Less complexity in code
Decouples layout from type
Easier to make sweeping changes to type
Sets us up for more flexibility in how type is used within components
Sets us up for future override work
Low usage of a lot of the components
One way to control typography

## Typography tokens

We have updated and streamlined token values, and updated token names to reflect a token naming convention that makes tokens easier to use and understand.

_comparison table_

## Using the new component and text styles

The new Text component and Figma text styles are available in alpha. You can start using the new component and styles now but be aware they’re still in development and there could be breaking changes. The existing type components will continue to be available for use until the new Text component is finalized.

As you start to use the new component, please share feedback with the Polaris team to help us continuously improve the type system.

## What’s next?

Next, we’ll be releasing the beta version of the component. The beta release will include:

- Updating Polaris components to use the new Text component
- Adding a deprecation warning to the old type components
- Updating components in the Figma UI Kit to use the new text styles
- Updated Typography documentation

Don’t worry, we’ll also provide a timeline and guidance for migration.

## Resources

Add links for:
Text component
Any other related technical documentation
Figma Text styles
Figma guides
