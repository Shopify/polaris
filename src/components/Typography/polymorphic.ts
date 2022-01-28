/* eslint-disable @typescript-eslint/ban-types */

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<
  TElement extends
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<
  TElement,
  React.ComponentPropsWithoutRef<TElement>
>;

interface AsProp<TComponent extends React.ElementType> {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: TComponent;
}

/**
 * Allows for extending a set of props (`TExtendedProps`) by an overriding set of props
 * (`TOverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  TExtendedProps = {},
  TOverrideProps = {},
> = TOverrideProps & Omit<TExtendedProps, keyof TOverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`TElement`) must be passed in.
 */
export type InheritableElementProps<
  TElement extends React.ElementType,
  TProps = {},
> = ExtendableProps<PropsOf<TElement>, TProps>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  TElement extends React.ElementType,
  TProps = {},
> = InheritableElementProps<TElement, TProps & AsProp<TElement>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<TElement extends React.ElementType> =
  React.ComponentPropsWithRef<TElement>['ref'];
/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<
  TElement extends React.ElementType,
  TProps = {},
> = PolymorphicComponentProps<TElement, TProps> & {
  ref?: PolymorphicRef<TElement>;
};
