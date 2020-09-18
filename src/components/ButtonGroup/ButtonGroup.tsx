import React from 'react';

import {classNames} from '../../utilities/css';
import {elementChildren} from '../../utilities/components';

import {Item} from './components';
import styles from './ButtonGroup.scss';

export interface ButtonGroupProps {
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Force buttons to render in a row */
  noWrap?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export function ButtonGroup({
  children,
  segmented,
  noWrap,
  fullWidth,
  connectedTop,
}: ButtonGroupProps) {
  const className = classNames(
    styles.ButtonGroup,
    noWrap && styles.noWrap,
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
    >
      {contents}
    </div>
  );
}
