import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Button} from 'src/components';
import Navigation from '../Navigation';

describe('<Navigation />', () => {
  it('renders two buttons', () => {
    const columnVisibilityData = [
      {leftEdge: 145, rightEdge: 236, isVisible: true},
      {leftEdge: 236, rightEdge: 357, isVisible: true},
      {leftEdge: 357, rightEdge: 474, isVisible: true},
    ];

    const navigation = mountWithAppProvider(
      <Navigation
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft
        isScrolledFarthestRight={false}
      />,
    );
    expect(navigation.find(Button).length).toEqual(2);
  });
});
