import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Avatar,
  Box,
  Button,
  LegacyCard,
  FormLayout,
  Popover,
  ResourceList,
  Select,
  Listbox,
  TextField,
  Icon,
  Link,
  AutoSelection,
  Scrollable,
  EmptySearchResult,
  Text,
  BlockStack,
} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';

export default {
  component: Popover,
} as ComponentMeta<typeof Popover>;

export function All() {
  return (
    <BlockStack gap="800">
      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          With action list
        </Text>
        <WithActionList />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          With content and actions
        </Text>
        <WithContentAndActions />
      </BlockStack>

      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          With form components
        </Text>
        <WithFormComponents />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          With lazy loaded list
        </Text>
        <WithLazyLoadedList />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          With scrollable lazy loaded list
        </Text>
        <WithScrollableLazyLoadedList />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          With searchable listbox
        </Text>
        <WithSearchableListbox />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          With loading smaller content
        </Text>
        <WithLoadingSmallerContent />
      </BlockStack>
    </BlockStack>
  );
}

export function WithActionList() {
  const [activePopover, setActivePopover] = useState(null);

  const togglePopoverActive = useCallback((popover, isClosing) => {
    const currentPopover = isClosing ? null : popover;
    setActivePopover(currentPopover);
  }, []);

  const activator = (
    <Button
      id="button-1"
      onClick={() => togglePopoverActive('popover1', false)}
      disclosure
    >
      More actions
    </Button>
  );
  const activator2 = (
    <Button
      id="button-2"
      onClick={() => togglePopoverActive('popover2', false)}
      disclosure
    >
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <BlockStack gap="400">
        <Popover
          active={activePopover === 'popover1'}
          activator={activator}
          autofocusTarget="first-node"
          onClose={() => togglePopoverActive('popover1', true)}
        >
          <ActionList
            actionRole="menuitem"
            items={[{content: 'Import file'}, {content: 'Export file'}]}
          />
        </Popover>
        <Popover
          active={activePopover === 'popover2'}
          activator={activator2}
          autofocusTarget="first-node"
          onClose={() => togglePopoverActive('popover2', true)}
        >
          <ActionList
            actionRole="menuitem"
            items={[{content: 'Import file'}, {content: 'Export file'}]}
          />
        </Popover>
      </BlockStack>
    </div>
  );
}

export function WithContentAndActions() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const textMarkup = (
    <Text as="h2" variant="headingSm">
      Available sales channels
    </Text>
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Sales channels
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <Popover.Pane fixed>
          <Popover.Section>{textMarkup}</Popover.Section>
        </Popover.Pane>
        <Popover.Pane>
          <ActionList
            actionRole="menuitem"
            items={[
              {content: 'Online store'},
              {content: 'Facebook'},
              {content: 'Shopify POS'},
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export function WithFormComponents() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [tagValue, setTagValue] = useState('');

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleTagValueChange = useCallback((value) => setTagValue(value), []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Filter
    </Button>
  );

  return (
    <div style={{height: '280px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          <Select label="Show all customers where:" options={['Tagged with']} />
          <TextField
            label="Tags"
            value={tagValue}
            onChange={handleTagValueChange}
            autoComplete="off"
          />
          <Button size="slim">Add filter</Button>
        </FormLayout>
      </Popover>
    </div>
  );
}

export function WithLazyLoadedList() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [visibleStaffIndex, setVisibleStaffIndex] = useState(5);
  const staff = [
    'Abbey Mayert',
    'Abbi Senger',
    'Abdul Goodwin',
    'Abdullah Borer',
    'Abe Nader',
    'Abigayle Smith',
    'Abner Torphy',
    'Abraham Towne',
    'Abraham Vik',
    'Ada Fisher',
    'Adah Pouros',
    'Adam Waelchi',
    'Adan Zemlak',
    'Addie Wehner',
    'Addison Wexler',
    'Alex Hernandez',
  ];

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleScrolledToBottom = useCallback(() => {
    const totalIndexes = staff.length;
    const interval =
      visibleStaffIndex + 3 < totalIndexes
        ? 3
        : totalIndexes - visibleStaffIndex;

    if (interval > 0) {
      setVisibleStaffIndex(visibleStaffIndex + interval);
    }
  }, [staff.length, visibleStaffIndex]);

  const handleResourceListItemClick = useCallback(() => {}, []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      View staff
    </Button>
  );

  const staffList = staff.slice(0, visibleStaffIndex).map((name) => ({
    name,
    initials: getInitials(name),
  }));

  return (
    <LegacyCard sectioned>
      <div style={{height: '280px'}}>
        <Popover
          sectioned
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
        >
          <Popover.Pane onScrolledToBottom={handleScrolledToBottom}>
            <ResourceList items={staffList} renderItem={renderItem} />
          </Popover.Pane>
        </Popover>
      </div>
    </LegacyCard>
  );

  function renderItem({name, initials}) {
    return (
      <ResourceList.Item
        id={name}
        media={<Avatar size="xs" name={name} initials={initials} />}
        verticalAlignment="center"
        onClick={handleResourceListItemClick}
      >
        {name}
      </ResourceList.Item>
    );
  }

  function getInitials(name) {
    return name
      .split(' ')
      .map((surnameOrFamilyName) => {
        return surnameOrFamilyName.slice(0, 1);
      })
      .join('');
  }
}

export function WithScrollableLazyLoadedList() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [visibleStaffIndex, setVisibleStaffIndex] = useState(5);
  const staff = [
    'Abbey Mayert',
    'Abbi Senger',
    'Abdul Goodwin',
    'Abdullah Borer',
    'Abe Nader',
    'Abigayle Smith',
    'Abner Torphy',
    'Abraham Towne',
    'Abraham Vik',
    'Ada Fisher',
    'Adah Pouros',
    'Adam Waelchi',
    'Adan Zemlak',
    'Addie Wehner',
    'Addison Wexler',
    'Alex Hernandez',
  ];

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleScrolledToBottom = useCallback(() => {
    const totalIndexes = staff.length;
    const interval =
      visibleStaffIndex + 3 < totalIndexes
        ? 3
        : totalIndexes - visibleStaffIndex;

    console.log({interval});

    if (interval > 0) {
      setVisibleStaffIndex(visibleStaffIndex + interval);
    }
  }, [staff.length, visibleStaffIndex]);

  const handleResourceListItemClick = useCallback(() => {}, []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      View staff
    </Button>
  );

  const staffList = staff.slice(0, visibleStaffIndex).map((name) => ({
    name,
    initials: getInitials(name),
  }));

  return (
    <LegacyCard sectioned>
      <div style={{height: '280px'}}>
        <Popover
          sectioned
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          ariaHaspopup={false}
        >
          <Popover.Pane>
            <Scrollable
              shadow
              style={{
                position: 'relative',
                width: '231px',
                height: '262px',
                padding: 'var(--p-space-200) 0',
                borderBottomLeftRadius: 'var(--p-border-radius-200)',
                borderBottomRightRadius: 'var(--p-border-radius-200)',
              }}
              onScrolledToBottom={handleScrolledToBottom}
            >
              <ResourceList items={staffList} renderItem={renderItem} />
            </Scrollable>
          </Popover.Pane>
        </Popover>
      </div>
    </LegacyCard>
  );

  function renderItem({name, initials}) {
    return (
      <ResourceList.Item
        id={name}
        media={<Avatar size="xs" name={name} initials={initials} />}
        verticalAlignment="center"
        onClick={handleResourceListItemClick}
      >
        {name}
      </ResourceList.Item>
    );
  }

  function getInitials(name) {
    return name
      .split(' ')
      .map((surnameOrFamilyName) => {
        return surnameOrFamilyName.slice(0, 1);
      })
      .join('');
  }
}

export function WithSearchableListbox() {
  interface CustomerSegment {
    id: string;
    label: string;
    value: string;
  }

  const actionValue = '__ACTION__';

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

  const [pickerOpen, setPickerOpen] = useState(false);
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState<CustomerSegment[]>(
    [],
  );

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(interval);
  };

  const handleFilterSegments = (query: string) => {
    const nextFilteredSegments = segments.filter((segment: CustomerSegment) => {
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
  };

  const handleOpenPicker = () => {
    setPickerOpen(true);
  };

  const handleClosePicker = () => {
    setPickerOpen(false);
    handleQueryChange('');
  };

  const handleSegmentSelect = (segmentIndex: string) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(Number(segmentIndex));
    handleClosePicker();
  };

  const handleActiveOptionChange = (_: string, domId: string) => {
    setActiveOptionId(domId);
  };

  /* This is just to illustrate lazy loading state vs loading state. This is an example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage` from your GraphQL query data instead of this fake "willLoadMoreResults" state along with setting `first` your GraphQL query's variables to your app's default max edges limit (e.g., 250). */

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
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

  const listboxId = 'SearchableListboxInPopover';

  /* Your app's feature/context specific activator here */
  const activator = (
    <div
      style={{
        fontSize: 'var(--p-font-size-500)',
        color: 'var(--p-color-text)',
        borderBottom: '1px dashed var(--p-color-border)',
      }}
    >
      <Link monochrome removeUnderline onClick={handleOpenPicker}>
        <Text as="h1" variant="headingXl">
          {segments[selectedSegmentIndex].label}
        </Text>
      </Link>
    </div>
  );

  const textFieldMarkup = (
    <div style={{padding: '12px'}}>
      <StopPropagation>
        <TextField
          focused={showFooterAction}
          clearButton
          labelHidden
          label="Customer segments"
          placeholder="Search segments"
          autoComplete="off"
          value={query}
          prefix={<Icon source={SearchIcon} />}
          ariaActiveDescendant={activeOptionId}
          ariaControls={listboxId}
          onChange={handleQueryChange}
          onClearButtonClick={handleQueryClear}
        />
      </StopPropagation>
    </div>
  );

  const segmentOptions = query ? filteredSegments : segments;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions
          .slice(0, visibleOptionIndex)
          .map(({label, id, value}) => {
            const selected = segments[selectedSegmentIndex].id === id;

            return (
              <Listbox.Option key={id} value={value} selected={selected}>
                <Listbox.TextOption selected={selected}>
                  {label}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
      : null;

  const showAllMarkup = showFooterAction ? (
    <Listbox.Action value={actionValue}>
      <span
        style={{
          color: 'var(--p-color-text-secondary)',
        }}
      >
        Show all 111 segments
      </span>
    </Listbox.Action>
  ) : null;

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
    <Listbox
      enableKeyboardControl
      autoSelection={AutoSelection.FirstSelected}
      accessibilityLabel="Search for and select a customer segment"
      customListId={listboxId}
      onSelect={handleSegmentSelect}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {segmentList}
      {showAllMarkup}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  return (
    <div style={{height: '400px'}}>
      <Popover
        active={pickerOpen}
        activator={activator}
        ariaHaspopup="listbox"
        preferredAlignment="left"
        autofocusTarget="first-node"
        onClose={handleClosePicker}
      >
        <Popover.Pane fixed>
          <div
            style={{
              alignItems: 'stretch',
              borderTop: '1px solid #DFE3E8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'stretch',
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {textFieldMarkup}

            <Scrollable
              shadow
              style={{
                position: 'relative',
                width: '310px',
                height: '262px',
                padding: 'var(--p-space-200) 0',
                borderBottomLeftRadius: 'var(--p-border-radius-200)',
                borderBottomRightRadius: 'var(--p-border-radius-200)',
              }}
              onScrolledToBottom={handleLazyLoadSegments}
            >
              {listboxMarkup}
            </Scrollable>
          </div>
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export function WithLoadingSmallerContent() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button
      onClick={() => {
        setLoading(true);
        togglePopoverActive();
        window.setTimeout(() => {
          setLoading(false);
        }, 500);
      }}
      disclosure
    >
      Show server data
    </Button>
  );

  return (
    <div style={{height: '280px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        {loading ? (
          <div style={{height: '200px'}}>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <p>Small content from the server</p>
          </div>
        )}
      </Popover>
    </div>
  );
}

export function WithSubduedPane() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button
      onClick={() => {
        togglePopoverActive();
      }}
      disclosure
    >
      Show popover
    </Button>
  );

  return (
    <div style={{height: '280px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <Popover.Pane>
          <Box padding="400">
            <Text as="p">Popover content</Text>
          </Box>
        </Popover.Pane>
        <Popover.Pane subdued>
          <Box padding="400">
            <Text as="p">Subdued popover pane</Text>
          </Box>
        </Popover.Pane>
      </Popover>
    </div>
  );
}

const StopPropagation = ({children}: React.PropsWithChildren<any>) => {
  const stopEventPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={stopEventPropagation} onTouchStart={stopEventPropagation}>
      {children}
    </div>
  );
};
