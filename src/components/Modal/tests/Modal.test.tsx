import * as React from 'react';
import {Modal as AppBridgeModal} from '@shopify/app-bridge/actions';
import {noop} from '@shopify/javascript-utilities/other';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {findByTestID, trigger, mountWithAppProvider} from 'test-utilities';
import {Badge, Spinner, Portal, Scrollable} from 'components';
import {Footer, Dialog} from '../components';
import Modal from '../Modal';

import {Consumer, WithinContentContext} from '../../WithinContentContext';

jest.mock('../../../utilities/app-bridge-transformers', () => ({
  ...require.requireActual('../../../utilities/app-bridge-transformers'),
  transformActions: jest.fn((...args) => args),
}));

describe('<Modal>', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('has a child with contentContext', () => {
    function TestComponent(_: WithinContentContext) {
      return null;
    }

    const component = mountWithAppProvider(
      <Modal onClose={jest.fn()} open>
        <Consumer>
          {(props) => {
            return <TestComponent {...props} />;
          }}
        </Consumer>
      </Modal>,
    );

    expect(component.find(TestComponent).prop('withinContentContainer')).toBe(
      true,
    );
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
      expect(iframe.prop('name')).toEqual('Name');
      expect(iframe.prop('src')).toEqual('Source');

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

    it('triggers an onTransitionEnd prop', () => {
      const modal = mountWithAppProvider(
        <Modal
          onClose={jest.fn()}
          open
          secondaryActions={[{content: 'Discard', onAction: jest.fn()}]}
          onTransitionEnd={jest.fn()}
        />,
      );

      trigger(modal, 'onTransitionEnd');
      expect(modal.prop('onTransitionEnd')).toHaveBeenCalledTimes(1);
    });

    it('triggers onTransitionEnd from Dialog', () => {
      const modal = mountWithAppProvider(
        <Modal
          open
          onClose={jest.fn()}
          secondaryActions={[{content: 'Discard', onAction: jest.fn()}]}
          onTransitionEnd={jest.fn()}
        />,
      );
      trigger(modal.find(Modal.Dialog), 'onEntered');
      expect(modal.prop('onTransitionEnd')).toHaveBeenCalledTimes(1);
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

      expect(modal.find(Modal.Dialog).prop('limitHeight')).toBeTruthy();
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

  describe('with app bridge', () => {
    const appBridgeModalMock = {
      set: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    (AppBridgeModal.create as jest.Mock<{}>) = jest
      .fn()
      .mockReturnValue(appBridgeModalMock);

    beforeEach(() => {
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

      const {polaris} = mountWithAppBridge(
        <Modal
          title="Hello world!"
          open
          message="Body content"
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
          onClose={noop}
        />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledTimes(1);
      expect(AppBridgeModal.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: 'Hello world!',
        message: 'Body content',
        size: undefined,
        footer: {
          buttons: [polaris.appBridge, {primaryAction, secondaryActions}],
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
      const {polaris} = mountWithAppBridge(
        <Modal title={undefined} open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        footer: {
          buttons: [polaris.appBridge, {}],
        },
      });
    });

    it('accepts a size prop', () => {
      const {polaris} = mountWithAppBridge(
        <Modal size="Large" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: undefined,
        message: undefined,
        size: AppBridgeModal.Size.Large,
        footer: {
          buttons: [polaris.appBridge, {}],
        },
      });
    });

    it('converts a src prop to a url prop', () => {
      const {polaris} = mountWithAppBridge(
        <Modal src="https://shopify.com" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        url: 'https://shopify.com',
        footer: {
          buttons: [polaris.appBridge, {}],
        },
      });
    });

    it('converts a src prop to a path prop', () => {
      const {polaris} = mountWithAppBridge(
        <Modal src="/test" open onClose={noop} />,
      );

      expect(AppBridgeModal.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: undefined,
        message: undefined,
        size: undefined,
        path: '/test',
        footer: {
          buttons: [polaris.appBridge, {}],
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

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const modal = mountWithAppProvider(element, {
    context: {polaris},
  });

  return {modal, polaris};
}
