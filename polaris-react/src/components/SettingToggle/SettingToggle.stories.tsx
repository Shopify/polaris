import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Banner, SettingToggle, Text, Inline, Box} from '@shopify/polaris';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function Default() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
      settingStatus={{
        enabled: {content: 'On'},
        disabled: {content: 'Off'},
      }}
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      <Box width="100%">
        <Banner status="info">An Example Banner Child</Banner>
      </Box>
    </SettingToggle>
  );
}
