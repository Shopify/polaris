import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../Modal';
import {TextField} from '../../../../TextField';
import {Tooltip} from '../../../../Tooltip';
import {UpdateButtons, UpdateButtonsProps} from '..';
import {UpdateButton} from '../components';

describe('UpdateButtons', () => {
  const defaultProps: UpdateButtonsProps = {
    primaryAction: {
      type: 'save',
      onAction: jest.fn(),
    },
    cancelAction: {
      onAction: jest.fn(),
    },
    viewNames: [],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('will call the primary action when clicked in save mode', () => {
    const wrapper = mountWithApp(<UpdateButtons {...defaultProps} />);

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1]?.trigger('onClick');
    });

    expect(defaultProps.primaryAction!.onAction).toHaveBeenCalledTimes(1);
  });

  it('will call onCancel when cancel clicked', () => {
    const wrapper = mountWithApp(<UpdateButtons {...defaultProps} />);

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[0]?.trigger('onClick');
    });

    expect(defaultProps.cancelAction!.onAction).toHaveBeenCalledTimes(1);
  });

  it('renders the button text correctly in the Save state', () => {
    const wrapper = mountWithApp(<UpdateButtons {...defaultProps} />);

    expect(wrapper.findAll(UpdateButton)[1]).toContainReactText('Save');
  });

  it('renders the button text correctly in a SaveAs state', () => {
    const props: UpdateButtonsProps = {
      ...defaultProps,
      primaryAction: {
        type: 'save-as',
        onAction: jest.fn(),
      },
    };
    const wrapper = mountWithApp(<UpdateButtons {...props} />);

    expect(wrapper.findAll(UpdateButton)[1]).toContainReactText('Save as');
  });

  it('opens the modal and calls the primary action when clicking the primary action in the modal in a SaveAs state', () => {
    const props: UpdateButtonsProps = {
      ...defaultProps,
      primaryAction: {
        type: 'save-as',
        onAction: jest.fn(),
      },
      viewNames: ['foo'],
    };
    const wrapper = mountWithApp(<UpdateButtons {...props} />);

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1].trigger('onClick');
    });

    wrapper.act(() => {
      wrapper.find(TextField)?.trigger('onChange', 'Bar');
    });

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.primaryAction!.onAction).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', () => {
    const props: UpdateButtonsProps = {
      ...defaultProps,
      primaryAction: {
        type: 'save-as',
        onAction: jest.fn(),
      },
      viewNames: ['Foo', 'Bar'],
    };
    const wrapper = mountWithApp(<UpdateButtons {...props} />);

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1].trigger('onClick');
    });

    wrapper.act(() => {
      wrapper.find(TextField)?.trigger('onChange', 'Bar');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)?.trigger('onChange', 'bar');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)?.trigger('onChange', 'bar ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });
  });

  it('disables the buttons when the disabled prop is true', () => {
    const wrapper = mountWithApp(
      <UpdateButtons
        {...defaultProps}
        disabled={{isDisabled: true, tooltipMessage: 'Update disabled'}}
      />,
    );

    const cancelTooltip = wrapper.find(Tooltip, {
      content: 'Update disabled',
    });

    expect(cancelTooltip).toContainReactComponent(UpdateButton, {
      disabled: true,
      children: 'Cancel',
    });

    const saveTooltip = wrapper.findAll(Tooltip, {
      content: 'Update disabled',
    })[1];

    expect(saveTooltip).toContainReactComponent(UpdateButton, {
      disabled: true,
      children: 'Save',
    });
  });

  it('does not render a tooltip when only the update button is disabled', () => {
    const props: UpdateButtonsProps = {
      ...defaultProps,
      primaryAction: {
        type: 'save',
        onAction: jest.fn(),
        disabled: true,
      },
      cancelAction: {
        onAction: jest.fn(),
        disabled: false,
      },
    };
    const wrapper = mountWithApp(
      <UpdateButtons
        {...props}
        disabled={{isDisabled: false, tooltipMessage: 'Update disabled'}}
      />,
    );

    expect(wrapper).not.toContainReactComponent(Tooltip, {
      content: 'Update disabled',
    });
  });
});
