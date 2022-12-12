import React from 'react';

import {Page, Button, TextField, Select, Card, Inline} from '../src';

export function Playground() {
  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];
  return (
    <Page title="Playground">
      <Card sectioned>
        <Inline>
          <TextField label="Store name" autoComplete="off" />
          <Select label="Date range" options={options} />
        </Inline>
        <br />
        <Button>Hello</Button>
      </Card>
    </Page>
  );
}
