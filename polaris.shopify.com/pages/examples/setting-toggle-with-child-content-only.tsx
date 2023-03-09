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
        To comply with the California Consumer Privacy Act (CCPA), show a banner
        to customers in California so they can choose to opt out of the sale of
        their data.
      </Text>
    </SettingToggle>
  );
}

export default withPolarisExample(WithOnlyChildContent);
