import React, {useCallback, useRef, useState} from 'react';
import type {Meta} from '@storybook/react';
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
  TextContainer,
  TextField,
  Frame,
  FrameContext,
} from '@shopify/polaris';

export default {
  component: Modal,
} as Meta<typeof Modal>;

export const Default = {
  render() {
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button onClick={handleChange}>Open</Button>;

    return (
      <Frame>
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
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithPrimaryAction = {
  render() {
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
      <Frame>
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
              <LegacyStack vertical>
                <LegacyStack.Item>
                  <TextContainer>
                    You can share this discount link with your customers via
                    email or social media. Your discount will be automatically
                    applied at checkout.
                  </TextContainer>
                </LegacyStack.Item>
                <LegacyStack.Item fill>
                  <TextField
                    ref={node}
                    label="Discount link"
                    onFocus={handleFocus}
                    value={discountLink}
                    onChange={() => {}}
                    autoComplete="off"
                    connectedRight={
                      <Button variant="primary" onClick={handleClick}>
                        Copy link
                      </Button>
                    }
                  />
                </LegacyStack.Item>
              </LegacyStack>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithDestructivePrimaryAction = {
  render() {
    const [active, setActive] = useState(true);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    const activator = <Button onClick={toggleModal}>Open</Button>;

    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            activator={activator}
            open={active}
            onClose={toggleModal}
            title="Discard all unsaved changes"
            primaryAction={{
              destructive: true,
              content: 'Discard changes',
              onAction: toggleModal,
            }}
            secondaryActions={[
              {
                content: 'Continue editing',
                onAction: toggleModal,
              },
            ]}
          >
            <Modal.Section>
              If you discard changes, you’ll delete any edits you made since you
              last saved.
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithPrimaryAndSecondaryActions = {
  render() {
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
      <Frame>
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
              <LegacyStack vertical>
                <LegacyStack.Item>
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
                </LegacyStack.Item>
                <LegacyStack.Item>
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
                </LegacyStack.Item>
              </LegacyStack>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const Large = {
  render() {
    const [active, setActive] = useState(true);
    const [checked, setChecked] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const handleCheckbox = useCallback((value) => setChecked(value), []);

    const activator = <Button onClick={toggleActive}>Open</Button>;

    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            size="large"
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
      </Frame>
    );
  },
};

export const Small = {
  render() {
    const [active, setActive] = useState(true);
    const [checked, setChecked] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const handleCheckbox = useCallback((value) => setChecked(value), []);

    const activator = <Button onClick={toggleActive}>Open</Button>;

    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            size="small"
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
      </Frame>
    );
  },
};

export const WithoutATitle = {
  render() {
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button onClick={handleChange}>Open</Button>;

    return (
      <Frame>
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
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithScrollListener = {
  render() {
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const handleScrollBottom = useCallback(
      () => console.log('Scrolled to bottom'),
      [],
    );

    const activator = <Button onClick={handleChange}>Open</Button>;

    return (
      <Frame>
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
                  Item <a href="#Content">#{index}</a>
                </TextContainer>
              </Modal.Section>
            ))}
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithActivatorRef = {
  render() {
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
      <Frame>
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
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithoutAnActivatorProp = {
  render() {
    const [active, setActive] = useState(true);

    const button = useRef();

    const handleOpen = useCallback(() => setActive(true), []);

    const handleClose = useCallback(() => {
      setActive(false);
      requestAnimationFrame(() =>
        button.current.querySelector('button').focus(),
      );
    }, []);

    return (
      <Frame>
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
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithLongContent = {
  render() {
    return (
      <Frame>
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
      </Frame>
    );
  },
};

export const WithLongContentNoScroll = {
  render() {
    return (
      <Frame>
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
      </Frame>
    );
  },
};

const context = {
  logo: undefined,
  showToast: () => {},
  hideToast: () => {},
  toastMessages: [],
  startLoading: () => {},
  stopLoading: () => {},
  setContextualSaveBar: () => {},
  removeContextualSaveBar: () => {},
};
export const EmbeddedIframe = {
  render() {
    return (
      <FrameContext.Provider value={context}>
        <div style={{height: '500px'}}>
          <Modal
            title="Embedded iFrame Modal"
            open
            onClose={() => {}}
            noScroll
            primaryAction={{content: 'Save'}}
            src={`data:text/html;charset=utf-8,
  <style>
    /* Modified from Josh's Custom CSS Reset https://www.joshwcomeau.com/css/custom-css-reset/ */
    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; }
    html, body { height: 100%; }
    body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
  </style>
  <main>
    <h1>
      Hello.
    </h1>
  </main>`}
          />
        </div>
      </FrameContext.Provider>
    );
  },
};

export const SectionedProp = {
  render() {
    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            title="Sectioned modal"
            open
            onClose={() => {}}
            sectioned
            primaryAction={{content: 'Save'}}
          >
            <Text as="h1">First section</Text>
            <Text as="p">Second section</Text>
            <Modal.Section>
              <Text as="p">Nested section</Text>
            </Modal.Section>
            <Text as="p">Fourth section</Text>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const Loading = {
  render() {
    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            title="Loading modal"
            open
            onClose={() => {}}
            loading
            primaryAction={{content: 'Save'}}
          >
            <Text as="h1">First section</Text>
            <Text as="p">Second section</Text>
            <Text as="p">Third section</Text>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const Fullscreen = {
  render() {
    return (
      <Frame>
        <div style={{height: '500px'}}>
          <Modal
            title="Fullscreen modal"
            open
            onClose={() => {}}
            sectioned
            size="fullScreen"
            primaryAction={{content: 'Save'}}
          >
            <Text as="h1">Fullscreen on small displays</Text>
            <Text as="p">
              When <code>(max-width: 47.9975em)</code>, the modal will be made{' '}
              <code>height: 100%</code>
            </Text>
          </Modal>
        </div>
      </Frame>
    );
  },
};
