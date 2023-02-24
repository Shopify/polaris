import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SettingToggle, Text} from '@shopify/polaris';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function Default() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';
  const textStatus = active ? 'on' : 'off';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      This setting is{' '}
      <Text variant="bodyMd" fontWeight="bold" as="span">
        {textStatus}
      </Text>
      .
    </SettingToggle>
  );
}
