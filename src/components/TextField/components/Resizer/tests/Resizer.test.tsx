import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, findByTestID, trigger} from 'test-utilities';
import Resizer from '../Resizer';
import EventListener from '../../../../EventListener';

describe('<Resizer />', () => {
  const mockProps = {
    onHeightChange: noop,
    contents: 'Contents',
  };

  describe('contents', () => {
    it('renders contents', () => {
      const contents = 'Contents';
      const resizer = mountWithAppProvider(
        <Resizer {...mockProps} contents={contents} />,
      );
      const contentsNode = findByTestID(resizer, 'ContentsNode');
      expect(contentsNode.text()).toBe(contents);
    });

    it('properly encodes HTML entities', () => {
      const contents = `<div>&\nContents</div>`;
      const resizer = mountWithAppProvider(
        <Resizer {...mockProps} contents={contents} />,
      );
      const contentsNode = findByTestID(resizer, 'ContentsNode');
      const expectedEncodedContents =
        '&lt;div&gt;&amp;<br>Contents&lt;/div&gt;<br></div>';
      expect(contentsNode.html()).toContain(expectedEncodedContents);
    });
  });

  describe('minimumLines', () => {
    it('renders a number of <br> tags equivalent to minimumLines', () => {
      const minimumLines = 3;
      const resizer = mountWithAppProvider(
        <Resizer {...mockProps} minimumLines={minimumLines} />,
      );
      const breakingSpaces = findByTestID(resizer, 'MinimumLines');
      expect(breakingSpaces.html()).toContain('<br><br><br>');
    });
  });

  describe('onHeightChange()', () => {
    it('is called on mount if minimumLines is provided', () => {
      const spy = jest.fn();
      mountWithAppProvider(
        <Resizer
          {...mockProps}
          currentHeight={50}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('is not called on mount if minimumLines is not provided', () => {
      const onHeightChangeSpy = jest.fn();
      mountWithAppProvider(
        <Resizer
          {...mockProps}
          currentHeight={50}
          onHeightChange={onHeightChangeSpy}
        />,
      );
      expect(onHeightChangeSpy).not.toHaveBeenCalled();
    });

    it('is not called on mount if currentHeight is the same as DOM height', () => {
      const spy = jest.fn();
      mountWithAppProvider(
        <Resizer
          {...mockProps}
          currentHeight={0}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      expect(spy).not.toHaveBeenCalled();
    });

    it('is called again on resize', () => {
      const spy = jest.fn();
      const currentHeight = 0;
      const resizer = mountWithAppProvider(
        <Resizer
          {...mockProps}
          currentHeight={currentHeight}
          onHeightChange={spy}
          minimumLines={3}
        />,
      );
      resizer.setProps({currentHeight: 1});
      trigger(resizer.find(EventListener), 'handler');
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('is not called again on resize if minimumLines is not provided', () => {
      const spy = jest.fn();
      const currentHeight = 0;
      const resizer = mountWithAppProvider(
        <Resizer
          {...mockProps}
          currentHeight={currentHeight}
          onHeightChange={spy}
        />,
      );
      resizer.setProps({currentHeight: 1});
      trigger(resizer.find(EventListener), 'handler');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  it('is not called again on resize if currentHeight is the same as DOM height', () => {
    const spy = jest.fn();
    const currentHeight = 0;
    const resizer = mountWithAppProvider(
      <Resizer
        {...mockProps}
        currentHeight={currentHeight}
        onHeightChange={spy}
      />,
    );
    resizer.setProps({currentHeight: 1});
    trigger(resizer.find(EventListener), 'handler');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  describe('aria-hidden', () => {
    it('renders aria-hidden as true', () => {
      const contents = 'Contents';
      const resizer = mountWithAppProvider(
        <Resizer {...mockProps} contents={contents} />,
      );
      const wrapperDiv = findByTestID(resizer, 'ResizerWrapper');
      expect(wrapperDiv.prop('aria-hidden')).toBe(true);
    });
  });
});
