import React from 'react';

import {Box, Columns, Page} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Columns
        columns={['oneHalf', 'twoThirds']}
        gap="4"
        padding={{xs: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Columns>
      <Box
        layout={{component: 'Columns', customProperties: {background: 'red'}}}
      >
        Not a red box
      </Box>
    </Page>
  );
}
