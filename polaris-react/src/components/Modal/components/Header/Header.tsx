import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {Columns} from '../../../Columns';
import {Inline} from '../../../Inline';
import {Text} from '../../../Text';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  closing: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose,
}: HeaderProps) {
  const titleHiddenMarkup = (
    <Box position="absolute" insetInlineEnd="0" zIndex="1">
      <Inline gap="4" align="end">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Inline>
    </Box>
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
      <Columns columns={{xs: '1fr auto'}} gap="4">
        <Inline gap="4">
          <Text id={id} as="h2" variant="headingLg" breakWord>
            {children}
          </Text>
        </Inline>
        <CloseButton
          pressed={closing}
          titleHidden={titleHidden}
          onClick={onClose}
        />
      </Columns>
    </Box>
  );
}
