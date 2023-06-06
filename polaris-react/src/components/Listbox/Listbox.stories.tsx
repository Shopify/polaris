import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  LegacyCard,
  EmptySearchResult,
  Scrollable,
  TextField,
  Icon,
  Listbox,
  LegacyStack,
  AutoSelection,
  VerticalStack,
  Text,
  Box,
} from '@shopify/polaris';
import {CirclePlusMinor, SearchMinor} from '@shopify/polaris-icons';
import {useFeatures} from '../../utilities/features';

export default {
  component: Listbox,
} as ComponentMeta<typeof Listbox>;

export function All() {
  return (
    <VerticalStack gap="8">
      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          Default
        </Text>
        <Default />
        <Box paddingBlockEnd="3" />
      </VerticalStack>

      <VerticalStack gap="2">
        <Text as="h2" variant="headingXl">
          With loading
        </Text>
        <WithLoading />
        <Box paddingBlockEnd="3" />
      </VerticalStack>

      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          With action
        </Text>
        <WithAction />
        <Box paddingBlockEnd="3" />
      </VerticalStack>

      <VerticalStack gap="2">
        <Text as="h2" variant="headingXl">
          With custom element
        </Text>
        <WithCustomElement />
        <Box paddingBlockEnd="3" />
      </VerticalStack>

      <VerticalStack gap="2">
        <Text as="h2" variant="headingXl">
          With search
        </Text>
        <WithSearch />
        <Box paddingBlockEnd="3" />
      </VerticalStack>

      <VerticalStack gap="2">
        <Text as="h2" variant="headingXl">
          With disabled text option
        </Text>
        <WithDisabledTextOption />
      </VerticalStack>
      <Box paddingBlockEnd="3" />
    </VerticalStack>
  );
}

export function Default() {
  return (
    <Listbox accessibilityLabel="Basic Listbox example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
    </Listbox>
  );
}

export function WithLoading() {
  return (
    <Listbox accessibilityLabel="Listbox with loading example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading accessibilityLabel="loading example" />
    </Listbox>
  );
}

export function WithAction() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <LegacyStack spacing="tight">
          <Icon source={CirclePlusMinor} color="base" />
          <div>Add item</div>
        </LegacyStack>
      </Listbox.Action>
    </Listbox>
  );
}

export function WithCustomElement() {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example">
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
    </Listbox>
  );
}

export function WithSearch() {
  const {polarisSummerEditions2023} = useFeatures();

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
    setVisibleOptionIndex(segments.length);
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

  const handleResetVisibleOptionIndex = () => {
    setVisibleOptionIndex(interval);
  };

  const handleSegmentSelect = (segmentIndex: string) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(Number(segmentIndex));
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

  const listboxId = 'SearchableListbox';

  const textFieldMarkup = (
    <div style={{padding: '12px'}}>
      <TextField
        focused={showFooterAction}
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
            const selected = segments[selectedSegmentIndex].value === value;

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
      <span style={{color: 'var(--p-color-text-interactive)'}}>
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
    <LegacyCard>
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
            height: polarisSummerEditions2023 ? '262px' : '292px',
            padding: 'var(--p-space-2) 0',
            borderBottomLeftRadius: 'var(--p-border-radius-2)',
            borderBottomRightRadius: 'var(--p-border-radius-2)',
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
        </Scrollable>
      </div>
    </LegacyCard>
  );
}

export function WithDisabledTextOption() {
  return (
    <LegacyCard>
      <Box paddingBlockStart="2" paddingBlockEnd="2">
        <Listbox accessibilityLabel="Listbox with disabled item example">
          <Listbox.Option value="UniqueValue-1">
            <Listbox.TextOption>Item 1</Listbox.TextOption>
          </Listbox.Option>
          <Listbox.Option value="UniqueValue-2" disabled>
            <Listbox.TextOption disabled>Item 2</Listbox.TextOption>
          </Listbox.Option>
          <Listbox.Option value="UniqueValue-3">
            <Listbox.TextOption>Item 3</Listbox.TextOption>
          </Listbox.Option>
        </Listbox>
      </Box>
    </LegacyCard>
  );
}
