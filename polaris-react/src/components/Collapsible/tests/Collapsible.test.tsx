import React from 'react';
import {mountWithApp} from 'tests/utilities';
import type {CustomRoot} from 'tests/utilities';

import type {WithPolarisTestProviderOptions} from '../../PolarisTestProvider';
import {Collapsible} from '../Collapsible';
import type {CollapsibleProps} from '../Collapsible';

const mockScrollHeight = 2;

describe('<Collapsible />', () => {
  const fullyOpenProps = {
    'aria-hidden': false,
    style: expect.objectContaining({
      maxHeight: 'none',
      overflow: 'visible',
    }),
  };
  const fullyClosedProps = {
    'aria-hidden': true,
    className: expect.stringContaining('isFullyClosed'),
    style: expect.objectContaining({
      maxHeight: '0px',
      overflow: 'hidden',
    }),
  };
  const animatingOpenProps = {
    'aria-hidden': false,
    style: expect.objectContaining({
      maxHeight: '2px',
      overflow: 'hidden',
    }),
  };
  const animatingClosedProps = {
    'aria-hidden': true,
    className: expect.not.stringContaining('isFullyClosed'),
    style: expect.objectContaining({
      maxHeight: '0px',
      overflow: 'hidden',
    }),
  };

  beforeEach(() => {
    const mockScrollHeightFn = jest.spyOn(
      Element.prototype,
      'scrollHeight',
      'get',
    );
    mockScrollHeightFn.mockReturnValue(mockScrollHeight);
  });

  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      'aria-hidden': true,
    });
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    expect(collapsible).not.toContainReactComponent('div', {
      'aria-hidden': true,
    });

    expect(collapsible).toContainReactText('content');
  });

  it('does not render its children when closed', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible).not.toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  it('renders its children when expandOnPrint is true and open is false', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false} expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  it('renders its children when expandOnPrint is true and open is true', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  it('does not animate when rendered open', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', fullyOpenProps);
  });

  it('begins animation when toggled open', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    collapsible.setProps({open: true});

    expect(collapsible).toContainReactComponent('div', animatingOpenProps);
  });

  it('begins animation when toggled closed', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    collapsible.setProps({open: false});

    expect(collapsible).toContainReactComponent('div', animatingClosedProps);
  });

  describe('Transition', () => {
    it('passes a duration property', () => {
      const duration = '150ms';
      const collapsible = mountWithApp(
        <Collapsible id="test-collapsible" open transition={{duration}} />,
      );

      expect(collapsible).toHaveReactProps({transition: {duration}});
    });

    it('passes a timingFunction property', () => {
      const timingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1)';
      const collapsible = mountWithApp(
        <Collapsible
          id="test-collapsible"
          open
          transition={{timingFunction}}
        />,
      );

      expect(collapsible).toHaveReactProps({transition: {timingFunction}});
    });

    const transitionDisabledOptions = [
      false,
      {duration: '0s'},
      {duration: '0ms'},
    ];

    it.each(transitionDisabledOptions)(
      'does not animate when transition is disabled with %p',
      (transition) => {
        const collapsible = mountWithApp(
          <Collapsible
            id="test-collapsible"
            open={false}
            transition={transition}
          >
            content
          </Collapsible>,
        );

        collapsible.setProps({open: true});

        expect(collapsible).toContainReactComponent('div', fullyOpenProps);

        collapsible.setProps({open: false});

        expect(collapsible).toContainReactComponent('div', fullyClosedProps);
      },
    );
  });

  describe('onTransitionEnd', () => {
    it('completes opening transition', () => {
      const id = 'test-collapsible';
      const collapsible = mountWithApp<CollapsibleProps>(
        <Collapsible id={id} open={false}>
          content
        </Collapsible>,
      );
      collapsible.setProps({open: true});

      fireTransitionEnd(collapsible);

      expect(collapsible).toContainReactComponent('div', {
        ...fullyOpenProps,
        id,
      });
    });

    it('completes closing transition', () => {
      const id = 'test-collapsible';
      const collapsible = mountWithApp<CollapsibleProps>(
        <Collapsible id={id} open>
          content
        </Collapsible>,
      );

      collapsible.setProps({open: false});

      fireTransitionEnd(collapsible);

      expect(collapsible).toContainReactComponent('div', {
        ...fullyClosedProps,
        id,
      });
    });

    it('calls onAnimationEnd when provided', () => {
      const onAnimationEnd = jest.fn();
      const collapsible = mountWithApp<CollapsibleProps>(
        <Collapsible id="test-collapsible" open onAnimationEnd={onAnimationEnd}>
          content
        </Collapsible>,
      );

      collapsible.setProps({open: false});

      fireTransitionEnd(collapsible);

      expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    });

    it('does not complete opening transition if onTransitionEnd fires on a different target', () => {
      const id = 'test-collapsible';
      const collapsible = mountWithApp<CollapsibleProps>(
        <Collapsible id={id} open={false}>
          content
        </Collapsible>,
      );

      collapsible.setProps({open: true});
      fireTransitionEnd(collapsible, true);

      expect(collapsible).toContainReactComponent('div', {
        ...animatingOpenProps,
        id,
      });
    });

    it('does not complete closing transition if onTransitionEnd fires on a different target', () => {
      const id = 'test-collapsible';
      const collapsible = mountWithApp<CollapsibleProps>(
        <Collapsible id={id} open>
          content
        </Collapsible>,
      );

      collapsible.setProps({open: false});

      fireTransitionEnd(collapsible, true);

      expect(collapsible).toContainReactComponent('div', {
        ...animatingClosedProps,
        id,
      });
    });
  });
});

function fireTransitionEnd(
  collapsible: CustomRoot<CollapsibleProps, WithPolarisTestProviderOptions>,
  fireOnWrongTarget = false,
) {
  const id = collapsible.props.id;
  const div = collapsible.find('div', {id});
  const correctTarget = div!.domNode as HTMLDivElement;
  const wrongTarget = document.createElement('div');
  div!.trigger('onTransitionEnd', {
    target: fireOnWrongTarget ? wrongTarget : correctTarget,
  });
}
