import React from 'react';
import {mount} from '@shopify/react-testing';
import {TestProvider} from '../react-testing';

// eslint-disable-next-line shopify/strict-component-boundaries
import {createPolarisContext} from '../../components/AppProvider';
// eslint-disable-next-line shopify/strict-component-boundaries
import {createThemeContext} from '../../components/ThemeProvider';

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
      >
        <div>Polaris</div>
      </TestProvider>,
    );
    expect(testProvider).toContainReactComponent(React.StrictMode);
  });
});

function noop() {}
