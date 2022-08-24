import React, {ReactNode, forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import {classNames} from '../../utilities/css';

import styles from './Box.scss';
import type {spacing} from '@shopify/polaris-tokens';

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

type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

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
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      shadow,
    },
    ref,
  ) => {
    const style = {
      '--pc-box-margin': margin ? `var(--p-space-${margin})` : '',
      '--pc-box-margin-bottom': marginBottom
        ? `var(--p-space-${marginBottom})`
        : '',
      '--pc-box-margin-left': marginLeft ? `var(--p-space-${marginLeft})` : '',
      '--pc-box-margin-right': marginRight
        ? `var(--p-space-${marginRight})`
        : '',
      '--pc-box-margin-top': marginTop ? `var(--p-space-${marginTop})` : '',
      '--pc-box-padding': padding ? `var(--p-space-${padding})` : '',
      '--pc-box-padding-bottom': paddingBottom
        ? `var(--p-space-${paddingBottom})`
        : '',
      '--pc-box-padding-left': paddingLeft
        ? `var(--p-space-${paddingLeft})`
        : '',
      '--pc-box-padding-right': paddingRight
        ? `var(--p-space-${paddingRight})`
        : '',
      '--pc-box-padding-top': paddingTop ? `var(--p-space-${paddingTop})` : '',
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
