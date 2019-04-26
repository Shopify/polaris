import * as React from 'react';
import FormState from '@shopify/react-form-state';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {Card, Stack, TextField, Select} from '../src';
import PageActionsModifier from './PageActionsModifier';

interface State {
  loading: boolean;
}

export default class CardForm extends React.PureComponent<never, State> {
  state = {
    loading: false,
  };

  render() {
    const {loading} = this.state;
    return (
      <Card title="Mock Card Form" sectioned>
        <FormState
          onSubmit={this.handleSubmit}
          initialValues={{
            first: '',
            second: '',
          }}
        >
          {({fields, dirty, submit}) => (
            <>
              <Stack vertical>
                <TextField label="Mock Text Field 1" {...fields.first} />
                <TextField
                  label="Mock Multiline Text Field 1"
                  multiline={3}
                  {...fields.second}
                />
              </Stack>
              <PageActionsModifier
                dirty={dirty}
                loading={loading}
                onClick={submit}
              />
            </>
          )}
        </FormState>
      </Card>
    );
  }

  @autobind
  private handleSubmit() {
    this.setState({loading: true});
    setTimeout(() => this.setState({loading: false}), 4000);
  }
}
