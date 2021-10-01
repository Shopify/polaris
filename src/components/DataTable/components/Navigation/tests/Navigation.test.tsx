import React from 'react';
import {mountWithApp} from 'test-utilities';
import {Button} from 'components';

import {Navigation} from '../Navigation';

describe('<Navigation />', () => {
  it('renders two buttons', () => {
    const columnVisibilityData = [
      {leftEdge: 145, rightEdge: 236, isVisible: true},
      {leftEdge: 236, rightEdge: 357, isVisible: true},
      {leftEdge: 357, rightEdge: 474, isVisible: true},
    ];

    const navigation = mountWithApp(
      <Navigation
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft
        isScrolledFarthestRight={false}
      />,
    );
    expect(navigation).toContainReactComponentTimes(Button, 2);
  });
});
