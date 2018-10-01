import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Button} from 'src/components';
import ButtonGroup from '../ButtonGroup';

describe('<ButtonGroup />', () => {
  it('renders its children', () => {
    const buttonMarkup = <Button>Save</Button>;
    const buttonGroup = mountWithAppProvider(
      <ButtonGroup>{buttonMarkup}</ButtonGroup>,
    );
    expect(buttonGroup.contains(buttonMarkup)).toBe(true);
  });
});
