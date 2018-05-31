import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {Button} from '../../../..';
import ContextBar from '../ContextBar';

describe('<ContextBar />', () => {
  const defaultProps = {
    visible: true,
    branding: {
      id: 'SHOPIFY',
      src: '/shopify-logo.svg',
    },
  };

  describe('cancelAction', () => {
    it('renders a button with the cancelAction details', () => {
      const cancelAction = {
        content: 'Cancel',
        onAction: jest.fn(),
      };

      const contextBar = mountWithAppProvider(
        <ContextBar cancelAction={cancelAction} {...defaultProps} />,
      );

      const button = contextBar.find(Button);
      expect(button.prop('onClick')).toBe(cancelAction.onAction);
      expect(button.prop('children')).toBe(cancelAction.content);
    });
  });

  describe('primaryAction', () => {
    it('renders a button with the primaryAction details', () => {
      const primaryAction = {
        content: 'Cancel',
        onAction: jest.fn(),
      };

      const contextBar = mountWithAppProvider(
        <ContextBar primaryAction={primaryAction} {...defaultProps} />,
      );

      const button = contextBar.find(Button);
      expect(button.prop('onClick')).toBe(primaryAction.onAction);
      expect(button.prop('children')).toBe(primaryAction.content);
    });
  });
});
