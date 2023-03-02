import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SettingToggle, Text} from '@shopify/polaris';

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
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
      headerBadge={{
        enabled: {content: 'On'},
        disabled: {content: 'Off'},
      }}
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      Hey
    </SettingToggle>
  );
}
