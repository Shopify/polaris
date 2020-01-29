import React from 'react';
import {Transition, CSSTransition} from '@material-ui/react-transition-group';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, findByTestID} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Popover} from 'components';
import {CheckableButton} from '../../CheckableButton';
import {BulkActions, BulkActionsProps} from '../BulkActions';

interface Props {
  bulkActions: string[];
  promotedActions: NonNullable<BulkActionsProps['promotedActions']>;
  paginatedSelectAllText: string;
  selected: boolean;
  accessibilityLabel: string;
  label: string;
  disabled: boolean;
}

type TestValue = string | boolean;

const bulkActionProps: Props = {
  bulkActions: ['button 3', 'button 4', 'button 5'],
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
    it('promotedActions render in the last position on intial load', () => {
      const {promotedActions} = bulkActionProps;
      const bulkActions = mountWithAppProvider(
        <BulkActions {...bulkActionProps} promotedActions={promotedActions} />,
      );

      const count = bulkActions.find('button')!.filterWhere((el) => {
        const content = el.getDOMNode().textContent;

        return (
          content === promotedActions[0].content ||
          content === promotedActions[1].content
        );
      }).length;
      // Hidden promoted actions & visible promoted actions
      expect(count).toBe(promotedActions.length * 2);
    });

    it('bulkActions render in the first position on initial load', () => {
      const {bulkActions} = bulkActionProps;
      const bulkActionsElement = mountWithAppProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = bulkActionsElement.find('button').filterWhere((el: any) => {
        const content = el.props().content;
        return (
          content === bulkActions[0] ||
          content === bulkActions[1] ||
          content === bulkActions[2]
        );
      }).length;
      expect(count).toBe(0);
    });

    it('renders a Popover when smallScreen is true', () => {
      const bulkActionsElement = mountWithAppProvider(
        <BulkActions {...bulkActionProps} smallScreen />,
      );
      const popover = bulkActionsElement.find(Popover);
      expect(popover).toHaveLength(1);
    });
  });

  describe('loading', () => {
    it('disables buttons', () => {
      const bulkActionsElement = mountWithAppProvider(
        <BulkActions
          {...bulkActionProps}
          promotedActions={[
            {
              content: 'button 1',
            },
          ]}
          paginatedSelectAllAction={{content: 'content', onAction: () => {}}}
          disabled
        />,
      );

      expect(
        bulkActionsElement
          .find('button')
          .filterWhere((element) => Boolean(element.prop('disabled'))),
      ).toHaveLength(2);
    });
  });

  describe('props', () => {
    describe('accessibilityLabel', () => {
      it('is passed down to CheckableButton', () => {
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
      it('is passed down to CheckableButton', () => {
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
      it('is passed down to CheckableButton', () => {
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
      it('is passed down to Transition', () => {
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} selectMode />,
        );
        const transition = bulkActions.find(Transition);
        expect(transition.first().prop('in')).toBe(true);
      });

      it('is passed down to CSSTransition', () => {
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} selectMode />,
        );
        const cssTransition = bulkActions
          .find(CSSTransition)
          .filterWhere((component) => component.prop('appear') === true);
        cssTransition.forEach((cssTransitionComponent) => {
          expect(cssTransitionComponent.prop('in')).toBe(true);
        });
      });

      it('is passed down to CheckableButton', () => {
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
      it('renders a BulkActionButton for each item in promotedActions', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        warnSpy.mockImplementation(() => {});
        const content = 'promoted bulk action';
        const bulkActionProps: Props = {
          bulkActions: [],
          promotedActions: [
            {
              content,
            },
            {
              content,
            },
            {
              content,
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
        const bulkActionButtons = bulkActions
          .find('button')
          .filterWhere((button) => button.contains(content));
        // Hidden and visible promoted actions
        expect(bulkActionButtons).toHaveLength(6);
        warnSpy.mockRestore();
      });
    });

    describe('disabled', () => {
      const bulkActionProps: Props = {
        bulkActions: ['button 3', 'button 4', 'button 5'],
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

      it('is passed down to CheckableButton', () => {
        const {disabled} = bulkActionProps;
        const bulkActions = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = bulkActions.find(CheckableButton).length;
        expect(searchCheckableButton(bulkActions, 'disabled', disabled)).toBe(
          length,
        );
      });

      it('will not overwrite the disabled value coming from a promotedAction', () => {
        const content = 'button 1';
        const bulkActionProps: Props = {
          bulkActions: [],
          promotedActions: [
            {
              disabled: true,
              content,
            },
          ],
          paginatedSelectAllText: 'paginated select all text string',
          selected: false,
          accessibilityLabel: 'test-aria-label',
          label: 'Test-Label',
          disabled: false,
        };
        const bulkActions = mountWithApp(<BulkActions {...bulkActionProps} />);

        expect(bulkActions).toContainReactComponentTimes('button', 2, {
          disabled: true,
        });
      });
    });

    describe('paginatedSelectAllText', () => {
      it('renders when provided', () => {
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
      it('onAction is called when CheckableButton is clicked', () => {
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

  describe('buttongroup', () => {
    // Since we need to break our component model and reach into ButtonGroup to access the CheckableButton
    // and ensure only the first element flex grows, we add this test to ensure the mark-up does not change
    it('has the mark-up structure to target the CheckableButton', () => {
      const bulkActions = mountWithApp(
        <BulkActions {...bulkActionProps} selectMode smallScreen />,
      );

      const checkableButton = bulkActions!
        .find('div', {
          className: 'ButtonGroupWrapper',
        })!
        .domNode!.querySelector('div > div.Item:first-child');
      expect(checkableButton).not.toBeNull();
    });
  });
});
