import {Modal, TextField} from '@shopify/polaris';

import {mountWithAppContext} from 'tests/modern';

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
      const wrapper = await mountWithAppContext(
        <CreateViewModal {...defaultProps} onClose={onClose} />,
      );

      wrapper.find(TextField)!.trigger('onChange', 'Foo');
      await wrapper.act(async () => {
        wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('fires on the secondary action', async () => {
      const onClose = jest.fn();

      const wrapper = await mountWithAppContext(
        <CreateViewModal {...defaultProps} onClose={onClose} />,
      );

      await wrapper.act(async () => {
        wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('fires onPrimaryAction on the primary action', async () => {
    const onPrimaryAction = jest.fn();
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} onPrimaryAction={onPrimaryAction} />,
    );

    wrapper.find(TextField)!.trigger('onChange', 'Foo');

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('will change the value of the TextField when changed', async () => {
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} />,
    );

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });
  });

  it('fires the onPrimaryAction with the changed value', async () => {
    const onPrimaryAction = jest.fn();
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} onPrimaryAction={onPrimaryAction} />,
    );

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });
    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).toHaveBeenCalledWith('Foo Bar');
  });

  it('resets the value in the TextField once the onPrimaryAction has been invoked', async () => {
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} />,
    );

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });
  });

  it('fires onSecondaryAction on the secondary action', async () => {
    const onSecondaryAction = jest.fn();
    const wrapper = await mountWithAppContext(
      <CreateViewModal
        {...defaultProps}
        onSecondaryAction={onSecondaryAction}
      />,
    );

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(onSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', async () => {
    const viewNames = ['foo', 'bar'];
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} viewNames={viewNames} />,
    );

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'foo ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });
  });

  it('is disabled when the value is empty', async () => {
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} />,
    );

    expect(wrapper).toContainReactComponent(Modal, {
      primaryAction: expect.objectContaining({disabled: true}),
    });
  });

  it('clears the field when cancelling out of the Modal', async () => {
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} />,
    );

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: '',
    });
  });

  it('disabled the primary action when the text field matches a viewNames array item', async () => {
    const viewNames = ['foo'];
    const wrapper = await mountWithAppContext(
      <CreateViewModal {...defaultProps} viewNames={viewNames} />,
    );
    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error: expect.any(String),
    });
    expect(wrapper).toContainReactComponent(Modal, {
      primaryAction: expect.objectContaining({disabled: true}),
    });
  });

  it('does not dispatch onPrimaryAction when the text field matches a viewNames array item', async () => {
    const onPrimaryAction = jest.fn();
    const viewNames = ['foo'];
    const wrapper = await mountWithAppContext(
      <CreateViewModal
        {...defaultProps}
        viewNames={viewNames}
        onPrimaryAction={onPrimaryAction}
      />,
    );

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(onPrimaryAction).not.toHaveBeenCalled();
  });
});
