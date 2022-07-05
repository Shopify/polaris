import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Grid} from '../../../../Grid';
import {Section} from '../Section';

describe('<Section />', () => {
  it('renders default columnSpan props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, lg: 12},
    });
  });

  it('renders oneThird props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section oneThird />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, lg: 4},
    });
  });

  it('renders oneThird condensed props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section oneThird condensed />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, md: 2, lg: 4},
    });
  });

  it('renders oneHalf props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section oneHalf />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, lg: 6},
    });
  });

  it('renders oneHalf condensed props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section oneHalf condensed />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, md: 3, lg: 6},
    });
  });

  it('renders twoThirds props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section twoThirds />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, lg: 8},
    });
  });

  it('renders twoThirds condensed props on Grid.Cell', async () => {
    const section = await mountWithApp(<Section twoThirds condensed />);

    expect(section).toContainReactComponent(Grid.Cell, {
      columnSpan: {xs: 6, md: 4, lg: 8},
    });
  });
});
