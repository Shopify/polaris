import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Button} from 'components';
import Item from '../Item';

describe('<Item />', () => {
  describe('button', () => {
    it('renders the given button', () => {
      const button = <Button>Button text</Button>;
      const item = mountWithAppProvider(<Item button={button} />);
      expect(item.contains(button)).toBeTruthy();
    });
  });
});
