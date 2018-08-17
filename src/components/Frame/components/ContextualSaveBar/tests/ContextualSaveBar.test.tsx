import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {createThemeContext, ThemeContext} from '../../../../ThemeProvider';
import {createPolarisContext, Button, Image} from '../../../../../components';
import {polarisAppProviderContextTypes} from '../../../../AppProvider';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  const defaultProps = {
    visible: true,
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

  describe('logo', () => {
    it('will render an image with the contextual save bar source', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar {...defaultProps} />,
        addPolarisContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).prop('source')).toBe(
        './assets/monochrome_shopify.svg',
      );
    });

    it('will render an image with the width provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar {...defaultProps} />,
        addPolarisContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '200px',
      );
    });

    it('will render the image with a default width if 0 is provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar {...defaultProps} />,
        addPolarisContext({
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 0,
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '104px',
      );
    });
  });
});

function addPolarisContext(logo: ThemeContext) {
  const context = {...createPolarisContext(logo), ...createThemeContext(logo)};

  return {
    context,
    childContextTypes: polarisAppProviderContextTypes,
  };
}
