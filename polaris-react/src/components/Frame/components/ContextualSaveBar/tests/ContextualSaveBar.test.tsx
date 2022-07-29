import {mountWithApp} from 'tests/utilities';

import {Button} from '../../../../Button';
import {Image} from '../../../../Image';
// eslint-disable-next-line import/no-deprecated
import {CustomProperties} from '../../../../CustomProperties';
import {ContextualSaveBar} from '../ContextualSaveBar';
import {DiscardConfirmationModal} from '../components';

describe('<ContextualSaveBar />', () => {
  describe('discardAction', () => {
    it('renders a button with the discardAction details', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithApp(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      expect(contextualSaveBar).toContainReactComponent(Button, {
        onClick: discardAction.onAction,
        children: discardAction.content,
      });
    });

    describe('discardConfirmationModal is false', () => {
      it('calls the discardAction when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: false,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button)!.trigger('onClick');
        expect(discardAction.onAction).toHaveBeenCalled();
      });

      it('does not render a DiscardConfirmationModal', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: false,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        expect(contextualSaveBar).not.toContainReactComponent(
          DiscardConfirmationModal,
        );
      });
    });

    describe('discardConfirmationModal is true', () => {
      it('does not call the discardAction when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button)!.trigger('onClick');
        expect(discardAction.onAction).not.toHaveBeenCalled();
      });

      it('renders a DiscardConfirmationModal with an `open` prop set to false', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const discardConfirmationModal = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        expect(discardConfirmationModal).toContainReactComponent(
          DiscardConfirmationModal,
          {
            open: false,
          },
        );
      });

      it('sets the DiscardConfirmationModal `open` prop to true when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button)!.trigger('onClick');
        expect(contextualSaveBar).toContainReactComponent(
          DiscardConfirmationModal,
          {
            open: true,
          },
        );
      });

      it("sets the DiscardConfirmationModal `open` prop to false when it's `onCancel` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        const modal = contextualSaveBar.find(DiscardConfirmationModal)!;
        contextualSaveBar.find(Button)!.trigger('onClick');
        modal!.trigger('onCancel');

        expect(contextualSaveBar).toContainReactComponent(
          DiscardConfirmationModal,
          {
            open: false,
          },
        );
      });

      it("calls the discardAction prop when it's `onDiscard` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button)!.trigger('onClick');
        contextualSaveBar.find(DiscardConfirmationModal)!.trigger('onDiscard');
        expect(discardAction.onAction).toHaveBeenCalled();
      });

      it("sets the DiscardConfirmationModal `open` prop to false when it's `onDiscard` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithApp(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(DiscardConfirmationModal)!.trigger('onDiscard');

        expect(contextualSaveBar).toContainReactComponent(
          DiscardConfirmationModal,
          {
            open: false,
          },
        );
      });
    });
  });

  describe('saveAction', () => {
    it('renders a button with the saveAction details', () => {
      const saveAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithApp(
        <ContextualSaveBar saveAction={saveAction} />,
      );

      expect(contextualSaveBar).toContainReactComponent(Button, {
        children: saveAction.content,
        onClick: saveAction.onAction,
      });
    });
  });

  describe('default content', () => {
    it('renders a discard action with default text without content being provided', () => {
      const discardAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithApp(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      expect(contextualSaveBar).toContainReactComponent(Button, {
        children: 'Discard',
      });
    });

    it('renders a save action with default text without content being provided', () => {
      const saveAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithApp(
        <ContextualSaveBar saveAction={saveAction} />,
      );

      expect(contextualSaveBar).toContainReactComponent(Button, {
        children: 'Save',
      });
    });
  });

  describe('logo', () => {
    it('will render an image with the contextual save bar source', () => {
      const contextualSaveBar = mountWithApp(<ContextualSaveBar />, {
        frame: {
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
        },
      });

      expect(contextualSaveBar).toContainReactComponent(Image, {
        source: './assets/monochrome_shopify.svg',
      });
    });

    it('will render an image with the width provided', () => {
      const contextualSaveBar = mountWithApp(<ContextualSaveBar />, {
        frame: {
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
        },
      });
      expect(contextualSaveBar).toContainReactComponent(Image, {
        style: {width: '200px'},
      });
    });

    it('will render the image with a default width if 0 is provided', () => {
      const contextualSaveBar = mountWithApp(<ContextualSaveBar />, {
        frame: {
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 0,
          },
        },
      });

      expect(contextualSaveBar).toContainReactComponent(Image, {
        style: {width: '104px'},
      });
    });

    it('will not render the logo when content is aligned flush left', () => {
      const contextualSaveBar = mountWithApp(
        <ContextualSaveBar alignContentFlush />,
        {
          frame: {
            logo: {
              contextualSaveBarSource: './assets/monochrome_shopify.svg',
              width: 200,
            },
          },
        },
      );

      expect(contextualSaveBar).not.toContainReactComponent(Image);
    });
  });

  it('renders the secondaryMenu prop', () => {
    const expectedContent = 'some content';
    const contextualSaveBar = mountWithApp(
      <ContextualSaveBar secondaryMenu={<>{expectedContent}</>} />,
    );

    expect(contextualSaveBar).toContainReactText(expectedContent);
  });

  it('renders a CustomProperties with a dark color scheme', () => {
    const contextualSaveBar = mountWithApp(<ContextualSaveBar />);
    // eslint-disable-next-line import/no-deprecated
    expect(contextualSaveBar).toContainReactComponent(CustomProperties, {
      colorScheme: 'dark',
    });
  });
});

function noop() {}
