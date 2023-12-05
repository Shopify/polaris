import React from 'react';
import type {ReactNode} from 'react';

import {useSection} from '../Section';
import {Box} from '../../../Box';
import {Text} from '../../../Text';

interface HeaderProps {
  children: ReactNode;
}

export function Header({children}: HeaderProps) {
  const sectionId = useSection() || '';

  const content =
    typeof children === 'string' ? (
      <Box
        paddingBlockStart="200"
        paddingInlineStart="400"
        paddingBlockEnd="200"
        paddingInlineEnd="400"
      >
        <Text as="span" variant="headingSm" tone="subdued">
          {children}
        </Text>
      </Box>
    ) : (
      children
    );

  return (
    <div aria-hidden id={sectionId}>
      {content}
    </div>
  );
}
