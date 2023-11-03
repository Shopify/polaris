import {Icon, Select} from '@shopify/polaris';
import {CaretUp, CaretDown} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PrefixExample() {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUp} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDown} />,
    },
  ];

  return (
    <Select
      label="Permission"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}

export default withPolarisExample(PrefixExample);
