import {
  EmptyState,
  EmptyStateProps,
  Header,
  HeaderProps,
  Item,
  ItemProps,
  List,
  ListProps,
  Manager,
  ManagerProps,
} from './components';

export interface ResourceProps {
  EmptyState: EmptyStateProps;
  Header: HeaderProps;
  Item: ItemProps;
  List: ListProps;
  Manager: ManagerProps;
}

export const Resource = {EmptyState, Header, Item, List, Manager};
