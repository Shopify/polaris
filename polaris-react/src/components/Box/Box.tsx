import React, {ReactNode, forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import {classNames} from '../../utilities/css';

import styles from './Box.scss';

type BackgroundColor =
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

interface BoxBaseProps {
  /** Background color of the Box */
  background?: BackgroundColor;
  /** Inner content of the Box */
  children: ReactNode;
}

type PolymorphicBox = Polymorphic.ForwardRefComponent<'div', BoxBaseProps>;

export type BoxProps = Polymorphic.OwnProps<PolymorphicBox>;

export const Box = forwardRef(
  ({as: Component = 'div', background, children}, ref) => {
    const className = classNames(styles.root, background && styles[background]);

    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  },
) as PolymorphicBox;

Box.displayName = 'Box';
