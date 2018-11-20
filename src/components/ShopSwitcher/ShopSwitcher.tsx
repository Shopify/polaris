import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import TextField from '../TextField';
import Icon from '../Icon';
import ActionList, {Props as ActionListProps} from '../ActionList';
import * as styles from './ShopSwitcher.scss';

interface Shop {
  url: string;
  name: string;
  active: boolean;
}

export interface Props {
  shops: Shop[];
  searchPlaceholder: string;
}

interface State {
  query: string;
  items: ActionListProps['items'];
}

const MIN_SHOPS_FOR_SEARCH = 5;

class ShopSwitcher extends React.Component<Props, State> {
  state = {
    query: '',
    items: transformShopsToItems(this.props.shops),
  };

  render() {
    const {query, items} = this.state;
    const {searchPlaceholder} = this.props;

    const searchFieldMarkup = items.length >= MIN_SHOPS_FOR_SEARCH && (
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

    return (
      <div>
        {searchFieldMarkup}
        <ActionList items={items} />
      </div>
    );
  }

  @autobind
  private handleQueryChange(query: string) {
    const {shops} = this.props;
    this.setState({query, items: filterShops(query, shops)});
  }
}

function filterShops(query: string, shops: Shop[]) {
  const lowerQuery = query.toLowerCase();
  const newShops = shops.filter(({name}) =>
    name.toLowerCase().startsWith(lowerQuery),
  );
  return transformShopsToItems(newShops);
}

function transformShopsToItems(shops: Shop[]) {
  return shops.map(({name, url, active}) => ({
    content: name,
    url,
    active,
  }));
}

export default ShopSwitcher;
