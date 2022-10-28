import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {Columns} from '../../../Columns';
// import {DisplayText} from '../../../DisplayText';
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
          <Box id={id} paddingBlockStart="1">
            {/* Replace with <Text> once responsive styles supported */}
            {/* <div className={styles.Title}>
              <DisplayText element="h2" size="small">
                {children}
              </DisplayText>
            </div> */}
            <Text as="h2" variant="headingXl" fontWeight="regular">
              {children}
            </Text>
          </Box>
        </Inline>
        <Inline>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </Inline>
      </Columns>
    </Box>
  );
}
