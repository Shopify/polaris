import type {Dispatch} from 'react';
import React, {useReducer, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ChoiceList} from '@shopify/polaris';
import type {AppliedFilterInterface} from '@shopify/polaris';

import type {TabProps} from '../Tabs';
import type {FiltersProps} from '../Filters';

import {IndexFilters} from './IndexFilters';
import type {IndexFiltersProps} from './IndexFilters';
import {IndexFiltersUpdateAction} from './types';
import {useSetIndexFiltersMode} from './hooks';

export default {
  component: IndexFilters,
  parameters: {
    a11y: {
      config: {
        // disabled due to DataTable having a scrollable region without
        // keyboard access when all content fits without scrolling.
        rules: [{id: 'scrollable-region-focusable', enabled: false}],
      },
    },
  },
} as ComponentMeta<typeof FilterPill>;

const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
const UPDATE_DATE = 'UPDATE_DATE';
const UPDATE_SHIPPING = 'UPDATE_SHIPPING';
const UPDATE_RETURNS = 'UPDATE_RETURNS';
const REMOVE_ALL = 'REMOVE_ALL';

interface FilterOption {
  label: string;
  value: string;
}

interface Filter {
  key: string;
  type: string;
  label: string;
  pinned: boolean;
  isApplied: boolean;
  options: FilterOption[];
  value: string;
}

interface FilterState {
  [key: string]: Filter;
}

const initialFilterState = {
  payment: {
    key: 'payment',
    type: UPDATE_PAYMENT,
    label: 'Payment status',
    pinned: true,
    isApplied: false,
    options: [
      {label: 'Authorized', value: 'authorized'},
      {label: 'Expired', value: 'expired'},
      {label: 'Paid', value: 'paid'},
    ],
    value: '',
  },

  date: {
    key: 'date',
    type: UPDATE_DATE,

    label: 'Date',
    pinned: true,
    isApplied: false,
    options: [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last week', value: 'lastWeek'},
    ],
    value: '',
  },

  shipping: {
    key: 'shipping',
    type: UPDATE_SHIPPING,
    label: 'Shipping status',
    pinned: false,
    isApplied: false,
    options: [
      {label: 'Pending', value: 'pending'},
      {label: 'Shipped', value: 'shipped'},
      {label: 'Delivered', value: 'delivered'},
    ],
    value: '',
  },

  returns: {
    key: 'returns',
    type: UPDATE_RETURNS,
    label: 'Returns',
    pinned: false,
    isApplied: false,
    options: [
      {label: 'Returned', value: 'returned'},
      {label: 'Refunded', value: 'refunded'},
      {label: 'Rejected', value: 'rejected'},
    ],
    value: '',
  },
};

interface Action {
  type: string;
  payload: Filter;
}

function reducer(state: FilterState = initialFilterState, action: Action) {
  switch (action.type) {
    case UPDATE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case UPDATE_RETURNS:
      return {
        ...state,
        returns: action.payload,
      };
    case REMOVE_ALL:
      return {
        ...state,
        payment: {...state.payment, isApplied: false},
        date: {...state.date, isApplied: false},
        shipping: {...state.shipping, isApplied: false},
        returns: {...state.returns, isApplied: false},
      };
    default:
      return state;
  }
}

const useFilters = () => {
  const [filtersState, dispatch] = useReducer(reducer, initialFilterState);

  const filters: FiltersProps['filters'] = [
    {
      ...filtersState.payment,
      filter: (
        <DefaultFilter
          {...{
            dispatch,
            dispatchKey: UPDATE_PAYMENT,
            filterKey: 'payment',
            filter: filtersState.payment,
          }}
        />
      ),
    },
    {
      ...filtersState.date,
      filter: (
        <DefaultFilter
          {...{
            dispatch,
            dispatchKey: UPDATE_DATE,
            filterKey: 'date',
            filter: filtersState.date,
          }}
        />
      ),
    },
    {
      ...filtersState.shipping,
      filter: (
        <DefaultFilter
          {...{
            dispatch,
            dispatchKey: UPDATE_SHIPPING,
            filterKey: 'shipping',
            filter: filtersState.shipping,
          }}
        />
      ),
    },
    {
      ...filtersState.returns,
      filter: (
        <DefaultFilter
          {...{
            dispatch,
            dispatchKey: UPDATE_RETURNS,
            filterKey: 'returns',
            filter: filtersState.returns,
          }}
        />
      ),
    },
  ];
  const appliedFilters: AppliedFilterInterface[] = Object.values(filtersState)
    .filter((filter) => filter.isApplied)
    .map((filter) => ({
      key: filter.key,
      value: filter.value,
      label:
        filter.options?.find((option) => option.value === filter.value)
          ?.label || '',
      onRemove: () => {
        dispatch({
          type: filter.type,
          payload: {
            ...filter,
            isApplied: false,
            value: '',
          },
        });
      },
    }));

  const onClearAllFilters = () => {
    dispatch({
      type: REMOVE_ALL,
      payload: {
        ...filtersState.payment,
      },
    });
  };

  return {
    filtersState,
    dispatch,
    filters,
    appliedFilters,
    onClearAllFilters,
  };
};

interface DefaultFilterProps {
  dispatch: Dispatch<Action>;
  dispatchKey: string;
  filter: Filter;
}

function DefaultFilter({dispatch, dispatchKey, filter}: DefaultFilterProps) {
  function handleChange(value: string[]) {
    dispatch({
      type: dispatchKey,
      payload: {
        ...filter,
        isApplied: true,
        value: value[0],
      },
    });
  }
  return (
    <ChoiceList
      choices={filter.options}
      title={filter.label}
      selected={[filter.value]}
      onChange={handleChange}
    />
  );
}

const useDefaultData = () => {
  const [selected, setSelected] = useState(0);
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const [sortSelected, setSortSelected] = useState(['order-number asc']);
  const {mode, setMode} = useSetIndexFiltersMode();

  const handleSaveNewViewModal = async (value: string) => {
    setItemStrings([...itemStrings, value]);
    return true;
  };

  const [searchTerm, setSearchTerm] = useState('');

  const {filters, appliedFilters, onClearAllFilters} = useFilters();

  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
  };

  const duplicateView = (index: number) => {
    const item = itemStrings[index];
    setItemStrings([...itemStrings, item]);
  };

  const items: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[] =
    itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
      permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
      onClickRenameView: () => {},
      onSaveRenameViewModal: async (value: string, id: string) => {
        const newItemsStrings = items.map((item) => {
          if (item.id === id) {
            return value;
          }
          return item.content;
        });
        setItemStrings(newItemsStrings);
      },
      onClickDuplicateView: async (id: string) => {
        duplicateView(index);
      },
      onClickEditView: (id: string) => {},
      onClickDeleteView: (id: string) => {},
      onConfirmDeleteView: async (id: string) => {
        deleteView(index);
      },
    }));

  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {
      label: 'Order number',
      value: 'order-number asc',
      directionLabel: 'Ascending',
    },
    {
      label: 'Order number',
      value: 'order-number desc',
      directionLabel: 'Descending',
    },
    {label: 'Customer name', value: 'customer-name asc', directionLabel: 'A-Z'},
    {
      label: 'Customer name',
      value: 'customer-name desc',
      directionLabel: 'Z-A',
    },
    {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
    {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
    {
      label: 'Payment status',
      value: 'payment-status asc',
      directionLabel: 'Ascending',
    },
    {
      label: 'Payment status',
      value: 'payment-status desc',
      directionLabel: 'Descending',
    },
    {
      label: 'Fulfillment status',
      value: 'fulfillment-status asc',
      directionLabel: 'A-Z',
    },
    {
      label: 'Fulfillment status',
      value: 'fulfillment-status desc',
      directionLabel: 'Z-A',
    },
    {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
    {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
  ];

  const onHandleUpdate = async () => {
    return true;
  };

  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    return true;
  };

  const onHandleSaveAs = async () => {
    return true;
  };

  const isCurrentViewLocked = Boolean(items[selected].isLocked);

  const viewNames = items.map(({content}) => content);

  return {
    items,
    selected,
    setSelected,
    isCurrentViewLocked,
    handleSaveNewViewModal,
    searchTerm,
    setSearchTerm,
    sortOptions,
    sortSelected,
    setSortSelected,
    onHandleUpdate,
    onHandleCancel,
    onHandleSave,
    onHandleSaveAs,
    filters,
    appliedFilters,
    viewNames,
    onClearAllFilters,
    mode,
    setMode,
  };
};

export function Default() {
  const {
    items,
    selected,
    setSelected,
    handleSaveNewViewModal,
    searchTerm,
    setSearchTerm,
    sortOptions,
    sortSelected,
    setSortSelected,
    onHandleUpdate,
    onHandleCancel,
    onHandleSaveAs,
    filters,
    appliedFilters,
    viewNames,
    onClearAllFilters,
    mode,
    setMode,
  } = useDefaultData();

  const updateButtonState = IndexFiltersUpdateAction.Update;

  return (
    <>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={searchTerm}
        queryPlaceholder=""
        onQueryChange={setSearchTerm}
        onSortChange={setSortSelected}
        onUpdateIndexFilters={onHandleUpdate}
        onCancelIndexFilters={onHandleCancel}
        onSaveAsIndexFilters={onHandleSaveAs}
        tabs={items}
        selected={selected}
        onSelect={setSelected}
        // tabs={
        //   <Tabs
        //     items={items}
        //     selected={selected}
        //     onSelect={setSelected}
        //     onSaveNewViewModal={handleSaveNewViewModal}
        //     showNewTab
        //     newViewAccessibilityLabel="New view"
        //   />
        // }
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAllFilters={onClearAllFilters}
        updateButtonDisabled={false}
        updateButtonLoading={false}
        updateButtonState={updateButtonState}
        viewNames={viewNames}
        mode={mode}
        setMode={setMode}
      />
      <dl>
        <dt>Sort Selected</dt>
        <dd>{sortSelected}</dd>
        <dt>Search term</dt>
        <dd>{searchTerm}</dd>
        <dt>All filters</dt>
        <dd>{filters.map((filter) => filter.key).join(' / ')}</dd>
        <dt>Applied filters</dt>
        <dd>
          {appliedFilters
            .map((filter) => `${filter.key}: ${filter.label}`)
            .join(' / ')}
        </dd>
      </dl>
    </>
  );
}

// export const WithoutSort = () => {
//   const {
//     items,
//     selected,
//     setSelected,
//     handleSaveNewViewModal,
//     searchTerm,
//     setSearchTerm,
//     onHandleUpdate,
//     onHandleCancel,
//     onHandleSaveAs,
//     filters,
//     appliedFilters,
//     viewNames,
//     onClearAllFilters,
//     mode,
//     setMode,
//   } = useDefaultData();

//   const updateButtonState = IndexFiltersUpdateAction.Update;

//   return (
//     <>
//       <IndexFilters
//         queryValue={searchTerm}
//         queryPlaceholder=""
//         onQueryChange={setSearchTerm}
//         onUpdateIndexFilters={onHandleUpdate}
//         onCancelIndexFilters={onHandleCancel}
//         onSaveAsIndexFilters={onHandleSaveAs}
//         tabs={
//           <Tabs
//             items={items}
//             selected={selected}
//             onSelect={setSelected}
//             onSaveNewViewModal={handleSaveNewViewModal}
//             showNewTab
//             newViewAccessibilityLabel="New view"
//           />
//         }
//         filters={filters}
//         appliedFilters={appliedFilters}
//         onClearAllFilters={onClearAllFilters}
//         updateButtonDisabled={false}
//         updateButtonLoading={false}
//         updateButtonState={updateButtonState}
//         viewNames={viewNames}
//         mode={mode}
//         setMode={setMode}
//       />
//       <dl>
//         <dt>Search term</dt>
//         <dd>{searchTerm}</dd>
//         <dt>All filters</dt>
//         <dd>{filters.map((filter) => filter.key).join(' / ')}</dd>
//         <dt>Applied filters</dt>
//         <dd>
//           {appliedFilters
//             .map((filter) => `${filter.key}: ${filter.label}`)
//             .join(' / ')}
//         </dd>
//       </dl>
//     </>
//   );
// };
