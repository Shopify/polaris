import * as React from 'react';
import {findByTestID} from '../../../../../../tests/utilities/enzyme';
import {mountWithProvider} from '../../../../../../tests/utilities';
import BulkActions from '../';
import BulkActionButton from '../BulkActionButton';
import CheckableButton from '../../CheckableButton';

export interface Props {
  bulkActions: {content: string}[],
  promotedActions: {content: string}[],
  paginatedSelectAllText: string,
  selected: boolean,
  accessibilityLabel: string,
  label: string,
}

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
};

describe('<BulkActions />', () => {
  describe('actions', () => {
    it('promotedActions render in the correct position', () => {
      const {promotedActions} = bulkActionProps;
      const element = mountWithProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = element.find(BulkActionButton).reduce((a: number, e: any) => {
        const content = e.props().content;
        return (content && content === promotedActions[0].content || content === promotedActions[1].content)
          ? ++a
          : a;
      }, 0);
      expect(count).toBe(2);
    });

    it('bulkActions render in the correct position', () => {
      const {bulkActions} = bulkActionProps;
      const element = mountWithProvider(
        <BulkActions {...bulkActionProps} />,
      );
      const count = element.find(BulkActionButton).reduce((a: number, e: any) => {
        const content = e.props().content;
        return (content && content === bulkActions[0].content || content === bulkActions[1].content || content === bulkActions[2].content)
          ? ++a
          : a;
      }, 0);
      expect(count).toBe(0);
    });
  });

  describe('props', () => {
    describe('accessibilityLabel', () => {
      it('is provided to CheckableButton when provided', () => {
        const {accessibilityLabel} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().accessibilityLabel;
          return (content && content === accessibilityLabel)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(length);
      });

      it('is not passed to Checkable when not provided', () => {
        const {accessibilityLabel, ...props} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...props} />,
        );
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().accessibilityLabel;
          return (content && content === accessibilityLabel)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(0);
      });
    });

    describe('label', () => {
      it('is passed to CheckableButton when provided', () => {
        const {label} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().label;
          return (content && content === label)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(length);
      });

      it('is not passed to CheckableButton is it not provided', () => {
        const {label, ...props} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...props} />,
        );
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().label;
          return (content && content === label)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(0);
      });
    });

    describe('selected', () => {
      it('is passed to CheckableButton when provided', () => {
        const {selected} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const length = element.find(CheckableButton).length;
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().selected;
          return (content !== undefined && Boolean(content) === selected)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(length);
      });

      it('is not passed to Checkable button when it is not provided', () => {
        const {selected, ...props} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...props} />,
        );
        const count = element.find(CheckableButton).reduce((a: number, e: any) => {
          const content = e.props().selected;
          return (content !== undefined && Boolean(content) === selected)
            ? ++a
            : a;
        }, 0);

        expect(count).toBe(0);
      });
    });

    describe('paginatedSelectAllText', () => {
      it('renders when exists', () => {
        const {paginatedSelectAllText} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...bulkActionProps} />,
        );
        const text = findByTestID(element, 'paginated-select-all').text().trim();
        expect(text).toBe(paginatedSelectAllText);
      });

      it('does not render when prop is not set', () => {
        const {paginatedSelectAllText, ...props} = bulkActionProps;
        const element = mountWithProvider(
          <BulkActions {...props} />,
        );
        expect(findByTestID(element, 'paginated-select-all').exists()).toBe(false);
      });
    });

    describe('paginatedSelectAllAction', () => {
      it('onAction is called on click', () => {
        const spy = jest.fn();
        const element = mountWithProvider(
          <BulkActions {...bulkActionProps} paginatedSelectAllAction={{content: 'content', onAction: spy}} />,
        );
        findByTestID(element, 'paginated-action').simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
