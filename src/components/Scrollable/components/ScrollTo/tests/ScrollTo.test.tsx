import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import ScrollTo from '../ScrollTo';
import ScrollableContext from '../../../context';

describe('<Scrollable.ScrollTo />', () => {
  it('calls scrollToPosition on mount', () => {
    const spy = jest.fn();
    const mockContext = {
      scrollToPosition: spy,
    };

    mountWithAppProvider(
      <ScrollableContext.Provider value={mockContext}>
        <ScrollTo />
      </ScrollableContext.Provider>,
    );

    expect(spy).toHaveBeenCalled();
  });
});
