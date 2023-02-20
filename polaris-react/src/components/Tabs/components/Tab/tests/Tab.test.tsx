import {
  UnstyledButton,
  Popover,
  ActionList,
  Modal,
  UnstyledLink,
} from '@shopify/polaris';
import {mockI18n} from '@shopify/react-i18n-next';

import {mountWithAppContext} from 'tests/modern';

import enTranslations from '../translations/en.json';
import type {TabProps, TabOptionsList} from '../../../types';
import {Tab} from '..';

const i18n = mockI18n([enTranslations]);

describe('Tab', () => {
  const defaultProps: TabProps = {
    id: 'tab-test',
    permissions: ['rename', 'edit', 'duplicate', 'delete'],
    name: 'Unfulfilled',
    isActive: false,
    onAction: jest.fn(),
    onActiveAction: jest.fn(),
    onToggleModal: jest.fn(),
    onTogglePopover: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders <Tab />', async () => {
    const wrapper = await mountWithAppContext(<Tab {...defaultProps} />);

    expect(wrapper).toContainReactText(defaultProps.name);
  });

  it('renders an UnstyledButton if active=false', async () => {
    const wrapper = await mountWithAppContext(<Tab {...defaultProps} />);

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledButton if active=true and no permissions', async () => {
    const wrapper = await mountWithAppContext(
      <Tab {...defaultProps} isActive permissions={[]} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledButton if active=true and undefined permissions', async () => {
    const wrapper = await mountWithAppContext(
      <Tab {...defaultProps} isActive permissions={undefined} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledButton);
    expect(wrapper).not.toContainReactComponent(Popover);
  });

  it('renders an UnstyledLink if url is present', async () => {
    const url = 'https://shopify.com';
    const wrapper = await mountWithAppContext(
      <Tab {...defaultProps} url={url} />,
    );

    expect(wrapper).toContainReactComponent(UnstyledLink, {
      url,
    });
  });

  it('renders the icon prop over the name prop if present', async () => {
    const icon = 'foo';
    const wrapper = await mountWithAppContext(
      <Tab {...defaultProps} icon={icon} />,
    );

    expect(wrapper.find(UnstyledButton)).toContainReactText(icon);
  });

  it('renders a Popover if active=true and we have permissions', async () => {
    const wrapper = await mountWithAppContext(
      <Tab {...defaultProps} isActive />,
    );

    expect(wrapper).toContainReactComponent(Popover);
  });

  describe('callbacks', () => {
    it('fires an onAction callback if isActive is false', async () => {
      const onAction = jest.fn();
      const onActiveAction = jest.fn();
      const wrapper = await mountWithAppContext(
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

    it('fires an onActiveAction callback if isActive is true', async () => {
      const onAction = jest.fn();
      const onActiveAction = jest.fn();
      const wrapper = await mountWithAppContext(
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

      it('renders an ActionList with default props for simple action types', async () => {
        const wrapper = await mountWithAppContext(
          <Tab {...defaultProps} permissions={simpleOptions} isActive />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(ActionList, {
          items: [
            {
              content: i18n.translate('rename'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: i18n.translate('edit'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: i18n.translate('duplicate'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: i18n.translate('delete'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
              destructive: true,
            },
          ],
        });
      });

      it('renders an ActionList with additional ActionListDescriptor props for complex action types', async () => {
        const wrapper = await mountWithAppContext(
          <Tab {...defaultProps} permissions={complexOptions} isActive />,
        );

        wrapper.act(() => {
          wrapper!.find(UnstyledButton)!.trigger('onClick');
        });

        expect(wrapper).toContainReactComponent(ActionList, {
          items: [
            {
              content: i18n.translate('edit'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
          ],
        });
      });

      it('renders an ActionList with either default props or additional ActionListDescriptor props for mixed action types', async () => {
        const wrapper = await mountWithAppContext(
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
              content: i18n.translate('rename'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: i18n.translate('edit'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
              disabled: true,
            },
            {
              content: i18n.translate('duplicate'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
            },
            {
              content: i18n.translate('delete'),
              icon: expect.any(Function),
              onAction: expect.any(Function),
              destructive: true,
            },
          ],
        });
      });

      it('invokes the onConfirmDeleteView callback when the delete modal is confirmed', async () => {
        const onConfirmDeleteView = jest.fn();
        const wrapper = await mountWithAppContext(
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

      it('invokes the onConfirmDuplicateView callback when the delete modal is confirmed', async () => {
        const onConfirmDuplicateView = jest.fn();
        const wrapper = await mountWithAppContext(
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
      async (callbackName, actionListItemText) => {
        const spy = jest.fn();
        const testProps = {
          [`${callbackName}`]: spy,
        };
        const wrapper = await mountWithAppContext(
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
