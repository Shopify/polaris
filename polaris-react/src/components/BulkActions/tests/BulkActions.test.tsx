import React from 'react';
import type {CustomRoot} from 'tests/utilities';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../../ActionList';
import {Tooltip} from '../../Tooltip';
import {CheckableButton} from '../../CheckableButton';
import {BulkActionButton, BulkActionMenu} from '../components';
import type {BulkActionButtonProps} from '../components';
import {BulkActions} from '../BulkActions';
import type {BulkAction, BulkActionsProps} from '../BulkActions';
import type {getVisibleAndHiddenActionsIndices} from '../utilities';
import styles from '../BulkActions.module.scss';

jest.mock('../components', () => ({
  ...jest.requireActual('../components'),
  BulkActionsMeasurer: () => {
    return null;
  },
}));

jest.mock('../utilities', () => ({
  ...jest.requireActual('../utilities'),
  getVisibleAndHiddenActionsIndices: jest.fn(),
}));

function mockGetVisibleAndHiddenActionsIndices(
  args: ReturnType<typeof getVisibleAndHiddenActionsIndices>,
) {
  const getVisibleAndHiddenActionsIndices: jest.Mock =
    jest.requireMock('../utilities').getVisibleAndHiddenActionsIndices;

  getVisibleAndHiddenActionsIndices.mockReturnValue(args);
}

interface Props {
  bulkActions: BulkActionButtonProps['content'][];
  promotedActions: NonNullable<BulkActionsProps['promotedActions']>;
  disabled: boolean;
  accessibilityLabel: string;
  label: string;
  selected: boolean;
  selectMode: boolean;
}

const bulkActionProps: Props = {
  accessibilityLabel: 'Accessibility label',
  label: 'Label',
  selected: false,
  bulkActions: ['button 3', 'button 4', 'button 5'],
  promotedActions: [
    {
      content: 'button 1',
    },
    {
      content: 'button 2',
    },
  ],
  disabled: false,
  selectMode: true,
};

describe('<BulkActions />', () => {
  beforeEach(() => {
    mockGetVisibleAndHiddenActionsIndices({
      visiblePromotedActions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      hiddenPromotedActions: [],
    });
  });

  describe('actions', () => {
    it('indicator is passed to BulkActionButton when actions contain a new tone for badge', () => {
      const bulkActions = mountWithApp(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[]}
          actions={[
            {content: 'Action', badge: {tone: 'new', content: 'Badge'}},
          ]}
        />,
      );

      bulkActions.find(BulkActionButton)?.trigger('onAction');

      expect(bulkActions).toContainReactComponent(BulkActionButton, {
        indicator: true,
      });
    });

    it('indicator is not passed to BulkActionButton when actions does not contain a new status for badge', () => {
      const bulkActions = mountWithApp(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[]}
          actions={[{content: 'Action'}]}
        />,
      );

      bulkActions.find(BulkActionButton)?.trigger('onAction');

      expect(bulkActions).toContainReactComponent(BulkActionButton, {
        indicator: false,
      });
    });

    it('promotedActions render in the last position on initial load', () => {
      const {promotedActions} = bulkActionProps;
      const bulkActions = mountWithApp(
        <BulkActions {...bulkActionProps} promotedActions={promotedActions} />,
      );

      const bulkActionsCount = bulkActions.findAllWhere(
        (node: any) =>
          node.props.content === (promotedActions[0] as BulkAction).content ||
          node.props.content === (promotedActions[1] as BulkAction).content,
      ).length;

      expect(bulkActionsCount).toBe(promotedActions.length);
    });

    it('bulkActions render in the first position on initial load', () => {
      const {bulkActions} = bulkActionProps;
      const bulkActionsElement = mountWithApp(
        <BulkActions {...bulkActionProps} />,
      );
      const bulkActionsCount = bulkActionsElement.findAllWhere(
        (node: any) =>
          node.props.content === bulkActions[0] ||
          node.props.content === bulkActions[1] ||
          node.props.content === bulkActions[2],
      ).length;

      expect(bulkActionsCount).toBe(0);
    });

    it('renders a flat map of actions in a section', () => {
      const bulkActions = mountWithApp(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[]}
          actions={[
            {content: 'Action 1'},
            {content: 'Action 2'},
            {content: 'Action 3'},
          ]}
        />,
      );

      bulkActions.find(BulkActionButton)?.trigger('onAction');

      expect(bulkActions).toContainReactComponent(ActionList, {
        sections: [
          {
            items: [
              {content: 'Action 1'},
              {content: 'Action 2'},
              {content: 'Action 3'},
            ],
          },
        ],
      });
    });

    it('renders a combination of flat and deep actions in sections', () => {
      const bulkActions = mountWithApp(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[]}
          actions={[
            {content: 'Action 1'},
            {content: 'Action 2'},
            {content: 'Action 3'},
            {
              title: 'Action group',
              items: [
                {content: 'Action 4'},
                {content: 'Action 5'},
                {content: 'Action 6'},
              ],
            },
            {content: 'Action 7'},
            {content: 'Action 8'},
            {
              title: 'Action group 2',
              items: [
                {content: 'Action 9'},
                {content: 'Action 10'},
                {content: 'Action 11'},
              ],
            },
            {content: 'Action 12'},
          ]}
        />,
      );

      bulkActions.find(BulkActionButton)?.trigger('onAction');

      expect(bulkActions).toContainReactComponent(ActionList, {
        sections: [
          {
            items: [
              {content: 'Action 1'},
              {content: 'Action 2'},
              {content: 'Action 3'},
            ],
          },
          {
            title: 'Action group',
            items: [
              {content: 'Action 4'},
              {content: 'Action 5'},
              {content: 'Action 6'},
            ],
          },
          {
            items: [{content: 'Action 7'}, {content: 'Action 8'}],
          },
          {
            title: 'Action group 2',
            items: [
              {content: 'Action 9'},
              {content: 'Action 10'},
              {content: 'Action 11'},
            ],
          },
          {
            items: [{content: 'Action 12'}],
          },
        ],
      });
    });
  });

  describe('loading', () => {
    it('disables buttons', () => {
      const bulkActionsElement = mountWithApp(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[
            {
              content: 'button 1',
            },
          ]}
          disabled
        />,
      );

      expect(bulkActionsElement).toContainReactComponentTimes('button', 1, {
        'aria-disabled': true,
      });
    });
  });

  describe('props', () => {
    describe('accessibilityLabel', () => {
      it('is passed down to CheckableButton', () => {
        const {accessibilityLabel} = bulkActionProps;
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);
        const checkableButtonLength =
          bulkActions.findAll(CheckableButton).length;

        expect(bulkActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {
            accessibilityLabel,
          },
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {accessibilityLabel, ...props} = bulkActionProps;
        const bulkActions = mountWithApp(<BulkActions {...props} />);

        expect(bulkActions).toContainReactComponentTimes(CheckableButton, 0, {
          accessibilityLabel,
        });
      });
    });

    describe('selected', () => {
      it('is passed down to CheckableButton', () => {
        const {selected} = bulkActionProps;
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);
        const checkableButtonLength =
          bulkActions.findAll(CheckableButton).length;

        expect(bulkActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {selected},
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {selected, ...props} = bulkActionProps;
        const bulkActions = mountWithApp(<BulkActions {...props} />);

        expect(bulkActions).toContainReactComponentTimes(CheckableButton, 0, {
          selected,
        });
      });
    });

    describe('promotedActions', () => {
      let warnSpy: jest.SpyInstance;

      beforeEach(() => {
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      });

      afterEach(() => {
        warnSpy.mockRestore();
      });

      it('renders a BulkActionButton for each item in promotedActions', () => {
        const bulkActionProps: Props = {
          accessibilityLabel: 'A11y label',
          label: 'Label',
          selected: false,
          bulkActions: [],
          selectMode: true,
          promotedActions: [
            {
              title: 'button1',
              actions: [
                {
                  content: 'action1',
                },
                {
                  content: 'action2',
                },
              ],
            },
            {
              content: 'button 2',
            },
            {
              content: 'button 3',
            },
          ],
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);

        expect(bulkActions).toContainReactComponentTimes(BulkActionButton, 3);
      });

      it('will not render promotedActions that are hidden', () => {
        mockGetVisibleAndHiddenActionsIndices({
          visiblePromotedActions: [0, 1],
          hiddenPromotedActions: [2],
        });
        const bulkActionProps: Props = {
          accessibilityLabel: 'A11y label',
          label: 'Label',
          selected: false,
          bulkActions: [],
          selectMode: true,
          promotedActions: [
            {
              title: 'button1',
              actions: [
                {
                  content: 'action1',
                },
                {
                  content: 'action2',
                },
              ],
            },
            {
              content: 'button 2',
            },
            {
              content: 'button 3',
            },
          ],
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);
        const wrapper = findWrapper(bulkActions);
        expect(wrapper).toContainReactComponentTimes(BulkActionButton, 2);
      });

      it('renders a BulkActionMenu when promotedActions are menus', () => {
        const bulkActionProps: Props = {
          accessibilityLabel: 'A11y label',
          label: 'Label',
          selected: false,
          bulkActions: [],
          selectMode: true,
          promotedActions: [
            {
              title: 'button1',
              actions: [
                {
                  content: 'action1',
                },
                {
                  content: 'action2',
                },
              ],
            },
            {
              title: 'button2',
              actions: [
                {
                  content: 'action1',
                },
                {
                  content: 'action2',
                },
              ],
            },
            {
              content: 'button 2',
            },
            {
              content: 'button 3',
            },
          ],
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);
        const wrapper = findWrapper(bulkActions);
        const bulkActionButtons = wrapper!.findAll(BulkActionButton);
        expect(bulkActionButtons).toHaveLength(4);
        expect(bulkActionButtons[0].text()).toBe('button1');
        expect(bulkActionButtons[1].text()).toBe('button2');
        const bulkActionMenus = wrapper!.findAll(BulkActionMenu);
        expect(bulkActionMenus).toHaveLength(2);
      });

      it('opens a popover menu when clicking on a promoted action that is a menu', () => {
        const promotedActionToBeClicked = {
          title: 'button1',
          actions: [
            {
              content: 'action1',
            },
            {
              content: 'action2',
            },
          ],
        };
        const bulkActionProps: Props = {
          accessibilityLabel: 'A11y label',
          label: 'Label',
          selected: false,
          bulkActions: [],
          selectMode: true,
          promotedActions: [
            {...promotedActionToBeClicked},
            {
              content: 'button 2',
            },
          ],
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);
        const wrapper = findWrapper(bulkActions);

        wrapper!
          .find(BulkActionButton, {
            content: promotedActionToBeClicked.title,
          })
          ?.trigger('onAction');

        const actionList = bulkActions!.find(ActionList);
        expect(actionList!.prop('items')).toBe(
          promotedActionToBeClicked.actions,
        );
      });
    });

    describe('disabled', () => {
      it('is passed down to CheckableButton', () => {
        const disabled = true;
        const bulkActions = mountWithApp(
          <BulkActions {...bulkActionProps} disabled={disabled} />,
        );
        const checkableButtonLength =
          bulkActions.findAll(CheckableButton).length;

        expect(bulkActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {disabled},
        );
      });

      it('will not overwrite the disabled value coming from a promotedAction', () => {
        const bulkActionProps: Props = {
          accessibilityLabel: 'A11y label',
          label: 'Label',
          selected: false,
          bulkActions: [],
          selectMode: true,
          promotedActions: [
            {
              disabled: true,
              content: 'button 1',
            },
          ],
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);

        const wrapper = findWrapper(bulkActions);

        expect(wrapper).toContainReactComponentTimes(BulkActionButton, 1, {
          disabled: true,
        });
      });
    });

    describe('onMoreActionPopoverToggle', () => {
      it('is invoked when the popover is toggled', () => {
        mockGetVisibleAndHiddenActionsIndices({
          visiblePromotedActions: [],
          hiddenPromotedActions: [],
        });
        const spy = jest.fn();
        const bulkActions = mountWithApp(
          <BulkActions
            {...bulkActionProps}
            actions={[{content: 'Action'}]}
            promotedActions={[]}
            onMoreActionPopoverToggle={spy}
          />,
        );

        bulkActions!
          .find(BulkActionButton, {
            content: 'Actions',
          })
          ?.trigger('onAction');

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('more actions', () => {
    it('will be wrapped in a tooltip', () => {
      const manyBulkActions = [
        {content: 'Action'},
        {content: 'Action 2'},
        {content: 'Action 3'},
        {content: 'Action 4'},
        {content: 'Action 5'},
        {content: 'Action 6'},
      ];
      const bulkActions = mountWithApp(
        <BulkActions {...bulkActionProps} actions={manyBulkActions} />,
      );

      expect(bulkActions).toContainReactComponent(Tooltip, {
        content: 'More actions',
      });
    });
  });

  describe('selectMode', () => {
    describe('when false', () => {
      it('will not render any bulk action buttons', () => {
        const bulkActions = mountWithApp(
          <BulkActions {...bulkActionProps} selectMode={false} />,
        );

        expect(bulkActions).not.toContainReactComponent(BulkActionButton);
      });
    });
  });

  describe('deprecated props', () => {
    describe('width', () => {
      it('adds an inline style width if present', () => {
        const bulkActions = mountWithApp(
          <BulkActions {...bulkActionProps} width={200} />,
        );

        expect(bulkActions).toContainReactComponent('div', {
          style: {width: 200},
        });
      });

      it('does not add an inline style width if not present', () => {
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);

        expect(bulkActions).not.toContainReactComponent('div', {
          style: {width: 200},
        });
      });
    });
  });
});

function findWrapper(wrapper: CustomRoot<any, any>) {
  const wrappingDiv = wrapper.findWhere<'div'>((node) => {
    return (
      node.is('div') &&
      Boolean(node.prop('className')) &&
      node.prop('className')!.includes(styles.BulkActionsLayout)
    );
  });

  return wrappingDiv;
}
