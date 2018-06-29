import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {Button} from '../../../..';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  const defaultProps = {
    visible: true,
    branding: {
      id: 'SHOPIFY',
      src: '/shopify-logo.svg',
    },
  };

  describe('discardAction', () => {
    it('renders a button with the discardAction details', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} {...defaultProps} />,
      );

      const button = contextualSaveBar.find(Button);
      expect(button.prop('onClick')).toBe(discardAction.onAction);
      expect(button.prop('children')).toBe(discardAction.content);
    });
  });

  describe('saveAction', () => {
    it('renders a button with the saveAction details', () => {
      const saveAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} {...defaultProps} />,
      );

      const button = contextualSaveBar.find(Button);
      expect(button.prop('onClick')).toBe(saveAction.onAction);
      expect(button.prop('children')).toBe(saveAction.content);
    });
  });

  describe('default content', () => {
    it('renders a discard action with default text without content being provided', () => {
      const discardAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} {...defaultProps} />,
      );

      const discardButton = contextualSaveBar.find(Button);
      expect(discardButton.text()).toBe('Discard');
    });

    it('renders a save action with default text without content being provided', () => {
      const saveAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} {...defaultProps} />,
      );

      const commitButton = contextualSaveBar.find(Button);
      expect(commitButton.text()).toBe('Save');
    });
  });
});
