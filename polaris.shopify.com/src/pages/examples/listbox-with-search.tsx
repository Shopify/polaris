import React, { useState } from "react";
import {
  Stack,
  Icon,
  Page,
  Card,
  Layout,
  Button,
  Popover,
  TextField,
  Listbox,
  AutoSelection,
  Scrollable,
  EmptySearchResult,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import { withPolarisExample } from "../../components/PolarisExamplePage";

interface CustomerSegment {
  id: string;
  label: string;
  value: string;
}

const actionValue = "__ACTION__";

const segments: CustomerSegment[] = [
  {
    label: "All customers",
    id: "gid://shopify/CustomerSegment/1",
    value: "0",
  },
  {
    label: "VIP customers",
    id: "gid://shopify/CustomerSegment/2",
    value: "1",
  },
  {
    label: "New customers",
    id: "gid://shopify/CustomerSegment/3",
    value: "2",
  },
  {
    label: "Abandoned carts - last 30 days",
    id: "gid://shopify/CustomerSegment/4",
    value: "3",
  },
  {
    label: "Wholesale customers",
    id: "gid://shopify/CustomerSegment/5",
    value: "4",
  },
  {
    label: "Email subscribers",
    id: "gid://shopify/CustomerSegment/6",
    value: "5",
  },
  {
    label: "From New York",
    id: "gid://shopify/CustomerSegment/7",
    value: "6",
  },
  {
    label: "Repeat buyers",
    id: "gid://shopify/CustomerSegment/8",
    value: "7",
  },
  {
    label: "First time buyers",
    id: "gid://shopify/CustomerSegment/9",
    value: "8",
  },
  {
    label: "From Canada",
    id: "gid://shopify/CustomerSegment/10",
    value: "9",
  },
  {
    label: "Bought in last 60 days",
    id: "gid://shopify/CustomerSegment/11",
    value: "10",
  },
  {
    label: "Bought last BFCM",
    id: "gid://shopify/CustomerSegment/12",
    value: "11",
  },
];

const lazyLoadSegments: CustomerSegment[] = Array.from(Array(100)).map(
  (_, index) => ({
    label: `Other customers ${index + 12}`,
    id: `gid://shopify/CustomerSegment/${index + 12}`,
    value: `${index + 12}`,
  })
);

segments.push(...lazyLoadSegments);

const interval = 25;

function ListboxWithSearchExample() {
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState("");
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState<CustomerSegment[]>(
    []
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
    handleQueryChange("");
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

  const listboxId = "SearchableListbox";

  const textFieldMarkup = (
    <div style={{ padding: "12px" }}>
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
          .map(({ label, id, value }) => {
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
      <span style={{ color: "var(--p-interactive)" }}>
        Show all 111 segments
      </span>
    </Listbox.Action>
  ) : null;

  const lazyLoadingMarkup = lazyLoading ? (
    <Listbox.Loading
      accessibilityLabel={`${
        query ? "Filtering" : "Loading"
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
    <Card>
      <div
        style={{
          alignItems: "stretch",
          borderTop: "1px solid #DFE3E8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {textFieldMarkup}

        <Scrollable
          shadow
          style={{
            position: "relative",
            width: "310px",
            height: "292px",
            padding: "var(--p-space-2) 0",
            borderBottomLeftRadius: "var(--p-border-radius-2)",
            borderBottomRightRadius: "var(--p-border-radius-2)",
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
        </Scrollable>
      </div>
    </Card>
  );
}

export default withPolarisExample(ListboxWithSearchExample);
