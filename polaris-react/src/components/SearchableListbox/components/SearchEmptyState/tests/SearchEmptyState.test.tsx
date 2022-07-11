import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TextStyle} from '../../../../TextStyle';
import {SearchEmptyState} from '../SearchEmptyState';

describe('<SearchEmptyState />', () => {
  it('renders subdued <TextStyle /> with message', () => {
    const mockMessage = "it's empty";
    const searchEmptyState = mountWithApp(
      <SearchEmptyState message={mockMessage} />,
    );

    expect(searchEmptyState).toContainReactComponent(TextStyle, {
      variation: 'subdued',
      children: mockMessage,
    });
  });
});
