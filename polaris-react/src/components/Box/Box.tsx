import React, {ReactNode, forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

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

interface BoxBaseProps {
  /** Background color of the Box */
  background?: Background;
  /** Border radius of the Box */
  borderRadius?: BorderRadius;
  /** Shadow on the Box */
  shadow?: Shadow;
  /** Inner content of the Box */
  children: ReactNode;
}

type PolymorphicBox = Polymorphic.ForwardRefComponent<'div', BoxBaseProps>;

export type BoxProps = Polymorphic.OwnProps<PolymorphicBox>;

export const Box = forwardRef(
  (
    {as: Component = 'div', background, borderRadius, shadow, children},
    ref,
  ) => {
    const className = classNames(
      styles.root,
      background && styles[background],
      borderRadius && styles[borderRadius],
      shadow && styles[shadow],
    );

    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  },
) as PolymorphicBox;

Box.displayName = 'Box';
