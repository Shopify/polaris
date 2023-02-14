import {forwardRef} from 'react';
import styles from './Table.module.scss';
import {Box, type WithAsProp} from '../Box';

export interface TableContainerProps {}
export const TableContainer = forwardRef(
  ({as = 'div', className, ...props}, ref) => (
    <Box
      ref={ref}
      as={as}
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

export interface TbodyProps {}
export const Tbody = forwardRef(({as = 'tbody', ...props}, ref) => (
  <Box as={as} ref={ref} {...props} />
)) as WithAsProp<TbodyProps, typeof Box, 'tbody'>;
Tbody.displayName = 'Tbody';

export interface TrProps {}
export const Tr = forwardRef(({as = 'tr', className, ...props}, ref) => (
  <Box as={as} ref={ref} className={[styles.Tr, className]} {...props} />
)) as WithAsProp<TrProps, typeof Box, 'tr'>;
Tr.displayName = 'TrProps';

export interface TdProps {
  shrink?: Boolean;
}
export const Td = forwardRef(
  ({as = 'td', shrink = false, className, ...props}, ref) => (
    <Box
      as={as}
      ref={ref}
      className={[styles.Td, shrink && styles.Shrink, className]}
      {...props}
    />
  ),
) as WithAsProp<TdProps, typeof Box, 'td'>;
Td.displayName = 'TdProps';

export interface TableCaptionProps {
  side?: 'bottom' | 'top';
}
export const TableCaption = forwardRef(
  ({as = 'caption', side = 'top', style, className, ...props}, ref) => (
    <Box
      as={as}
      ref={ref}
      style={{
        // @ts-expect-error The types for `style` don't support css vars for
        // some reason
        '--props-table-caption-side': side,
        ...style,
      }}
      className={[styles.TableCaption, className]}
      {...props}
    />
  ),
) as WithAsProp<TableCaptionProps, typeof Box, 'caption'>;
TableCaption.displayName = 'TableCaptionProps';
