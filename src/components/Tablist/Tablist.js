// @flow

import React, {Component} from 'react';
import styles from './Tablist.scss';
import Tab from './Tab';

type State = {
  selected: number,
};

type Props = {
  children?: any,
  tabs: React$Element<*>[],
  selected?: number,
};

export default class Tablist extends Component {
  static Tab = Tab;

  handleTabClick = this.handleTabClick.bind(this);

  static defaultProps = {
    tabs: [],
  };

  state: State;
  props: Props;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {selected: props.selected || 0};
  }

  componentWillReceiveProps({selected}: Props) {
    if (selected == null) { return; }
    this.setState({selected});
  }

  handleTabClick(position: number) {
    this.setState({selected: position});
  }

  render() {
    const {state: {selected}, props: {tabs}} = this;

    return (
      <div className={styles.Tablist}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            position={index}
            selected={index === selected}
            onClick={this.handleTabClick}
          >
            {tab}
          </Tab>
        ))}
      </div>
    );
  }
}
