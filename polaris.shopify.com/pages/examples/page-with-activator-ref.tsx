import {
  Page,
  LegacyCard,
  LegacyStack,
  Button,
  Modal,
  Text,
} from '@shopify/polaris';
import React, {useCallback, useRef, useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Page
      breadcrumbs={[{content: 'Orders', url: '#'}]}
      title="#1085"
      secondaryActions={[
        {content: 'Print'},
        {content: 'Unarchive'},
        {
          id: 'cancel-order',
          content: 'Cancel order',
          ref: buttonRef,
          onAction: () => setActive(true),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button primary>Continue</Button>
        </LegacyStack>
      </LegacyCard>
      <Modal
        activator={buttonRef}
        open={active}
        onClose={handleChange}
        title="Delete 3/4 inch Leather pet collar?"
        primaryAction={{
          content: 'Delete product',
          onAction: handleChange,
        }}
        secondaryActions={[{content: 'Cancel', onAction: handleChange}]}
      >
        <Modal.Section>
          <Text variant="bodyMd" as="p">
            Are you sure you want to delete{' '}
            <Text as="span" fontWeight="bold">
              3/4 inch Leather pet collar
            </Text>
            ? This can&apos;t be undone.
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  );
}

export default withPolarisExample(PageExample);
