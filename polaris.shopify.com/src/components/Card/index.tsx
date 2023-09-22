import styles from './Card.module.scss';
import {ResponsiveProp} from '../../utils/various';
import {Box, BoxProps} from '../Box';
import React from 'react';
import {SpaceScale} from '@shopify/polaris-tokens';

export function Card({
  children,
  className,
  padding = {xs: '4'},
  height,
}: React.PropsWithChildren<{
  padding?: ResponsiveProp<SpaceScale>;
  className?: string;
  height?: BoxProps['height'];
}>) {
  return (
    <Box padding={padding} className={[styles.Card, className]} height={height}>
      {children}
    </Box>
  );
}
