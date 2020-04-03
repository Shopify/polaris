import React from 'react';
import {mountWithApp} from 'test-utilities';

import {VideoThumbnail} from '../VideoThumbnail';

describe('<VideoThumbnail />', () => {
  const spyClick = jest.fn();
  const mockProps = {
    thumbnailUrl: '',
    onClick: spyClick,
  };

  describe('thumbnailUrl', () => {
    it('renders with play button and custom overlay', () => {
      const videoThumbnail = mountWithApp(<VideoThumbnail {...mockProps} />);

      expect(videoThumbnail.find('button')).not.toBeNull();
      expect(
        videoThumbnail.find('div', {className: 'Thumbnail'})!.prop('style')!
          .backgroundImage,
      ).toBe(`url(${mockProps.thumbnailUrl})`);
    });
  });

  describe('videoLength', () => {
    it('does not render a timestamp if not provided', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={undefined} />,
      );
      expect(videoThumbnail).not.toContainReactComponent('p', {
        className: 'Timestamp',
      });
    });

    it('renders a timestamp with seconds only when less than 60 seconds', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={45} />,
      );

      const timestamp = videoThumbnail
        .find('p', {
          className: 'Timestamp',
        })
        ?.text();

      expect(timestamp).toStrictEqual('0:45');
    });

    it('renders a timestamp with seconds and minutes only when less than 60 minutes', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={135} />,
      );

      const timestamp = videoThumbnail
        .find('p', {
          className: 'Timestamp',
        })
        ?.text();

      expect(timestamp).toStrictEqual('2:15');
    });

    it('renders timestamp with seconds, minutes, and hours when greater than 60 minutes', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={3745} />,
      );

      const timestamp = videoThumbnail
        .find('p', {
          className: 'Timestamp',
        })
        ?.text();

      expect(timestamp).toStrictEqual('1:02:25');
    });
  });

  describe('aria-label', () => {
    it('sets the accessibilityLabel on the aria-label attribute when provided', () => {
      const accessibilityLabel = 'test';
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          accessibilityLabel={accessibilityLabel}
        />,
      );
      expect(videoThumbnail.find('button')!.prop('aria-label')).toStrictEqual(
        accessibilityLabel,
      );
    });

    describe('when videoLength is provided', () => {
      const defaultLabelWithDuration = 'Play video of length';

      it('sets the default label with time in seconds when less than 60 seconds', () => {
        const videoLength = 45;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );

        const actualLabel = videoThumbnail.find('button')!.prop('aria-label');
        const expectedLabel = `${defaultLabelWithDuration} 45 seconds`;

        expect(actualLabel).toStrictEqual(expectedLabel);
      });

      it('sets the default label with time in seconds and minutes when less than 60 minutes', () => {
        const videoLength = 135;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );

        const actualLabel = videoThumbnail.find('button')!.prop('aria-label');
        const expectedLabel = `${defaultLabelWithDuration} 2 minutes and 15 seconds`;

        expect(actualLabel).toStrictEqual(expectedLabel);
      });

      it('sets the default label with time in seconds, minutes, and hours when greater than 60 minutes', () => {
        const videoLength = 3745;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );

        const actualLabel = videoThumbnail.find('button')!.prop('aria-label');
        const expectedLabel = `${defaultLabelWithDuration} 1 hour, 2 minutes, and 25 seconds`;

        expect(actualLabel).toStrictEqual(expectedLabel);
      });
    });
  });

  describe('onClick', () => {
    it('calls the onClick when the play button is clicked', () => {
      const videoThumbnail = mountWithApp(<VideoThumbnail {...mockProps} />);
      videoThumbnail.find('button')!.trigger('onClick');
      expect(spyClick).toHaveBeenCalled();
    });
  });

  describe('onBeforeStartPlaying', () => {
    it('calls the onMouseEnter when the enter button is pressed', () => {
      const spyOnBeforeStart = jest.fn();
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          onBeforeStartPlaying={spyOnBeforeStart}
        />,
      );
      videoThumbnail.find('button')!.trigger('onMouseEnter');
      expect(spyOnBeforeStart).toHaveBeenCalled();
    });

    it('calls the onTouchStart when the play button is pressed', () => {
      const spyOnBeforeStart = jest.fn();
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          onBeforeStartPlaying={spyOnBeforeStart}
        />,
      );
      videoThumbnail.find('button')!.trigger('onTouchStart');
      expect(spyOnBeforeStart).toHaveBeenCalled();
    });
  });
});
