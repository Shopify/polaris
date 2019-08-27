import React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {findByTestID, mountWithAppProvider} from 'test-utilities/legacy';
import {Badge, Spinner, Portal, Scrollable} from 'components';
import {Footer, Dialog} from '../components';
import Modal from '../Modal';

import {WithinContentContext} from '../../../utilities/within-content-context';

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
});
