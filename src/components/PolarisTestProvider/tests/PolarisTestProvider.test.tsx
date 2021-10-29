import React, {StrictMode} from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {MediaQueryContext, useMediaQuery} from '../../../utilities/media-query';
import {PolarisTestProvider} from '../PolarisTestProvider';

describe('PolarisTestProvider', () => {
  it("doesn't render in strict mode by default", () => {
    const polarisTestProvider = mount(
      <PolarisTestProvider>
        <div>Hello</div>
      </PolarisTestProvider>,
    );

    expect(polarisTestProvider).not.toContainReactComponent(StrictMode);
  });

  it('renders in strict mode with strict', () => {
    const polarisTestProvider = mount(
      <PolarisTestProvider strict>
        <div>Hello</div>
      </PolarisTestProvider>,
    );

    expect(polarisTestProvider).toContainReactComponent(StrictMode);
  });

  describe('MediaQueryContext', () => {
    it('contains a MediaQueryContext provider', () => {
      const polarisTestProvider = mountWithApp(
        <PolarisTestProvider>
          <div>Children</div>
        </PolarisTestProvider>,
      );

      expect(polarisTestProvider).toContainReactComponent(
        MediaQueryContext.Provider,
      );
    });

    it('allows isNavigationCollapsed to be overwritten', () => {
      function Component() {
        const {isNavigationCollapsed} = useMediaQuery();
        // eslint-disable-next-line jest/no-if
        return isNavigationCollapsed ? <span /> : null;
      }

      const polarisTestProvider = mountWithApp(
        <PolarisTestProvider mediaQuery={{isNavigationCollapsed: true}}>
          <Component />
        </PolarisTestProvider>,
      );

      expect(polarisTestProvider).toContainReactComponentTimes('span', 1);
    });
  });
});
