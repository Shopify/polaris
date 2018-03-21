import * as React from 'react';
import {mount} from 'enzyme';
import {Badge, Spinner, Portal} from '../../../components';

import {
  animationFrame,
  findByTestID,
  trigger,
} from '../../../../tests/utilities';

import Modal from '../Modal';
import Footer from '../components/Footer';

describe('<Modal>', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  describe('open', () => {
    it('renders <Portal /> with idPrefix modal', () => {
      const modal = mount(
        <Modal onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Portal).prop('idPrefix')).toBe('modal');
    });
  });

  describe('closed', () => {
    it('does not render children', () => {
      const modal = mount(
        <Modal open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge)).toHaveLength(0);
    });
  });

  describe('opening / closing', () => {
    it('renders modal content when open = true', () => {
      const modal = mount(
        <Modal open onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(true);
    });

    it('does not render modal content when open = false', () => {
      const modal = mount(
        <Modal open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });

    it('triggers an onTransitionEnd prop', () => {
      const modal = mount(
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
      const modal = mount(
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
      const modal = mount(<Modal onClose={jest.fn()} open title="foo" />);

      expect(findByTestID(modal, 'ModalHeader').exists()).toBe(true);
    });

    it('does not render a header when title is not present', () => {
      const modal = mount(<Modal onClose={jest.fn()} open />);

      expect(findByTestID(modal, 'ModalHeader').exists()).toBe(false);
    });

    it('renders a close button when title is not present', () => {
      const modal = mount(<Modal onClose={jest.fn()} open />);

      expect(findByTestID(modal, 'ModalCloseButton').exists()).toBe(true);
    });
  });

  describe('footer', () => {
    it('does not render footer by default', () => {
      const modal = mount(<Modal onClose={jest.fn()} open />);

      expect(modal.find(Footer).exists()).toBeFalsy();
    });

    it('renders if footer are passed in', () => {
      const modal = mount(
        <Modal onClose={jest.fn()} open footer="Footer content" />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });

    it('renders if primaryAction are passed in', () => {
      const modal = mount(
        <Modal
          onClose={jest.fn()}
          open
          primaryAction={{content: 'Save', onAction: jest.fn()}}
        />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });

    it('renders if secondaryActions are passed in', () => {
      const modal = mount(
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
      const modal = mount(
        <Modal onClose={jest.fn()} open loading limitHeight>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Modal.Dialog).prop('limitHeight')).toBeTruthy();
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const modal = mount(
        <Modal onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Spinner).exists()).toBe(true);
    });

    it('does not render children', () => {
      const modal = mount(
        <Modal onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });
  });
});
