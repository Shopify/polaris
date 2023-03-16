import {Modal, PageActions, Text} from '@shopify/polaris';
import React, {useCallback, useRef, useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <PageActions
        primaryAction={{
          content: 'Save',
        }}
        secondaryActions={[
          {
            content: 'Delete product',
            outline: true,
            destructive: true,
            ref: buttonRef,
            onAction: () => setActive(true),
          },
        ]}
      />
      <div style={{height: '500px'}}>
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
      </div>
    </>
  );
}

export default withPolarisExample(PageExample);
