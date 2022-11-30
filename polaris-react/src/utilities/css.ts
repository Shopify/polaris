import type {BreakpointsAlias} from '@shopify/polaris-tokens';

type Falsy = boolean | undefined | null | 0;

export type ResponsiveProp<T> =
  | T
  | {
      [Breakpoint in BreakpointsAlias]?: T;
    };

export function classNames(...classes: (string | Falsy)[]) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export function sanitizeCustomProperties(
  styles: React.CSSProperties,
): React.CSSProperties | undefined {
  const nonNullValues = Object.entries(styles).filter(
    ([_, value]) => value != null,
  );

  return nonNullValues.length ? Object.fromEntries(nonNullValues) : undefined;
}

export function getResponsiveValues(
  componentName: string,
  componentProp: string,
  responsiveValues?: ResponsiveProp<string>,
) {
  if (!responsiveValues) return {};

  if (typeof responsiveValues === 'string') {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: responsiveValues,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveValues).map(([breakpointAlias, value]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      value,
    ]),
  );
}

export function getResponsiveProps(
  componentName: string,
  componentProp: string,
  tokenSubgroup: string,
  responsiveProp?: ResponsiveProp<string>,
) {
  if (!responsiveProp) return {};

  if (typeof responsiveProp === 'string') {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: `var(--p-${tokenSubgroup}-${responsiveProp})`,
    };
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [
      `--pc-${componentName}-${componentProp}-${breakpointAlias}`,
      `var(--p-${tokenSubgroup}-${aliasOrScale})`,
    ]),
  );
}
