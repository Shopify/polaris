import * as React from 'react';
import {DisplayText, Stack} from '../../../';
import memoizedBind from '../../../../utilities/memoized-bind';
import * as styles from './Header.scss';
import {CloseButton} from './';

export interface Props {
  id: string,
  children?: React.ReactNode,
  onClose(): void,
}

export default function Header({id, children, onClose}: Props) {
  const handleClose = memoizedBind(onClose);

  return (
    <div className={styles.Header}>
      <Stack alignment="center">
        <Stack.Item fill>
          <div id={id}>
            <DisplayText element="h2" size="small">
              {children}
            </DisplayText>
          </div>
        </Stack.Item>

        <CloseButton onClick={handleClose} />
      </Stack>
    </div>
  );
}
