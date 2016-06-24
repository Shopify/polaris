import React, {Component, PropTypes} from 'react';
import styles from './Tablist.scss';

import Tab from './Tab';

export default class Tablist extends Component {
  static Tab = Tab;

  static propTypes = {
    children: PropTypes.node,
    tabs: PropTypes.arrayOf(PropTypes.node).isRequired,
    selected: PropTypes.number.isRequired,
  };

  static defaultProps = {
    tabs: [],
  };

  constructor(props, context) {
    super(props, context);

    this.state = {selected: props.selected || 0};
  }

  componentWillReceiveProps({selected}) {
    if (!selected) { return; }
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
