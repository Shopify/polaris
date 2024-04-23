import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../../../Text';
import {AppCardDescription} from '../AppCardDescription';

describe('<AppCardDescription />', () => {
  it('renders description', () => {
    const description = mountWithApp(
      <AppCardDescription description="Test app description" />,
    );

    expect(description).toContainReactComponent(Text, {
      children: 'Test app description',
    });
  });
});
