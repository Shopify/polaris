import React, {useRef} from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Badge, Button, Spinner, Portal, Scrollable} from 'components';

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

    const component = mountWithAppProvider(
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

    expect(component.find(TestComponent).prop('withinContentContainer')).toBe(
      true,
    );
  });

  it('focuses the dialog node on mount', () => {
    const modal = mountWithAppProvider(
      <Modal title="foo" onClose={jest.fn()} open instant />,
    );

    expect(document.activeElement).toBe(modal.find(Dialog).getDOMNode());
  });

  describe('src', () => {
    it('renders an iframe if src is provided', () => {
      const modal = mountWithAppProvider(
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

      const iframe = modal.find('iframe').first();
      expect(iframe.exists()).toBe(true);
      expect(iframe.prop('name')).toStrictEqual('Name');
      expect(iframe.prop('src')).toStrictEqual('Source');

      const scrollable = modal.find(Scrollable).first();
      expect(scrollable.exists()).toBe(false);
    });

    it('renders Scrollable if src is not provided', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
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
        <Modal
          title="foo"
          open
          onClose={noop}
          onTransitionEnd={mockOnTransitionEnd}
        />,
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
          title="foo"
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
        <Modal title="foo" instant onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('instant')).toBe(true);
    });

    it('does not pass instant to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('instant')).toBeUndefined();
    });
  });

  describe('large', () => {
    it('passes large to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" large onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('large')).toBe(true);
    });

    it('does not pass large to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('large')).toBeUndefined();
    });
  });

  describe('small', () => {
    it('passes small to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" small onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('small')).toBe(true);
    });

    it('does not pass small to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('small')).toBeUndefined();
    });
  });

  describe('limitHeight', () => {
    it('passes limitHeight to Dialog if true', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" limitHeight onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBe(true);
    });

    it('does not pass limitHeight to Dialog be default', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBeUndefined();
    });
  });

  describe('open', () => {
    it('renders <Portal />', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Portal)).toHaveLength(1);
    });
  });

  describe('closed', () => {
    it('does not render children', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge)).toHaveLength(0);
    });
  });

  describe('opening / closing', () => {
    it('renders modal content when open = true', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" open onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(true);
    });

    it('does not render modal content when open = false', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" open={false} onClose={jest.fn()}>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });
  });

  describe('header', () => {
    it('renders a header when title is present', () => {
      const modal = mountWithApp(
        <Modal onClose={jest.fn()} open title="foo" />,
      );

      expect(modal.find(Header)).toContainReactComponent('div', {
        className: 'Header',
      });
    });

    it('only renders a close button when titleHidden is present', () => {
      const modal = mountWithApp(
        <Modal titleHidden onClose={jest.fn()} open title="foo" />,
      );

      expect(modal.find(Header)).toContainReactComponent('div', {
        className: 'titleHidden',
      });
    });
  });

  describe('footer', () => {
    it('does not render footer by default', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open />,
      );

      expect(modal.find(Footer).exists()).toBeFalsy();
    });

    it('renders if footer are passed in', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open footer="Footer content" />,
      );

      expect(modal.find(Footer).exists()).toBeTruthy();
    });

    it('renders if primaryAction are passed in', () => {
      const modal = mountWithAppProvider(
        <Modal
          title="foo"
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
          title="foo"
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
        <Modal title="foo" onClose={jest.fn()} open loading limitHeight>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Dialog).prop('limitHeight')).toBeTruthy();
    });

    it('does not render a Scrollable with noScroll prop', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open noScroll>
          <Badge />
        </Modal>,
      );

      const scrollable = modal.find(Scrollable).first();
      expect(scrollable.exists()).toBe(false);
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Spinner).exists()).toBe(true);
    });

    it('does not render children', () => {
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={jest.fn()} open loading>
          <Badge />
        </Modal>,
      );

      expect(modal.find(Badge).exists()).toBe(false);
    });
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const modal = mountWithAppProvider(
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
    let rafSpy: jest.SpyInstance;

    beforeEach(() => {
      rafSpy = jest.spyOn(window, 'requestAnimationFrame');
      rafSpy.mockImplementation((callback) => callback());
    });

    afterEach(() => {
      rafSpy.mockRestore();
    });

    it('renders the element if an element is passed in', () => {
      const modal = mountWithAppProvider(
        <Modal
          title="foo"
          onClose={noop}
          open={false}
          activator={<Button />}
        />,
      );

      expect(modal.find(Button).exists()).toBe(true);
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
      const modal = mountWithAppProvider(
        <Modal title="foo" onClose={noop} open />,
      );

      expect(() => {
        modal.setProps({open: false});
      }).not.toThrow();
    });

    it('focuses the activator when the activator is an element on close', () => {
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

    it('focuses the activator when the activator a ref on close', () => {
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
