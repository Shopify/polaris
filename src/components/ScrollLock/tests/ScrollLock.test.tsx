import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import ScrollLock from '../ScrollLock';
import Scrollable from '../../Scrollable';

describe('<ScrollLock />', () => {
  it('mounts', () => {
    const mounted = mountWithAppProvider(<ScrollLock />);
    expect(mounted).toBeTruthy();
  });

  it('prevents the wheel event from propagating', () => {
    const spy = jest.fn();
    const scrollArea = mountWithAppProvider(
      <div onWheel={spy}>
        <ScrollLock>
          <Scrollable>
            <div id="scrollContents" />
          </Scrollable>
        </ScrollLock>
      </div>,
    );
    scrollArea.find('#scrollContents').simulate('wheel');
    expect(spy).not.toHaveBeenCalled();
  });
});
