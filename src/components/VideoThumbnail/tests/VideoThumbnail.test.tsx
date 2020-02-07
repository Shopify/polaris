import React from 'react';
import {mountWithApp} from 'test-utilities';
import {VideoThumbnail} from '../VideoThumbnail';

describe('<VideoThumbnail />', () => {
  const spyClick = jest.fn();
  const mockProps = {
    thumbnailUrl: '',
    videoLength: 350,
    onClick: spyClick,
  };

  it('renders with start button and custom overlay', () => {
    const videoThumbnail = mountWithApp(<VideoThumbnail {...mockProps} />);

    expect(videoThumbnail.find('button')).not.toBeNull();
    expect(
      videoThumbnail.find('div', {className: 'Thumbnail'})!.prop('style')!
        .backgroundImage,
    ).toBe(`url(${mockProps.thumbnailUrl})`);
    expect(videoThumbnail).toContainReactComponent('p', {
      className: 'Timestamp',
    });
  });

  it('does not render video length if not provided', () => {
    const videoThumbnail = mountWithApp(
      <VideoThumbnail {...mockProps} videoLength={undefined} />,
    );
    expect(videoThumbnail).not.toContainReactComponent('p', {
      className: 'Timestamp',
    });
  });

  it('renders aria label', () => {
    const accessibilityLabel = 'test';
    const videoThumbnail = mountWithApp(
      <VideoThumbnail {...mockProps} accessibilityLabel={accessibilityLabel} />,
    );
    expect(videoThumbnail.find('button')!.prop('aria-label')).toStrictEqual(
      accessibilityLabel,
    );
  });

  it('calls the onClick when the play button is clicked', () => {
    const videoThumbnail = mountWithApp(<VideoThumbnail {...mockProps} />);
    videoThumbnail.find('button')!.trigger('onClick');
    expect(spyClick).toHaveBeenCalled();
  });

  it('calls the onMouseEnter when the enter button is pressed', () => {
    const spyOnBeforeStart = jest.fn();
    const videoThumbnail = mountWithApp(
      <VideoThumbnail {...mockProps} onBeforeStartPlaying={spyOnBeforeStart} />,
    );
    videoThumbnail.find('button')!.trigger('onMouseEnter');
    expect(spyOnBeforeStart).toHaveBeenCalled();
  });

  it('calls the onTouchStart when the play button is pressed', () => {
    const spyOnBeforeStart = jest.fn();
    const videoThumbnail = mountWithApp(
      <VideoThumbnail {...mockProps} onBeforeStartPlaying={spyOnBeforeStart} />,
    );
    videoThumbnail.find('button')!.trigger('onTouchStart');
    expect(spyOnBeforeStart).toHaveBeenCalled();
  });
});
