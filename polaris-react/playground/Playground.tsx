import React, {useCallback, useState} from 'react';

import {ActionList, AlphaCard, Button, Page, Popover} from '../src';

export function Playground() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More actions
    </Button>
  );
  return (
    <Page title="Playground">
      <AlphaCard padding="6">
        <Popover
          active={popoverActive}
          activator={activator}
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <div style={{background: 'var(--p-color-admin-bg)'}}>
            new admin bg
          </div>
          <ActionList
            actionRole="menuitem"
            items={[{content: 'Import'}, {content: 'Export'}]}
          />
        </Popover>
      </AlphaCard>
    </Page>
  );
}
