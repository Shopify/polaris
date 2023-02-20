import {Modal, TextField} from '@shopify/polaris';

import {mountWithAppContext} from 'tests/modern';

import {RenameViewModal} from '..';
import type {RenameViewModalProps} from '..';

describe('RenameViewModal', () => {
  describe('onClose', () => {
    it('fires on the primary action', async () => {
      const props: RenameViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onPrimaryAction: jest.fn(),
        onSecondaryAction: jest.fn(),
        viewNames: ['Foo'],
      };

      const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

      await wrapper.act(async () => {
        await wrapper.find(TextField)!.trigger('onChange', 'Bar');
        await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('fires on the secondary action', async () => {
      const props: RenameViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onPrimaryAction: jest.fn(),
        onSecondaryAction: jest.fn(),
      };
      const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

      await wrapper.act(async () => {
        wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('fires onPrimaryAction on the primary action', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
      viewNames: ['Foo'],
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    await wrapper.act(async () => {
      await wrapper.find(TextField)!.trigger('onChange', 'Bar');
      await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('will change the value of the TextField when changed', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'Foo',
    });

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });
  });

  it('fires the onPrimaryAction with the changed value', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });
    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onPrimaryAction).toHaveBeenCalledWith('Foo Bar');
  });

  it('resets the value in the TextField once the onPrimaryAction has been invoked', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

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
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(props.onSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Bar',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
      viewNames: ['Foo', 'Foo Bar'],
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
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

  it('resets the value in the TextField to the name prop once the onSecondaryAction has been invoked', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onPrimaryAction: jest.fn(),
      onSecondaryAction: jest.fn(),
    };
    const wrapper = await mountWithAppContext(<RenameViewModal {...props} />);

    await wrapper.act(async () => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });

    await wrapper.act(async () => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'Foo',
    });
  });
});
