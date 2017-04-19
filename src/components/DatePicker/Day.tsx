import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';
import {Months} from '@shopify/javascript-utilities/dates';

import * as styles from './DatePicker.scss';

export interface Props {
  focused?: boolean,
  day?: Date,
  selected?: boolean,
  inRange?: boolean,
  inHoveringRange?: boolean,
  disabled?: boolean,
  onClick?(day: Date): void,
  onHover?(day: Date): void,
  onFocus?(day: Date): void,
}

export default class Day extends React.PureComponent<Props, never> {
  private dayNode: HTMLElement;

  componentDidUpdate() {
    if (this.props.focused) {
      this.dayNode.focus();
    }
  }

  render() {
    const {
      day,
      focused,
      onClick,
      onHover = noop,
      onFocus = noop,
      selected,
      inRange,
      inHoveringRange,
      disabled,
    } = this.props;

    const handleHover = onHover.bind(null, day);
    if (!day) {
      return <div className={styles.EmptyDay} onMouseOver={handleHover}/>;
    }
    const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
    const className = classNames(
      styles.Day,
      selected && styles.selected,
      disabled && styles.disabled,
      (inRange || inHoveringRange) && !disabled && styles.inRange,
    );

    const date = day.getDate();
    const tabIndex = (focused || selected || date === 1) && !disabled ? 0 : -1;

    return (
      <button
        onFocus={onFocus.bind(null, day)}
        ref={this.setNode}
        tabIndex={tabIndex}
        className={className}
        onMouseOver={handleHover}
        onClick={handleClick}
        aria-label={`${Months[day.getMonth()]} ${day.getFullYear()}`}
        aria-selected={selected}
        aria-disabled={disabled}
        role="gridcell"
      >
        {date}
      </button>
    );
  }

  @autobind
  private setNode(node: HTMLElement) {
    this.dayNode = node;
  }
}
