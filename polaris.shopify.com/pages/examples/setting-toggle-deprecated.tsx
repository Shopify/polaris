import {
  Text,
  // eslint-disable-next-line import/no-deprecated
  SettingToggle,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithDeprecatedComponent() {
  const [enabled, setEnabled] = useState(false);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  return (
    <SettingToggle
      enabled={enabled}
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
    >
      <Text as="p">
        Simulate transactions to test your checkout and order flows. When test
        mode is on, checkout does not accept real credit cards.
      </Text>
    </SettingToggle>
  );
}

export default withPolarisExample(WithDeprecatedComponent);
