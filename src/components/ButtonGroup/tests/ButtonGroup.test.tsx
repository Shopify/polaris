import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Button} from 'components';
import {Item} from '../components';
import ButtonGroup from '../ButtonGroup';

describe('<ButtonGroup />', () => {
  describe('children', () => {
    it('renders each child as an item', () => {
      const buttonGroup = mountWithAppProvider(
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button primary>Save</Button>
        </ButtonGroup>,
      );
      expect(buttonGroup.find(Item)).toHaveLength(2);
    });

    it('items receive the buttons', () => {
      const key = 'cancel-button';
      const buttonGroup = mountWithAppProvider(
        <ButtonGroup>
          <Button key={key}>Cancel</Button>
        </ButtonGroup>,
      );
      expect(buttonGroup.find(Item).prop('button').key).toContain(key);
    });
  });
});
