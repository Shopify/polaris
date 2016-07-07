// @flow

import React, {Component} from 'react';
import styles from './Tablist.scss';

import Tab from './Tab';

type State = {
  selected: number,
};

type Props = {
  children?: any,
  tabs: React.Element[],
  selected?: number,
};

export default class Tablist extends Component {
  static Tab = Tab;

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

  render() {
    const {state: {selected}, props: {tabs}} = this;

    return (
      <div className={styles.Tablist}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            selected={index === selected}
            onClick={() => this.setState({selected: index})}
          >
            {tab}
          </Tab>
        ))}
      </div>
    );
  }
}
