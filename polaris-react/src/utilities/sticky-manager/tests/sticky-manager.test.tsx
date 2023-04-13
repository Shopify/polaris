import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {StickyManager} from '../sticky-manager';

function PlaceHolderNode() {
  return <div />;
}

function StickyNode() {
  return <div />;
}

function TestContainer() {
  return (
    <div>
      <PlaceHolderNode />
      <StickyNode />
    </div>
  );
}

describe('StickyManager', () => {
  describe('when container is HTMLDivElement', () => {
    it('calculates the top position of the sticky element based on relative parent top', () => {
      const container = mountWithApp(<TestContainer />);

      const containerNode = container.domNode!;
      Object.defineProperty(containerNode, 'offsetTop', {value: 100});

      const stickyNode = container.find(StickyNode)!.domNode!;
      const placeHolderNode = container.find(PlaceHolderNode)!.domNode!;

      const handlePositioning = jest.fn();

      const manager = new StickyManager();
      manager.registerStickyItem({
        stickyNode,
        placeHolderNode,
        handlePositioning,
        offset: false,
        disableWhenStacked: false,
      });

      manager.setContainer(containerNode);

      expect(handlePositioning).toHaveBeenCalledTimes(1);
      expect(handlePositioning).toHaveBeenCalledWith(true, 100, 0, 0);
    });
  });

  describe('when sticky node container is Document', () => {
    it('calculates the top position of the sticky element based on the top of the Document', () => {
      const container = mountWithApp(<TestContainer />);

      const stickyNode = container.find(StickyNode)!.domNode!;
      const placeHolderNode = container.find(PlaceHolderNode)!.domNode!;

      const handlePositioning = jest.fn();

      const manager = new StickyManager();
      manager.registerStickyItem({
        stickyNode,
        placeHolderNode,
        handlePositioning,
        offset: false,
        disableWhenStacked: false,
      });

      manager.setContainer(document);

      expect(handlePositioning).toHaveBeenCalledTimes(1);
      expect(handlePositioning).toHaveBeenCalledWith(true, 0, 0, 0);
    });
  });
});
