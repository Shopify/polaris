import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../Modal';
import {TextField} from '../../../../TextField';
import {Tooltip} from '../../../../Tooltip';
import {UpdateButtons} from '..';
import {UpdateButton} from '../components';
import {IndexFiltersUpdateAction} from '../../../types';

describe('UpdateButtons', () => {
  const defaultProps = {
    onCancel: jest.fn(),
    onUpdate: jest.fn(),
    onSave: jest.fn(),
    onSaveAs: jest.fn(),
    newViewName: 'Foo',
    updateButtonState: IndexFiltersUpdateAction.Update,
    viewNames: [],
  };

  it('will call onUpdate when changed', () => {
    const onUpdate = jest.fn();
    const wrapper = mountWithApp(
      <UpdateButtons {...defaultProps} onUpdate={onUpdate} />,
    );

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1]?.trigger('onClick');
    });

    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('will call onCancel when cancel clicked', () => {
    const props = {
      ...defaultProps,
      updateButtonState: IndexFiltersUpdateAction.SaveAs,
    };
    const wrapper = mountWithApp(<UpdateButtons {...defaultProps} />);

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[0]?.trigger('onClick');
    });

    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders the button text correctly in the Update state and will call onUpdate when clicked', () => {
    const props = {
      ...defaultProps,
      onUpdate: jest.fn(),
    };
    const wrapper = mountWithApp(<UpdateButtons {...props} />);

    expect(wrapper.findAll(UpdateButton)[1]).toContainReactText('Save');

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1].trigger('onClick');
    });

    expect(props.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('renders the button text correctly in a SaveAs state but will not call onSaveAs when clicked', () => {
    const props = {
      ...defaultProps,
      onSaveAs: jest.fn(),
      updateButtonState: IndexFiltersUpdateAction.SaveAs,
    };
    const wrapper = mountWithApp(<UpdateButtons {...props} />);

    expect(wrapper.findAll(UpdateButton)[1]).toContainReactText('Save as');

    wrapper.act(() => {
      wrapper.findAll(UpdateButton)[1].trigger('onClick');
    });

    expect(props.onSaveAs).toHaveBeenCalledTimes(0);
  });

  it('opens the modal and calls onSaveAs when clicking the primary action in the modal in a SaveAs state', () => {
    const props = {
      ...defaultProps,
      onSaveAs: jest.fn(),
      updateButtonState: IndexFiltersUpdateAction.SaveAs,
      viewNames: ['Foo'],
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

    expect(props.onSaveAs).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', () => {
    const props = {
      ...defaultProps,
      onSaveAs: jest.fn(),
      updateButtonState: IndexFiltersUpdateAction.SaveAs,
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
    const wrapper = mountWithApp(
      <UpdateButtons
        {...defaultProps}
        disabled={{isDisabled: false, tooltipMessage: 'Update disabled'}}
        updateButtonDisabled
      />,
    );

    expect(wrapper).not.toContainReactComponent(Tooltip, {
      content: 'Update disabled',
    });
  });
});
