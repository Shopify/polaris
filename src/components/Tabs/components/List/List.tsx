import React, {PureComponent} from 'react';

import {classNames} from '../../../../utilities/css';
import {FeaturesContext} from '../../../../utilities/features';
import {Item} from '../Item';
import type {TabDescriptor} from '../../types';
import styles from '../../Tabs.scss';

export interface ListProps {
  focusIndex: number;
  disclosureTabs: TabDescriptor[];
  onClick?(id: string): void;
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
}

export class List extends PureComponent<ListProps, never> {
  static contextType = FeaturesContext;
  context!: React.ContextType<typeof FeaturesContext>;

  render() {
    const {newDesignLanguage} = this.context || {};
    const {focusIndex, disclosureTabs, onClick = noop} = this.props;
    const tabs = disclosureTabs.map(({id, content, ...tabProps}, index) => {
      return (
        <Item
          {...tabProps}
          key={id}
          id={id}
          focused={index === focusIndex}
          onClick={onClick.bind(null, id)}
        >
          {content}
        </Item>
      );
    });

    const classname = classNames(
      styles.List,
      newDesignLanguage && styles.newDesignLanguage,
    );

    return (
      <ul
        className={classname}
        onKeyDown={handleKeyDown}
        onKeyUp={this.handleKeypress}
      >
        {tabs}
      </ul>
    );
  }

  private handleKeypress = (event: React.KeyboardEvent<HTMLElement>) => {
    const {onKeyPress = noop} = this.props;
    onKeyPress(event);
  };
}

function noop() {}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
