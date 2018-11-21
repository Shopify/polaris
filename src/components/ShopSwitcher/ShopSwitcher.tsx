import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import TextField from '../TextField';
import Icon from '../Icon';
import ActionList, {Props as ActionListProps} from '../ActionList';
import * as styles from './ShopSwitcher.scss';

interface Shop {
  url: string;
  name: string;
}

export interface Props {
  shops: Shop[];
  searchPlaceholder: string;
  activeIndex: number;
  children(
    searchField: React.ReactNode,
    shopsList: React.ReactNode,
  ): React.ReactNode;
}

interface State {
  query: string;
  items: ActionListProps['items'];
}

const MIN_SHOPS_FOR_SEARCH = 5;

class ShopSwitcher extends React.Component<Props, State> {
  state = {
    query: '',
    items: transformShopsToItems(this.props.shops, this.props.activeIndex),
  };

  render() {
    const {query, items} = this.state;
    const {searchPlaceholder, children, shops} = this.props;

    const searchField = shops.length >= MIN_SHOPS_FOR_SEARCH && (
      <div className={styles.Section}>
        <TextField
          labelHidden
          label=""
          value={query}
          onChange={this.handleQueryChange}
          prefix={<Icon source="search" color="inkLightest" />}
          placeholder={searchPlaceholder}
        />
      </div>
    );

    const shopsList = <ActionList items={items} />;

    return children(searchField, shopsList);
  }

  @autobind
  private handleQueryChange(query: string) {
    const {shops, activeIndex} = this.props;
    this.setState({query, items: filterShops(query, shops, activeIndex)});
  }
}

function filterShops(query: string, shops: Shop[], activeIndex: number) {
  const lowerQuery = query.toLowerCase();
  const newShops = shops.filter(({name}) =>
    name.toLowerCase().startsWith(lowerQuery),
  );
  return transformShopsToItems(newShops, activeIndex);
}

function transformShopsToItems(shops: Shop[], activeIndex: number) {
  return shops.map(({name, url}, index) => ({
    content: name,
    url,
    active: index === activeIndex,
  }));
}

export default ShopSwitcher;
