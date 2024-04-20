import React, {useCallback, useRef, useState} from 'react';
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
  TextContainer,
  TextField,
  Frame,
  FrameContext,
  Listbox,
  BlockStack,
  Box,
  Scrollable,
  Icon,
  EmptySearchResult,
  AutoSelection,
} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';

export default {
  component: Modal,
} as ComponentMeta<typeof Modal>;

export function Default() {
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
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
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
}

export function WithDestructivePrimaryAction() {
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
}

export function Large() {
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
}

export function Small() {
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
}

export function WithoutATitle() {
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
}

export function WithScrollListener() {
  interface CustomerSegment {
    id: string;
    label: string;
    value: string;
  }

  const segments: CustomerSegment[] = [
    {
      label: 'All customers',
      id: 'gid://shopify/CustomerSegment/1',
      value: '0',
    },
    {
      label: 'VIP customers',
      id: 'gid://shopify/CustomerSegment/2',
      value: '1',
    },
    {
      label: 'New customers',
      id: 'gid://shopify/CustomerSegment/3',
      value: '2',
    },
    {
      label: 'Abandoned carts - last 30 days',
      id: 'gid://shopify/CustomerSegment/4',
      value: '3',
    },
    {
      label: 'Wholesale customers',
      id: 'gid://shopify/CustomerSegment/5',
      value: '4',
    },
    {
      label: 'Email subscribers',
      id: 'gid://shopify/CustomerSegment/6',
      value: '5',
    },
    {
      label: 'From New York',
      id: 'gid://shopify/CustomerSegment/7',
      value: '6',
    },
    {
      label: 'Repeat buyers',
      id: 'gid://shopify/CustomerSegment/8',
      value: '7',
    },
    {
      label: 'First time buyers',
      id: 'gid://shopify/CustomerSegment/9',
      value: '8',
    },
    {
      label: 'From Canada',
      id: 'gid://shopify/CustomerSegment/10',
      value: '9',
    },
    {
      label: 'Bought in last 60 days',
      id: 'gid://shopify/CustomerSegment/11',
      value: '10',
    },
    {
      label: 'Bought last BFCM',
      id: 'gid://shopify/CustomerSegment/12',
      value: '11',
    },
  ];

  const lazyLoadSegments: CustomerSegment[] = Array.from(Array(100)).map(
    (_, index) => ({
      label: `Other customers ${index + 13}`,
      id: `gid://shopify/CustomerSegment/${index + 13}`,
      value: `${index + 12}`,
    }),
  );

  segments.push(...lazyLoadSegments);

  const interval = 25;
  const [active, setActive] = useState(true);
  const [query, setQuery] = useState('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(25);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [filteredSegments, setFilteredSegments] = useState<CustomerSegment[]>(
    [],
  );

  const modalBodyRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setActive(!active);
    setVisibleOptionIndex(25);
  };

  const handleFilterSegments = (query: string) => {
    const nextFilteredSegments = segments.filter((segment) => {
      return segment.label
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());
    });

    setFilteredSegments(nextFilteredSegments);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);

    if (query.length >= 2) handleFilterSegments(query);
  };

  const handleQueryClear = () => {
    handleQueryChange('');
    handleResetVisibleOptionIndex();
  };

  const handleResetVisibleOptionIndex = () => {
    setVisibleOptionIndex(interval);
  };

  const handleSegmentSelect = (segmentId: string) => () => {
    if (selectedSegments.includes(segmentId)) {
      setSelectedSegments(
        selectedSegments.filter((option) => option !== segmentId),
      );
    } else {
      setSelectedSegments([...selectedSegments, segmentId]);
    }
  };

  const handleActiveOptionChange = (_: string, domId: string) => {
    setActiveOptionId(domId);
  };

  /* This is just to illustrate lazy loading state vs loading state. This is an example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage` from your GraphQL query data instead of this fake "willLoadMoreResults" state along with setting `first` your GraphQL query's variables to your app's default max edges limit (e.g., 250). */

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults) {
      setLazyLoading(true);

      const options = query ? filteredSegments : segments;

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex;
        const nextVisibleOptionIndex =
          remainingOptionCount >= interval
            ? visibleOptionIndex + interval
            : visibleOptionIndex + remainingOptionCount;

        setLazyLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (remainingOptionCount <= interval) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  };

  const listboxId = 'SearchableListboxInSheet';

  const textFieldMarkup = (
    <div
      style={{
        padding: 'var(--p-space-400) var(--p-space-200)',
        // position: 'sticky',
        // zIndex: 'var(--p-z-index-12)',
        width: '100%',
        background: 'var(--p-color-bg-surface)',
      }}
    >
      <TextField
        clearButton
        labelHidden
        label="Customer segments"
        placeholder="Search segments"
        autoComplete="off"
        value={query}
        prefix={<Icon source={SearchMinor} />}
        ariaActiveDescendant={activeOptionId}
        ariaControls={listboxId}
        onChange={handleQueryChange}
        onClearButtonClick={handleQueryClear}
      />
    </div>
  );

  const segmentOptions = query ? filteredSegments : segments;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions
          .slice(0, visibleOptionIndex)
          .map(({label, id, value}) => {
            const selected = selectedSegments.includes(id);

            return (
              <Listbox.Option key={id} value={value} selected={selected}>
                <Listbox.TextOption selected={selected}>
                  {label}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
      : null;

  const lazyLoadingMarkup = lazyLoading ? (
    <Listbox.Loading
      accessibilityLabel={`${
        query ? 'Filtering' : 'Loading'
      } customer segments`}
    />
  ) : null;

  const noResultsMarkup =
    segmentOptions.length === 0 ? (
      <EmptySearchResult
        title=""
        description={`No segments found matching "${query}"`}
      />
    ) : null;

  const listboxMarkup = (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <Listbox
        enableKeyboardControl
        autoSelection={AutoSelection.FirstSelected}
        accessibilityLabel="Search for and select a customer segment"
        customListId={listboxId}
        onSelect={handleSegmentSelect}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {segmentList}
        {noResultsMarkup}
        {lazyLoadingMarkup}
      </Listbox>
    </div>
  );

  const listMarkup = (
    <div
      style={{
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        position: 'relative',
        width: '100%',
        height: '600px',
        overflow: 'hidden',
      }}
    >
      {textFieldMarkup}
      <Scrollable
        shadow
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'calc(100% - 64px)',
          paddingBottom: 'var(--p-space-200)',
        }}
        onScrolledToBottom={handleLazyLoadSegments}
      >
        {listboxMarkup}
      </Scrollable>
    </div>
  );

  const activator = <Button onClick={handleClose}>Open</Button>;

  return (
    <Frame>
      <Modal
        noScroll
        activator={activator}
        open={active}
        title="Select a customer segment"
        onClose={handleClose}
      >
        {listMarkup}
      </Modal>
    </Frame>
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
}

export function WithLongContent() {
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
}

export function WithLongContentNoScroll() {
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
}

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
export function EmbeddedIframe() {
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
}

export function SectionedProp() {
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
}

export function Loading() {
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
}

export function Fullscreen() {
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
}
