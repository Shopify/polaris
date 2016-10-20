// @flow

import React from 'react';
import styles from './Table.scss';

type Props = {
  headings: string[],
  rows: (any[])[],
};

export default function Table({headings, rows}: Props) {
  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {headings.map((heading, index) => <th key={index}>{heading}</th>)}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
