import React from 'react';
import {mount} from '@shopify/react-testing';
import {createThemeContext} from 'utilities/theme';
import {ScrollLockManager} from 'utilities/scroll-lock-manager';
import {StickyManager} from 'utilities/sticky-manager';
import {I18n} from 'utilities/i18n';
import {Link} from 'utilities/link';
import {TestProvider} from '../react-testing';
import {createPolarisContext} from '../../utilities/create-polaris-context';

describe('TestProvider', () => {
  it('renders in strict mode', () => {
    const testProvider = mount(
      <TestProvider
        polaris={createPolarisContext()}
        themeProvider={createThemeContext()}
        frame={{
          showToast: noop,
          hideToast: noop,
          setContextualSaveBar: noop,
          removeContextualSaveBar: noop,
          startLoading: noop,
          stopLoading: noop,
        }}
        scrollLockManager={new ScrollLockManager()}
        stickyManager={new StickyManager()}
        intl={new I18n({})}
        appBridge={null}
        link={new Link()}
      >
        <div>Polaris</div>
      </TestProvider>,
    );
    expect(testProvider).toContainReactComponent(React.StrictMode);
  });
});

function noop() {}
