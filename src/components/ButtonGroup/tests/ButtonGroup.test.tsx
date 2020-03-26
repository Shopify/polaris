import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Button} from 'components';

import {Item} from '../components';
import {ButtonGroup} from '../ButtonGroup';

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

    it('adds a data-buttongroup-segmented to the outter div when segmented', () => {
      const buttonGroup = mountWithApp(
        <ButtonGroup segmented>
          <Button />
        </ButtonGroup>,
      );
      const selector: any = {
        'data-buttongroup-segmented': true,
      };
      expect(buttonGroup).toContainReactComponent('div', selector);
    });

    it('adds a data-buttongroup-full-width to the outter div when fullWidth', () => {
      const buttonGroup = mountWithApp(
        <ButtonGroup fullWidth>
          <Button />
        </ButtonGroup>,
      );
      const selector: any = {
        'data-buttongroup-full-width': true,
      };
      expect(buttonGroup).toContainReactComponent('div', selector);
    });

    it('adds a data-buttongroup-connected-top to the outter div when connectedTop', () => {
      const buttonGroup = mountWithApp(
        <ButtonGroup connectedTop>
          <Button />
        </ButtonGroup>,
      );
      const selector: any = {
        'data-buttongroup-connected-top': true,
      };
      expect(buttonGroup).toContainReactComponent('div', selector);
    });
  });
});
