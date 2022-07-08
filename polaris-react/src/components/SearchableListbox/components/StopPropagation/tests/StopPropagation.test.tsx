import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {StopPropagation} from '../StopPropagation';

const FakeComponent = ({
  bubbleEventSpy,
  withStopPropagation = true,
}: {
  bubbleEventSpy: (position: string) => void;
  withStopPropagation?: boolean;
}) => {
  const handleClick = (position: string) => {
    bubbleEventSpy(position);
  };

  const handleInnerClick = () => {
    handleClick('inner');
  };

  const button = (
    <button
      type="button"
      id="my-button"
      onTouchStart={handleInnerClick}
      onClick={handleInnerClick}
    >
      My button
    </button>
  );

  return (
    <div onClick={() => handleClick('outer')}>
      {withStopPropagation ? (
        <StopPropagation>{button}</StopPropagation>
      ) : (
        button
      )}
    </div>
  );
};

describe('<StopPropagation />', () => {
  it.each(['click', 'touchstart'])(
    'stops propagation of %s event if <StopPropagation /> is present',
    (event) => {
      const clickSpy = jest.fn();
      const searchWrapper = mountWithApp(
        <FakeComponent bubbleEventSpy={clickSpy} />,
      );

      searchWrapper
        .find('button', {id: 'my-button'})!
        .domNode!.dispatchEvent(new Event(event, {bubbles: true}));

      expect(clickSpy).toHaveBeenCalledWith('inner');
      expect(clickSpy).not.toHaveBeenCalledWith('outer');
    },
  );

  it("doesn't stop propagation of click event if <StopPropagation /> isn't present", () => {
    const clickSpy = jest.fn();
    const searchWrapper = mountWithApp(
      <FakeComponent bubbleEventSpy={clickSpy} withStopPropagation={false} />,
    );

    searchWrapper
      .find('button', {id: 'my-button'})!
      .domNode!.dispatchEvent(new Event('click', {bubbles: true}));

    expect(clickSpy).toHaveBeenCalledWith('inner');
    expect(clickSpy).toHaveBeenCalledWith('outer');
  });
});
