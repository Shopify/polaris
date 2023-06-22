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

  if (titleHidden || !children) {
    return (
      <Box
        position="absolute"
        insetInlineEnd={polarisSummerEditions2023 ? '1' : '0'}
        zIndex="1"
      >
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
      paddingInlineStart="5"
      paddingInlineEnd="5"
      borderBlockEndWidth={polarisSummerEditions2023 ? undefined : '1'}
      borderColor="border-subdued"
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
