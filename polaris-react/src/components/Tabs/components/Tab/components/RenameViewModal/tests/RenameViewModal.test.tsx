import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../../../Modal';
import {TextField} from '../../../../../../TextField';
import {RenameViewModal} from '..';
import type {RenameViewModalProps} from '..';

describe('RenameViewModal', () => {
  describe('onClose', () => {
    it('fires on the primary action', async () => {
      const props: RenameViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onClickPrimaryAction: jest.fn(),
        onClickSecondaryAction: jest.fn(),
        viewNames: ['Foo'],
      };

      const wrapper = mountWithApp(<RenameViewModal {...props} />);
      wrapper.find(TextField)!.trigger('onChange', 'Bar');

      await wrapper.act(async () => {
        await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('fires on the secondary action', () => {
      const props: RenameViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onClickPrimaryAction: jest.fn(),
        onClickSecondaryAction: jest.fn(),
      };
      const wrapper = mountWithApp(<RenameViewModal {...props} />);

      wrapper.act(() => {
        wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('fires onClickPrimaryAction on the primary action', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Baz',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
      viewNames: ['Foo'],
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    wrapper.find(TextField)!.trigger('onChange', 'Bar');

    await wrapper.act(async () => {
      await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onClickPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('will change the value of the TextField when changed', () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'Foo',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });
  });

  it('fires the onClickPrimaryAction with the changed value', () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });
    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onClickPrimaryAction).toHaveBeenCalledWith('Foo Bar');
  });

  it('resets the value in the TextField once the onClickPrimaryAction has been invoked', async () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

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

  it('fires onClickSecondaryAction on the secondary action', () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(props.onClickSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('shows an error when the view name is already in use; protects againsts case sensitivity and whitespace', () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Bar',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
      viewNames: ['Foo', 'Foo Bar'],
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
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

  it('resets the value in the TextField to the name prop once the onClickSecondaryAction has been invoked', () => {
    const props: RenameViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<RenameViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'new value');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'new value',
    });

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'Foo',
    });
  });
});
