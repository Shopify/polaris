import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {
  animationFrame,
  mountWithAppProvider,
  documentHasStyle,
  findByTestID,
} from '../../../../tests/utilities';
import {TrapFocus} from '../../Focus';
import Frame from '../Frame';
import Button from '../../Button';
import {
  ContextualSaveBar as FrameContextualSavebar,
  Loading as FrameLoading,
} from '../components';
import {
  ContextualSaveBar as PolarisContextualSavebar,
  Loading as PolarisLoading,
} from '../..';

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
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: defaultWindowWidth,
    });
  });

  it('renders a TrapFocus around the navigation if a navigation is provided on small screen and showMobileNavigation is true', () => {
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

  it('does not render TrapFocus around the navigation if a navigation is provided on large screen and even if showMobileNavigation is true', () => {
    const navigation = <div />;
    const trapFocus = mountWithAppProvider(
      <Frame showMobileNavigation navigation={navigation} />,
    ).find(TrapFocus);

    expect(trapFocus.exists()).toBe(false);
  });

  it('renders a CSSTransition around the navigation with an `in` prop set to true if a navigation is provided on small screen and showMobileNavigation is true', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });

    const navigation = <div />;
    const frame = mountWithAppProvider(
      <Frame showMobileNavigation navigation={navigation} />,
    ).find(Frame);

    const cssTransition = frame.find(TrapFocus).find(CSSTransition);

    expect(cssTransition.prop('in')).toBe(true);
  });

  it('renders a CSSTransition around the navigation with an `in` prop set to false if a navigation is provided on small screen and showMobileNavigation is false', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });

    const navigation = <div />;
    const frame = mountWithAppProvider(
      <Frame showMobileNavigation={false} navigation={navigation} />,
    ).find(Frame);

    const cssTransition = frame.find(TrapFocus).find(CSSTransition);

    expect(cssTransition.prop('in')).toBe(false);
  });

  it('does not render a CSSTransition around the navigation if a navigation is provided on large screens even if showMobileNavigation is true', () => {
    const navigation = <div />;
    const frame = mountWithAppProvider(
      <Frame showMobileNavigation navigation={navigation} />,
    ).find(Frame);

    const nav = findByTestID(frame, 'NavWrapper');
    const cssTransition = nav.find(CSSTransition);

    expect(cssTransition.exists()).toBe(false);
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

  it('sets a root property with global ribbon height if passed', () => {
    mountWithAppProvider(<Frame globalRibbon={<div />} />);
    expect(documentHasStyle('GlobalRibbonHeight', '0px')).toBe(true);
  });

  it('sets a root property with global ribbon height if new props are passed', () => {
    const frame = mountWithAppProvider(<Frame />);
    frame.setProps({globalRibbon: <div />});
    expect(documentHasStyle('GlobalRibbonHeight', '0px')).toBe(true);
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
});
