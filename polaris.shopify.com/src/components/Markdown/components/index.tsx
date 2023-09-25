import {type PropsWithChildren, type ComponentType} from 'react';
import {Stack} from '../../Stack';
import styles from './styles.module.scss';

export const SideBySide: ComponentType<
  PropsWithChildren<{className: string}>
> = ({children, className}) => (
  <Stack gap="400" className={[styles.SideBySide, className]}>
    {children}
  </Stack>
);
