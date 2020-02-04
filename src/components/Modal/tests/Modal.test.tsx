import React from 'react';
import {Modal as AppBridgeModal} from '@shopify/app-bridge/actions';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {animationFrame} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {
  findByTestID,
  mountWithAppProvider,
  trigger,
} from 'test-utilities/legacy';
import {Badge, Spinner, Portal, Scrollable} from 'components';
import {Footer, Dialog} from '../components';
import {Modal} from '../Modal';

import {WithinContentContext} from '../../../utilities/within-content-context';

jest.mock('../../../utilities/app-bridge-transformers', () => ({
  ...require.requireActual('../../../utilities/app-bridge-transformers'),
  transformActions: jest.fn((...args) => args),
}));

describe('<Modal>', () => {
  let scrollSpy: jest.SpyInstance;

  beforeEach(() => {
    scrollSpy = jest.spyOn(window, 'scroll');
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
    scrollSpy.mockRestore();
  });

  it('has a child with contentContext', () => {
    function TestComponent(_: {withinContentContainer: any}) {
      return null;
    }

    const component = mountWithAppProvider(
      <Modal onClose={jest.fn()} open>
        <WithinContentContext.Consumer>
          {(withinContentContext) => {
            return (
              <TestComponent withinContentContainer={withinContentContext} />
            );
          }}
        </WithinContentContext.Consumer>
      </Modal>,
    );

    expect(component.find(TestComponent).prop('withinContentContainer')).toBe(
      true,
    );
  });

  it('focuses the next focusable node on mount', () => {
    const modal = mountWithAppProvider(<Modal onClose={jest.fn()} open />);
    const focusedNode = findFirstFocusableNode(modal.find(Dialog).getDOMNode());

    expect(focusedNode).toBe(document.activeElement);
  });

  describe('src', () => {
    it('renders an iframe if src is provided', () => {
      const modal = mountWithAppProvider(
        <Modal src="Source" iFrameName="Name" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      const iframe = modal.find('iframe').first();
      expect(iframe.exists()).toBe(true);
      expect(iframe.prop('name')).toStrictEqual('Name');
      expect(iframe.prop('src')).toStrictEqual('Source');

      const scrollable = modal.find(Scrollable).first();
      expect(scrollable.exists()).toBe(false);
    });

    it('renders Scrollable if src is not provided', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      const iframe = modal.find('iframe').first();
      expect(iframe.exists()).toBe(false);

      const scrollable = modal.find(Scrollable).first();
      expect(scrollable.exists()).toBe(true);
      expect(scrollable.prop('shadow')).toBe(true);
    });
  });

  describe('onTransitionEnd', () => {
    it('calls onTransitionEnd after it mounts', () => {
      const mockOnTransitionEnd = jest.fn();
      const modal = mountWithAppProvider(
        <Modal open onClose={noop} onTransitionEnd={mockOnTransitionEnd} />,
      );
      trigger(modal.find(Dialog), 'onEntered');
      expect(mockOnTransitionEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('onIFrameLoad', () => {
    it('calls onIFrameLoad after it mounts', () => {
      const mockOnIframeLoad = jest.fn();
      const modal = mountWithAppProvider(
        <Modal
          open
          onClose={noop}
          onIFrameLoad={mockOnIframeLoad}
          src="path/to/place"
        />,
      );
      trigger(modal.find('iframe'), 'onLoad', {target: {contentWindow: {}}});
      expect(mockOnIframeLoad).toHaveBeenCalledTimes(1);
    });
  });

  describe('instant', () => {
    it('passes instant to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal instant onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('instant')).toBe(true);
    });

    it('does not pass instant to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('instant')).toBeUndefined();
    });
  });

  describe('large', () => {
    it('passes large to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal large onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('large')).toBe(true);
    });

    it('does not pass large to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('large')).toBeUndefined();
    });
  });

  describe('limitHeight', () => {
    it('passes limitHeight to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal limitHeight onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBe(true);
    });

    it('does not pass limitHeight to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBeUndefined();
    });
  });

  describe('open', () => {
    it('renders <Portal /> with idPrefix modal', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Portal).prop('idPrefix')).toBe('modal');
    });
  });

  describe('closed', () => {
    it('does not render children', () => {
      const modal = mountWithAppProvider(
        <Modal open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge)).toHaveLength(0);
    });
  });

  describe('opening / closing', () => {
    it('renders modal content when open = true', () => {
      const modal = mountWithAppProvider(
        <Modal open onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(true);
    });

    it('does not render modal content when open = false', () => {
      const modal = mountWithAppProvider(
        <Modal open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });
  });

  describe('header', () => {
    it('renders a header when title is present', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open title="foo" />,
      );

      expect(findByTestID(modal, 'ModalHeader').exists()).toBe(true);
    });

    it('does not render a header when title is not present', () => {
      const modal = mountWithAppProvider(<Modal onClose={jest.fn()} open />);

      expect(findByTestID(modal, 'ModalHeader').exists()).toBe(false);
    });

    it('renders a close button when title is not present', () => {
      const modal = mountWithAppProvider(<Modal onClose={jest.fn()} open />);

      expect(findByTestID(modal, 'ModalCloseButton').exists()).toBe(true);
    });
  });

  describe('footer', () => {
    it('does not render footer by default', () => {
      const modal = mountWithAppProvider(<Modal onClose={jest.fn()} open />);

      expect(modal.find(Footer).exists()).toBeFalsy();
    });

    it('renders if footer are passed in', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open footer="Footer content" />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });

    it('renders if primaryAction are passed in', () => {
      const modal = mountWithAppProvider(
        <Modal
          onClose={jest.fn()}
          open
          primaryAction={{content: 'Save', onAction: jest.fn()}}
        />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });

    it('renders if secondaryActions are passed in', () => {
      const modal = mountWithAppProvider(
        <Modal
          onClose={jest.fn()}
          open
          secondaryActions={[{content: 'Discard', onAction: jest.fn()}]}
        />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });
  });

  describe('body', () => {
    it('limits dialog height from limitHeight prop', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open loading limitHeight>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBeTruthy();
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Spinner).exists()).toBe(true);
    });

    it('does not render children', () => {
      const modal = mountWithAppProvider(
        <Modal onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const modal = mountWithAppProvider(
        <Modal open onClose={jest.fn()}>
          <p>Child</p>
        </Modal>,
      );

      expect(() => {
        modal.unmount();
      }).not.toThrow();
    });
  });

  describe('with app bridge', () => {
    let AppBridgeModalCreate: jest.SpyInstance;
    const appBridgeModalMock = {
      set: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    beforeEach(() => {
      AppBridgeModalCreate = jest.spyOn(AppBridgeModal, 'create');
      AppBridgeModalCreate.mockReturnValue(appBridgeModalMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('creates an app bridge modal', () => {
      const primaryAction = {
        content: 'Foo',
        url: '/foo',
      };

      const secondaryActions = [
        {
          content: 'Bar',
          onAction: noop,
        },
      ];

      const {appBridge} = mountWithAppBridge(
        <Modal
          title="Hello world!"
          open
          message="Body content"
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
          onClose={noop}
        />,
      );

      expect(AppBridgeModalCreate).toHaveBeenCalledTimes(1);
      expect(AppBridgeModalCreate).toHaveBeenCalledWith(appBridge, {
        title: 'Hello world!',
        message: 'Body content',
        size: undefined,
        footer: {
          buttons: [appBridge, {primaryAction, secondaryActions}],
        },
      });
      expect(appBridgeModalMock.subscribe).toHaveBeenCalledTimes(1);
      expect(appBridgeModalMock.subscribe).toHaveBeenCalledWith(
        AppBridgeModal.Action.CLOSE,
        noop,
      );
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledWith(
        AppBridgeModal.Action.OPEN,
      );
    });

    it('does not dispatch an open action if open is false', () => {
      mountWithAppBridge(<Modal open={false} onClose={noop} />);

      expect(appBridgeModalMock.dispatch).not.toHaveBeenCalled();
    });

    it('accepts an undefined title', () => {
      const {appBridge} = mountWithAppBridge(
        <Modal title={undefined} open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        footer: {
          buttons: [appBridge, {}],
        },
      });
    });

    it('accepts a size prop', () => {
      const {appBridge} = mountWithAppBridge(
        <Modal size="Large" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(appBridge, {
        title: undefined,
        message: undefined,
        size: AppBridgeModal.Size.Large,
        footer: {
          buttons: [appBridge, {}],
        },
      });
    });

    it('converts a src prop to a url prop', () => {
      const {appBridge} = mountWithAppBridge(
        <Modal src="https://shopify.com" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        url: 'https://shopify.com',
        footer: {
          buttons: [appBridge, {}],
        },
      });
    });

    it('converts a src prop to a path prop', () => {
      const {appBridge} = mountWithAppBridge(
        <Modal src="/test" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        path: '/test',
        footer: {
          buttons: [appBridge, {}],
        },
      });
    });

    it('calls set when props change', () => {
      const {modal} = mountWithAppBridge(<Modal open onClose={noop} />);

      modal.setProps({title: 'New Title'});
      expect(appBridgeModalMock.set).toHaveBeenCalledTimes(1);
      modal.setProps({src: '/test'});
      expect(appBridgeModalMock.set).toHaveBeenCalledTimes(2);
    });

    it('does not call set when props do not change', () => {
      const {modal} = mountWithAppBridge(<Modal open onClose={noop} />);

      modal.setProps({title: 'New Title'});
      expect(appBridgeModalMock.set).toHaveBeenCalledTimes(1);
      modal.setProps({title: 'New Title'});
      expect(appBridgeModalMock.set).toHaveBeenCalledTimes(1);
    });

    it('closes the modal when the open prop is set to false', () => {
      const {modal} = mountWithAppBridge(<Modal open onClose={noop} />);

      // dispatch is called to open the modal when it mounts, so let us clear that
      jest.clearAllMocks();

      modal.setProps({open: false});
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledWith(
        AppBridgeModal.Action.CLOSE,
      );
    });

    it('opens the modal when the open prop is set to true', () => {
      const {modal} = mountWithAppBridge(<Modal open={false} onClose={noop} />);

      modal.setProps({open: true});
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeModalMock.dispatch).toHaveBeenCalledWith(
        AppBridgeModal.Action.OPEN,
      );
    });

    it('unsubscribes on unmount', () => {
      const {modal} = mountWithAppBridge(<Modal open onClose={noop} />);

      modal.unmount();
      expect(appBridgeModalMock.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});

function mountWithAppBridge(element: React.ReactElement) {
  const appBridge = {};
  const modal = mountWithAppProvider(element, {appBridge});

  return {modal, appBridge};
}

function noop() {}
