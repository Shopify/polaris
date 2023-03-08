import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Banner, SettingToggle, Text, Inline, Box} from '@shopify/polaris';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function WithOnlyChildContent() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      <Text>
        Allow customers to log in with an external customer account system.
      </Text>
    </SettingToggle>
  );
}

export function WithTitleAndDescription() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    />
  );
}

export function WithLongTitleAndDescription() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass pass"
      description="Allow customers to log in with an external customer account system. Allow customers to log in with an external customer account system. Allow customers to log in with an external customer account system."
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    />
  );
}

export function WithAllOfItsElements() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      <Box width="100%">
        <Banner status="info">
          Accounts must be optional or required in order to enable Multipass.
        </Banner>
      </Box>
    </SettingToggle>
  );
}
