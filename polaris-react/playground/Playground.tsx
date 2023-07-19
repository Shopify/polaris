import React, {useState} from 'react';

import {IndexFilters, IndexFiltersMode, Page, VerticalStack} from '../src';

export function Playground() {
  const [queryOne, setQueryOne] = useState('');
  const [queryTwo, setQueryTwo] = useState('');
  return (
    <Page title="Playground">
      <VerticalStack gap="2">
        <IndexFilters
          mode={IndexFiltersMode.Filtering}
          queryPlaceholder="Search"
          queryValue={queryOne}
          onQueryChange={(value) => setQueryOne(value)}
          onQueryClear={() => setQueryOne('')}
          onClearAll={() => console.log('clear all')}
          sortOptions={[
            {label: 'sort asc', value: 'value asc', directionLabel: 'asc'},
            {label: 'sort desc', value: 'value desc', directionLabel: 'desc'},
          ]}
          onSort={() => {
            console.log('sort');
          }}
          sortSelected={['sort asc']}
        />
        <IndexFilters
          mode={IndexFiltersMode.Filtering}
          queryPlaceholder="Search"
          queryValue={queryTwo}
          onQueryChange={(value) => setQueryTwo(value)}
          onQueryClear={() => setQueryTwo('')}
          onClearAll={() => console.log('clear all')}
          sortOptions={[
            {label: 'sort asc', value: 'value asc', directionLabel: 'asc'},
            {label: 'sort desc', value: 'value desc', directionLabel: 'desc'},
          ]}
          onSort={() => {
            console.log('sort');
          }}
          sortSelected={['sort asc']}
          loading
        />
      </VerticalStack>
    </Page>
  );
}
