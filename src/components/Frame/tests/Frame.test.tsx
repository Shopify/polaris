import React from 'react';
import {CSSTransition} from '@material-ui/react-transition-group';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {documentHasStyle, mountWithApp} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {
  TrapFocus,
  ContextualSaveBar as PolarisContextualSavebar,
  Loading as PolarisLoading,
} from 'components';
import {Frame} from '../Frame';
import {
  ContextualSaveBar as FrameContextualSavebar,
  Loading as FrameLoading,
} from '../components';

window.matchMedia =
  window.matchMedia ||
  function() {
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

    it('sets focus to the main content target anchor element when the skip to content link is clicked', () => {
      const frame = mountWithAppProvider(<Frame />);
      const mainAnchor = frame.find('main').find('a');
      trigger(frame.find('a').at(0), 'onClick');
      expect(mainAnchor.getDOMNode()).toBe(document.activeElement);
    });

    it('sets focus to target element when the skip to content link is clicked', () => {
      const targetId = 'SkipToContentTarget';
      const targetRef = React.createRef<HTMLAnchorElement>();

      const skipToContentTarget = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a id={targetId} ref={targetRef} tabIndex={-1} href="" />
      );

      const frame = mountWithAppProvider(
        <Frame skipToContentTarget={targetRef}>{skipToContentTarget}</Frame>,
      );

      const triggerAnchor = frame.find('a').at(0);
      const targetAnchor = frame.find(`#${targetId}`);
      trigger(triggerAnchor, 'onFocus');
      trigger(triggerAnchor, 'onClick');

      expect(triggerAnchor.getDOMNode().getAttribute('href')).toBe(
        `#${targetId}`,
      );
      expect(targetAnchor.getDOMNode()).toBe(document.activeElement);
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
  });

  describe('globalRibbon', () => {
    // JSDOM 11.12.0 does not support setting/reading custom properties so we are
    // unable to assert that we set a custom property
    // See https://github.com/jsdom/jsdom/issues/1895
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('sets a root property with global ribbon height if passed', () => {
      mountWithAppProvider(<Frame globalRibbon={<div />} />);
      expect(documentHasStyle('--global-ribbon-height', '0px')).toBe(true);
    });

    // JSDOM 11.12.0 does not support setting/reading custom properties so we are
    // unable to assert that we set a custom property
    // See https://github.com/jsdom/jsdom/issues/1895
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('sets a root property with global ribbon height if new props are passed', () => {
      const frame = mountWithAppProvider(<Frame />);
      frame.setProps({globalRibbon: <div />});
      expect(documentHasStyle('--global-ribbon-height', '0px')).toBe(true);
    });

    // JSDOM 11.12.0 does not support setting/reading custom properties so we are
    // unable to assert that we set a custom property
    // See https://github.com/jsdom/jsdom/issues/1895
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('sets a root property with global ribbon height of 0 if there is no globalRibbon prop', () => {
      mountWithAppProvider(<Frame />);
      expect(documentHasStyle('--global-ribbon-height', '0px')).toBe(true);
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
