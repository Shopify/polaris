import * as React from 'react';
import Icon from '../Icon/';
import * as styles from './Tag.scss';

export interface Props {
  children?: string,
  onRemove?(): void,
}

export default function Tag({children, onRemove}: Props) {
  return (
    <span className={styles.Tag}>
      <span>{children}</span>
      <button
        aria-label="Remove"
        className={styles.Button}
        onClick={onRemove}
        onMouseUp={handleMouseUp}
      >
        <Icon source="cancelSmall" />
      </button>
    </span>
  );
}

function handleMouseUp({currentTarget}: React.MouseEvent<HTMLButtonElement>) {
  currentTarget.blur();
}
