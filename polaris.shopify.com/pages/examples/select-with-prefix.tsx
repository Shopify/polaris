import {Icon, Select} from '@shopify/polaris';
import {CaretUpIcon, CaretDownIcon} from '@shopify/polaris-icons';
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
      prefix: <Icon source={CaretUpIcon} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDownIcon} />,
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
