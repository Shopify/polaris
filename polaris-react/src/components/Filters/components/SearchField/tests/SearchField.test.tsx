import React from 'react';
import type {ComponentProps} from 'react';
import {mountWithApp} from 'tests/utilities';

import {SearchField} from '..';
import {TextField} from '../../../../TextField';

jest.mock('../../../../../utilities/breakpoints', () => ({
  ...(jest.requireActual('../../../../../utilities/breakpoints') as any),
  useBreakpoints: jest.fn(),
}));

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}

describe('SearchField', () => {
  const defaultProps: ComponentProps<typeof SearchField> = {
    onChange: jest.fn(),
    value: 'foo',
    placeholder: 'bar',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBreakpoints(false);
  });

  it('will call onChange when changed', () => {
    const props = {...defaultProps};
    const spy = jest.fn();
    const wrapper = mountWithApp(<SearchField {...props} onChange={spy} />, {});

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange');
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('will call onChange correctly when clear button clicked', () => {
    const props = {...defaultProps};
    const wrapper = mountWithApp(<SearchField {...props} />, {});

    wrapper.act(() => {
      wrapper.find(TextField)?.trigger('onClearButtonClick');
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

  it('will add a suffix when there is a selectedViewName and value', () => {
    mockUseBreakpoints(true);
    const wrapper = mountWithApp(<SearchField {...defaultProps} />);

    expect(wrapper).toContainReactText('in:All');
  });

  it('will not add a suffix when there is no selectedViewName', () => {
    const wrapper = mountWithApp(<SearchField {...defaultProps} />);

    expect(wrapper).not.toContainReactText('in:All');
  });

  it('will not add a suffix when there is no value', () => {
    const wrapper = mountWithApp(
      <SearchField {...defaultProps} value={undefined} />,
    );

    expect(wrapper).not.toContainReactText('in:All');
  });
});
