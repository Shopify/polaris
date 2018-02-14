import * as React from 'react';
import {Icon, DisplayText, Stack} from '@shopify/polaris';
import {memoizedBind} from '../../../utilities';
import * as styles from '../Modal.scss';

export interface Props {
  id: string;
  children?: React.ReactNode;
  onClose(): void;
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

        <button onClick={handleClose} className={styles.CloseButton}>
          <Icon source="cancel" color="inkLighter" />
        </button>
      </Stack>
    </div>
  );
}
