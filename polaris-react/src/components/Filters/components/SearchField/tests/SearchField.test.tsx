import type {ComponentProps} from 'react';
import {TextField} from '@shopify/polaris';

import {DisabledTooltipWrapper} from 'components/DisabledTooltipWrapper';
import {mountWithAppContext} from 'tests/modern';

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

  it('will call onChange when changed', async () => {
    const props = {...defaultProps};
    const wrapper = await mountWithAppContext(<SearchField {...props} />);

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'test');
    });

    expect(props.onChange).toHaveBeenCalledWith('test');
  });

  it('will call onChange correctly when clear button clicked', async () => {
    const props = {...defaultProps};
    const wrapper = await mountWithAppContext(<SearchField {...props} />);

    await wrapper.act(async () => {
      wrapper.findAll(TextField)[0]?.trigger('onClearButtonClick');
    });

    expect(props.onChange).toHaveBeenCalledWith('');
  });

  it('will call onFocus', async () => {
    const props = {...defaultProps, onFocus: jest.fn()};
    const wrapper = await mountWithAppContext(<SearchField {...props} />);

    await wrapper.act(async () => {
      wrapper.findAll(TextField)[0]?.trigger('onFocus');
    });

    expect(props.onFocus).toHaveBeenCalledTimes(1);
  });

  it('will call onBlur', async () => {
    const props = {...defaultProps, onBlur: jest.fn()};
    const wrapper = await mountWithAppContext(<SearchField {...props} />);

    await wrapper.act(async () => {
      wrapper.findAll(TextField)[0]?.trigger('onBlur');
    });

    expect(props.onBlur).toHaveBeenCalledTimes(1);
  });

  it('will pass the placeholder', async () => {
    const wrapper = await mountWithAppContext(
      <SearchField {...defaultProps} />,
    );

    expect(wrapper).toContainReactComponent(TextField, {
      placeholder: defaultProps.placeholder,
    });
  });

  it('disables the text field and wraps it in a tooltip when the disabled prop contains disabled info', async () => {
    const props: ComponentProps<typeof SearchField> = {
      ...defaultProps,
      disabled: {
        isDisabled: true,
        tooltipMessage: 'Search disabled',
      },
    };
    const wrapper = await mountWithAppContext(<SearchField {...props} />);

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
