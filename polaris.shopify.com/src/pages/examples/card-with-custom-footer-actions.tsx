import {Card, Stack, ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Secure your account with 2-step authentication">
      <Card.Section>
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
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
