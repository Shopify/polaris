import React, {createRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {animationFrame, dimension} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {
  ContextualSaveBar as PolarisContextualSavebar,
  Loading as PolarisLoading,
  TrapFocus,
} from 'components';

import {Frame} from '../Frame';
import {
  ContextualSaveBar as FrameContextualSavebar,
  Loading as FrameLoading,
} from '../components';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: window.innerWidth <= 769,
      addListener() {},
      removeListener() {},
    };
  };

const defaultWindowWidth = window.innerWidth;

describe('<Frame />', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: defaultWindowWidth,
    });
  });

  describe('skipToContentTarget', () => {
    it('renders a skip to content link with the proper text', () => {
      const skipToContentLinkText = mountWithAppProvider(<Frame />)
        .find('a')
        .at(0)
        .text();

      expect(skipToContentLinkText).toStrictEqual('Skip to content');
    });

    it('targets the main container element by default', () => {
      const frame = mountWithApp(<Frame />);
      const skipLink = frame.find('a', {children: 'Skip to content'});

      expect(skipLink!.domNode!.getAttribute('href')).toBe(
        `#${frame!.find('main')!.domNode!.id}`,
      );
    });

    it('sets focus to target element when the skip to content link is clicked', () => {
      const targetId = 'SkipToContentTarget';
      const targetRef = createRef<HTMLAnchorElement>();

      const skipToContentTarget = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a id={targetId} ref={targetRef} tabIndex={-1} href="" />
      );

      const frame = mountWithApp(
        <Frame skipToContentTarget={targetRef}>{skipToContentTarget}</Frame>,
      );

      const triggerAnchor = frame.findAll('a')[0]!;

      triggerAnchor.trigger('onFocus');
      triggerAnchor.trigger('onClick');

      expect(document.activeElement).toBe(
        frame.find('a', {id: targetId})!.domNode,
      );
    });
  });

  describe('topBar', () => {
    it('renders with a top bar data attribute if a topBar is passed', () => {
      const topbar = <div />;
      const topBar = mountWithAppProvider(<Frame topBar={topbar} />);

      expect(topBar.find('[data-polaris-top-bar]')).toHaveLength(1);
    });

    it('does not render with a top bar data attribute if none is passed', () => {
      const topBar = mountWithAppProvider(<Frame />);

      expect(topBar.find('[data-polaris-top-bar]')).toHaveLength(0);
    });
  });

  describe('navigation', () => {
    it('renders a TrapFocus with a `trapping` prop set to true around the navigation on small screens and showMobileNavigation is true', () => {
      const navigation = <div />;
      const frame = mountWithAppProvider(
        <Frame showMobileNavigation navigation={navigation} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      ).find(Frame);

      const trapFocus = frame.find(TrapFocus);

      expect(trapFocus.exists()).toBe(true);
      expect(trapFocus.prop('trapping')).toBe(true);
    });

    it('renders a TrapFocus with a `trapping` prop set to false prop around the navigation on small screens and showMobileNavigation is false', () => {
      const navigation = <div />;
      const frame = mountWithAppProvider(<Frame navigation={navigation} />, {
        mediaQuery: {isNavigationCollapsed: true},
      }).find(Frame);

      const trapFocus = frame.find(TrapFocus);
      expect(trapFocus.exists()).toBe(true);
      expect(trapFocus.prop('trapping')).toBe(false);
    });

    it('renders a TrapFocus with a `trapping` prop set to false prop around the navigation on large screens even if showMobileNavigation is true', () => {
      const navigation = <div />;
      const trapFocus = mountWithAppProvider(
        <Frame showMobileNavigation navigation={navigation} />,
      ).find(TrapFocus);

      expect(trapFocus.exists()).toBe(true);
      expect(trapFocus.prop('trapping')).toBe(false);
    });

    it('renders a CSSTransition around the navigation with `appear` and `exit` set to true on small screen', () => {
      const navigation = <div />;
      const cssTransition = mountWithAppProvider(
        <Frame showMobileNavigation navigation={navigation} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      )
        .find(TrapFocus)
        .find(CSSTransition);

      expect(cssTransition.prop('appear')).toBe(true);
      expect(cssTransition.prop('exit')).toBe(true);
    });

    it('renders a CSSTransition around the navigation with `appear` and `exit` set to false on large screen', () => {
      const navigation = <div />;
      const cssTransition = mountWithAppProvider(
        <Frame navigation={navigation} />,
      )
        .find(TrapFocus)
        .find(CSSTransition);

      expect(cssTransition.prop('appear')).toBe(false);
      expect(cssTransition.prop('exit')).toBe(false);
    });

    it('renders a CSSTransition around the navigation with an `in` prop set to false if showMobileNavigation is true', () => {
      const navigation = <div />;
      const cssTransition = mountWithAppProvider(
        <Frame showMobileNavigation={false} navigation={navigation} />,
      )
        .find(Frame)
        .find(TrapFocus)
        .find(CSSTransition);

      expect(cssTransition.prop('in')).toBe(false);
    });

    it('renders a CSSTransition around the navigation with an `in` prop set to true if showMobileNavigation is true', () => {
      const navigation = <div />;
      const cssTransition = mountWithAppProvider(
        <Frame showMobileNavigation navigation={navigation} />,
      )
        .find(Frame)
        .find(TrapFocus)
        .find(CSSTransition);

      expect(cssTransition.prop('in')).toBe(true);
    });

    it('renders with a has nav data attribute when nav is passed', () => {
      const navigation = <div />;
      const frame = mountWithAppProvider(<Frame navigation={navigation} />);
      expect(frame.find('[data-has-navigation]')).toHaveLength(1);
    });

    it('does not render with a has nav data attribute when nav is not passed', () => {
      const frame = mountWithAppProvider(<Frame />);
      expect(frame.find('[data-has-navigation]')).toHaveLength(0);
    });

    it('does not call onNavigationDismiss when escape is pressed and screen size is large', () => {
      const spy = jest.fn();
      const frame = mountWithApp(
        <Frame navigation={<div />} onNavigationDismiss={spy} />,
      );
      frame
        .find('div', {id: 'AppFrameNav'})!
        .trigger('onKeyDown', {key: 'Escape'});

      expect(spy).not.toHaveBeenCalled();
    });

    it('calls onNavigationDismiss when escape is pressed and screen size is small', () => {
      const spy = jest.fn();
      const frame = mountWithApp(
        <Frame
          navigation={<div />}
          showMobileNavigation
          onNavigationDismiss={spy}
        />,
        {mediaQuery: {isNavigationCollapsed: true}},
      );
      frame
        .find('div', {id: 'AppFrameNav'})!
        .trigger('onKeyDown', {key: 'Escape'});

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders mobile accessibility attributes on small screens', () => {
      const navigation = <div />;
      const frame = mountWithApp(
        <Frame showMobileNavigation navigation={navigation} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      );

      expect(frame).toContainReactComponent('div', {
        'aria-modal': true,
        role: 'dialog',
      });
    });

    it('does not render mobile accessibility attributes on large screens', () => {
      const navigation = <div />;
      const frame = mountWithApp(
        <Frame showMobileNavigation navigation={navigation} />,
        {mediaQuery: {isNavigationCollapsed: false}},
      );

      expect(frame).not.toContainReactComponent('div', {
        'aria-modal': true,
        role: 'dialog',
      });
    });
  });

  describe('globalRibbon', () => {
    // Frame sets the --global-ribbon-height custom property based off the
    // offsetHeight of the component passed into globalRibbon. JSDom doesn't
    // have a layout engine so use a mock value
    beforeEach(() => {
      dimension.mock({offsetHeight: 30});
    });

    afterEach(() => {
      dimension.restore();
    });

    it('sets a root property with global ribbon height if passed', () => {
      mountWithAppProvider(
        <Frame globalRibbon={<div />}>I am some content</Frame>,
      );
      expect(
        document.documentElement.style.getPropertyValue(
          '--global-ribbon-height',
        ),
      ).toBe('30px');
    });

    it('sets a root property with global ribbon height if new props are passed', () => {
      const frame = mountWithAppProvider(<Frame />);

      expect(
        document.documentElement.style.getPropertyValue(
          '--global-ribbon-height',
        ),
      ).toBe('0px');

      frame.setProps({globalRibbon: <div />});
      expect(
        document.documentElement.style.getPropertyValue(
          '--global-ribbon-height',
        ),
      ).toBe('30px');
    });

    it('sets a root property with global ribbon height of 0 if there is no globalRibbon prop', () => {
      mountWithAppProvider(<Frame />);
      expect(
        document.documentElement.style.getPropertyValue(
          '--global-ribbon-height',
        ),
      ).toBe('0px');
    });
  });

  describe('ContextualSavebar', () => {
    it('renders a Frame ContextualSavebar if Polaris ContextualSavebar is rendered', () => {
      const frame = mountWithAppProvider(
        <Frame>
          <PolarisContextualSavebar />
        </Frame>,
      );
      expect(frame.find(FrameContextualSavebar).exists()).toBe(true);
    });
  });

  describe('loading', () => {
    it('renders a Frame Loading if Polaris Loading is rendered', () => {
      const frame = mountWithAppProvider(
        <Frame>
          <PolarisLoading />
        </Frame>,
      );
      expect(frame.find(FrameLoading).exists()).toBe(true);
    });
  });
});
