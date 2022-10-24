import React from 'react';

import {Box} from '../../../Box';
import {Columns} from '../../../Columns';
import {DisplayText} from '../../../DisplayText';
import {Inline} from '../../../Inline';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
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
      paddingTop="4"
      paddingBottom="4"
      paddingLeft="5"
      paddingRight="5"
      borderBottom="divider"
    >
      <Columns columns={{xs: '1fr auto'}}>
        <Inline alignY="center">
          <Box id={id}>
            {/* Replace with <Text> once responsive styles supported */}
            <div className={styles.Title}>
              <DisplayText element="h2" size="small">
                {children}
              </DisplayText>
            </div>
          </Box>
        </Inline>
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Columns>
    </Box>
  );
}
