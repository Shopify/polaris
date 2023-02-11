import {LegacyCard, Stack, ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Secure your account with 2-step authentication">
      <LegacyCard.Section>
        <Stack spacing="loose" vertical>
          <p>
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </p>
          <Stack distribution="trailing">
            <ButtonGroup>
              <Button>Enable two-step authentication</Button>
              <Button plain>Learn more</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
