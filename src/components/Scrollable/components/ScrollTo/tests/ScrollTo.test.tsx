import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import ScrollTo from '../ScrollTo';

describe('<Scrollable.ScrollTo />', () => {
  it('calls scrollToPosition on mount', () => {
    const spy = jest.fn();
    const mockContext = {
      scrollToPosition: spy,
    };

    mountWithAppProvider(<ScrollTo />, {
      context: mockContext,
    });

    expect(spy).toHaveBeenCalled();
  });
});
