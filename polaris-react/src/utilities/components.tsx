import {Children, isValidElement} from 'react';

// Wraps `element` in `Component`, if it is not already an instance of
// `Component`. If `props` is passed, those will be added as props on the
// wrapped component. If `element` is null, the component is not wrapped.
export function wrapWithComponent<TProps extends React.PropsWithChildren>(
  element: React.ReactNode | null | undefined,
  Component: React.ComponentType<TProps>,
  props: TProps & JSX.IntrinsicAttributes,
): React.ReactNode {
  if (element == null) {
    return null;
  }

  return isElementOfType(element, Component) ? (
    element
  ) : (
    <Component {...props}>{element}</Component>
  );
}

// In development, we compare based on the name of the function because
// React Hot Loader proxies React components in order to make updates. In
// production we can simply compare the components for equality.
const isComponent =
  process.env.NODE_ENV === 'development'
    ? hotReloadComponentCheck
    : (
        AComponent: React.ComponentType<any>,
        AnotherComponent: React.ComponentType<any>,
      ) => AComponent === AnotherComponent;

// Checks whether `element` is a React element of type `Component` (or one of
// the passed components, if `Component` is an array of React components).
export function isElementOfType<TProps>(
  element: React.ReactNode | null | undefined,
  Component: React.ComponentType<TProps> | React.ComponentType<TProps>[],
): boolean {
  if (
    element == null ||
    !isValidElement(element) ||
    typeof element.type === 'string'
  ) {
    return false;
  }

  const {type: defaultType} = element;
  // Type override allows components to bypass default wrapping behavior. Ex: Stack, ResourceList...
  // See https://github.com/Shopify/app-extension-libs/issues/996#issuecomment-710437088
  const overrideType = element.props?.__type__;
  const type = overrideType || defaultType;
  const Components = Array.isArray(Component) ? Component : [Component];

  return Components.some(
    (AComponent) => typeof type !== 'string' && isComponent(AComponent, type),
  );
}

// Returns all children that are valid elements as an array. Can optionally be
// filtered by passing `predicate`.
export function elementChildren<T extends React.ReactElement>(
  children: React.ReactNode,
  predicate: (element: T) => boolean = () => true,
): T[] {
  return Children.toArray(children).filter(
    (child) => isValidElement(child) && predicate(child as T),
  ) as T[];
}

interface ConditionalWrapperProps {
  children: any;
  condition: boolean;
  wrapper: (children: any) => any;
}

export function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps): JSX.Element {
  return condition ? wrapper(children) : children;
}

interface ConditionalRenderProps {
  condition: boolean;
  children: any;
}

export function ConditionalRender({
  condition,
  children,
}: ConditionalRenderProps): JSX.Element {
  return condition ? children : null;
}

function hotReloadComponentCheck(
  AComponent: React.ComponentType<any>,
  AnotherComponent: React.ComponentType<any>,
) {
  const componentName = AComponent.name;
  const anotherComponentName = (
    AnotherComponent as React.FunctionComponent<any>
  ).displayName;

  return (
    AComponent === AnotherComponent ||
    (Boolean(componentName) && componentName === anotherComponentName)
  );
}
