import React, {RefObject, useCallback, useRef, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  Button,
  Checkbox,
  ChoiceList,
  DropZone,
  FormLayout,
  Modal,
  LegacyStack,
  Text,
  TextField,
  Link,
  AlphaCard,
  Box,
  Inline,
  AlphaStack,
  Scrollable,
  Sticky,
  Thumbnail,
  Image,
  ResourceList,
  ResourceItem,
  UnstyledButton,
} from '@shopify/polaris';
import {AppsMajor} from '@shopify/polaris-icons';

export default {
  component: Modal,
} as ComponentMeta<typeof Modal>;

export function Default() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Text as="p">
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithPrimaryAction() {
  const discountLink = 'https://polaris.shopify.com/';

  const [active, setActive] = useState(true);
  const node: RefObject<HTMLDivElement> = useRef(null);

  const handleClick = useCallback(() => {
    node.current && node.current.querySelector('input')?.focus();
  }, []);

  const handleFocus = useCallback(() => {
    if (node.current == null) {
      return;
    }
    node.current.querySelector('input')?.select();
    document.execCommand('copy');
  }, []);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={toggleModal}
        title="Get a shareable link"
        primaryAction={{
          content: 'Close',
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
          <AlphaStack gap="5">
            <Text as="p">
              You can share this discount link with your customers via email or
              social media. Your discount will be automatically applied at
              checkout.
            </Text>

            <Box ref={node}>
              <TextField
                label="Discount link"
                onFocus={handleFocus}
                value={discountLink}
                onChange={() => {}}
                autoComplete="off"
                connectedRight={
                  <Button primary onClick={handleClick}>
                    Copy link
                  </Button>
                }
              />
            </Box>
          </AlphaStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithPrimaryAndSecondaryActions() {
  const currentPage = 'current_page';
  const allCustomers = 'all_customers';
  const selectedCustomers = 'selected_customers';
  const csvExcel = 'csv_excel';
  const csvPlain = 'csv_plain';

  const [active, setActive] = useState(true);
  const [selectedExport, setSelectedExport] = useState([]);
  const [selectedExportAs, setSelectedExportAs] = useState([]);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    handleSelectedExport([]);
    handleSelectedExportAs([]);
  };

  const handleSelectedExport = useCallback(
    (value) => setSelectedExport(value),
    [],
  );

  const handleSelectedExportAs = useCallback(
    (value) => setSelectedExportAs(value),
    [],
  );

  const activator = <Button onClick={handleModalChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleClose}
        title="Export customers"
        primaryAction={{
          content: 'Export customers',
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <AlphaStack gap="5">
            <ChoiceList
              title="Export"
              choices={[
                {label: 'Current page', value: currentPage},
                {label: 'All customers', value: allCustomers},
                {label: 'Selected customers', value: selectedCustomers},
              ]}
              selected={selectedExport}
              onChange={handleSelectedExport}
            />
            <ChoiceList
              title="Export as"
              choices={[
                {
                  label:
                    'CSV for Excel, Numbers, or other spreadsheet programs',
                  value: csvExcel,
                },
                {label: 'Plain CSV file', value: csvPlain},
              ]}
              selected={selectedExportAs}
              onChange={handleSelectedExportAs}
            />
          </AlphaStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithCustomFooter() {
  const [active, setActive] = useState(true);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const viewRecommendedAppsButton = (
    <div
      style={{width: '100%', padding: '4', border: 'base', borderRadius: '2'}}
      onClick={toggleModal}
    >
      <Inline gap="2" align="start" blockAlign="center">
        <Image
          alt="Multi-color icon depicting apps that can be installed"
          source="https://cdn.shopify.com/shopifycloud/web/assets/v1/7d8afec8c40d8022c7c62b8a99f358797d5e6f8546ec0496e26c97f406d0df4e.svg"
        />
        <Text as="p" variant="bodyMd">
          Recommended local delivery apps
        </Text>
      </Inline>
    </div>
  );

  const recommendedApps = [
    {
      logoSource:
        'https://cdn.shopify.com/app-store/listing_images/344d58fb5ba3e45b5c10756e4ba34b74/icon/CPXwi6b04PQCEAE=.png',
      name: 'Local Delivery + Store Pickup',
      description:
        'Local delivery | Order tracking | Fulfillments | Notifications',
      rating: 5.0,
      reviewCount: 15,
      promotion: 'Free plan available',
    },
    {
      logoSource:
        'https://cdn.shopify.com/app-store/listing_images/81daf05370b75b77bcc06ad853c9d6fd/icon/COvPvK30lu8CEAE=.png',
      name: 'Local Delivery Dispatch',
      description:
        'Fast local delivery dispatch and tracking with route planning',
      rating: 4.9,
      reviewCount: 7,
      promotion: 'Free to install',
    },
    {
      logoSource:
        'https://cdn.shopify.com/app-store/listing_images/a025a29145b1f0be4ef5692148f05569/icon/CLvai6LUx_cCEAE=.png',
      name: 'Amai Local Pickup & Delivery',
      description:
        'Fast local delivery dispatch and tracking with route planning',
      rating: 4.5,
      reviewCount: 326,
      promotion: '14-day free trial',
    },
  ];

  const appList = (
    <ResourceList
      selectable={false}
      resourceName={{singular: 'app', plural: 'apps'}}
      items={recommendedApps}
      renderItem={({
        logoSource,
        name,
        description,
        rating,
        reviewCount,
        promotion,
      }) => (
        <ResourceItem
          id={`App--${name}`}
          key={name}
          name={name}
          url=""
          verticalAlignment="center"
          media={
            <Thumbnail
              alt={`${name} app logo`}
              size="medium"
              source={logoSource || AppsMajor}
            />
          }
          accessibilityLabel={`View the ${name} app in the app store`}
        >
          <AlphaStack>
            <Text as="p" variant="headingMd">
              {name}
            </Text>
            <Inline gap="1">
              <Text as="p" fontWeight="medium">
                {rating}
              </Text>
              <Text as="p" fontWeight="medium">
                <span role="img" aria-label="star">
                  ⭐️
                </span>
              </Text>
              <Text as="p" fontWeight="medium">{`(${reviewCount})`}</Text>
              <Text as="p" fontWeight="medium">
                •
              </Text>
              <Text as="p" fontWeight="medium">
                {promotion}
              </Text>
            </Inline>
            <Text as="p" color="subdued">
              {description}
            </Text>
          </AlphaStack>
        </ResourceItem>
      )}
    />
  );

  const localDeliverySettingCard = (
    <AlphaCard padding="5">
      <AlphaStack gap="5">
        <Text as="p" variant="headingMd">
          Manage local deliveries
        </Text>
        <Text as="p">
          Get an optimized route or plan the order of delivery stops yourself.
          With local delivery apps, you and your staff can view routes, contact
          customers, update delivery statuses, and more.
        </Text>

        <Modal
          open={active}
          activator={viewRecommendedAppsButton}
          title="Recommended local delivery apps"
          onClose={toggleModal}
          footer={
            <Box width="100%">
              <Inline align="center" blockAlign="center">
                <Text as="p" variant="headingMd" fontWeight="semibold">
                  Find more local delivery apps in the{' '}
                  <Link>Shopify App Store</Link>
                </Text>
              </Inline>
            </Box>
          }
        >
          {appList}
        </Modal>
      </AlphaStack>
    </AlphaCard>
  );

  return localDeliverySettingCard;
}

export function WithActionsAndCustomFooter() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <Modal
      open={active}
      activator={activator}
      title="Import customers by CSV"
      primaryAction={{
        content: 'Import customers',
        onAction: toggleActive,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: toggleActive,
        },
      ]}
      onClose={toggleActive}
      footer={
        <Inline align="start">
          <Link>Need help importing customers?</Link>
        </Inline>
      }
    >
      <Modal.Section>
        <AlphaStack gap="5">
          <DropZone
            accept=".csv"
            errorOverlayText="File type must be .csv"
            type="file"
            onDrop={() => {}}
          >
            <DropZone.FileUpload />
          </DropZone>
          <Checkbox
            checked={checked}
            label="Overwrite existing customers that have the same email or phone"
            onChange={handleCheckbox}
          />
        </AlphaStack>
      </Modal.Section>
    </Modal>
  );
}

export function Large() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        large
        activator={activator}
        open={active}
        onClose={toggleActive}
        title="Import customers by CSV"
        primaryAction={{
          content: 'Import customers',
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <DropZone
              accept=".csv"
              errorOverlayText="File type must be .csv"
              type="file"
              onDrop={() => {}}
            >
              <DropZone.FileUpload />
            </DropZone>
            <Checkbox
              checked={checked}
              label="Overwrite existing customers that have the same email or phone"
              onChange={handleCheckbox}
            />
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function Small() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        small
        activator={activator}
        open={active}
        onClose={toggleActive}
        title="Import customers by CSV"
        primaryAction={{
          content: 'Import customers',
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <DropZone
              accept=".csv"
              errorOverlayText="File type must be .csv"
              type="file"
              onDrop={() => {}}
            >
              <DropZone.FileUpload />
            </DropZone>
            <Checkbox
              checked={checked}
              label="Overwrite existing customers that have the same email or phone"
              onChange={handleCheckbox}
            />
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithoutATitle() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        title="Reach more shoppers with Instagram product tags"
        titleHidden
        activator={activator}
        open={active}
        onClose={handleChange}
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section titleHidden>
          <Text as="p">
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithScrollListener() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleScrollBottom = useCallback(
    () => console.log('Scrolled to bottom'),
    [],
  );

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        title="Scrollable content"
        onClose={handleChange}
        onScrolledToBottom={handleScrollBottom}
      >
        {Array.from({length: 50}, (_, index) => (
          <Modal.Section key={index}>
            <Text as="p">
              Item <a href="#Content">#{index}</a>
            </Text>
          </Modal.Section>
        ))}
      </Modal>
    </div>
  );
}

export function WithActivatorRef() {
  const [active, setActive] = useState(true);

  const buttonRef = useRef(null);

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const activator = (
    <div ref={buttonRef}>
      <Button onClick={handleOpen}>Open</Button>
    </div>
  );

  return (
    <div style={{height: '500px'}}>
      {activator}
      <Modal
        activator={buttonRef}
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
          <Text as="p">
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithoutAnActivatorProp() {
  const [active, setActive] = useState(true);

  const button: React.RefObject<HTMLDivElement> = useRef(null);

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => button.current?.querySelector('button')?.focus);
  }, []);

  return (
    <div style={{height: '500px'}}>
      <div ref={button}>
        <Button onClick={handleOpen}>Open</Button>
      </div>
      <Modal
        instant
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
          <Text as="p">
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithLongContent() {
  return (
    <Modal
      title="Long form modal"
      open
      onClose={() => {}}
      primaryAction={{content: 'Save'}}
    >
      <Modal.Section>
        <Banner title="Payment details" />
      </Modal.Section>
      <Modal.Section>
        <FormLayout>
          <FormLayout.Group>
            <TextField label="Payment method type" autoComplete="off" />
            <TextField label="Card number" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Expires" autoComplete="off" />
            <TextField label="CVV" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Country/region" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="First name" autoComplete="off" />
            <TextField label="Last name" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Address" autoComplete="off" />
            <TextField label="Apartment, suite, etc." autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="City" autoComplete="off" />
            <TextField label="Province" autoComplete="off" />
            <TextField label="Postal code" autoComplete="off" />
          </FormLayout.Group>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}

export function WithLongContentNoScroll() {
  return (
    <Modal
      title="Long form modal"
      open
      onClose={() => {}}
      noScroll
      primaryAction={{content: 'Save'}}
    >
      <Modal.Section>
        <Banner title="Payment details" />
      </Modal.Section>
      <Modal.Section>
        <FormLayout>
          <FormLayout.Group>
            <TextField label="Payment method type" autoComplete="off" />
            <TextField label="Card number" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Expires" autoComplete="off" />
            <TextField label="CVV" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Country/region" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="First name" autoComplete="off" />
            <TextField label="Last name" autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Address" autoComplete="off" />
            <TextField label="Apartment, suite, etc." autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="City" autoComplete="off" />
            <TextField label="Province" autoComplete="off" />
            <TextField label="Postal code" autoComplete="off" />
          </FormLayout.Group>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}
