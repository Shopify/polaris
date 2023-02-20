import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../Modal';
import {TextField} from '../../../../TextField';
import {CreateViewModal} from '..';
import type {CreateViewModalProps} from '..';

describe('CreateViewModal', () => {
  const defaultProps: CreateViewModalProps = {
    onClose: jest.fn(),
    open: true,
    onPrimaryAction: jest.fn(),
    onSecondaryAction: jest.fn(),
    viewNames: [],
    activator: <div>Create View</div>,
  };

  describe('onClose', () => {
    it('fires on the primary action', async () => {
      const onClose = jest.fn();
      const wrapper = mountWithApp(
        <CreateViewModal {...defaultProps} onClose={onClose} />,
      );

      wrapper.find(TextField)!.trigger('onChange', 'Foo');
      await wrapper.act(async () => {
        await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('fires on the secondary action', () => {
      const onClose = jest.fn();

      const wrapper = mountWithApp(
        <CreateViewModal {...defaultProps} onClose={onClose} />,
      );

      wrapper.act(() => {
        wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('fires onPrimaryAction on the primary action', () => {
    const onPrimaryAction = jest.fn();
    const wrapper = mountWithApp(
      <CreateViewModal {...defaultProps} onPrimaryAction={onPrimaryAction} />,
    );

    wrapper.find(TextField)!.trigger('onChange', 'Foo');

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('will change the value of the TextField when changed', () => {
    const wrapper = mountWithApp(<CreateViewModal {...defaultProps} />);

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });
  });

  it('fires the onPrimaryAction with the changed value', () => {
    const onPrimaryAction = jest.fn();
    const wrapper = mountWithApp(
      <CreateViewModal {...defaultProps} onPrimaryAction={onPrimaryAction} />,
    );

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });
    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).toHaveBeenCalledWith('Foo Bar');
  });

  it('resets the value in the TextField once the onPrimaryAction has been invoked', async () => {
    const wrapper = mountWithApp(<CreateViewModal {...defaultProps} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });

    await wrapper.act(async () => {
      await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });
  });

  it('fires onSecondaryAction on the secondary action', () => {
    const onSecondaryAction = jest.fn();
    const wrapper = mountWithApp(
      <CreateViewModal
        {...defaultProps}
        onSecondaryAction={onSecondaryAction}
      />,
    );

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(onSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', () => {
    const viewNames = ['foo', 'bar'];
    const wrapper = mountWithApp(
      <CreateViewModal {...defaultProps} viewNames={viewNames} />,
    );

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });
  });

  it('is disabled when the value is empty', () => {
    const wrapper = mountWithApp(<CreateViewModal {...defaultProps} />);

    expect(wrapper).toContainReactComponent(Modal, {
      primaryAction: expect.objectContaining({disabled: true}),
    });
  });

  it('clears the field when cancelling out of the Modal', () => {
    const wrapper = mountWithApp(<CreateViewModal {...defaultProps} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });
  });

  it('disabled the primary action when the text field matches a viewNames array item', () => {
    const viewNames = ['foo'];
    const wrapper = mountWithApp(
      <CreateViewModal {...defaultProps} viewNames={viewNames} />,
    );
    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error: expect.any(String),
    });
    expect(wrapper).toContainReactComponent(Modal, {
      primaryAction: expect.objectContaining({disabled: true}),
    });
  });

  it('does not dispatch onPrimaryAction when the text field matches a viewNames array item', () => {
    const onPrimaryAction = jest.fn();
    const viewNames = ['foo'];
    const wrapper = mountWithApp(
      <CreateViewModal
        {...defaultProps}
        viewNames={viewNames}
        onPrimaryAction={onPrimaryAction}
      />,
    );

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).not.toHaveBeenCalled();
  });
});
