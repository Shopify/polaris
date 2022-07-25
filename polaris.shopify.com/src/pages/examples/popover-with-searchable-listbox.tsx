import React, { useState } from "react";
import {
  Listbox,
  TextField,
  Icon,
  Link,
  Heading,
  Popover,
  AutoSelection,
  Scrollable,
  EmptySearchResult,
  DisplayText,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import { withPolarisExample } from "../../components/PolarisExamplePage";

interface CustomerSegment {
  id: string;
  label: string;
  value: string;
}

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
    label: `Other customers ${index + 13}`,
    id: `gid://shopify/CustomerSegment/${index + 13}`,
    value: `${index + 11}`,
  })
);

segments.push(...lazyLoadSegments);

const interval = 25;

function PopoverWithSearchableListboxExample() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lazyLoading, setLazyLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(interval);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState<CustomerSegment[]>(
    []
  );

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

  const handleOpenPicker = () => {
    setPickerOpen(true);
  };

  const handleClosePicker = () => {
    setPickerOpen(false);
    handleQueryChange("");
    handleResetVisibleOptionIndex();
  };

  const handleSegmentSelect = (segmentIndex: string) => {
    setSelectedSegmentIndex(Number(segmentIndex));
    handleClosePicker();
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

  const listboxId = "SearchableListboxInPopover";

  /* Your app's feature/context specific activator here */
  const activator = (
    <div
      style={{
        fontSize: "var(--p-font-size-7)",
        color: "var(--p-text)",
        borderBottom: "1px dashed var(--p-border)",
      }}
    >
      <Link monochrome removeUnderline onClick={handleOpenPicker}>
        <DisplayText element="h1">
          {segments[selectedSegmentIndex].label}
        </DisplayText>
      </Link>
    </div>
  );

  const textFieldMarkup = (
    <div style={{ padding: "12px" }}>
      <StopPropagation>
        <TextField
          focused
          clearButton
          labelHidden
          label="Customer segments"
          placeholder="Type to search or filter segments"
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
          .map(({ label, id, value }) => {
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
      onSelect={handleSegmentSelect}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {segmentList}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  return (
    <div style={{ height: "265px" }}>
      <Popover
        active={pickerOpen}
        activator={activator}
        preferredAlignment="center"
        autofocusTarget="first-node"
        onClose={handleClosePicker}
      >
        <Popover.Pane fixed>{textFieldMarkup}</Popover.Pane>
        <Scrollable
          shadow
          style={{
            height: "265px",
            width: "310px",
            padding: "4px 0 12px",
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
        </Scrollable>
      </Popover>
    </div>
  );
}

const StopPropagation = ({ children }: React.PropsWithChildren<any>) => {
  const stopEventPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={stopEventPropagation} onTouchStart={stopEventPropagation}>
      {children}
    </div>
  );
};

export default withPolarisExample(PopoverWithSearchableListboxExample);
