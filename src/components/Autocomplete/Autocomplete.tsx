import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';

import {getRectForNode} from '@shopify/javascript-utilities/geometry';

import Field from '../Field';
import List from '../List';

import * as styles from './Autocomplete.scss';

export interface Props<T> {
  label: string,
  placeholder: string,
  children?: any,
  options: T[],
  value?: string,
  displaySelectionList?: boolean,
  emptyContent?: any,
  onChange?(value: string): void,
  onBlur?(): void,
  onFocus?(): void,
  onItemSelect?(value: T): void,
  renderOption?(option: T): string,
}

@layeredComponent({idPrefix: 'Autocomplete'})
export default class Autocomplete<T> extends React.PureComponent<Props<T>, {}> {
  get activatorNode(): HTMLElement {
    return findDOMNode<HTMLElement>(this);
  }

  renderLayer() {
    const {displaySelectionList, options, onItemSelect, emptyContent, renderOption} = this.props;

    if (!displaySelectionList) {
      // TODO
      return <div />;
    }

    if (options.length) {
      const ListComponent = List.of(options);

      return (
        <AutocompleteContent activator={this.activatorNode}>
          <ListComponent
            onItemSelect={onItemSelect}
            renderItem={renderOption}
            items={options}
          />
        </AutocompleteContent>
      );
    }

    return <AutocompleteContent activator={this.activatorNode}>{emptyContent}</AutocompleteContent>;
  }

  render() {
    const {label, placeholder, value, onChange, onFocus, onBlur} = this.props;

    return (
      <div className={styles.Autocomplete}>
        <Field
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  }
}

export interface ContentProps {
  children?: React.ReactNode,
  activator: HTMLElement,
};

class AutocompleteContent extends React.PureComponent<ContentProps, {}> {
  props: ContentProps;

  render() {
    const {children, activator} = this.props;
    const rect = getRectForNode(activator);

    const content = (typeof children === 'string')
      ? <p className={styles.EmptyContent}>{children}</p>
      : children;

    return (
      <div className={styles.Content} style={{top: rect.top + rect.height, left: rect.left, width: rect.width}}>
        {content}
      </div>
    );
  }
}
