import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import PageActions from '../../PageActions';
import ButtonGroup from '../../ButtonGroup';
import Stack from '../../Stack';
import {buttonsFrom} from '../../Button';

jest.mock('../../Button', () => ({
  ...require.requireActual('../../Button'),
  buttonsFrom: jest.fn(),
}));

describe('<PageActions />', () => {
  describe('<Stack />', () => {
    it('renders a stack component', () => {
      const pageActions = mountWithAppProvider(<PageActions />);
      expect(pageActions.find(Stack)).toHaveLength(1);
    });

    it('uses equalSpacing distribution if secondaryActions are provided', () => {
      const mockActions = [{content: 'Delete'}];

      const pageActions = mountWithAppProvider(
        <PageActions secondaryActions={mockActions} />,
      );
      const stack = pageActions.find(Stack);
      expect(stack.prop('distribution')).toBe('equalSpacing');
    });

    it('uses trailing distribution if secondaryActions are not provided', () => {
      const pageActions = mountWithAppProvider(<PageActions />);
      const stack = pageActions.find(Stack);
      expect(stack.prop('distribution')).toBe('trailing');
    });

    it('passes spacing tight to Stack', () => {
      const pageActions = mountWithAppProvider(<PageActions />);
      const stack = pageActions.find(Stack);
      expect(stack.prop('spacing')).toBe('tight');
    });
  });

  describe('primaryAction', () => {
    const mockAction = {content: 'test content', loading: true};

    it('renders a button', () => {
      mountWithAppProvider(<PageActions primaryAction={mockAction} />);
      expect(buttonsFrom).toBeCalledWith(mockAction, {primary: true});
    });
  });

  describe('secondaryActions', () => {
    const mockActions = [{content: 'Delete'}];
    it('renders buttons for each secondaryAction', () => {
      mountWithAppProvider(<PageActions secondaryActions={mockActions} />);
      expect(buttonsFrom).toBeCalledWith(mockActions);
    });

    it('renders a button group when defined', () => {
      const pageActions = mountWithAppProvider(
        <PageActions
          secondaryActions={[
            {
              content: 'Delete',
            },
          ]}
        />,
      );
      expect(pageActions.find(ButtonGroup)).toHaveLength(1);
    });

    it('does not render a button group when not defined', () => {
      const pageActions = mountWithAppProvider(<PageActions />);
      expect(pageActions.find(ButtonGroup)).toHaveLength(0);
    });
  });
});
