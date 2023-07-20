import React, {useRef, useState} from 'react';
import {zIndex} from '@shopify/polaris-tokens';

import {useIsomorphicLayoutEffect} from '../../utilities/use-isomorphic-layout-effect';
import {Text} from '../Text';
import {Box} from '../Box';
import {Tooltip} from '../Tooltip';

export interface TruncatedTextProps {
  prop?: string;
}

export const TruncateText = ({children}: {children: string}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.offsetWidth,
      );
    }
  }, [children]);
  const text = (
    <Text as="span" truncate>
      <Box width="100%" ref={textRef}>
        {children}
      </Box>
    </Text>
  );

  return isOverflowing ? (
    <Tooltip
      zIndexOverride={Number(zIndex['z-index-6'])}
      preferredPosition="above"
      hoverDelay={1000}
      content={children}
      dismissOnMouseOut
    >
      <Text as="span" truncate>
        {children}
      </Text>
    </Tooltip>
  ) : (
    text
  );
};
