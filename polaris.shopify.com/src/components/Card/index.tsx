import styles from './Card.module.scss';
import {ResponsiveProp} from '../../utils/various';
import {Box} from '../Box';
import React from 'react';
import {SpaceScale} from '@shopify/polaris-tokens';

export function Card({
  children,
  className,
  padding = {xs: '4'},
}: React.PropsWithChildren<{
  padding?: ResponsiveProp<SpaceScale>;
  className?: string;
}>) {
  return (
    <Box padding={padding} className={[styles.Card, className]}>
      {children}
    </Box>
  );
}
