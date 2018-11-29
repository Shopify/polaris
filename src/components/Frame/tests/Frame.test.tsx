import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider, documentHasStyle} from 'test-utilities';
import {
  TrapFocus,
  ContextualSaveBar as PolarisContextualSavebar,
  Loading as PolarisLoading,
} from 'components';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Provider as UserMenuProvider} from '../../TopBar/components/UserMenu/context';
import Frame from '../Frame';
import Button from '../../Button';
import TopBar from '../../TopBar';
import Navigation from '../../Navigation';
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

  it('renders a TrapFocus with a `trapping` prop set to true around the navigation on small screens and showMobileNavigation is true', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });

    const navigation = <div />;
    const frame = mountWithAppProvider(
      <Frame showMobileNavigation navigation={navigation} />,
    ).find(Frame);

    const trapFocus = frame.find(TrapFocus);

    expect(trapFocus.exists()).toBe(true);
    expect(trapFocus.prop('trapping')).toBe(true);
  });

  it('renders a TrapFocus with a `trapping` prop set to false prop around the navigation on small screens and showMobileNavigation is false', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });

    const navigation = <div />;
    const frame = mountWithAppProvider(<Frame navigation={navigation} />).find(
      Frame,
    );

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
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });

    const navigation = <div />;
    const cssTransition = mountWithAppProvider(
      <Frame showMobileNavigation navigation={navigation} />,
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

  it('renders a skip to content link with the proper text', () => {
    const skipToContentButtonText = mountWithAppProvider(<Frame />)
      .find(Button)
      .text();

    expect(skipToContentButtonText).toEqual('Skip to content');
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

  it('renders with a top bar data attribute if a topBar is passed', () => {
    const topbar = <div />;
    const topBar = mountWithAppProvider(<Frame topBar={topbar} />);

    expect(topBar.find('[data-polaris-top-bar]')).toHaveLength(1);
  });

  it('does not render with a top bar data attribute if none is passed', () => {
    const topBar = mountWithAppProvider(<Frame />);

    expect(topBar.find('[data-polaris-top-bar]')).toHaveLength(0);
  });

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

  it('should render a Frame ContextualSavebar if Polaris ContextualSavebar is rendered', () => {
    const frame = mountWithAppProvider(
      <Frame>
        <PolarisContextualSavebar />
      </Frame>,
    );
    expect(frame.find(FrameContextualSavebar).exists()).toBe(true);
  });

  it('should render a Frame Loading if Polaris Loading is rendered', () => {
    const frame = mountWithAppProvider(
      <Frame>
        <PolarisLoading />
      </Frame>,
    );
    expect(frame.find(FrameLoading).exists()).toBe(true);
  });

  describe('<UserMenuProvider />', () => {
    it('renders', () => {
      const frame = mountWithAppProvider(<Frame />);
      expect(frame.find(UserMenuProvider).exists()).toBeTruthy();
    });

    it('receives a mobileView boolean', () => {
      const frame = mountWithAppProvider(<Frame />);
      expect(frame.find(UserMenuProvider).prop('mobileView')).toBe(false);
    });

    it('receives the given top bar and navigation as its children', () => {
      const topBar = <TopBar />;
      const navigation = <Navigation location="" />;
      const frame = mountWithAppProvider(
        <Frame topBar={topBar} navigation={navigation} />,
      );
      expect(frame.find(UserMenuProvider).contains(topBar)).toBeTruthy();
      expect(frame.find(UserMenuProvider).contains(navigation)).toBeTruthy();
    });
  });
});
