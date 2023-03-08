import {Box, Banner, Text, SettingToggle} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithAllOfItsElements() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Turn off' : 'Turn on';

  return (
    <SettingToggle
      title="Multipass"
      description="Allow customers to log in with an external customer account system."
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

export default withPolarisExample(WithAllOfItsElements);
