import React, {useRef} from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Backdrop} from '../../Backdrop';
import {Badge} from '../../Badge';
import {Box} from '../../Box';
import {Button} from '../../Button';
import {Portal} from '../../Portal';
import {Scrollable} from '../../Scrollable';
import {Spinner} from '../../Spinner';
import {Text} from '../../Text';
import {Footer, Dialog, Header} from '../components';
import {Modal} from '../Modal';
import {WithinContentContext} from '../../../utilities/within-content-context';

jest.mock('react-transition-group', () => {
  function ChildGroup({children}: {children: React.ReactNode}) {
    return <div>{children}</div>;
  }

  return {
    ...(jest.requireActual('react-transition-group') as any),
    TransitionGroup: ChildGroup,
    TransitionChild: ChildGroup,
    CSSTransition: ChildGroup,
  };
});

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

    const component = mountWithApp(
      <Modal title="foo" onClose={jest.fn()} open>
        <WithinContentContext.Consumer>
          {(withinContentContext) => {
            return (
              <TestComponent withinContentContainer={withinContentContext} />
            );
          }}
        </WithinContentContext.Consumer>
      </Modal>,
    );

    expect(component).toContainReactComponent(TestComponent, {
      withinContentContainer: true,
    });
  });

  it('focuses the dialog node on mount', () => {
    const modal = mountWithApp(<Modal title="foo" onClose={noop} open />);

    expect(document.activeElement).toBe(
      modal.find('div', {className: 'Dialog'})?.domNode,
    );
  });

  describe('src', () => {
    it('renders an iframe if src is provided', () => {
      const modal = mountWithApp(
        <Modal
          title="foo"
          src="Source"
          iFrameName="Name"
          onClose={jest.fn()}
          open
        >
          <Badge />
        </Modal>,
      );

      const iframe = modal.find('iframe');
      expect(iframe).toHaveReactProps({name: 'Name', src: 'Source'});
      expect(iframe).not.toContainReactComponent(Scrollable);
    });

    it('renders Scrollable if src is not provided', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).not.toContainReactComponent('iframe');
      expect(modal).toContainReactComponent(Scrollable, {shadow: true});
    });
  });

  describe('onTransitionEnd', () => {
    it('calls onTransitionEnd after it mounts', () => {
      const mockOnTransitionEnd = jest.fn();
      const modal = mountWithApp(
        <Modal
          title="foo"
          open
          onClose={noop}
          onTransitionEnd={mockOnTransitionEnd}
        />,
      );
      modal.find(Dialog)?.trigger('onEntered');
      expect(mockOnTransitionEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('onIFrameLoad', () => {
    it('calls onIFrameLoad after it mounts', () => {
      const mockOnIframeLoad = jest.fn();
      const modal = mountWithApp(
        <Modal
          title="foo"
          open
          onClose={noop}
          onIFrameLoad={mockOnIframeLoad}
          src="path/to/place"
        />,
      );
      modal.find('iframe')?.trigger('onLoad', {target: {}});
      expect(mockOnIframeLoad).toHaveBeenCalledTimes(1);
    });
  });

  describe('instant', () => {
    it('passes instant to Dialog if true', () => {
      const modal = mountWithApp(
        <Modal title="foo" instant onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {instant: true});
    });

    it('does not pass instant to Dialog be default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {instant: undefined});
    });
  });

  describe('large', () => {
    it('passes large to Dialog if true', () => {
      const modal = mountWithApp(
        <Modal title="foo" large onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {large: true});
    });

    it('does not pass large to Dialog be default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {large: undefined});
    });
  });

  describe('small', () => {
    it('passes small to Dialog if true', () => {
      const modal = mountWithApp(
        <Modal title="foo" small onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {small: true});
    });

    it('does not pass small to Dialog by default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {small: undefined});
    });
  });

  describe('limitHeight', () => {
    it('passes limitHeight to Dialog if true', () => {
      const modal = mountWithApp(
        <Modal title="foo" limitHeight onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {limitHeight: true});
    });

    it('does not pass limitHeight to Dialog by default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {limitHeight: undefined});
    });
  });

  describe('fullScreen', () => {
    it('passes fullScreen to Dialog if true', () => {
      const modal = mountWithApp(
        <Modal title="foo" fullScreen onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {fullScreen: true});
    });

    it('does not pass fullScreen to Dialog be default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {fullScreen: undefined});
    });
  });

  describe('open', () => {
    it('renders <Portal />', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponentTimes(Portal, 1);
    });
  });

  describe('closed', () => {
    it('does not render children', () => {
      const modal = mountWithApp(
        <Modal title="foo" open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal).not.toContainReactComponent(Badge);
    });
  });

  describe('opening / closing', () => {
    it('renders modal content when open = true', () => {
      const modal = mountWithApp(
        <Modal title="foo" open onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Badge);
    });

    it('does not render modal content when open = false', () => {
      const modal = mountWithApp(
        <Modal title="foo" open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal).not.toContainReactComponent(Badge);
    });

    it('closes the modal when backdrop is clicked', () => {
      const spy = jest.fn();
      const modal = mountWithApp(<Modal title="foo" open onClose={spy} />);

      modal.find(Backdrop)!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('header', () => {
    it('renders a header when title is present', () => {
      const modal = mountWithApp(
        <Modal onClose={jest.fn()} open title="foo" />,
      );

      expect(modal.find(Box)).toContainReactComponent(Text);
    });

    it('only renders a close button when titleHidden is present', () => {
      const modal = mountWithApp(
        <Modal titleHidden onClose={jest.fn()} open title="foo" />,
      );

      expect(modal.find(Header)).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-box-inset-inline-end': 'var(--p-space-0)',
          position: 'absolute',
          zIndex: '1',
        }) as React.CSSProperties,
      });
      expect(modal.find(Header)).not.toContainReactComponent(Text, {
        as: 'h2',
        variant: 'headingLg',
      });
    });
  });

  describe('footer', () => {
    it('does not render footer by default', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open />,
      );

      expect(modal).not.toContainReactComponent(Footer);
    });

    it('renders if footer are passed in', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open footer="Footer content" />,
      );

      expect(modal).toContainReactComponent(Footer);
    });

    it('renders if primaryAction are passed in', () => {
      const modal = mountWithApp(
        <Modal
          title="foo"
          onClose={jest.fn()}
          open
          primaryAction={{content: 'Save', onAction: jest.fn()}}
        />,
      );

      expect(modal).toContainReactComponent(Footer);
    });

    it('renders if secondaryActions are passed in', () => {
      const modal = mountWithApp(
        <Modal
          title="foo"
          onClose={jest.fn()}
          open
          secondaryActions={[{content: 'Discard', onAction: jest.fn()}]}
        />,
      );

      expect(modal).toContainReactComponent(Footer);
    });
  });

  describe('body', () => {
    it('limits dialog height from limitHeight prop', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open loading limitHeight>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Dialog, {limitHeight: true});
    });

    it('does not render a Scrollable with noScroll prop', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open noScroll>
          <Badge />
        </Modal>,
      );

      expect(modal).not.toContainReactComponent(Scrollable);
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal).toContainReactComponent(Spinner);
    });

    it('does not render children', () => {
      const modal = mountWithApp(
        <Modal title="foo" onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal).not.toContainReactComponent(Badge);
    });
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const modal = mountWithApp(
        <Modal title="foo" open onClose={jest.fn()}>
          <p>Child</p>
        </Modal>,
      );

      expect(() => {
        modal.unmount();
      }).not.toThrow();
    });
  });

  describe('activator', () => {
    it('renders the element if an element is passed in', () => {
      const modal = mountWithApp(
        <Modal
          title="foo"
          onClose={noop}
          open={false}
          activator={<Button />}
        />,
      );

      expect(modal).toContainReactComponent(Button);
    });

    it('does not render the element if a ref object is passed in', () => {
      const TestHarness = () => {
        const buttonRef = useRef<HTMLDivElement>(null);
        const button = (
          <div ref={buttonRef}>
            <Button />
          </div>
        );

        return (
          <div>
            <Modal
              title="foo"
              onClose={noop}
              open={false}
              activator={buttonRef}
            />
            {button}
          </div>
        );
      };

      const testHarness = mountWithApp(<TestHarness />);

      expect(testHarness.find(Modal)).not.toContainReactComponent(Button);
    });

    it('does not throw an error when no activator is passed in', () => {
      const modal = mountWithApp(<Modal title="foo" onClose={noop} open />);

      expect(() => {
        modal.setProps({open: false});
      }).not.toThrow();
    });

    // Causes a circular dependency that causes the whole test file to be unrunnable
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('focuses the activator when the activator is an element on close', () => {
      const id = 'activator-id';
      const modal = mountWithApp(
        <Modal
          title="foo"
          onClose={noop}
          open
          activator={<Button id={id} />}
        />,
      );

      modal.find(Dialog)!.trigger('onExited');
      const activator = modal.find('button', {id})!.domNode;

      expect(document.activeElement).toBe(activator);
    });

    // Causes a circular dependency that causes the whole test file to be unrunnable
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('focuses the activator when the activator a ref on close', () => {
      const buttonId = 'buttonId';
      const TestHarness = () => {
        const buttonRef = useRef<HTMLDivElement>(null);

        const button = (
          <div ref={buttonRef}>
            <Button id={buttonId} />
          </div>
        );

        return (
          <div>
            <Modal title="foo" onClose={noop} open activator={buttonRef} />
            {button}
          </div>
        );
      };

      const testHarness = mountWithApp(<TestHarness />);

      testHarness.find(Modal)!.find(Dialog)!.trigger('onExited');

      expect(document.activeElement).toBe(
        testHarness.findWhere(
          (wrap) => wrap.is('button') && wrap.prop('id') === buttonId,
        )!.domNode,
      );
    });
  });
});

function noop() {}
