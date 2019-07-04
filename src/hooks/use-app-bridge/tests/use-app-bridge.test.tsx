import React from 'react';
import isEqual from 'lodash/isEqual';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {createPolarisContext} from '../../../components';

import useAppBridge from '../use-app-bridge';

describe('useApp', () => {
  it('returns context', () => {
    function Component() {
      // eslint-disable-next-line shopify/jest/no-if
      return isEqual(useAppBridge(), createPolarisContext().appBridge) ? (
        <div />
      ) : null;
    }

    const component = mountWithAppProvider(<Component />);
    expect(component.find('div')).toHaveLength(1);
  });
});
