import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../../../Modal';
import {TextField} from '../../../../../../TextField';
import {DuplicateViewModal} from '..';
import type {DuplicateViewModalProps} from '..';

describe('DuplicateViewModal', () => {
  describe('onClose', () => {
    it('fires on the primary action', async () => {
      const props: DuplicateViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onClickPrimaryAction: jest.fn(),
        onClickSecondaryAction: jest.fn(),
        viewNames: ['Foo'],
      };

      const wrapper = mountWithApp(<DuplicateViewModal {...props} />);
      wrapper.find(TextField)!.trigger('onChange', 'Bar');

      await wrapper.act(async () => {
        await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('fires on the secondary action', () => {
      const props: DuplicateViewModalProps = {
        onClose: jest.fn(),
        open: true,
        name: 'Foo',
        onClickPrimaryAction: jest.fn(),
        onClickSecondaryAction: jest.fn(),
      };
      const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

      wrapper.act(() => {
        wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('fires onClickPrimaryAction on the primary action', async () => {
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
      viewNames: ['Foo'],
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);
    wrapper.find(TextField)!.trigger('onChange', 'Bar');

    await wrapper.act(async () => {
      await wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onClickPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('will change the value of the TextField when changed', () => {
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

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
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo Bar');
    });
    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('primaryAction.onAction');
    });

    expect(props.onClickPrimaryAction).toHaveBeenCalledWith('Foo Bar');
  });

  it('resets the value in the TextField once the onClickPrimaryAction has been invoked', async () => {
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

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
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(Modal)!.triggerKeypath('secondaryActions[0].onAction');
    });

    expect(props.onClickSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('shows and error when the view name is already in use; protects against case sensitivity and whitespace', () => {
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
      viewNames: ['Foo', 'Bar', 'Baz'],
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'Foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'Foo',
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'foo');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'foo',
      error:
        'A view with this name already exists. Please choose a different name.',
    });

    wrapper.act(() => {
      wrapper.find(TextField)!.trigger('onChange', 'bar ');
    });

    expect(wrapper).toContainReactComponent(TextField, {
      value: 'bar ',
      error:
        'A view with this name already exists. Please choose a different name.',
    });
  });

  it('resets the value in the TextField to the name prop once the onClickSecondaryAction has been invoked', () => {
    const props: DuplicateViewModalProps = {
      onClose: jest.fn(),
      open: true,
      name: 'Foo',
      onClickPrimaryAction: jest.fn(),
      onClickSecondaryAction: jest.fn(),
    };
    const wrapper = mountWithApp(<DuplicateViewModal {...props} />);

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
