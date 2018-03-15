import * as React from 'react';
import {mount} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import {TextField, Button} from '../../';
import Form from '../Form';

describe('<Form />', () => {
  it('submits the form with preventDefault and calls the onSubmit', () => {
    const onSubmitSpy = jest.fn();
    const preventDefaultSpy = jest.fn();

    const wrapper = mount(
      <Form onSubmit={onSubmitSpy}>
        <TextField label="foo" onChange={noop} />
        <Button submit />
      </Form>,
    );

    wrapper.find(Button).simulate('submit', {
      preventDefault: preventDefaultSpy,
    });

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});
