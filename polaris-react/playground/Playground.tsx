import React from 'react';

import {Page} from '../src';
import breakpoints from '../src/tokens/token-groups/breakpoints.json';

import styles from './Playground.scss';

export function Playground() {
  return (
    <Page title="Playground">
      <hr />
      <h2>Scss variables:</h2>
      <br />
      {Object.entries(breakpoints).map(([token, breakpoint]) => (
        <div key={token}>
          $p-{token}: {parseInt(breakpoint, 10) / 16}em;
          <br />
        </div>
      ))}

      <br />
      <hr />
      <hr />

      <br />
      <h2>Scss variables / media conditions:</h2>
      <br />

      {Object.entries(breakpoints).map(([token]) => (
        <div key={token} className={styles.mediaConditions}>
          <br />
          $p-{token}-up
          <div className={styles[`${token}-up`]} />
          <br />
          $p-{token}-down
          <div className={styles[`${token}-down`]} />
          <br />
          $p-{token}-only
          <div className={styles[`${token}-only`]} />
          <br />
          <hr />
          <br />
        </div>
      ))}
    </Page>
  );
}
