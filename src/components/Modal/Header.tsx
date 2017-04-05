import * as React from 'react';

import Icon from '../Icon';
import DisplayText from '../DisplayText';

import * as styles from './Modal.scss';

export interface Props {
  id: string,
  children?: React.ReactNode,
  onCloseRequest?(): void,
}

export default function Header({
  id,
  children,
  onCloseRequest,
}: Props) {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent} id={id}>
        <DisplayText size="medium">{children}</DisplayText>
      </div>
      <button onClick={onCloseRequest} className={styles.CloseButton}>
        <Icon source="cancel" size={20} color="inkLightest"/>
      </button>
    </div>
  );
};
