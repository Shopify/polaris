import React from 'react';
import {classNames} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';
import {elementChildren} from '../../utilities/components';
import {Item} from './components';
import styles from './ButtonGroup.scss';

export interface ButtonGroupProps {
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
  segmented,
  fullWidth,
  connectedTop,
}: ButtonGroupProps) {
  const {unstableGlobalTheming = false} = useFeatures();

  const className = classNames(
    styles.ButtonGroup,
    unstableGlobalTheming && styles.globalTheming,
    segmented && styles.segmented,
    fullWidth && styles.fullWidth,
    connectedTop && styles.connectedTop,
  );

  const contents = elementChildren(children).map((child, index) => (
    <Item button={child} key={index} />
  ));

  return <div className={className}>{contents}</div>;
}
