import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {UnstyledButton} from '../../../../UnstyledButton';
import {Popover} from '../../../../Popover';
import {ActionList} from '../../../../ActionList';
import {Modal} from '../../../../Modal';
import {UnstyledLink} from '../../../../UnstyledLink';
import type {TabPropsWithAddedMethods} from '../../../types';
import {Tab} from '..';
import {DuplicateModal, RenameModal} from '../components';

describe('Tab', () => {
  const defaultProps: TabPropsWithAddedMethods = {
    id: 'tab-test',
    actions: [
      {
        type: 'rename',
        onAction: jest.fn(),
        onPrimaryAction: jest.fn(),
      },
      {
        type: 'edit',
        onAction: jest.fn(),
        onPrimaryAction: jest.fn(),
      },
      {
        type: 'edit-columns',
        onAction: jest.fn(),
        onPrimaryAction: jest.fn(),
      },
      {
        type: 'duplicate',
        onAction: jest.fn(),
        onPrimaryAction: jest.fn(),
      },
      {
        type: 'delete',
        onAction: jest.fn(),
        onPrimaryAction: jest.fn(),
      },
    ],
    content: 'Unfulfilled',
    selected: false,
    onAction: jest.fn(),
    onToggleModal: jest.fn(),
    onTogglePopover: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders <Tab />', () => {
    const wrapper = mountWithApp(<Tab {...defaultProps} />);

    expect(wrapper).toContainReactText(defaultProps.content);
  });

  it('renders an UnstyledButton if active=false', () => {
    const wrapper = mountWithApp(<Tab {...defaultProps} />);

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledButton if selected=true and no actions', () => {
    const wrapper = mountWithApp(
      <Tab {...defaultProps} selected actions={[]} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledButton if selected=true and undefined actions', () => {
    const wrapper = mountWithApp(
      <Tab {...defaultProps} selected actions={undefined} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledLink if url is present', () => {
    const url = 'https://shopify.com';
    const wrapper = mountWithApp(<Tab {...defaultProps} url={url} />);

    expect(wrapper).toContainReactComponent(UnstyledLink, {
      url,
    });
  });

  it('renders the icon prop over the name prop if present', () => {
    const icon = 'foo';
    const wrapper = mountWithApp(<Tab {...defaultProps} icon={icon} />);

    expect(wrapper.find(UnstyledButton)).toContainReactText(icon);
  });

  it('renders a Popover if selected=true and we have actions', () => {
    const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

    expect(wrapper).toContainReactComponent(Popover);
  });

  describe('callbacks', () => {
    it('fires an onAction callback if selected is false', () => {
      const onAction = jest.fn();
      const wrapper = mountWithApp(
        <Tab {...defaultProps} onAction={onAction} />,
      );

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('invoked the onAction callback when the Space bar is pressed on the Tab', () => {
      const onAction = jest.fn();
      const wrapper = mountWithApp(
        <Tab {...defaultProps} onAction={onAction} url="#" />,
      );

      wrapper.act(() => {
        wrapper!.find(UnstyledLink)!.trigger('onKeyDown', {
          key: ' ',
          preventDefault: jest.fn(),
        });
      });

      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('does not fire an onAction callback if readonly', () => {
      const onAction = jest.fn();
      const wrapper = mountWithApp(
        <Tab {...defaultProps} onAction={onAction} readonly />,
      );

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(onAction).toHaveBeenCalledTimes(0);
    });

    describe('ActionList', () => {
      it('renders an ActionList with default props', () => {
        const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(ActionList, {
          items: [
            {
              content: 'Rename view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: 'Edit view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: 'Edit columns',
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: 'Duplicate view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: 'Delete view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              destructive: true,
            },
          ],
        });
      });

      it('renders an ActionList with additional ActionListDescriptor props for complex action types', () => {
        const complexActions = defaultProps.actions!.map((action) => ({
          ...action,
          disabled: true,
        }));
        const wrapper = mountWithApp(
          <Tab {...defaultProps} selected actions={complexActions} />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(ActionList, {
          items: [
            {
              content: 'Rename view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
            {
              content: 'Edit view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
            {
              content: 'Edit columns',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
            {
              content: 'Duplicate view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
            {
              content: 'Delete view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              destructive: true,
              disabled: true,
            },
          ],
        });
      });

      it.each([
        ['rename', 'Rename view'],
        ['edit', 'Edit view'],
        ['edit-columns', 'Edit columns'],
        ['duplicate', 'Duplicate view'],
        ['delete', 'Delete view'],
      ])(
        'invokes the onAction callback when the %s action is clicked',
        (type, text) => {
          const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

          wrapper.act(() => {
            wrapper!.find(UnstyledButton)!.trigger('onClick');
          });

          wrapper.act(() => {
            const actionList = wrapper!.find(ActionList);

            const item = actionList!.findWhere<'li'>(
              (node) => node.is('button') && node.text() === text,
            )!;
            item.trigger('onClick');
          });

          const action = defaultProps.actions!.find(
            (action) => action.type === type,
          )!.onAction;

          expect(action).toHaveBeenCalledTimes(1);
        },
      );

      describe('rename action', () => {
        it('fires the onPrimaryAction when the primary action in the Modal is clicked', () => {
          const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

          wrapper.act(() => {
            wrapper!.find(UnstyledButton)!.trigger('onClick');
          });

          wrapper.act(() => {
            const actionList = wrapper!.find(ActionList);

            const item = actionList!.findWhere<'li'>(
              (node) => node.is('button') && node.text() === 'Rename view',
            )!;
            item.trigger('onClick');
          });
          expect(wrapper).toContainReactComponent(RenameModal);

          wrapper.act(() => {
            wrapper.find(RenameModal)!.trigger('onClickPrimaryAction');
          });

          expect(
            defaultProps.actions!.find((action) => action.type === 'rename')!
              .onPrimaryAction,
          ).toHaveBeenCalledTimes(1);
        });
      });

      describe('duplicate action', () => {
        it('fires the onPrimaryAction when the primary action in the Modal is clicked', () => {
          const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

          wrapper.act(() => {
            wrapper!.find(UnstyledButton)!.trigger('onClick');
          });

          wrapper.act(() => {
            const actionList = wrapper!.find(ActionList);

            const item = actionList!.findWhere<'li'>(
              (node) => node.is('button') && node.text() === 'Duplicate view',
            )!;
            item.trigger('onClick');
          });
          expect(wrapper).toContainReactComponent(DuplicateModal);

          wrapper.act(() => {
            wrapper.find(DuplicateModal)!.trigger('onClickPrimaryAction');
          });

          expect(
            defaultProps.actions!.find((action) => action.type === 'duplicate')!
              .onPrimaryAction,
          ).toHaveBeenCalledTimes(1);
        });
      });

      describe('delete action', () => {
        it('fires the onPrimaryAction when the primary action in the Modal is clicked', () => {
          const wrapper = mountWithApp(<Tab {...defaultProps} selected />);

          wrapper.act(() => {
            wrapper!.find(UnstyledButton)!.trigger('onClick');
          });

          wrapper.act(() => {
            const actionList = wrapper!.find(ActionList);

            const item = actionList!.findWhere<'li'>(
              (node) => node.is('button') && node.text() === 'Delete view',
            )!;
            item.trigger('onClick');
          });
          const deleteModal = wrapper.find(Modal, {
            open: true,
            title: 'Delete view?',
          })!;
          expect(wrapper).toContainReactComponent(Modal, {
            open: true,
            title: 'Delete view?',
          });
          wrapper.act(() => {
            deleteModal!.triggerKeypath('primaryAction.onAction');
          });

          expect(
            defaultProps.actions!.find((action) => action.type === 'delete')!
              .onPrimaryAction,
          ).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
