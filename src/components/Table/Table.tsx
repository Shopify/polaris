import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Table.scss';

export interface Props {
  headings: string[],
  rows: any[],
  fullWidth?: boolean,
  striped?: boolean,
  rowRenderer?(row: any, index: number): React.ReactNode,
};

export default function Table({
  headings,
  rows,
  fullWidth,
  striped,
  rowRenderer = defaultRenderer,
}: Props) {

  const className = classNames(
    styles.Table,
    fullWidth && styles.fullWidth,
    striped && styles.striped,
  );

  return (
    <table className={className}>
      <thead>
        <tr>
          {headings.map((heading, index) => <th key={index}>{heading}</th>)}
        </tr>
      </thead>

      <tbody>
        {rows.map(rowRenderer)}
      </tbody>
    </table>
  );
}

function defaultRenderer(row: any, index: number) {
  return (
    Array.isArray(row)
    ? (
      <tr key={index}>
      {row.map((cell: any, cellIndex: number) => {
        return (<td key={cellIndex}>{cell}</td>);
      })};
    </tr>
    )
    : (
      <td>{row.toString()}</td>
    )
  );
}
