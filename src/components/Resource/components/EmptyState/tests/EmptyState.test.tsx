import React from 'react';

import {mountWithApp} from 'test-utilities';
import {EmptyState} from '../EmptyState';
import {Manager} from '../../Manager';
import {EmptySearchResult} from '../../../../EmptySearchResult';

const defaultManagerProps = {
  hasItemsSelected: false,
};

describe('EmptyState', () => {
  it('renders empty search result', () => {
    const emptyState = mountWithApp(
      <Manager {...defaultManagerProps}>
        <EmptyState />
      </Manager>,
    );

    expect(emptyState).toContainReactComponent(EmptySearchResult, {
      title: 'No items found',
      description: 'Try changing the filters or search term',
      withIllustration: true,
    });
  });
});
