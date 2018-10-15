import * as React from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import CheckableButton from '../../CheckableButton';
import BulkActionButton from '../components/BulkActionButton';
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
      const element = mountWithAppProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = element.find(BulkActionButton).filterWhere((el: any) => {
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
      const element = mountWithAppProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = element.find(BulkActionButton).filterWhere((el: any) => {
        const content = el.props().content;
        return (
          content === bulkActions[0].content ||
          content === bulkActions[1].content ||
          content === bulkActions[2].content
        );
      }).length;
      expect(count).toBe(0);
    });
  });

  describe('props', () => {
    describe('accessibilityLabel', () => {
      it('correctly passes down to CheckableButton', () => {
        const {accessibilityLabel} = bulkActionProps;
        const element = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const checkableButton = element.find(CheckableButton);
        expect(
          searchCheckableButton(
            element,
            'accessibilityLabel',
            accessibilityLabel,
          ),
        ).toBe(checkableButton.length);
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {accessibilityLabel, ...props} = bulkActionProps;
        const element = mountWithAppProvider(<BulkActions {...props} />);
        expect(
          searchCheckableButton(
            element,
            'accessibilityLabel',
            accessibilityLabel,
          ),
        ).toBe(0);
      });
    });

    describe('label', () => {
      it('correctly passes down to CheckableButton', () => {
        const {label} = bulkActionProps;
        const element = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const checkableButton = element.find(CheckableButton);
        expect(searchCheckableButton(element, 'label', label)).toBe(
          checkableButton.length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {label, ...props} = bulkActionProps;
        const element = mountWithAppProvider(<BulkActions {...props} />);
        expect(searchCheckableButton(element, 'label', label)).toBe(0);
      });
    });

    describe('selected', () => {
      it('correctly passes down to CheckableButton', () => {
        const {selected} = bulkActionProps;
        const element = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        expect(searchCheckableButton(element, 'selected', selected)).toBe(
          length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {selected, ...props} = bulkActionProps;
        const element = mountWithAppProvider(<BulkActions {...props} />);
        expect(searchCheckableButton(element, 'selected', selected)).toBe(0);
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
        const element = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        expect(searchCheckableButton(element, 'disabled', disabled)).toBe(
          length,
        );
      });
    });

    describe('paginatedSelectAllText', () => {
      it('correctly renders when provided', () => {
        const {paginatedSelectAllText} = bulkActionProps;
        const element = mountWithAppProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const text = findByTestID(element, 'paginated-select-all')
          .text()
          .trim();
        expect(text).toBe(paginatedSelectAllText);
      });

      it('does not render when not provided', () => {
        const {paginatedSelectAllText, ...props} = bulkActionProps;
        const element = mountWithAppProvider(<BulkActions {...props} />);
        expect(findByTestID(element, 'paginated-select-all').exists()).toBe(
          false,
        );
      });
    });

    describe('paginatedSelectAllAction', () => {
      it('onAction is correctly called when CheckableButton is clicked', () => {
        const spy = jest.fn();
        const element = mountWithAppProvider(
          <BulkActions
            {...bulkActionProps}
            paginatedSelectAllAction={{content: 'content', onAction: spy}}
          />,
        );
        findByTestID(element, 'paginated-action').simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
