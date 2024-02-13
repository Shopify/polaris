import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren} from '../../utilities/components';

import {Item} from './components';
import styles from './ButtonGroup.module.scss';

type Gap = 'extraTight' | 'tight' | 'loose';

type Variant = 'segmented';

export interface ButtonGroupProps {
  /** Determines the space between button group items */
  gap?: Gap;
  /** Styling variant for group */
  variant?: Variant;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Prevent buttons in button group from wrapping to next line */
  noWrap?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export function ButtonGroup({
  children,
  gap,
  variant,
  fullWidth,
  connectedTop,
  noWrap,
}: ButtonGroupProps) {
  const className = classNames(
    styles.ButtonGroup,
    gap && styles[gap],
    variant && styles[variationName('variant', variant)],
    fullWidth && styles.fullWidth,
    noWrap && styles.noWrap,
  );

  const contents = elementChildren(children).map((child, index) => (
    <Item button={child} key={index} />
  ));

  return (
    <div
      className={className}
      data-buttongroup-variant={variant}
      data-buttongroup-connected-top={connectedTop}
      data-buttongroup-full-width={fullWidth}
      data-buttongroup-no-wrap={noWrap}
    >
      {contents}
    </div>
  );
}
