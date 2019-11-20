import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Connected} from '../Connected';
import {Item, ItemPosition} from '../components';

describe('<Connected />', () => {
  describe('<Item />', () => {
    it('wraps children in an Item component', () => {
      const expectedContent = 'foo';
      const connected = mountWithApp(<Connected>{expectedContent}</Connected>);

      expect(
        connected.find(Item, {position: ItemPosition.Primary}),
      ).toContainReactText(expectedContent);
    });

    it('includes `rightConnected` markup in an Item component', () => {
      const rightConnectedContent = 'foo';
      const connected = mountWithApp(
        <Connected right={rightConnectedContent} />,
      );

      expect(
        connected.find(Item, {position: ItemPosition.Right}),
      ).toContainReactText(rightConnectedContent);
    });

    it('includes `leftConnected` markup in an Item component', () => {
      const leftConnectedContent = 'foo';
      const connected = mountWithApp(<Connected left={leftConnectedContent} />);

      expect(
        connected.find(Item, {position: ItemPosition.Left}),
      ).toContainReactText(leftConnectedContent);
    });

    it('`leftConnected` and `rightConnected` are not mutually exclusive', () => {
      const rightConnectedContent = 'rightfoo';
      const leftConnectedContent = 'leftfoo';
      const connected = mountWithApp(
        <Connected right={rightConnectedContent} left={leftConnectedContent} />,
      );

      expect(
        connected.find(Item, {position: ItemPosition.Right}),
      ).toContainReactText(rightConnectedContent);

      expect(
        connected.find(Item, {position: ItemPosition.Left}),
      ).toContainReactText(leftConnectedContent);
    });
  });
});
