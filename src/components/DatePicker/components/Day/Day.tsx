import React from 'react';
import {Months, isSameDay} from '@shopify/javascript-utilities/dates';
import {classNames} from '../../../../utilities/css';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import styles from '../../DatePicker.scss';

export interface Props {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  onClick?(day: Date): void;
  onHover?(day: Date): void;
  onFocus?(day: Date): void;
}

type CombinedProps = Props & WithAppProviderProps;

class Day extends React.PureComponent<CombinedProps, never> {
  private dayNode: HTMLElement | null = null;

  componentDidUpdate(prevProps: CombinedProps) {
    if (!prevProps.focused && this.props.focused && this.dayNode) {
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
      polaris: {intl},
    } = this.props;

    const handleHover = onHover.bind(null, day);
    if (!day) {
      return <div className={styles.EmptyDay} onMouseOver={handleHover} />;
    }
    const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
    const today = isSameDay(new Date(), day);
    const className = classNames(
      styles.Day,
      selected && styles['Day-selected'],
      disabled && styles['Day-disabled'],
      today && styles['Day-today'],
      (inRange || inHoveringRange) && !disabled && styles['Day-inRange'],
    );
    const date = day.getDate();
    const tabIndex =
      (focused || selected || today || date === 1) && !disabled ? 0 : -1;
    const ariaLabel = [
      `${today ? intl.translate('Polaris.DatePicker.today') : ''}`,
      `${Months[day.getMonth()]} `,
      `${date} `,
      `${day.getFullYear()}`,
    ].join('');

    return (
      <button
        onFocus={onFocus.bind(null, day)}
        type="button"
        ref={this.setNode}
        tabIndex={tabIndex}
        className={className}
        onMouseOver={handleHover}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-selected={selected}
        aria-disabled={disabled}
        role="gridcell"
      >
        {date}
      </button>
    );
  }

  private setNode = (node: HTMLElement | null) => {
    this.dayNode = node;
  };
}

export default withAppProvider<Props>()(Day);

function noop() {}
