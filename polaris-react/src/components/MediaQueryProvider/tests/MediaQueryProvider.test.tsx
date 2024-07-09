import React from 'react';
import {act} from 'react-dom/test-utils';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {MediaQueryProvider} from '../MediaQueryProvider';
import {useMediaQuery} from '../../../utilities/media-query';

describe('MediaQueryProvider', () => {
  it('renders EventListener with the resize event', () => {
    const mediaQueryProvider = mountWithApp(<MediaQueryProvider />);
    // eslint-disable-next-line import/no-deprecated
    expect(mediaQueryProvider).toContainReactComponentTimes(EventListener, 1, {
      event: 'resize',
    });
  });

  it('passes isNavigationCollapsed to MediaQueryContext.Provider', () => {
    function Component() {
      const mediaQuery = useMediaQuery();
      // eslint-disable-next-line jest/no-if
      return mediaQuery !== undefined ? <div /> : null;
    }

    const mediaQueryProvider = mountWithApp(
      <MediaQueryProvider>
        <Component />
      </MediaQueryProvider>,
    );
    expect(mediaQueryProvider).toContainReactComponentTimes('div', 1);
  });

  it('sets isNavigationCollapsed when resize occurs', () => {
    function Component() {
      const {isNavigationCollapsed} = useMediaQuery();
      // eslint-disable-next-line jest/no-if
      return isNavigationCollapsed ? <div>content</div> : null;
    }
    const mediaQueryProvider = mountWithApp(
      <MediaQueryProvider>
        <Component />
      </MediaQueryProvider>,
    );

    matchMedia.setMedia(() => ({matches: true}));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    mediaQueryProvider.forceUpdate();
    expect(mediaQueryProvider).toContainReactComponentTimes('div', 1);
  });
});
