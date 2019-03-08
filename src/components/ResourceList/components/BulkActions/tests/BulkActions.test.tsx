import * as React from 'react';
import {findByTestID, mountWithPolarisContext} from 'tests/utilities';
import BulkActions from '..';
import {BulkAction} from '../BulkActions';
import BulkActionButton from '../BulkActionButton';
import CheckableButton from '../../CheckableButton';

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
    it('the promotedActions renders two promotedActions buttons in the promoted position on intial load', async () => {
      const {promotedActions} = bulkActionProps;
      const element = await mountWithPolarisContext(
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

    it('bulkActions do not render in the promoted position on initial load', async () => {
      const {bulkActions} = bulkActionProps;
      const element = await mountWithPolarisContext(
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
      it('is passed down to CheckableButton', async () => {
        const {accessibilityLabel} = bulkActionProps;
        const element = await mountWithPolarisContext(
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

      it('does not pass down to CheckableButton when the property is not provided', async () => {
        const {accessibilityLabel, ...props} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...props} />,
        );
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
      it('is passed down to CheckableButton', async () => {
        const {label} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...bulkActionProps} />,
        );
        const checkableButton = element.find(CheckableButton);
        expect(searchCheckableButton(element, 'label', label)).toBe(
          checkableButton.length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', async () => {
        const {label, ...props} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...props} />,
        );
        expect(searchCheckableButton(element, 'label', label)).toBe(0);
      });
    });

    describe('selected', () => {
      it('is passed down to CheckableButton', async () => {
        const {selected} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        expect(searchCheckableButton(element, 'selected', selected)).toBe(
          length,
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', async () => {
        const {selected, ...props} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...props} />,
        );
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
      it('is passed down to CheckableButton', async () => {
        const {disabled} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        expect(searchCheckableButton(element, 'disabled', disabled)).toBe(
          length,
        );
      });
    });

    describe('paginatedSelectAllText', () => {
      it('renders text when provided', async () => {
        const {paginatedSelectAllText} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...bulkActionProps} />,
        );
        const text = findByTestID(element, 'paginated-select-all')
          .text()
          .trim();
        expect(text).toBe(paginatedSelectAllText);
      });

      it('does not render when not provided', async () => {
        const {paginatedSelectAllText, ...props} = bulkActionProps;
        const element = await mountWithPolarisContext(
          <BulkActions {...props} />,
        );
        expect(findByTestID(element, 'paginated-select-all').exists()).toBe(
          false,
        );
      });
    });

    describe('paginatedSelectAllAction', () => {
      it('onAction is called when CheckableButton is clicked', async () => {
        const spy = jest.fn();
        const element = await mountWithPolarisContext(
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
