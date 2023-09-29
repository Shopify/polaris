import styles from './Card.module.scss';
import {ResponsiveProp} from '../../utils/various';
import {Box, BoxProps} from '../Box';
import React from 'react';
import {SpaceScale} from '@shopify/polaris-tokens';

export interface CardProps extends BoxProps {
  padding?: ResponsiveProp<SpaceScale>;
  className?: string;
}
export function Card({
  children,
  className,
  padding = {xs: '400'},
  ...props
}: React.PropsWithChildren<CardProps>) {
  return (
    <Box padding={padding} className={[styles.Card, className]} {...props}>
      {children}
    </Box>
  );
}
