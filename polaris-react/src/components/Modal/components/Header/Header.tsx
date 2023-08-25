import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {InlineGrid} from '../../../InlineGrid';
import {InlineStack} from '../../../InlineStack';
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
  const headerPaddingInline = '4';
  const headerPaddingBlock = '4';

  if (titleHidden || !children) {
    return (
      <Box
        position="absolute"
        insetInlineEnd={headerPaddingInline}
        insetBlockStart={headerPaddingBlock}
        zIndex="1"
      >
        <CloseButton onClick={onClose} />
      </Box>
    );
  }

  return (
    <Box
      paddingBlockStart="4"
      paddingBlockEnd="4"
      paddingInlineStart={headerPaddingInline}
      paddingInlineEnd={headerPaddingInline}
      borderBlockEndWidth="1"
      borderColor="border"
      background="bg-secondary-experimental"
    >
      <InlineGrid columns={{xs: '1fr auto'}} gap="4">
        <InlineStack gap="4" blockAlign="center">
          <Text id={id} as="h2" variant="headingMd" breakWord>
            {children}
          </Text>
        </InlineStack>
        <CloseButton pressed={closing} onClick={onClose} />
      </InlineGrid>
    </Box>
  );
}
