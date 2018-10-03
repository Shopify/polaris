import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Button} from 'src/components';
import Item from '../Item';

describe('<ButtonGroup />', () => {
  it('renders a button', () => {
    const item = mountWithAppProvider(
      <Item button={<Button>Button text</Button>} />,
    );
    expect(item.find(Button).length).toBe(1);
  });
});
