import React from 'react';

import {Page, Grid} from '../src';

export function Playground() {
  return (
    <Page title="Playground" fullWidth>
      <Grid>
        <Grid.Cell
          column={{xs: '1 / 2', xl: '1 / 2'}}
          row={{xs: '2 / 6', xl: '2 / 6'}}
        >
          <div
            style={{height: '100%', padding: '16px', background: 'blueviolet'}}
          />
        </Grid.Cell>
        <Grid.Cell column={{xs: '1 / 2', xl: '2 / span 4'}}>
          <div style={{height: '100%', padding: '16px', background: 'blue'}} />
        </Grid.Cell>
        <Grid.Cell
          row={{xs: '1 / span 2', xl: '2 / span 8'}}
          column={{xl: '6 / span 6'}}
        >
          <div
            style={{height: '100%', padding: '16px', background: 'aquamarine'}}
          />
        </Grid.Cell>
        <Grid.Cell column={{xs: '1 / 2', xl: '2 / span 4'}}>
          <div
            style={{
              height: '100%',
              padding: '16px',
              background: 'aqua',
            }}
          />
        </Grid.Cell>
        <Grid.Cell
          column={{xs: '12 / span 1', xl: '12 / span 2'}}
          row={{xl: '2 / span 7'}}
        >
          <div
            style={{height: '100%', padding: '16px', background: 'violet'}}
          />
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
