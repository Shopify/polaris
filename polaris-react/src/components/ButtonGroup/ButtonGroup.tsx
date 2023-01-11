import React from 'react';

import {classNames} from '../../utilities/css';
import {elementChildren} from '../../utilities/components';

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
  /** Prevents wrapping onto a new line */
  noWrap?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export function ButtonGroup({
  children,
  spacing,
  segmented,
  fullWidth,
  connectedTop,
  noWrap,
}: ButtonGroupProps): JSX.Element {
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
    <div
      className={className}
      data-buttongroup-segmented={segmented}
      data-buttongroup-connected-top={connectedTop}
      data-buttongroup-full-width={fullWidth}
      data-buttongroup-nowrap={noWrap}
    >
      <div className={classNames(noWrap && styles.noWrap)}>{contents}</div>
    </div>
  );
}
