import React from 'react';
import {animationFrame, dimension} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Resizer} from '../Resizer';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../../EventListener';

describe('<Resizer />', () => {
  const mockProps = {
    onHeightChange: noop,
    contents: 'Contents',
  };

  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('cancels existing animationFrame on update', () => {
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    const contents = 'Contents';
    const resizer = mountWithApp(
      <Resizer
        {...mockProps}
        currentHeight={1}
        contents={contents}
        onHeightChange={jest.fn()}
        minimumLines={3}
      />,
    );

    resizer.setProps({currentHeight: 2});
    // eslint-disable-next-line import/no-deprecated
    resizer.find(EventListener)!.trigger('handler');

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  it('cancels the animationFrame unmount', () => {
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    const contents = 'Contents';
    const resizer = mountWithApp(
      <Resizer {...mockProps} contents={contents} />,
    );

    resizer.unmount();

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });

  describe('contents', () => {
    it('renders contents', () => {
      const contents = 'Contents';
      const resizer = mountWithApp(
        <Resizer {...mockProps} contents={contents} />,
      );
      expect(resizer.find('div')).toContainReactText(contents);
    });

    it('encodes HTML entities', () => {
      const contents = `<div>&\nContents</div>`;
      const resizer = mountWithApp(
        <Resizer {...mockProps} contents={contents} />,
      );
      const expectedEncodedContents =
        '&lt;div&gt;&amp;<br>Contents&lt;/div&gt;<br></div>';
      expect(resizer)!.toContainReactHtml(expectedEncodedContents);
    });

    it('ignores carriage returns when rendering content', () => {
      const contents = `<div>&\n\r\r\rContents</div>`;
      const resizer = mountWithApp(
        <Resizer {...mockProps} contents={contents} />,
      );
      const expectedEncodedContents =
        '&lt;div&gt;&amp;<br>Contents&lt;/div&gt;<br></div>';
      expect(resizer)!.toContainReactHtml(expectedEncodedContents);
    });

    it('recognizes commas', () => {
      const contents = `Contents, contents`;
      const resizer = mountWithApp(
        <Resizer {...mockProps} contents={contents} />,
      );
      const expectedEncodedContents = 'Contents, contents';
      expect(resizer)!.toContainReactHtml(expectedEncodedContents);
    });
  });

  describe('minimumLines', () => {
    it('renders a number of <br> tags equivalent to minimumLines', () => {
      const minimumLines = 3;
      const resizer = mountWithApp(
        <Resizer {...mockProps} minimumLines={minimumLines} />,
      );
      expect(resizer.find('div'))!.toContainReactHtml('<br><br><br>');
    });

    it('renders nothing when minimumLines is undefined', () => {
      const resizer = mountWithApp(
        <Resizer {...mockProps} minimumLines={undefined} />,
      );
      expect(resizer.find('div'))!.not.toContainReactHtml('<br><br><br>');
    });
  });

  describe('onHeightChange()', () => {
    beforeEach(() => {
      dimension.mock({offsetHeight: 30});
    });

    afterEach(() => {
      dimension.restore();
    });

    it('is called on mount if minimumLines is provided', () => {
      const spy = jest.fn();
      mountWithApp(
        <Resizer
          {...mockProps}
          currentHeight={50}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      animationFrame.runFrame();
      expect(spy).toHaveBeenCalledWith(30);
    });

    it('is not called on mount if minimumLines is not provided', () => {
      const spy = jest.fn();
      mountWithApp(
        <Resizer {...mockProps} currentHeight={50} onHeightChange={spy} />,
      );
      animationFrame.runFrame();
      expect(spy).not.toHaveBeenCalled();
    });

    it('is not called on mount if currentHeight is the same as DOM height', () => {
      const spy = jest.fn();
      mountWithApp(
        <Resizer
          {...mockProps}
          currentHeight={30}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      animationFrame.runFrame();
      expect(spy).not.toHaveBeenCalled();
    });

    it('is called again on resize', () => {
      const spy = jest.fn();
      const currentHeight = 50;
      const resizer = mountWithApp(
        <Resizer
          {...mockProps}
          currentHeight={currentHeight}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      resizer.setProps({currentHeight: 1});
      // eslint-disable-next-line import/no-deprecated
      resizer.find(EventListener)?.trigger('handler');
      animationFrame.runFrame();
      expect(spy).toHaveBeenCalledWith(30);
    });

    it('is not called again on resize if minimumLines is not provided', () => {
      const spy = jest.fn();
      const currentHeight = 0;
      const resizer = mountWithApp(
        <Resizer
          {...mockProps}
          currentHeight={currentHeight}
          onHeightChange={spy}
        />,
      );
      resizer.setProps({currentHeight: 1});
      // eslint-disable-next-line import/no-deprecated
      resizer.find(EventListener)?.trigger('handler');
      animationFrame.runFrame();
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  it('is not called again on resize if currentHeight is the same as DOM height', () => {
    const spy = jest.fn();
    const currentHeight = 0;
    const resizer = mountWithApp(
      <Resizer
        {...mockProps}
        currentHeight={currentHeight}
        onHeightChange={spy}
      />,
    );
    resizer.setProps({currentHeight: 1});
    // eslint-disable-next-line import/no-deprecated
    resizer.find(EventListener)?.trigger('handler');
    animationFrame.runFrame();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  describe('aria-hidden', () => {
    it('renders aria-hidden as true', () => {
      const contents = 'Contents';
      const resizer = mountWithApp(
        <Resizer {...mockProps} contents={contents} />,
      );
      expect(resizer).toContainReactComponent('div', {
        className: 'Resizer',
        'aria-hidden': true,
      });
    });
  });

  describe('lifecycle', () => {
    it('mounts safely', () => {
      expect(() => {
        mountWithApp(<Resizer {...mockProps} />);
      }).not.toThrow();
    });

    it('updates safely', () => {
      const resizer = mountWithApp(<Resizer {...mockProps} />);

      expect(() => {
        resizer.setProps({contents: 'new content'});
      }).not.toThrow();
    });

    it('unmounts safely', () => {
      const resizer = mountWithApp(<Resizer {...mockProps} />);

      expect(() => {
        resizer.unmount();
      }).not.toThrow();
    });
  });
});

function noop() {}
