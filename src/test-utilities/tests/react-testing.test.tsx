import React from 'react';
import {mount} from '@shopify/react-testing';
import {createThemeContext} from 'utilities/theme';
import {ScrollLockManager} from 'utilities/scroll-lock-manager';
import {StickyManager} from 'utilities/sticky-manager';
import {I18n} from 'utilities/i18n';
import {Link} from 'utilities/link';
import {TestProvider} from '../react-testing';

describe('TestProvider', () => {
  it("doesn't renders in strict mode by default", () => {
    const testProvider = mount(
      <TestProvider />,
    );

    expect(testProvider).not.toContainReactComponent(React.StrictMode);
  });

  it('renders in strict mode with strict', () => {
    const testProvider = mount(
      <TestProvider strict />,
    );

    expect(testProvider).toContainReactComponent(React.StrictMode);
  });
});

function noop() {}
