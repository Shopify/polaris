import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {elementChildren} from '@shopify/react-utilities';
import {Item} from './components';
import * as styles from './ButtonGroup.scss';

export interface Props {
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Button components */
  children?: React.ReactNode;
}

export default function ButtonGroup({
  children,
  segmented,
  fullWidth,
  connectedTop,
}: Props) {
  const className = classNames(
    styles.ButtonGroup,
    segmented && styles.segmented,
    fullWidth && styles.fullWidth,
    connectedTop && styles.connectedTop,
  );

  const contents = elementChildren(children).map((child, index) => (
    <Item button={child} key={index} />
  ));

  return <div className={className}>{contents}</div>;
}
