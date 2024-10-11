import React, {useCallback, useRef, useState} from 'react';
import type {Meta} from '@storybook/react';
import {within} from '@storybook/test';
import type {FiltersProps} from '@shopify/polaris';
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
  ResourceList,
  Filters,
  RangeSlider,
  Avatar,
} from '@shopify/polaris';
import {transitionsAllSettled} from 'transitions-all-settled';

export default {
  component: Modal,
} as Meta<typeof Modal>;

export const Default = {
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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

export const DefaultWithFilters = {
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
  render() {
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button onClick={handleChange}>Open</Button>;

    const [accountStatus, setAccountStatus] = useState(null);
    const [moneySpent, setMoneySpent] = useState(null);
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState('');

    const handleAccountStatusChange = useCallback(
      (value) => setAccountStatus(value),
      [],
    );
    const handleMoneySpentChange = useCallback(
      (value) => setMoneySpent(value),
      [],
    );
    const handleTaggedWithChange = useCallback(
      (value) => setTaggedWith(value),
      [],
    );
    const handleFiltersQueryChange = useCallback(
      (value) => setQueryValue(value),
      [],
    );
    const handleAccountStatusRemove = useCallback(
      () => setAccountStatus(null),
      [],
    );
    const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleFiltersClearAll = useCallback(() => {
      handleAccountStatusRemove();
      handleMoneySpentRemove();
      handleTaggedWithRemove();
      handleQueryValueRemove();
    }, [
      handleAccountStatusRemove,
      handleMoneySpentRemove,
      handleQueryValueRemove,
      handleTaggedWithRemove,
    ]);

    const filters = [
      {
        key: 'accountStatus',
        label: 'Account status',
        filter: (
          <ChoiceList
            title="Account status"
            titleHidden
            choices={[
              {label: 'Enabled', value: 'enabled'},
              {label: 'Not invited', value: 'not invited'},
              {label: 'Invited', value: 'invited'},
              {label: 'Declined', value: 'declined'},
            ]}
            selected={accountStatus || []}
            onChange={handleAccountStatusChange}
            allowMultiple
          />
        ),
        shortcut: true,
        pinned: true,
      },
      {
        key: 'taggedWith',
        label: 'Tagged with',
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={handleTaggedWithChange}
            autoComplete="off"
            labelHidden
          />
        ),
        shortcut: true,
        pinned: true,
      },
      {
        key: 'moneySpent',
        label: 'Money spent',
        filter: (
          <RangeSlider
            label="Money spent is between"
            labelHidden
            value={moneySpent || [0, 500]}
            prefix="$"
            output
            min={0}
            max={2000}
            step={1}
            onChange={handleMoneySpentChange}
          />
        ),
      },
    ];

    const appliedFilters: FiltersProps['appliedFilters'] = [];
    if (!isEmpty(accountStatus)) {
      const key = 'accountStatus';
      appliedFilters.push({
        key,
        label: disambiguateLabel(key, accountStatus),
        onRemove: handleAccountStatusRemove,
      });
    }
    if (!isEmpty(moneySpent)) {
      const key = 'moneySpent';
      appliedFilters.push({
        key,
        label: disambiguateLabel(key, moneySpent),
        onRemove: handleMoneySpentRemove,
      });
    }
    if (!isEmpty(taggedWith)) {
      const key = 'taggedWith';
      appliedFilters.push({
        key,
        label: disambiguateLabel(key, taggedWith),
        onRemove: handleTaggedWithRemove,
      });
    }
    function disambiguateLabel(key, value) {
      switch (key) {
        case 'moneySpent':
          return `Money spent is between $${value[0]} and $${value[1]}`;
        case 'taggedWith':
          return `Tagged with ${value}`;
        case 'accountStatus':
          return value.map((val) => `Customer ${val}`).join(', ');
        default:
          return value;
      }
    }

    function isEmpty(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === '' || value == null;
      }
    }

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
              <ResourceList
                resourceName={{singular: 'customer', plural: 'customers'}}
                filterControl={
                  <Filters
                    queryValue={queryValue}
                    queryPlaceholder="Searching in all"
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleFiltersClearAll}
                    closeOnChildOverlayClick
                  />
                }
                flushFilters
                items={[
                  {
                    id: '341',
                    url: '#',
                    name: 'Mae Jemison',
                    location: 'Decatur, USA',
                  },
                  {
                    id: '256',
                    url: '#',
                    name: 'Ellen Ochoa',
                    location: 'Los Angeles, USA',
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, location} = item;
                  const media = <Avatar customer size="md" name={name} />;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text as="h3" fontWeight="bold">
                        {name}
                      </Text>
                      <div>{location}</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Modal.Section>
          </Modal>
        </div>
      </Frame>
    );
  },
};

export const WithPrimaryAction = {
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
  play: async ({canvasElement}) => {
    await transitionsAllSettled(canvasElement);
  },
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
