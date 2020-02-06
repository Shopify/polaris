import React from 'react';
import faker from 'faker';
import {mountWithAppContext} from 'tests/modern';

import VideoThumbnail from '../VideoThumbnail';

describe('<VideoThumbnail />', () => {
  const spy = jest.fn();
  const mockProps = {
    thumbnailUrl: faker.internet.url(),
    videoLength: 350,
    onClick: spy,
    onBeforeStartPlaying: spy,
  };

  it('renders with start button and custom overlay', async () => {
    const videoThumbnail = await mountWithAppContext(
      <VideoThumbnail {...mockProps} />,
    );

    expect(videoThumbnail.find('button')).not.toBeNull();
    expect(
      videoThumbnail.find('div', {className: 'Thumbnail'})!.prop('style')!
        .backgroundImage,
    ).toBe(`url(${mockProps.thumbnailUrl})`);
    expect(videoThumbnail.find('p', {className: 'Timestamp'}))!.not.toBeNull();
  });

  it('calls the onClick when the play button is clicked', async () => {
    const videoThumbnail = await mountWithAppContext(
      <VideoThumbnail {...mockProps} />,
    );
    videoThumbnail.find('button')!.trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onMouseEnter when the enter button is pressed', async () => {
    const videoThumbnail = await mountWithAppContext(
      <VideoThumbnail {...mockProps} />,
    );
    videoThumbnail.find('button')!.trigger('onMouseEnter');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onTouchStart when the play button is pressed', async () => {
    const videoThumbnail = await mountWithAppContext(
      <VideoThumbnail {...mockProps} />,
    );
    videoThumbnail.find('button')!.trigger('onTouchStart');
    expect(spy).toHaveBeenCalled();
  });
});
