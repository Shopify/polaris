import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SettingToggle, TextStyle} from '@shopify/polaris';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function Default() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
    </SettingToggle>
  );
}
