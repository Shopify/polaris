import styles from './Card.module.scss';
import {getResponsiveProps, ResponsiveProp} from '../../utils/various';
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
  const style = {
    ...getResponsiveProps('card', 'padding-block-start', 'space', padding),
    ...getResponsiveProps('card', 'padding-block-end', 'space', padding),
    ...getResponsiveProps('card', 'padding-inline-start', 'space', padding),
    ...getResponsiveProps('card', 'padding-inline-end', 'space', padding),
  };
  return (
    <Box style={style} className={[styles.Card, className]}>
      {children}
    </Box>
  );
}
