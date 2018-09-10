import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';

import ButtonGroup from '../../ButtonGroup';
import {Button} from '../../../components';

describe('<ButtonGroup />', () => {
  it('renders its children', () => {
    const buttonMarkup = <Button>Save</Button>;
    const buttonGroup = mountWithAppProvider(
      <ButtonGroup>{buttonMarkup}</ButtonGroup>,
    );
    expect(buttonGroup.contains(buttonMarkup)).toBe(true);
  });
});
