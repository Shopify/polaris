import * as React from 'react';
import {Badge, Spinner, Portal} from '../../../components';
import {contentContextTypes} from '../../../types';

import {
  animationFrame,
  findByTestID,
  trigger,
  mountWithAppProvider,
} from '../../../../tests/utilities';

import Modal from '../Modal';
import {Footer, Dialog} from '../components';
import Scrollable from '../../Scrollable';

describe('<Modal>', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('has a child with contentContext', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.withinContentContainer ? <div /> : null;
    Child.contextTypes = contentContextTypes;

    const containedChild = mountWithAppProvider(
      <Modal open onClose={jest.fn()}>
        <Child />
      </Modal>,
    );

    const div = containedChild
      .find(Child)
      .find('div')
      .first();
    expect(div.exists()).toBe(true);
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

      expect(modal.find(Dialog).prop('instant')).toBe(undefined);
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

      expect(modal.find(Dialog).prop('large')).toBe(undefined);
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

      expect(modal.find(Dialog).prop('limitHeight')).toBe(undefined);
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
});
