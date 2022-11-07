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
  closing: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({id, titleHidden, children, onClose}: HeaderProps) {
  const titleHiddenMarkup = (
    <div className={styles.titleHidden}>
      <Inline align="end">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Inline>
    </div>
  );

  if (titleHidden || !children) {
    return titleHiddenMarkup;
  }

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
          <Text id={id} as="h2" variant="headingLg" breakWord>
            {children}
          </Text>
        </Inline>
        <Inline>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </Inline>
      </Columns>
    </Box>
  );
}
