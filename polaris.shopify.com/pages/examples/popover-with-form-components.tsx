import {Button, Popover, FormLayout, Select, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PopoverFormExample() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [tagValue, setTagValue] = useState('');

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleTagValueChange = useCallback(
    (value: string) => setTagValue(value),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Filter
    </Button>
  );

  return (
    <div style={{height: '280px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          <Select label="Show all customers where:" options={['Tagged with']} />
          <TextField
            label="Tags"
            value={tagValue}
            onChange={handleTagValueChange}
            autoComplete="off"
          />
          <Button size="slim">Add filter</Button>
        </FormLayout>
      </Popover>
    </div>
  );
}

export default withPolarisExample(PopoverFormExample);
