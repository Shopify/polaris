import {Text, SettingToggle} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithOnlyChildContent() {
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

export default withPolarisExample(WithOnlyChildContent);
