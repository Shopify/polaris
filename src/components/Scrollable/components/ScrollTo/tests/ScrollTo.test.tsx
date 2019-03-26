import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import ScrollTo from '../ScrollTo';
import {Provider} from '../../Context';

describe('<Scrollable.ScrollTo />', () => {
  it('calls scrollToPosition on mount', () => {
    const spy = jest.fn();
    const mockContext = {
      scrollToPosition: spy,
    };

    mountWithAppProvider(
      <Provider value={mockContext}>
        <ScrollTo />
      </Provider>,
    );

    expect(spy).toHaveBeenCalled();
  });
});
