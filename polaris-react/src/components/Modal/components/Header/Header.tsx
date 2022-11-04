import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {Columns} from '../../../Columns';
import {Inline} from '../../../Inline';
import {Text} from '../../../Text';

import styles from './Header.scss';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({id, titleHidden, children, onClose}: HeaderProps) {
  return (
    <div
      className={titleHidden || !children ? styles.titleHidden : styles.Header}
    >
      <div id={id} className={styles.Title}>
        <Text as="h2" variant="headingLg">
          {children}
        </Text>
      </div>
      <CloseButton titleHidden={titleHidden} onClick={onClose} />
    </div>
  );

  return (
    <Box
      paddingBlockStart="4"
      paddingBlockEnd="4"
      paddingInlineStart="5"
      paddingInlineEnd="5"
      borderBlockEnd="divider"
    >
      <Columns columns={{xs: '1fr auto'}}>
        <Inline>
          <Box id={id} paddingBlockStart="1">
            <Box paddingBlockStart="05">
              <Text as="h2" variant="headingLg" breakWord>
                {children}
              </Text>
            </Box>
          </Box>
        </Inline>
        <Inline>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </Inline>
      </Columns>
    </Box>
  );
}
