---
title: Version 11 Color
description: Learn about what changes were introduced to color in Polaris v11.
imageUrl: /images/updates/new-colors-cover.png
keywords:
  - color
  - tokens
---

![Preview of new alias tokens](/images/updates/new-colors-cover.png)

## Why are we making changes?

Over the past year we have invested a lot of time and energy into creating a more robust and cohesive token system in Polaris. We have updated typography, spacing, shadows and breakpoints. All of this work has made it easier than ever to build with Polaris and has unlocked new levels of composability within the system itself. We knew we needed to bring this same thinking to our color tokens as well.

These were the main drivers for this update.

1. Create a defined color palette with multiple lightness values that is used to create new tokens. This will eliminate color sprawl and ensure a more consistent and cohesive use of color across the admin.
2. Update key colors to bring more contrast and vibrancy into the admin. Key components like cards often were invisible to merchants because they had so little contrast to the app background itself. This really made it hard for merchants to quickly understand the structure of a given screen.
3. Create a consistent and thoughtful naming convention that was much simpler and more intuitive for builders to use.
4. Build an entirely new architecture that allows us to evolve and roll out design changes a lot easier. The previous architecture was rigid and didn’t let us easily cascade changes across the entire system.

## Color palette

We started with an audit of the colors used in Polaris. Previously we didn’t have a defined color palette to create tokens from. This led to massive sprawl and inconsistency of hue, saturation, and vibrancy within our colors. We learned that there were 22 different gray values in Polaris, some of which were nearly identical to each other, providing no value while introducing added complexity. Every hue had a different range of tints and shades with no consistency or relationship between them.

![image of old color palette](/images/updates/old-palette.png)

We took all these colors and generated a new color palette with 10 shades for each hue. Each shade should be meaningfully different from the ones next to it on the scale. This makes choices purposeful and clear and eliminates the sprawl and muddiness we had before.

These colors power every token provided within the admin. This means that for the first time we can update a single color value within our palette and it will cascade down to every token referencing it, updating the entire admin from a single and simple change.

## Color tokens

There are now two types of color tokens in Polaris, only one of which is actually used by builders.

### Palette tokens

These tokens are not available to use directly, rather, they are where we define the color palette itself. Each color has 10 total shades.

![Image of new color palette](/images/updates/new-palette.png)

### Alias tokens

These are the tokens used to actually build the admin. Each token references a palette token to define its value. For example, `--p-color-text-subdued` and `--p-color-icon` are all referencing the palette token `gray-800`.

![Image of new color palette](/images/updates/alias-tokens.png)

This allows us two ways of updating colors in the admin. First, we can change the color itself by updating `gray-800`. That change then cascades to every token that is referencing it system wide.

Second, we can also change a specific token by changing which color it is referencing. So if we want to change the default color of icons, we can remap `--p-color-icon` from `gray-800` to `gray-900`.

## Token naming

Each color token follows the same naming convention. The purpose and intent of a color token is built into the name itself. This makes it easy to understand how and when any given token should be used.

### Forumla

`--p-color` - `[element]` - `[role]` - `[variant]` - `[state]`

| Slot    | Description                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------- |
| Element | The actual UI element being styled. There are four options: background (bg), text, border, and icon. |
| Role    | Assigned roles to specific colors to ensure consistent communication of color throughout the admin.  |
| Variant | This is the key descriptor of a token that communicates exactly what this token is to be used for.   |
| State   | Communicates the state on which this token is applied.                                               |

### Omitting parts of the naming formula

Wherever default none is chosen that piece of the naming formula is omitted.
For example, the default background color token, used for things like cards, is simply `--p-color-bg`.

## Using the color updates

The new color tokens are now available via the same CSS custom properties as before. All components and necessary repositories have been migrated to the new tokens. Our Figma UI Kit has also been updated and all alias tokens are now available as color styles.

## Resources

- [Tokens](https://polaris.shopify.com/tokens/colors)
- [Figma color styles](https://www.figma.com/file/JHp1kp7ghGmTHs147CHjDf/Polaris-Styles?node-id=228-0&t=ymolczbUEHIDe2lm-11)
