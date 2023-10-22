import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../../../Button';
import {Navigation} from '../Navigation';

describe('<Navigation />', () => {
  it('renders two buttons', () => {
    const columnVisibilityData = [
      {leftEdge: 145, rightEdge: 236, isVisible: true, width: 91, index: 0},
      {leftEdge: 236, rightEdge: 357, isVisible: true, width: 121, index: 1},
      {leftEdge: 357, rightEdge: 474, isVisible: true, width: 117, index: 2},
    ];

    const navigation = mountWithApp(
      <Navigation
        fixedFirstColumns={0}
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft
        isScrolledFarthestRight={false}
      />,
    );
    expect(navigation).toContainReactComponentTimes(Button, 2);
  });

  it('renders pips for each column', () => {
    const columnVisibilityData = [
      {leftEdge: 145, rightEdge: 236, isVisible: true, width: 91, index: 0},
      {leftEdge: 236, rightEdge: 357, isVisible: true, width: 121, index: 1},
      {leftEdge: 357, rightEdge: 474, isVisible: true, width: 117, index: 2},
    ];

    const navigation = mountWithApp(
      <Navigation
        fixedFirstColumns={0}
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft
        isScrolledFarthestRight={false}
      />,
    );
    expect(navigation).toContainReactComponentTimes('div', 3, {
      className: expect.stringContaining('Pip-'),
    });
  });

  it('skips first pip if fixedFirstColumn is true', () => {
    const columnVisibilityData = [
      {leftEdge: 145, rightEdge: 236, isVisible: true, width: 91, index: 0},
      {leftEdge: 236, rightEdge: 357, isVisible: true, width: 121, index: 1},
      {leftEdge: 357, rightEdge: 474, isVisible: true, width: 117, index: 2},
    ];

    const navigation = mountWithApp(
      <Navigation
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft
        isScrolledFarthestRight={false}
        fixedFirstColumns={1}
      />,
    );

    expect(navigation).toContainReactComponentTimes('div', 2, {
      className: expect.stringContaining('Pip-'),
    });
  });
});
