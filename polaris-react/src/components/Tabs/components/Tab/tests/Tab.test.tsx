import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {UnstyledButton} from '../../../../UnstyledButton';
import {Popover} from '../../../../Popover';
import {ActionList} from '../../../../ActionList';
import {Modal} from '../../../../Modal';
import {UnstyledLink} from '../../../../UnstyledLink';
import type {TabProps, TabOptionsList} from '../../../types';
import {Tab} from '..';

describe('Tab', () => {
  const defaultProps: TabProps = {
    id: 'tab-test',
    permissions: ['rename', 'edit', 'duplicate', 'delete'],
    content: 'Unfulfilled',
    isActive: false,
    onAction: jest.fn(),
    onActiveAction: jest.fn(),
    onToggleModal: jest.fn(),
    onTogglePopover: jest.fn(),
  };

  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    matchMedia.restore();
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

  it('renders an UnstyledButton if active=true and no permissions', () => {
    const wrapper = mountWithApp(
      <Tab {...defaultProps} isActive permissions={[]} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledButton if active=true and undefined permissions', () => {
    const wrapper = mountWithApp(
      <Tab {...defaultProps} isActive permissions={undefined} />,
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

  it('renders a Popover if active=true and we have permissions', () => {
    const wrapper = mountWithApp(<Tab {...defaultProps} isActive />);

    expect(wrapper).toContainReactComponent(Popover);
  });

  describe('callbacks', () => {
    it('fires an onAction callback if isActive is false', () => {
      const onAction = jest.fn();
      const onActiveAction = jest.fn();
      const wrapper = mountWithApp(
        <Tab
          {...defaultProps}
          onAction={onAction}
          onActiveAction={onActiveAction}
        />,
      );

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onActiveAction).toHaveBeenCalledTimes(0);
    });

    it('fires an onActiveAction callback if isActive is true', () => {
      const onAction = jest.fn();
      const onActiveAction = jest.fn();
      const wrapper = mountWithApp(
        <Tab
          {...defaultProps}
          isActive
          onAction={onAction}
          onActiveAction={onActiveAction}
        />,
      );

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(onAction).toHaveBeenCalledTimes(0);
      expect(onActiveAction).toHaveBeenCalledTimes(1);
    });

    describe('ActionList', () => {
      const simpleOptions: TabOptionsList = [
        'rename',
        'edit',
        'duplicate',
        'delete',
      ];
      const complexOptions: TabOptionsList = [
        {
          type: 'edit',
          disabled: true,
        },
      ];

      it('renders an ActionList with default props for simple action types', () => {
        const wrapper = mountWithApp(
          <Tab {...defaultProps} permissions={simpleOptions} isActive />,
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
            },
            {
              content: 'Edit view',
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
        const wrapper = mountWithApp(
          <Tab {...defaultProps} permissions={complexOptions} isActive />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(ActionList, {
          items: [
            {
              content: 'Edit view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
          ],
        });
      });

      it('renders an ActionList with either default props or additional ActionListDescriptor props for mixed action types', () => {
        const wrapper = mountWithApp(
          <Tab
            {...defaultProps}
            permissions={['rename', ...complexOptions, 'duplicate', 'delete']}
            isActive
          />,
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
            },
            {
              content: 'Edit view',
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
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

      it('invokes the onConfirmDeleteView callback when the delete modal is confirmed', () => {
        const onConfirmDeleteView = jest.fn();
        const wrapper = mountWithApp(
          <Tab
            {...defaultProps}
            isActive
            onConfirmDeleteView={onConfirmDeleteView}
          />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        wrapper.act(() => {
          const actionList = wrapper!.find(ActionList);

          const deleteItem = actionList!.findWhere<'li'>(
            (node) => node.is('button') && node.text() === 'Delete view',
          )!;
          deleteItem.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(Modal, {
          open: true,
          title: 'Delete view?',
        });

        wrapper.act(() => {
          wrapper
            .find(Modal, {
              open: true,
              title: 'Delete view?',
            })
            ?.triggerKeypath('primaryAction.onAction');
        });

        expect(onConfirmDeleteView).toHaveBeenCalledTimes(1);
      });

      it('invokes the onConfirmDuplicateView callback when the delete modal is confirmed', () => {
        const onConfirmDuplicateView = jest.fn();
        const wrapper = mountWithApp(
          <Tab
            {...defaultProps}
            isActive
            onConfirmDuplicateView={onConfirmDuplicateView}
          />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        wrapper.act(() => {
          const actionList = wrapper!.find(ActionList);

          const deleteItem = actionList!.findWhere<'li'>(
            (node) => node.is('button') && node.text() === 'Duplicate view',
          )!;
          deleteItem.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(Modal, {
          open: true,
          title: 'Duplicate view',
        });

        wrapper.act(() => {
          wrapper
            .find(Modal, {
              open: true,
              title: 'Duplicate view',
            })
            ?.triggerKeypath('primaryAction.onAction');
        });

        expect(onConfirmDuplicateView).toHaveBeenCalledTimes(1);
      });
    });

    it.each([
      ['onClickRenameView', 'Rename view'],
      ['onClickEditView', 'Edit view'],
      ['onClickDuplicateView', 'Duplicate view'],
      ['onClickDeleteView', 'Delete view'],
    ])(
      'fires an on%s callback when clicking on the %s action list item',
      (callbackName, actionListItemText) => {
        const spy = jest.fn();
        const testProps = {
          [`${callbackName}`]: spy,
        };
        const wrapper = mountWithApp(
          <Tab {...defaultProps} {...testProps} isActive />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        wrapper.act(() => {
          const actionList = wrapper!.find(ActionList);

          const renameItem = actionList!.findWhere<'li'>(
            (node) => node.is('button') && node.text() === actionListItemText,
          )!;
          renameItem.trigger('onClick');
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(defaultProps.id);
      },
    );
  });
});
