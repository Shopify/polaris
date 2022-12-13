import {forwardRef} from 'react';
import styles from './Table.module.scss';
import {Box, type WithAsProp} from '../Box';

export interface TableContainerProps {
  captionSide?: 'bottom' | 'top';
}
export const TableContainer = forwardRef(
  ({as = 'div', className, captionSide = 'top', style, ...props}, ref) => (
    <Box
      ref={ref}
      as={as}
      style={{
        // @ts-expect-error The types for `style` don't support css vars for
        // some reason
        '--props-table-caption-side': captionSide,
        ...style,
      }}
      className={[styles.TableContainer, className]}
      {...props}
    />
  ),
) as WithAsProp<TableContainerProps, typeof Box, 'div'>;
TableContainer.displayName = 'TableContainer';

export interface TableProps {}
export const Table = forwardRef(({as = 'table', className, ...props}, ref) => (
  <Box as={as} ref={ref} className={[styles.Table, className]} {...props} />
)) as WithAsProp<TableProps, typeof Box, 'table'>;
Table.displayName = 'Table';

export interface TrProps {}
export const Tr = forwardRef(({as = 'tr', className, ...props}, ref) => (
  <Box as={as} ref={ref} className={[styles.Tr, className]} {...props} />
)) as WithAsProp<TableProps, typeof Box, 'tr'>;
Tr.displayName = 'TrProps';

export interface TdProps {}
export const Td = forwardRef(({as = 'td', className, ...props}, ref) => (
  <Box as={as} ref={ref} className={[styles.Td, className]} {...props} />
)) as WithAsProp<TableProps, typeof Box, 'td'>;
Td.displayName = 'TdProps';

export interface TableCaptionProps {}
export const TableCaption = forwardRef(
  ({as = 'caption', className, ...props}, ref) => (
    <Box
      as={as}
      ref={ref}
      className={[styles.TableCaption, className]}
      {...props}
    />
  ),
) as WithAsProp<TableProps, typeof Box, 'caption'>;
TableCaption.displayName = 'TableCaptionProps';
