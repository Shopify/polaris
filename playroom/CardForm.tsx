import * as React from 'react';
import FormState from '@shopify/react-form-state';
import {Card, Stack, TextField, Select} from '../src';

export default function CardForm() {
  return (
    <Card title="Mock Card Form" sectioned>
      <FormState
        initialValues={{
          first: '',
          second: '',
        }}
      >
        {({fields}) => (
          <Stack vertical>
            <TextField label="Mock Text Field 1" {...fields.first} />
            <TextField
              label="Mock Multiline Text Field 1"
              multiline={3}
              {...fields.second}
            />
            {/* <Select
              label="Mock Select 1"
              options={[
                {label: 'Today', value: 'today'},
                {label: 'Yesterday', value: 'yesterday'},
                {label: 'Last 7 days', value: 'lastWeek'},
              ]}
            /> */}
          </Stack>
        )}
      </FormState>
    </Card>
  );
}
