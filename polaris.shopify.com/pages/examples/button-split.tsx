import {ActionList, Button, ButtonGroup, Popover} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ChevronDownMinor} from '@shopify/polaris-icons';

function ButtonExample() {
  const [active, setActive] = React.useState(false);
  return (
    <div style={{height: '100px'}}>
      <ButtonGroup variant="segmented">
        <Button variant="primary">Save</Button>
        <div style={{width: '0px'}} />
        <Popover
          active={active}
          preferredAlignment="right"
          activator={
            <Button
              variant="primary"
              onClick={() => setActive(true)}
              icon={ChevronDownMinor}
              accessibilityLabel="Other save actions"
            />
          }
          autofocusTarget="first-node"
          onClose={() => setActive(false)}
        >
          <ActionList
            actionRole="menuitem"
            items={[{content: 'Save as draft'}]}
          />
        </Popover>
      </ButtonGroup>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
