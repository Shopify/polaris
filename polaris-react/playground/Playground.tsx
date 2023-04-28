import React from 'react';

import {HorizontalGrid, Page} from '../src';
import {atoms} from '../src/styles/atoms.css';

console.log(atoms);
export function Playground() {
  return (
    <Page title="Playground">
      <HorizontalGrid columns={3} gap="5">
        <div style={{background: 'red'}}>1</div>
        <div style={{background: 'red'}}>2</div>
        <div style={{background: 'red'}}>3</div>
      </HorizontalGrid>
    </Page>
  );
}
