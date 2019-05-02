# Tophatting documentation 🎩

## Summary

When components are updated in ways that impact how people use them, their `README.md` documentation should be updated to reflect this.

When you update the `README.md` of a component, that content can change the documentation that appears in the [Polaris style guide](https://polaris.shopify.com/).

Manually testing documentation (we call it “[tophatting](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md#history-of-the-phrase)”, or 🎩 for short) adds that extra degree of certainty that what you’re shipping looks like what you expect.

## When should you 🎩 documentation?

When you’re adding content to a component’s `README.md` (such as `/src/components/Button/README.md`) to change or add best practices, accessibility documentation, or other information.

## What should you 🎩?

Check the location, appearance, and readability of the content you add to the style guide.

## How to 🎩 documentation

1. Check out the `master` branch from [`polaris-styleguide`](https://github.com/Shopify/polaris-styleguide)
1. In a separate tab if preferred, check out the updated `polaris-react` branch
1. In the `polaris-react` directory, run `yarn run build-consumer polaris-styleguide`
1. In the `polaris-styleguide` directory, run `dev up && dev server`
1. View documentation changes in the browser
