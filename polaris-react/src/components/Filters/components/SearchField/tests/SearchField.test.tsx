import React from 'react';
import type {ComponentProps} from 'react';
import {mountWithApp} from 'tests/utilities';

import {TextField} from '../../../../TextField';
import {DisabledTooltipWrapper} from '../../../../DisabledTooltipWrapper';
import {SearchField} from '..';

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
      wrapper.find(TextField)!.trigger('onChange', 'test');
    });

    expect(props.onChange).toHaveBeenCalledWith('test');
  });

  it('will call onChange correctly when clear button clicked', () => {
    const props = {...defaultProps};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll(TextField)[0]?.trigger('onClearButtonClick');
    });

    expect(props.onChange).toHaveBeenCalledWith('');
  });

  it('will call onFocus', () => {
    const props = {...defaultProps, onFocus: jest.fn()};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll(TextField)[0]?.trigger('onFocus');
    });

    expect(props.onFocus).toHaveBeenCalledTimes(1);
  });

  it('will call onBlur', () => {
    const props = {...defaultProps, onBlur: jest.fn()};
    const wrapper = mountWithApp(<SearchField {...props} />);

    wrapper.act(() => {
      wrapper.findAll(TextField)[0]?.trigger('onBlur');
    });

    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('will pass the placeholder', () => {
    const wrapper = mountWithApp(<SearchField {...defaultProps} />);

    expect(wrapper).toContainReactComponent(TextField, {
      placeholder: defaultProps.placeholder,
    });
  });

  it('disables the text field and wraps it in a tooltip when the disabled prop contains disabled info', () => {
    const props: ComponentProps<typeof SearchField> = {
      ...defaultProps,
      disabled: {
        isDisabled: true,
        tooltipMessage: 'Search disabled',
      },
    };
    const wrapper = mountWithApp(<SearchField {...props} />);

    expect(wrapper).toContainReactComponent(TextField, {
      disabled: true,
    });

    expect(wrapper).toContainReactComponent(DisabledTooltipWrapper, {
      disabled: {
        isDisabled: true,
        tooltipMessage: 'Search disabled',
      },
    });
  });
});
