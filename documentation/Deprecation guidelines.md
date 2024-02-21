# Deprecation guidelines

Follow these guidelines for deprecating [components](#components), [props](#props), [prop values](#prop-values), and [tokens](#tokens) in future major versions of Polaris. A month before the next major version release ensure that deprecations have been announced and any migrations needed are documented/available.

## Components

- Mark the component as deprecated
  - Add `@deprecated` warning to component
    ```tsx
    /** @deprecated Use the [COMPONENT_NAME] component instead */
    export function ExampleComponent(props: ExampleComponentProps) {
    ```
  - Update documentation on polaris.shopify.com ([examples](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/content/components/deprecated))
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/tree/main/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Add supporting documentation for deprecation in DEPRECATED.md
- Remove component in next major Polaris version branch

## Props

- Mark the prop as deprecated
  - Add `@deprecated` warning to component
    ````tsx
      /** Description of the prop
       * @deprecated Use [REPLACEMENT_ADVICE] instead
      */
      exampleProp?: boolean;
      ```
    ````
  - Check documentation is updated on polaris.shopify.com
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/tree/main/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Add supporting documentation for deprecation in DEPRECATED.md
- Remove prop in next major Polaris version branch

## Prop values

- Mark the prop value(s) as deprecated

  - Add a console.warn() for deprecated prop value(s) to component

  ```tsx
  const deprecatedVariants = ['value1', 'value2'];

  if (
    process.env.NODE_ENV === 'development' &&
    variant &&
    deprecatedVariants.includes(variant)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `Deprecation: <Component variant="${variant}" />. The value "${variant}" will be removed in a future major version of Polaris. Use "value3" instead.`,
    );
  }
  ```

  - Add component, prop, and deprecated prop value(s) to `componentUnionTypeDeprecations` ([example](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/pages/components/%5Bgroup%5D/%5Bcomponent%5D/index.tsx#L80))
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

- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/tree/main/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L122))
  - Document deprecation reason
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Add supporting documentation for deprecation in DEPRECATED.md
- Remove prop value in next major Polaris version branch

## Tokens

- Mark the token as deprecated in `stylelint-polaris` ([example](https://github.com/Shopify/polaris/tree/main/stylelint-polaris/plugins/custom-property-disallowed-list))
- Create automated migration(s) ([examples](https://github.com/Shopify/polaris/tree/main/polaris-migrator/src/migrations))
- Add supporting documentation for deprecation in next major version guide ([examples](https://github.com/Shopify/polaris/tree/main/polaris.shopify.com/content/version-guides/migrating-from-v11-to-v12.mdx#L1451))
  - Document any alternatives
  - Document automated migration(s)
  - Document manual migration(s)
- Add supporting documentation for deprecation in DEPRECATED.md
- Remove token in next major Polaris version branch
