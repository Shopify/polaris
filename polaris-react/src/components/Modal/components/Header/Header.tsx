import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {HorizontalGrid} from '../../../HorizontalGrid';
import {HorizontalStack} from '../../../HorizontalStack';
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
      <HorizontalStack gap="4" align="end" blockAlign="center">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </HorizontalStack>
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
      <HorizontalGrid columns={{xs: '1fr auto'}} gap="4">
        <HorizontalStack gap="4" blockAlign="center">
          <Text id={id} as="h2" variant="headingLg" breakWord>
            {children}
          </Text>
        </HorizontalStack>
        <CloseButton
          pressed={closing}
          titleHidden={titleHidden}
          onClick={onClose}
        />
      </HorizontalGrid>
    </Box>
  );
}
