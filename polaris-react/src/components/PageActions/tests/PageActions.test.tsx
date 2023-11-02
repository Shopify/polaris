import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ButtonGroup} from '../../ButtonGroup';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../../LegacyStack';
import {buttonsFrom} from '../../Button';
import {PageActions} from '../PageActions';

jest.mock('../../Button', () => ({
  ...(jest.requireActual('../../Button') as any),
  buttonsFrom: jest.fn(),
}));

describe('<PageActions />', () => {
  describe('<LegacyStack />', () => {
    it('renders a stack component', () => {
      const pageActions = mountWithApp(<PageActions />);
      // eslint-disable-next-line import/no-deprecated
      expect(pageActions).toContainReactComponentTimes(LegacyStack, 1);
    });

    it('passes spacing tight to Stack', () => {
      const pageActions = mountWithApp(<PageActions />);
      // eslint-disable-next-line import/no-deprecated
      const stack = pageActions.find(LegacyStack);
      expect(stack).toHaveReactProps({
        spacing: 'tight',
      });
    });
  });

  describe('primaryAction', () => {
    const mockAction = {content: 'test content', loading: true};

    it('renders a button', () => {
      mountWithApp(<PageActions primaryAction={mockAction} />);
      expect(buttonsFrom).toHaveBeenCalledWith(mockAction, {
        variant: 'primary',
      });
    });

    it('renders a `ReactNode`', () => {
      const CustomPrimaryAction = () => null;
      const pageActions = mountWithApp(
        <PageActions primaryAction={<CustomPrimaryAction />} />,
      );

      expect(pageActions).toContainReactComponent(CustomPrimaryAction);
    });
  });

  describe('secondaryActions', () => {
    const mockActions = [
      {
        content: 'Delete',
        destructive: true,
      },
    ];

    it('renders buttons for each secondaryAction', () => {
      mountWithApp(<PageActions secondaryActions={mockActions} />);
      expect(buttonsFrom).toHaveBeenCalledWith(mockActions);
    });

    it('renders a button group when defined', () => {
      const pageActions = mountWithApp(
        <PageActions
          secondaryActions={[
            {
              content: 'Delete',
            },
          ]}
        />,
      );
      expect(pageActions.findAll(ButtonGroup)).toHaveLength(1);
    });

    it('does not render a button group when not defined', () => {
      const pageActions = mountWithApp(<PageActions />);
      expect(pageActions.findAll(ButtonGroup)).toHaveLength(0);
    });

    it('renders <CustomSecondaryActions /> if `ReactNode` is provided as `secondaryActions`', () => {
      const CustomSecondaryActions = () => null;
      const pageActions = mountWithApp(
        <PageActions secondaryActions={<CustomSecondaryActions />} />,
      );

      expect(pageActions).toContainReactComponent(CustomSecondaryActions);
    });
  });
});
