/**
 * Extracted from Chakra UI, which in turn got some types from Chance (Reach
 * UI), Haz (Reakit) and (fluentui)
 */
import {forwardRef as forwardReactRef} from 'react';

type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, 'as' | OmitAdditionalProps>;

type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element;

  displayName?: string;
};

/**
 * Extract the props of a React element or component
 */
type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

type As<Props = any> = React.ElementType<Props>;

type HTMLProps<T extends As> = Omit<PropsOf<T>, 'ref'>;

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}

export interface BoxProps extends HTMLProps<'div'> {}

/**
 * Box is the most abstract component on top of which other components are
 * built. It renders a `div` element by default, customisable via the `as` prop.
 */
export const Box = forwardRef(({as: Tag = 'div', ...props}: BoxProps) => (
  <Tag {...props} />
));

Box.displayName = 'Box';
