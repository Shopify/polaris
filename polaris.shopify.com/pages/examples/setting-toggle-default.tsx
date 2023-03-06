import {Banner, Box, SettingToggle} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SettingToggleExample() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
      settingStatus={{
        enabled: {content: 'On', status: 'success'},
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

export default withPolarisExample(SettingToggleExample);
