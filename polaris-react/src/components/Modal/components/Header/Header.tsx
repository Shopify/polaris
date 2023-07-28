import React from 'react';

import {Box} from '../../../Box';
import {CloseButton} from '../CloseButton';
import {HorizontalGrid} from '../../../HorizontalGrid';
import {HorizontalStack} from '../../../HorizontalStack';
import {Text} from '../../../Text';
import {useFeatures} from '../../../../utilities/features';

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
  const {polarisSummerEditions2023} = useFeatures();

  const headerPaddingInline = polarisSummerEditions2023 ? '4' : '5';
  const headerPaddingBlock = '4';

  if (titleHidden || !children) {
    return polarisSummerEditions2023 ? (
      <Box
        position="absolute"
        insetInlineEnd={headerPaddingInline}
        insetBlockStart={headerPaddingBlock}
        zIndex="1"
      >
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Box>
    ) : (
      <Box position="absolute" insetInlineEnd="0" zIndex="1">
        <HorizontalStack gap="4" align="end" blockAlign="center">
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </HorizontalStack>
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
      borderColor={polarisSummerEditions2023 ? 'border' : 'border-subdued'}
      background={
        polarisSummerEditions2023 ? 'bg-secondary-experimental' : undefined
      }
    >
      <HorizontalGrid columns={{xs: '1fr auto'}} gap="4">
        <HorizontalStack gap="4" blockAlign="center">
          <Text
            id={id}
            as="h2"
            variant={polarisSummerEditions2023 ? 'headingMd' : 'headingLg'}
            breakWord
          >
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
