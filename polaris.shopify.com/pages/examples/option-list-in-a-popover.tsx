import {Button, Popover, OptionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function OptionListInPopoverExample() {
  const [selected, setSelected] = useState<string[]>([]);
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div style={{height: '275px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <OptionList
          title="Inventory Location"
          onChange={setSelected}
          options={[
            {
              value: 'byward_market',
              label: 'Byward Market',
              active: true,
            },
            {value: 'centretown', label: 'Centretown'},
            {
              value: 'hintonburg',
              label: 'Hintonburg',
              active: true,
            },
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={selected}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(OptionListInPopoverExample);
