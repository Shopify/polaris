import {type PropsWithChildren, type ComponentType} from 'react';
import {Box} from '../../../Box';
import styles from './styles.module.scss';

export const SideBySide: ComponentType<
  PropsWithChildren<{className: string}>
> = ({children, className}) => (
  <Box className={[styles.SideBySide, className]}>{children}</Box>
);
