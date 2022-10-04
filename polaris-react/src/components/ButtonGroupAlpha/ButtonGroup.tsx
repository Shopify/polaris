import React from 'react';

import {classNames} from '../../utilities/css';
import {elementChildren} from '../../utilities/components';
import {Box} from '../Box';
import {Inline} from '../Inline';

import {Item} from './components';
import styles from './ButtonGroup.scss';

type Spacing = 'extraTight' | 'tight' | 'loose';

export interface ButtonGroupProps {
  /** Determines the space between button group items */
  spacing?: Spacing;
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export function ButtonGroup({
  children,
  spacing,
  segmented,
  fullWidth,
  connectedTop,
}: ButtonGroupProps) {
  const className = classNames(
    styles.ButtonGroup,
    spacing && styles[spacing],
    segmented && styles.segmented,
    fullWidth && styles.fullWidth,
  );

  const contents = elementChildren(children).map((child, index) => (
    <Item button={child} key={index} />
  ));

  return (
    <Inline
      spacing="0"
      data-buttongroup-segmented={segmented}
      data-buttongroup-connected-top={connectedTop}
      data-buttongroup-full-width={fullWidth}
    >
      {contents}
    </Inline>
  );
}
