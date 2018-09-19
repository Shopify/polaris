import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';

import Item from '../Item';
import Button from '../../../../Button';

describe('<ButtonGroup />', () => {
  it('renders a button', () => {
    const item = mountWithAppProvider(
      <Item button={<Button>Button text</Button>} />,
    );
    expect(item.find(Button).length).toBe(1);
  });
});
