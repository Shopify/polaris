import React, {useCallback, useRef, useState} from 'react';
import {Page, Badge, Modal, TextContainer} from '@shopify/polaris';

export function Playground() {
  const duplicateActivatorRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(true);
  const handleOpenDuplicateModal = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const duplicateProductModalMarkup = (
    <Modal
      activator={duplicateActivatorRef}
      open={active}
      onClose={handleClose}
      title="Reach more shoppers with Instagram product tags"
      primaryAction={{
        content: 'Add Instagram',
        onAction: handleClose,
      }}
      secondaryActions={[
        {
          content: 'Learn more',
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
  return (
    <>
      <Page
        breadcrumbs={[{content: 'Products', url: '#'}]}
        title="3/4 inch Leather pet collar"
        titleMetadata={<Badge status="success">Paid</Badge>}
        subtitle="Perfect for any pet"
        compactTitle
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[
          {
            content: 'Super long action name',
            onAction: () => alert('View on your store action'),
          },
          {
            content: 'another long title',
            onAction: () => alert('View on your store action'),
          },
          {
            id: 'duplicate',
            content: 'Duplicate',
            accessibilityLabel: 'Secondary action label',
            onAction: () => handleOpenDuplicateModal(),
            ref: duplicateActivatorRef,
          },
          {
            content: 'Action 3',
            onAction: () => alert('View on your store action'),
          },
        ]}
        actionGroups={[
          {
            title: 'More Actions',
            actions: [
              {
                content: 'Share on Facebook',
                accessibilityLabel: 'Individual action label',
              },
            ],
          },
        ]}
        pagination={{
          hasPrevious: true,
          hasNext: true,
        }}
      />
      {duplicateProductModalMarkup}
    </>
  );
}
