import {forwardRef} from 'react';
import styles from './Table.module.scss';
import {Box, type WithAsProp} from '../Box';

export interface TableProps {}

export const Table = forwardRef(({className, ...props}, ref) => (
  <Box ref={ref} className={[styles.Table, className]} {...props} />
)) as WithAsProp<TableProps>;

Table.displayName = 'Table';

export interface TableHeaderProps {}

export const TableHeader = forwardRef(({className, ...props}, ref) => (
  <Box ref={ref} className={[styles.TableHeader, className]} {...props} />
)) as WithAsProp<TableProps>;

TableHeader.displayName = 'TableHeader';

export interface TableRowProps {}

export const TableRow = forwardRef(({className, ...props}, ref) => (
  <Box ref={ref} className={[styles.TableRow, className]} {...props} />
)) as WithAsProp<TableProps>;

TableRow.displayName = 'TableRowProps';
