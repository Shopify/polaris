import {LegacyCard, OptionList} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function OptionListWithSectionsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <LegacyCard>
      <OptionList
        onChange={setSelected}
        sections={[
          {
            options: [
              {value: 'type', label: 'Sale item type'},
              {value: 'kind', label: 'Sale kind'},
            ],
          },
          {
            title: 'Traffic',
            options: [
              {value: 'source', label: 'Traffic referrer source'},
              {value: 'host', label: 'Traffic referrer host'},
              {value: 'path', label: 'Traffic referrer path'},
            ],
          },
        ]}
        selected={selected}
        allowMultiple
      />
    </LegacyCard>
  );
}

export default withPolarisExample(OptionListWithSectionsExample);
