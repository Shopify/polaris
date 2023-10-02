import React, {useState} from 'react';
import {
  TextField,
  Listbox,
  Sheet,
  Scrollable,
  AutoSelection,
  Icon,
  Button,
  EmptySearchResult,
  TextContainer,
  Text,
} from '@shopify/polaris';
import {MobileCancelMajor, SearchMinor} from '@shopify/polaris-icons';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

const actionValue = '__ACTION__';

const segments = [
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

const lazyLoadSegments = Array.from(Array(100)).map((_, index) => ({
  label: `Other customers ${index + 13}`,
  id: `gid://shopify/CustomerSegment/${index + 13}`,
  value: `${index + 12}`,
}));

segments.push(...lazyLoadSegments);

const interval = 25;

function SheetWithSearchableListboxExample() {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState<
    typeof segments[number][]
  >([]);

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(segments.length);
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
  };

  const handleResetVisibleOptionIndex = () => {
    setVisibleOptionIndex(interval);
  };

  const handleOpenSheet = () => {
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    handleQueryChange('');
    handleResetVisibleOptionIndex();
  };

  const handleSegmentSelect = (segmentIndex: string) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(Number(segmentIndex));
    handleCloseSheet();
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

  const listboxId = 'SearchableListboxInSheet';

  /* Your app's feature/context specific activator here */
  const activator = (
    <Button onClick={handleOpenSheet}>
      {segments[selectedSegmentIndex].label}
    </Button>
  );

  const textFieldMarkup = (
    <div
      style={{
        padding: 'var(--p-space-400) var(--p-space-200)',
        position: 'sticky',
        zIndex: 'var(--p-z-index-12)',
        width: '100%',
        background: 'var(--p-color-bg-surface)',
      }}
    >
      <StopPropagation>
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
      <span style={{color: 'var(--p-color-text-emphasis)'}}>
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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
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
        {showAllMarkup}
        {noResultsMarkup}
        {lazyLoadingMarkup}
      </Listbox>
    </div>
  );

  return (
    <div style={{height: '265px'}}>
      {activator}
      <Sheet
        open={sheetOpen}
        accessibilityLabel="Flow action"
        onClose={handleCloseSheet}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              borderBottom: '1px solid #DFE3E8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              padding: 'var(--p-space-400)',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 'var(--p-space-200)',
              }}
            >
              <Text variant="headingSm" as="h3" tone="subdued">
                Action
              </Text>
              <Button
                accessibilityLabel="Cancel"
                icon={MobileCancelMajor}
                onClick={handleCloseSheet}
                variant="plain"
              />
            </div>
            <TextContainer>
              <Text variant="headingMd" as="h2">
                Look up customer segmentation membership
              </Text>
              <Text tone="subdued" as="span">
                Look up whether a customer is included in a segment.
              </Text>
            </TextContainer>
          </div>
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
                width: '100%',
                height: '292px',
                padding: 'var(--p-space-200) 0',
              }}
              onScrolledToBottom={handleLazyLoadSegments}
            >
              {listboxMarkup}
            </Scrollable>
          </div>
        </div>
      </Sheet>
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

export default withPolarisExample(SheetWithSearchableListboxExample);
