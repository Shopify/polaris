import React, {ReactNode, forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import {classNames} from '../../utilities/css';

import styles from './Box.scss';

interface BoxBaseProps {
  /** Inner content of the Box */
  children: ReactNode;
}

type PolymorphicBox = Polymorphic.ForwardRefComponent<'div', BoxBaseProps>;

export type BoxProps = Polymorphic.OwnProps<PolymorphicBox>;

export const Box = forwardRef(({as: Component = 'div', children}, ref) => {
  const className = classNames(styles.root);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}) as PolymorphicBox;

Box.displayName = 'Box';
