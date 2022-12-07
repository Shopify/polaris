import styles from './Table.module.scss';
import {Box, BoxProps, forwardRef} from '../Box';
import {className as classNames} from '../../utils/various';

export interface TableProps extends BoxProps {}

export const Table = forwardRef(({className, ...props}: TableProps, ref) => (
  <Box ref={ref} className={classNames(styles.Table, className)} {...props} />
));

export interface TableHeaderProps extends BoxProps {}

export const TableHeader = forwardRef(
  ({className, ...props}: TableHeaderProps, ref) => (
    <Box
      ref={ref}
      className={classNames(styles.TableHeader, className)}
      {...props}
    />
  ),
);

export interface TableRowProps extends BoxProps {}

export const TableRow = forwardRef(
  ({className, ...props}: TableRowProps, ref) => (
    <Box
      ref={ref}
      className={classNames(styles.TableRow, className)}
      {...props}
    />
  ),
);
