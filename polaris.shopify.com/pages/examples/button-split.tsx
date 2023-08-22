import {ActionList, Button, ButtonGroup, Popover} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ChevronDownMinor} from '@shopify/polaris-icons';

function ButtonExample() {
  const [active, setActive] = React.useState(false);
  return (
    <div style={{height: '100px'}}>
      <ButtonGroup segmented>
        <Button variant="primary">Save</Button>
        <div style={{width: '3px'}} />
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

      <ButtonGroup segmented>
        <Button>Save</Button>
        <Popover
          active={active}
          preferredAlignment="right"
          activator={
            <Button
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
