import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import Icon from '../Icon';

import * as styles from './Tag.scss';

export interface Props {
  children?: React.ReactNode,
  slim?: boolean,
  onRemove?(): void,
};

export default function Tag({
  children,
  slim,
  onRemove,
}: Props) {

  const className = classNames(
    styles.Tag,
    slim && styles.slim,
  );

  return (
    <span className={className}>
      <span>{children}</span>
      <button className={styles.RemoveButton} onClick={onRemove} alt="Remove tag button">
        <Icon source="cancel" color="inkLighter" size={10} />
      </button>
    </span>
  );
}
