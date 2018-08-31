import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';

import ButtonGroup from '../../ButtonGroup';

describe('<ButtonGroup />', () => {
  it('calls onClick when clicking', () => {
    const spy = jest.fn();
    const link = mountWithAppProvider(
      <ButtonGroup url="MyThing" onClick={spy} />,
    );
    link.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
