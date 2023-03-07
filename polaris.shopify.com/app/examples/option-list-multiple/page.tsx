'use client';

import {LegacyCard, OptionList} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function MultipleOptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <LegacyCard>
      <OptionList
        title="Manage sales channels availability"
        onChange={setSelected}
        options={[
          {value: 'online_store', label: 'Online Store'},
          {value: 'messenger', label: 'Messenger'},
          {value: 'facebook', label: 'Facebook'},
          {value: 'wholesale', label: 'Wholesale'},
          {value: 'buzzfeed', label: 'BuzzFeed'},
        ]}
        selected={selected}
        allowMultiple
      />
    </LegacyCard>
  );
}

export default withPolarisExample(MultipleOptionListExample);
