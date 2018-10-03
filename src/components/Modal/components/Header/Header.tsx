import * as React from 'react';
import {DisplayText} from '../../../../components';
import memoizedBind from '../../../../utilities/memoized-bind';
import CloseButton from '../CloseButton';
import * as styles from './Header.scss';

export interface Props {
  id: string;
  children?: React.ReactNode;
  onClose(): void;
}

export default function Header({id, children, onClose}: Props) {
  const handleClose = memoizedBind(onClose);

  return (
    <div className={styles.Header}>
      <div id={id} className={styles.Title}>
        <DisplayText element="h2" size="small">
          {children}
        </DisplayText>
      </div>

      <CloseButton onClick={handleClose} />
    </div>
  );
}
