import React, {ReactNode, forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type {spacing} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './Box.scss';

type Background =
  | 'background'
  | 'backgroundHovered'
  | 'backgroundPressed'
  | 'backgroundSelected'
  | 'surface'
  | 'surfaceDark'
  | 'surfaceNeutral'
  | 'surfaceNeutralHovered'
  | 'surfaceNeutralPressed'
  | 'surfaceNeutralDisabled'
  | 'surfaceNeutralSubdued'
  | 'surfaceNeutralSubduedDark'
  | 'surfaceSubdued'
  | 'surfaceDisabled'
  | 'surfaceHovered'
  | 'surfaceHoveredDark'
  | 'surfacePressed'
  | 'surfacePressedDark'
  | 'surfaceDepressed'
  | 'surfaceSearchField'
  | 'surfaceSearchFieldDark'
  | 'backdrop'
  | 'overlay';

type BorderRadius =
  | 'radius-05'
  | 'radius-1'
  | 'radius-2'
  | 'radius-3'
  | 'radius-4'
  | 'radius-5'
  | 'radius-6'
  | 'radius-base'
  | 'radius-large'
  | 'radius-half';

type Shadow = 'default' | 'transparent' | 'faint' | 'deep';

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

type Spacing = {
  bottom: SpacingTokenScale | '';
  left: SpacingTokenScale | '';
  right: SpacingTokenScale | '';
  top: SpacingTokenScale | '';
};

interface BoxBaseProps {
  /** Background color of the Box */
  background?: Background;
  /** Border radius of the Box */
  borderRadius?: BorderRadius;
  /** Inner content of the Box */
  children: ReactNode;
  /** Spacing outside of the Box */
  margin?: SpacingTokenScale;
  /** Bottom spacing outside of the Box */
  marginBottom?: SpacingTokenScale;
  /** Left side spacing outside of the Box */
  marginLeft?: SpacingTokenScale;
  /** Right side spacing outside of the Box */
  marginRight?: SpacingTokenScale;
  /** Top spacing outside of the Box */
  marginTop?: SpacingTokenScale;
  /** Spacing inside of the Box */
  padding?: SpacingTokenScale;
  /** Bottom spacing inside of the Box */
  paddingBottom?: SpacingTokenScale;
  /** Left side spacing inside of the Box */
  paddingLeft?: SpacingTokenScale;
  /** Right side spacing inside of the Box */
  paddingRight?: SpacingTokenScale;
  /** Top spacing inside of the Box */
  paddingTop?: SpacingTokenScale;
  /** Shadow on the Box */
  shadow?: Shadow;
}

type PolymorphicBox = Polymorphic.ForwardRefComponent<'div', BoxBaseProps>;

export type BoxProps = Polymorphic.OwnProps<PolymorphicBox>;

export const Box = forwardRef(
  (
    {
      as: Component = 'div',
      background,
      borderRadius,
      children,
      margin = '',
      marginBottom = '',
      marginLeft = '',
      marginRight = '',
      marginTop = '',
      padding = '',
      paddingBottom = '',
      paddingLeft = '',
      paddingRight = '',
      paddingTop = '',
      shadow,
    },
    ref,
  ) => {
    const margins = {
      bottom: marginBottom ? marginBottom : margin,
      left: marginLeft ? marginLeft : margin,
      right: marginRight ? marginRight : margin,
      top: marginTop ? marginTop : margin,
    } as Spacing;

    const paddings = {
      bottom: paddingBottom ? paddingBottom : padding,
      left: paddingLeft ? paddingLeft : padding,
      right: paddingRight ? paddingRight : padding,
      top: paddingTop ? paddingTop : padding,
    } as Spacing;

    const style = {
      '--pc-box-margin-bottom': margins.bottom
        ? `var(--p-space-${margins.bottom})`
        : '',
      '--pc-box-margin-left': margins.left
        ? `var(--p-space-${margins.left})`
        : '',
      '--pc-box-margin-right': margins.right
        ? `var(--p-space-${margins.right})`
        : '',
      '--pc-box-margin-top': margins.top ? `var(--p-space-${margins.top})` : '',
      '--pc-box-padding-bottom': paddings.bottom
        ? `var(--p-space-${paddings.bottom})`
        : '',
      '--pc-box-padding-left': paddings.left
        ? `var(--p-space-${paddings.left})`
        : '',
      '--pc-box-padding-right': paddings.right
        ? `var(--p-space-${paddings.right})`
        : '',
      '--pc-box-padding-top': paddings.top
        ? `var(--p-space-${paddings.top})`
        : '',
    } as React.CSSProperties;

    const className = classNames(
      styles.root,
      background && styles[background],
      borderRadius && styles[borderRadius],
      shadow && styles[shadow],
    );

    return (
      <Component ref={ref} className={className} style={style}>
        {children}
      </Component>
    );
  },
) as PolymorphicBox;

Box.displayName = 'Box';
