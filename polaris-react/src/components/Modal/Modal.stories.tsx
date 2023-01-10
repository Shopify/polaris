import React, {useCallback, useRef, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  Button,
  Checkbox,
  ChoiceList,
  DropZone,
  Form,
  FormLayout,
  Modal,
  Stack,
  Text,
  TextContainer,
  TextField,
} from '@shopify/polaris';

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
          <TextContainer>
            <Text variant="bodyMd" as="span">
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </Text>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithPrimaryAction() {
  const discountLink = 'https://polaris.shopify.com/';

  const [active, setActive] = useState(true);
  const node = useRef(null);

  const handleClick = useCallback(() => {
    node.current && node.current.input.focus();
  }, []);

  const handleFocus = useCallback(() => {
    if (node.current == null) {
      return;
    }
    node.current.input.select();
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
          <Stack vertical>
            <Stack.Item>
              <TextContainer>
                <Text variant="bodyMd" as="span">
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
                </Text>
              </TextContainer>
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                ref={node}
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
            </Stack.Item>
          </Stack>
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
          <Stack vertical>
            <Stack.Item>
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
            </Stack.Item>
            <Stack.Item>
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
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
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
          <Stack vertical>
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
          </Stack>
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
          <Stack vertical>
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
          </Stack>
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
          <TextContainer>
            <Text variant="bodyMd" as="span">
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </Text>
          </TextContainer>
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
            <TextContainer>
              <Text variant="bodyMd" as="span">
                Item <a href="#Content">#{index}</a>
              </Text>
            </TextContainer>
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
          <TextContainer>
            <Text variant="bodyMd" as="span">
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </Text>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithoutAnActivatorProp() {
  const [active, setActive] = useState(true);

  const button = useRef();

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => button.current.querySelector('button').focus());
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
          <TextContainer>
            <Text variant="bodyMd" as="span">
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </Text>
          </TextContainer>
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
      sectioned
      primaryAction={{content: 'Save'}}
    >
      <Banner title="Heyo" />
      <Form onSubmit={() => {}}>
        <FormLayout>
          <FormLayout.Group>
            <TextField label="URL" type="url" autoComplete="url" />
            <TextField label="URL" type="url" autoComplete="url" />
            <TextField label="URL" type="url" autoComplete="url" />
          </FormLayout.Group>
        </FormLayout>
        <FormLayout>
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
        </FormLayout>
      </Form>
    </Modal>
  );
}

export function WithLongContentNoScroll() {
  return (
    <Modal
      title="Long form modal"
      open
      onClose={() => {}}
      sectioned
      noScroll
      primaryAction={{content: 'Save'}}
    >
      <Banner title="Heyo" />
      <Form onSubmit={() => {}}>
        <FormLayout>
          <FormLayout.Group>
            <TextField label="URL" type="url" autoComplete="url" />
            <TextField label="URL" type="url" autoComplete="url" />
            <TextField label="URL" type="url" autoComplete="url" />
          </FormLayout.Group>
        </FormLayout>
        <FormLayout>
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
          <TextField label="URL" type="url" autoComplete="url" />
        </FormLayout>
      </Form>
    </Modal>
  );
}
