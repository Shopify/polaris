import React from 'react';
import {mount} from 'tests/utilities';

import {useDisableClicks} from '../use-disable-interaction';

describe ('useDisableClicks', () => {
  it('disables clicks', () => {
    const spy = jest.fn();
    const handleClick = mount(<MockClickEvent handler={spy} disabled />);

    handleClick

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    button.simulate('click', mockEvent);


    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  }
  );
});



function MockClickEvent({
  disabled,
  handler,
}: {
  disabled: boolean;
  handler: () => void;
}) {
  const handleClickWrapper = useDisableClicks(disabled, handler);
  return handleClickWrapper;
}
