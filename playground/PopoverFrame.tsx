import React, {useCallback, useState} from 'react';
import {Frame, Button, Popover} from '@shopify/polaris';

export function PopoverFrame() {
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
    // Frame without topBar doesn't have the issue.
    <Frame topBar={<div />}>
      {/* Simply adding this empty element to grow the document */}
      <div
        style={{
          marginTop: '150px',
        }}
      />
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        Hello world
      </Popover>
    </Frame>
  );
}
