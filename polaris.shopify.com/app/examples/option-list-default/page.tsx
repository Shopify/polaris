'use client';

import {LegacyCard, OptionList} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function OptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <LegacyCard>
      <OptionList
        title="Inventory Location"
        onChange={setSelected}
        options={[
          {value: 'byward_market', label: 'Byward Market'},
          {value: 'centretown', label: 'Centretown'},
          {value: 'hintonburg', label: 'Hintonburg'},
          {value: 'westboro', label: 'Westboro'},
          {value: 'downtown', label: 'Downtown'},
        ]}
        selected={selected}
      />
    </LegacyCard>
  );
}

export default withPolarisExample(OptionListExample);
