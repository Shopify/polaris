import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Header} from '../Header';
import {Manager} from '../../Manager';

const defaultManagerProps = {
  hasItemsSelected: false,
};
const defaultHeaderProps = {
  itemsOnPage: 50,
  totalItemsCount: 50,
  selectedItemsCount: 0,
};

describe('Header', () => {
  describe('header markup', () => {
    it('renders header markup if the list isn’t selectable but the showHeader prop is true', () => {
      const header = mountWithApp(
        <Manager {...defaultManagerProps} selectable={false}>
          <Header {...defaultHeaderProps} showHeader />
        </Manager>,
      );

      expect(header).toContainReactComponentTimes('div', 1, {
        className: 'HeaderWrapper',
      });
    });

    // it('does not render when items is empty', () => {
    //   const resourceList = mountWithAppProvider(
    //     <ResourceList items={[]} renderItem={renderItem} />,
    //   );
    //   expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
    //     false,
    //   );
    // });
  });
});
