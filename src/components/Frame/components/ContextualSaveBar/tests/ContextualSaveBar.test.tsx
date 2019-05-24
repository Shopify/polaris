import React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {Button, Image, Modal} from 'components';
import ContextualSaveBar from '../ContextualSaveBar';
import {ThemeProviderContextType} from '../../../../ThemeProvider';
import merge from '../../../../../utilities/merge';

describe('<ContextualSaveBar />', () => {
  describe('discardAction', () => {
    it('renders a button with the discardAction details', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      const button = contextualSaveBar.find(Button);
      expect(button.prop('onClick')).toBe(discardAction.onAction);
      expect(button.prop('children')).toBe(discardAction.content);
    });

    it('calls the discardAction when discardConfirmationModal is false', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
        discardConfirmationModal: false,
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      contextualSaveBar.find(Button).simulate('click');
      expect(discardAction.onAction).toHaveBeenCalled();
    });

    it('does not call the discardAction when discardConfirmationModal is true', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
        discardConfirmationModal: true,
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      contextualSaveBar.find(Button).simulate('click');
      expect(discardAction.onAction).not.toHaveBeenCalled();
    });

    it('opens a modal with the discardAction when discardConfirmationModal is true', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
        discardConfirmationModal: true,
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      contextualSaveBar.find(Button).simulate('click');
      trigger(contextualSaveBar.find(Modal), 'primaryAction.onAction');
      expect(discardAction.onAction).toHaveBeenCalled();
    });
  });

  describe('saveAction', () => {
    it('renders a button with the saveAction details', () => {
      const saveAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} />,
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
        <ContextualSaveBar discardAction={discardAction} />,
      );

      const discardButton = contextualSaveBar.find(Button);
      expect(discardButton.text()).toBe('Discard');
    });

    it('renders a save action with default text without content being provided', () => {
      const saveAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} />,
      );

      const commitButton = contextualSaveBar.find(Button);
      expect(commitButton.text()).toBe('Save');
    });
  });

  describe('logo', () => {
    it('will render an image with the contextual save bar source', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        mergeThemeProviderContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
        }),
      );
      expect(contextualSaveBar.find(Image).prop('source')).toBe(
        './assets/monochrome_shopify.svg',
      );
    });

    it('will render an image with the width provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        mergeThemeProviderContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '200px',
      );
    });

    it('will render the image with a default width if 0 is provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        mergeThemeProviderContext({
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 0,
          },
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '104px',
      );
    });

    it('will not render the logo when content is aligned flush left', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar alignContentFlush />,
        mergeThemeProviderContext({
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 200,
          },
        }),
      );

      expect(contextualSaveBar.find(Image).exists()).toBeFalsy();
    });
  });
});

function mergeThemeProviderContext(
  providedThemeContext: ThemeProviderContextType,
) {
  return {
    context: {
      themeProvider: merge({logo: null}, providedThemeContext),
    },
  };
}
