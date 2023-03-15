import { ReactNode } from 'react';

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
        paddingBlockStart="2"
        paddingInlineStart="4"
        paddingBlockEnd="2"
        paddingInlineEnd="4"
      >
        <Text as="span" variant="headingXs" color="subdued">
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
