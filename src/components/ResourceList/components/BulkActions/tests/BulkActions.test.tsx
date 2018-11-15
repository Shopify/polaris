import * as React from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import {Popover} from 'components';
import CheckableButton from '../../CheckableButton';
import {BulkActionButton} from '../components';
import BulkActions, {BulkAction} from '../BulkActions';

export interface Props {
  bulkActions: BulkAction[];
  promotedActions: BulkAction[];
  paginatedSelectAllText: string;
  selected: boolean;
  accessibilityLabel: string;
  label: string;
  disabled: boolean;
}

export type TestValue = BulkAction[] | string | boolean;

const bulkActionProps: Props = {
  bulkActions: [
    {
      content: 'button 3',
    },
    {
      content: 'button 4',
    },
    {
      content: 'button 5',
    },
  ],
  promotedActions: [
    {
      content: 'button 1',
    },
    {
      content: 'button 2',
    },
  ],
  paginatedSelectAllText: 'paginated select all text string',
  selected: false,
  accessibilityLabel: 'test-aria-label',
  label: 'Test-Label',
  disabled: false,
};

function searchCheckableButton(
  element: any,
  key: string,
  testValue: TestValue,
) {
  return element
    .find(CheckableButton)
    .filterWhere((el: any) => el.props()[key] === testValue).length;
}

describe('<BulkActions />', () => {
  describe('actions', () => {
    it('promotedActions render in the correct position on intial load', () => {
      const {promotedActions} = bulkActionProps;
      const bulkActions = mountWithAppProvider(
        <BulkActions {...bulkActionProps} promotedActions={promotedActions} />,
      );
      const count = bulkActions
        .find(BulkActionButton)
        .filterWhere((el: any) => {
          const content = el.props().content;
          return (
            content === promotedActions[0].content ||
            content === promotedActions[1].content
          );
        }).length;
      expect(count).toBe(promotedActions.length);
    });

    it('bulkActions render in the correct position on initial load', () => {
      const {bulkActions} = bulkActionProps;
      const bulkActionsElement = mountWithAppProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = bulkActionsElement
        .find(BulkActionButton)
        .filterWhere((el: any) => {
          const content = el.props().content;
          return (
            content === bulkActions[0].content ||
            content === bulkActions[1].content ||
            content === bulkActions[2].content
          );
        }).length;
      expect(count).toBe(0);
    });

    it('renders a Popover', () => {
      const bulkActionsElement = mountWithAppProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const popover = bulkActionsElement.find(Popover);
      expect(popover).toHaveLength(1);
    });
  });

  describe('props', () => {
    describe('accessibilityLabel', () => {
      it('correctly passes down to CheckableButton', () => {
        const {accessibilityLabel} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const checkableButton = bulkActions.find(CheckableButton);
        expect(
          searchCheckableButton(
            bulkActions,
            'accessibilityLabel',
            accessibilityLabel,
          ),
        ).toBe(checkableButton.length);
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {accessibilityLabel, ...props} = bulkActionProps;
        const bulkActions = mountWithAppProvider(<BulkActions {...props} />);
        expect(
          searchCheckableButton(
            bulkActions,
            'accessibilityLabel',
            accessibilityLabel,
          ),
        ).toBe(0);
      });
    });

    describe('label', () => {
      it('correctly passes down to CheckableButton', () => {
        const {label} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const checkableButton = bulkActions.find(CheckableButton);
        expect(searchCheckableButton(bulkActions, 'label', label)).toBe(
          checkableButton.length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {label, ...props} = bulkActionProps;
        const bulkActions = mountWithAppProvider(<BulkActions {...props} />);
        expect(searchCheckableButton(bulkActions, 'label', label)).toBe(0);
      });
    });

    describe('selected', () => {
      it('correctly passes down to CheckableButton', () => {
        const {selected} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = bulkActions.find(CheckableButton).length;
        expect(searchCheckableButton(bulkActions, 'selected', selected)).toBe(
          length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {selected, ...props} = bulkActionProps;
        const bulkActions = mountWithAppProvider(<BulkActions {...props} />);
        expect(searchCheckableButton(bulkActions, 'selected', selected)).toBe(
          0,
        );
      });
    });

    describe('selectMode', () => {
      it('correctly passes down to Transition', () => {
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} selectMode />,
        );
        const transition = bulkActions.find(Transition);
        expect(transition.first().prop('in')).toBe(true);
      });

      it('correctly passes down to CSSTransition', () => {
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} selectMode />,
        );
        const cssTransition = bulkActions.find(CSSTransition);
        cssTransition.forEach((cssTransitionComponent) => {
          expect(cssTransitionComponent.prop('in')).toBe(true);
        });
      });

      it('correctly passes down to CheckableButton', () => {
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} selectMode />,
        );
        const checkableButton = bulkActions.find(CheckableButton);
        checkableButton.forEach((checkableButtonComponent) => {
          expect(checkableButtonComponent.prop('selectMode')).toBe(true);
        });
      });
    });

    describe('promotedActions', () => {
      it('renders a BulkActionButton for actions and one for each item in promotedActions', () => {
        const bulkActionProps: Props = {
          bulkActions: [],
          promotedActions: [
            {
              content: 'button 1',
            },
            {
              content: 'button 2',
            },
            {
              content: 'button 3',
            },
          ],
          paginatedSelectAllText: 'paginated select all text string',
          selected: false,
          accessibilityLabel: 'test-aria-label',
          label: 'Test-Label',
          disabled: false,
        };
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const bulkActionButtons = bulkActions.find(BulkActionButton);
        expect(bulkActionButtons).toHaveLength(4);
      });
    });

    describe('disabled', () => {
      const bulkActionProps: Props = {
        bulkActions: [
          {
            content: 'button 3',
          },
          {
            content: 'button 4',
          },
          {
            content: 'button 5',
          },
        ],
        promotedActions: [
          {
            content: 'button 1',
          },
          {
            content: 'button 2',
          },
        ],
        paginatedSelectAllText: 'paginated select all text string',
        selected: false,
        accessibilityLabel: 'test-aria-label',
        label: 'Test-Label',
        disabled: true,
      };

      it('correctly passes down to CheckableButton', () => {
        const {disabled} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = bulkActions.find(CheckableButton).length;
        expect(searchCheckableButton(bulkActions, 'disabled', disabled)).toBe(
          length,
        );
      });
    });

    describe('paginatedSelectAllText', () => {
      it('correctly renders when provided', () => {
        const {paginatedSelectAllText} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const text = findByTestID(bulkActions, 'paginated-select-all')
          .text()
          .trim();
        expect(text).toBe(paginatedSelectAllText);
      });

      it('does not render when not provided', () => {
        const {paginatedSelectAllText, ...props} = bulkActionProps;
        const bulkActions = mountWithAppProvider(<BulkActions {...props} />);
        expect(findByTestID(bulkActions, 'paginated-select-all').exists()).toBe(
          false,
        );
      });
    });

    describe('paginatedSelectAllAction', () => {
      it('onAction is correctly called when CheckableButton is clicked', () => {
        const spy = jest.fn();
        const bulkActions = mountWithAppProvider(
          <BulkActions
            {...bulkActionProps}
            paginatedSelectAllAction={{content: 'content', onAction: spy}}
          />,
        );
        findByTestID(bulkActions, 'paginated-action').simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
