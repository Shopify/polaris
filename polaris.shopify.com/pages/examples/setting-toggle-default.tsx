import {SettingToggle, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SettingToggleExample() {
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

export default withPolarisExample(SettingToggleExample);
