import React from 'react';
import type {ComponentProps} from 'react';
import {mountWithApp} from 'tests/utilities';

import {SearchField} from '..';
import {UnstyledButton} from '../../../../UnstyledButton';

describe('SearchField', () => {
  const defaultProps: ComponentProps<typeof SearchField> = {
    onChange: jest.fn(),
    value: 'foo',
    placeholder: 'bar',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('will call onChange when changed', () => {
    const props = {...defaultProps};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.find('input')!.trigger('onChange');
    });

    expect(props.onChange).toHaveBeenCalledWith('foo');
  });

  it('will call onChange correctly when clear button clicked', () => {
    const props = {...defaultProps};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll(UnstyledButton)[0]?.trigger('onClick');
    });

    expect(props.onChange).toHaveBeenCalledWith('');
  });

  it('will call onFocus', () => {
    const props = {...defaultProps, onFocus: jest.fn()};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll('input')[0]?.trigger('onFocus');
    });

    expect(props.onFocus).toHaveBeenCalledTimes(1);
  });

  it('will call onBlur', () => {
    const props = {...defaultProps, onBlur: jest.fn()};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll('input')[0]?.trigger('onBlur');
    });

    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('will pass the placeholder', () => {
    const wrapper = mountWithApp(<SearchField {...defaultProps} />);

    expect(wrapper).toContainReactComponent('input', {
      placeholder: defaultProps.placeholder,
    });
  });
});
