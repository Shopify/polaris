# Using a compound component patter to build Autocomplete

## Date

October 3, 2019

## Contributors

- Andrew Musgrave
- Chloe Rice
- Dan Rosenthal
- Daniel Leroux
- Dominic McPhee
- Sara Hill

## Summary

There is a need for Polaris to provide smaller, more composable components so that Polaris can be extended without needing to fork components. The re-development of the Autocomplete component provided an opportunity for exploration of the compound component pattern.

## Solution

Following an (https://github.com/Shopify/polaris-react/issues/1794)[exploration] we decided to build the Autocomplete using a compound component pattern. We explored various ways to do this:

1. Having the parent render its children via methods shared via Context: We opted against this because it defied the purpose of having smaller components and cause the component to renderer every time an option as added the Autocompletes results. For example, 100 results cause for 100 calls to the parent.

2. Using `cloneElement`: We opted against this approach because since cloning happens at run time and TypeScript happens at compile time the benefits of using TypeScript were lost. The experience also felt less performant most likely due to the cloning at every render.

3. Having the list of results as a child of the component and the activator text field as a prop: We chose this approach. Overall the approach felt right, the experience not lagging and renders we're kept to the elements being affected only.
