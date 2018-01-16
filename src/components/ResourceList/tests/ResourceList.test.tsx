import * as React from 'react';
import {shallow} from 'enzyme';
import ResourceList from '../';

const itemsNoID = [{url: 'item 1'}, {url: 'item 2'}];
const itemsWithID = [{id: '5', name: 'item 1'}, {id: '6', name: 'item 2'}];

describe('<ResourceList />', () => {
  describe('idForItem()', () => {
    it("should generate a key using the index if there's no idForItem prop and no ID in data", () => {
      const resourceList = shallow(<ResourceList items={itemsNoID} renderItem={renderItem} />);
      expect(resourceList.find('li').first().key()).toBe('0');
    });

    it("should generate a key using the ID if there's no idForItem prop but there and ID key in the data", () => {
      const resourceList = shallow(<ResourceList items={itemsWithID} renderItem={renderItem} />);
      expect(resourceList.find('li').first().key()).toBe('5');
    });

    it('should generate a key using the idForItem prop callback when one is provided', () => {
      const resourceList = shallow(<ResourceList idForItem={idForItem} items={itemsWithID} renderItem={renderItem} />);
      expect(resourceList.find('li').first().key()).toBe(idForItem(itemsWithID[0]));
    });
  });

  describe('filterControl', () => {
    it('renders when exist', () => {
      const resourceList = shallow(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList.find('#test123').exists()).toBe(true);
    });
  });
});

function idForItem(item: any) {
  return JSON.stringify(item);
}

function renderItem(item: any) {
  return item;
}
