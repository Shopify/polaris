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
        To comply with the California Consumer Privacy Act (CCPA), show a banner
        to customers in California so they can choose to opt out of the sale of
        their data.
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
      title="Customer privacy banner (California)"
      description="To comply with the California Consumer Privacy Act (CCPA), show a banner to customers in California so they can choose to opt out of the sale of their data."
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
      title="Customer privacy banner (California) (California) (California)(California)(California)(California)(California)(California)(California)(California)(California)(California)(California)(California)(California)(California)(California)"
      description="To comply with the California Consumer Privacy Act (CCPA), show a banner to customers in California so they can choose to opt out of the sale of their data. To comply with the California Consumer Privacy Act (CCPA), show a banner to customers in California so they can choose to opt out of the sale of their data."
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
      title="Customer privacy banner (California)"
      description="To comply with the California Consumer Privacy Act (CCPA), show a banner to customers in California so they can choose to opt out of the sale of their data."
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      <Box width="100%">
        <Banner status="success">
          Your online store is in compliance with California&apos;s privacy
          laws.
        </Banner>
      </Box>
    </SettingToggle>
  );
}
