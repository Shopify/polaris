import {Pagination} from '@shopify/polaris';
import React from 'react';
import {mountWithApp} from 'tests/utilities';

describe('<AppProvider />', () => {
  it('gets polaris-react translations', () => {
    const pagination = mountWithApp(
      <Pagination
        hasPrevious
        onPrevious={() => {}}
        hasNext
        onNext={() => {}}
      />,
    );
    expect(pagination).toContainReactComponent('button', {
      'aria-label': 'Previous',
    });
  });
});
