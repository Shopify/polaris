import {SettingToggle, TextStyle} from '@shopify/polaris';
import type {ComponentMeta} from '@storybook/react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function Default() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(() => {
    setActive((active) => !active);
    setLoading(true);
  }, []);

  const loadingTimeoutId = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (!loading) {
      loadingTimeoutId.current && clearTimeout(loadingTimeoutId.current);
      return;
    }

    loadingTimeoutId.current = setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
      loading={loading}
    >
      This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
    </SettingToggle>
  );
}
