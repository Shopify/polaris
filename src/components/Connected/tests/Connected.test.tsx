import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Connected} from '../Connected';
import {Item, ItemPosition} from '../components';

describe('<Connected />', () => {
  describe('<Item />', () => {
    it('wraps children in an Item component', async () => {
      const expectedContent = 'foo';
      const connected = await mountWithApp(
        <Connected>{expectedContent}</Connected>,
      );

      expect(
        connected.find(Item, {position: ItemPosition.Primary}),
      ).toContainReactText(expectedContent);
    });

    it('includes `rightConnected` markup in an Item component', async () => {
      const rightConnectedContent = 'foo';
      const connected = await mountWithApp(
        <Connected right={rightConnectedContent} />,
      );

      expect(
        connected.find(Item, {position: ItemPosition.Right}),
      ).toContainReactText(rightConnectedContent);
    });

    it('includes `leftConnected` markup in an Item component', async () => {
      const leftConnectedContent = 'foo';
      const connected = await mountWithApp(
        <Connected left={leftConnectedContent} />,
      );

      expect(
        connected.find(Item, {position: ItemPosition.Left}),
      ).toContainReactText(leftConnectedContent);
    });

    it('`leftConnected` and `rightConnected` are not mutually exclusive', async () => {
      const rightConnectedContent = 'rightfoo';
      const leftConnectedContent = 'leftfoo';
      const connected = await mountWithApp(
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
