import * as React from 'react';
import Item, {Position} from './components/Item';
import * as styles from './Connected.scss';

export interface Props {
  /** Content to display on the left */
  left?: React.ReactNode;
  /** Content to display on the right */
  right?: React.ReactNode;
  /** Connected content */
  children?: React.ReactNode;
}

export interface State {
  focused?: Position | null;
}

export default function Connected({children, left, right}: Props) {
  if (left == null && right == null) {
    return React.Children.only(children);
  }

  const leftConnectionMarkup = left ? (
    <Item position={Position.Left}>{left}</Item>
  ) : null;

  const rightConnectionMarkup = right ? (
    <Item position={Position.Right}>{right}</Item>
  ) : null;

  return (
    <div className={styles.Connected}>
      {leftConnectionMarkup}
      <Item position={Position.Primary}>{children}</Item>
      {rightConnectionMarkup}
    </div>
  );
}
