# Deprecation guidelines

Follow these guidelines for deprecating components, props, prop values, and tokens in future major versions of Polaris. A month before the next major version release ensure that deprecations have been announced and any migrations needed are documented/available.

## Components

- Mark the component as deprecated
  - Add `@deprecated` warning to component
    ```tsx
    /** @deprecated Use the [COMPONENT_NAME] component instead */
    export function ExampleComponent(props: ExampleComponentProps) {
    ```
  - Update documentation on polaris.shopify.com ([examples](https://github.com/Shopify/polaris/blob/969ef1b1389ca4062767814a05761cc2e204ee2e/polaris.shopify.com/content/components/deprecated))
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/blob/f91c4b661b1d9540dd515c6f073aeeb62e914023/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/blob/text-2xl-3xl-deprecation/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Remove component in next major Polaris version branch

## Props

- Mark the prop as deprecated
  - Add `@deprecated` warning to component
    ````tsx
      /** Decsription of the prop
       * @deprecated Use [SOMETHING] instead
      */
      exampleProp?: boolean;
      ```
    ````
  - Check documentation is updated on polaris.shopify.com
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/blob/f91c4b661b1d9540dd515c6f073aeeb62e914023/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/blob/text-2xl-3xl-deprecation/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Remove prop in next major Polaris version branch

## Prop values

- Mark the prop value as deprecated
  - Add component and deprecated prop value to `componentUnionTypeDeprecations` ([example](https://github.com/Shopify/polaris/blob/text-2xl-3xl-deprecation/polaris.shopify.com/pages/components/%5Bgroup%5D/%5Bcomponent%5D/index.tsx#L80))
    ```tsx
    const componentUnionTypeDeprecations: {
      [componentName: string]: {
        [typeName: string]: string[];
      };
    } = {
      Text: {
        Variant: ['heading2xl', 'heading3xl'],
      },
    };
    ```
  - Check documentation is updated on polaris.shopify.com
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/blob/f91c4b661b1d9540dd515c6f073aeeb62e914023/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/blob/text-2xl-3xl-deprecation/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Remove prop value in next major Polaris version branch

## Tokens

- Mark the token as deprecated in `stylelint-polaris` ([example](https://github.com/Shopify/polaris/tree/main/stylelint-polaris/plugins/custom-property-disallowed-list))
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/blob/f91c4b661b1d9540dd515c6f073aeeb62e914023/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/blob/text-2xl-3xl-deprecation/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L1451))
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Remove token in next major Polaris version branch
