import {
  ActionList,
  Button,
  ButtonGroup,
  Popover,
  BlockStack,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ChevronDownMinor} from '@shopify/polaris-icons';

function ButtonExample() {
  const [active, setActive] = React.useState(false);

  const toggleActive = () => {
    setActive((active) => !active);
  };

  return (
    <ButtonGroup variant="segmented">
      <Button variant="primary">Save</Button>
      <Popover
        active={active}
        preferredAlignment="right"
        activator={
          <Button
            variant="primary"
            onClick={toggleActive}
            icon={ChevronDownMinor}
            accessibilityLabel="Other save actions"
          />
        }
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[{content: 'Save as draft'}]}
        />
      </Popover>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonExample);
