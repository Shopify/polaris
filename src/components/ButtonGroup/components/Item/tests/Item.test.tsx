import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Button} from 'components';

import {Item} from '../Item';

describe('<Item />', () => {
  describe('button', () => {
    it('renders the given button', () => {
      const button = <Button>Button text</Button>;
      const item = mountWithAppProvider(<Item button={button} />);
      expect(item.contains(button)).toBeTruthy();
    });

    it('sets focus styles when focused', () => {
      const button = <Button>Button text</Button>;
      const item = mountWithApp(<Item button={button} />);
      item.find('div')!.trigger('onFocus');
      expect(item.find('div')).toHaveReactProps({
        className: 'Item Item-focused',
      });
    });
  });
});
