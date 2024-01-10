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
  const headerPaddingInline = '400';
  const headerPaddingBlock = '400';

  if (titleHidden || !children) {
    return (
      <Box
        sx={{
          position: 'absolute',
          insetInlineEnd: headerPaddingInline,
          insetBlockStart: headerPaddingBlock,
          zIndex: '1',
        }}
      >
        <CloseButton onClick={onClose} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingBlockStart: '400',
        paddingBlockEnd: '400',
        paddingInlineStart: headerPaddingInline,
        paddingInlineEnd: headerPaddingInline,
        borderBlockEndWidth: '025',
        borderColor: 'border',
        background: 'bg-surface-tertiary',
      }}
    >
      <InlineGrid columns={{xs: '1fr auto'}} gap="400">
        <InlineStack gap="400" blockAlign="center">
          <Text id={id} as="h2" variant="headingMd" breakWord>
            {children}
          </Text>
        </InlineStack>
        <CloseButton pressed={closing} onClick={onClose} />
      </InlineGrid>
    </Box>
  );
}
