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

Following an [exploration](https://github.com/Shopify/polaris-react/issues/1794), we decided to build the Autocomplete using a compound component pattern. We explored various ways to do this.

1. Having the child delegate rendering to its parent via methods shared through context

We opted against this for a couple of reasons:
- it defeated the purpose of having smaller components
- it causes the component to re-render every time an option is added (one call to the parent render method for each option)

2. Using `cloneElement`: We opted against this approach because since cloning happens at run time and TypeScript happens at compile time the benefits of using TypeScript were lost. The experience also felt less performant most likely due to the cloning at every render.

3. Having the list of results as a child of the component and the activator text field as a prop

We chose this approach. Overall the approach felt right, the experience felt snappy and renders were kept to the elements being affected only.
