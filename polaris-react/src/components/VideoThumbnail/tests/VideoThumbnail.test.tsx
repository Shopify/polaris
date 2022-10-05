import React from 'react';
import {mountWithApp} from 'tests/utilities';

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

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Thumbnail',
        style: {
          backgroundImage: `url(${mockProps.thumbnailUrl})`,
        },
      });
      expect(videoThumbnail.find('button')).not.toBeNull();
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

      expect(videoThumbnail).toContainReactComponent('p', {
        className: 'Timestamp',
        children: '0:45',
      });
    });

    it('renders a timestamp with seconds and minutes only when less than 60 minutes', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={135} />,
      );
      expect(videoThumbnail).toContainReactComponent('p', {
        className: 'Timestamp',
        children: '2:15',
      });
    });

    it('renders timestamp with seconds, minutes, and hours when greater than 60 minutes', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={3745} />,
      );
      expect(videoThumbnail).toContainReactComponent('p', {
        className: 'Timestamp',
        children: '1:02:25',
      });
    });
  });

  describe('videoProgress', () => {
    const oldEnv = process.env;
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      process.env = {...oldEnv};
      delete process.env.NODE_ENV;

      warnSpy = jest.spyOn(console, 'warn');
      warnSpy.mockImplementation(() => {});
    });

    afterEach(() => {
      process.env = oldEnv;
      warnSpy.mockRestore();
    });

    it('renders empty progress bar if progress not provided', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoProgress={undefined}
          showVideoProgress
        />,
      );

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Progress',
      });

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Indicator',
        style: expect.objectContaining({
          transform: 'scaleX(0)',
        }),
      });
    });

    it('renders empty progress bar if video length not provided', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={undefined}
          videoProgress={50}
          showVideoProgress
        />,
      );

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Progress',
      });

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Indicator',
        style: expect.objectContaining({
          transform: 'scaleX(0)',
        }),
      });
    });

    it('renders non-empty progress bar when both video length and progress provided', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={120}
          videoProgress={60}
          showVideoProgress
        />,
      );

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Progress',
      });

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Indicator',
        style: expect.objectContaining({
          transform: 'scaleX(0.5)',
        }),
      });
    });

    it('warns when video progress exceeds video length in development environment', () => {
      process.env.NODE_ENV = 'development';

      mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={100}
          videoProgress={101}
          showVideoProgress
        />,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        'Value passed to the video progress should not exceed video length. Resetting progress to 100%.',
      );
    });

    it('does not warn when video progress exceeds video length in production environment', () => {
      process.env.NODE_ENV = 'production';

      mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={100}
          videoProgress={101}
          showVideoProgress
        />,
      );

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('showVideoProgress', () => {
    it('does not renders progress bar when prop is omitted', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail {...mockProps} videoLength={120} videoProgress={60} />,
      );

      expect(videoThumbnail).not.toContainReactComponent('div', {
        className: 'Progress',
      });
    });

    it('renders progress bar when prop is set to true', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={120}
          videoProgress={60}
          showVideoProgress
        />,
      );

      expect(videoThumbnail).toContainReactComponent('div', {
        className: 'Progress',
      });
    });

    it('does not render progress bar when prop is set to false', () => {
      const videoThumbnail = mountWithApp(
        <VideoThumbnail
          {...mockProps}
          videoLength={120}
          videoProgress={60}
          showVideoProgress={false}
        />,
      );

      expect(videoThumbnail).not.toContainReactComponent('div', {
        className: 'Progress',
      });
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
      expect(videoThumbnail).toContainReactComponent('button', {
        'aria-label': accessibilityLabel,
      });
    });

    describe('when videoLength is provided', () => {
      const defaultLabelWithDuration = 'Play video of length';

      it('sets the default label with time in seconds when less than 60 seconds', () => {
        const videoLength = 45;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );

        expect(videoThumbnail).toContainReactComponent('button', {
          'aria-label': `${defaultLabelWithDuration} 45 seconds`,
        });
      });

      it('sets the default label with time in seconds and minutes when less than 60 minutes', () => {
        const videoLength = 135;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );

        expect(videoThumbnail).toContainReactComponent('button', {
          'aria-label': `${defaultLabelWithDuration} 2 minutes and 15 seconds`,
        });
      });

      it('sets the default label with time in seconds, minutes, and hours when greater than 60 minutes', () => {
        const videoLength = 3745;
        const videoThumbnail = mountWithApp(
          <VideoThumbnail {...mockProps} videoLength={videoLength} />,
        );
        expect(videoThumbnail).toContainReactComponent('button', {
          'aria-label': `${defaultLabelWithDuration} 1 hour, 2 minutes, and 25 seconds`,
        });
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
