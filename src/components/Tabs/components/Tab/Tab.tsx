import React from 'react';
import {classNames} from '@shopify/css-utilities';

import UnstyledLink from '../../../UnstyledLink';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';

import styles from '../../Tabs.scss';

export interface Props {
  id: string;
  selected?: boolean;
  panelID?: string;
  children?: React.ReactNode;
  url?: string;
  measuring?: boolean;
  accessibilityLabel?: string;
  onClick?(id: string): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class Tab extends React.PureComponent<CombinedProps, never> {
  render() {
    const {
      id,
      children,
      onClick,
      selected,
      url,
      accessibilityLabel,
    } = this.props;

    const handleClick = onClick && onClick.bind(null, id);

    const className = classNames(
      styles.Tab,
      selected && styles['Tab-selected'],
    );

    const markup = url ? (
      <UnstyledLink
        id={id}
        url={url}
        onClick={handleClick}
        className={className}
        aria-label={accessibilityLabel}
        onMouseUp={handleMouseUpByBlurring}
      >
        <span className={styles.Title}>{children}</span>
      </UnstyledLink>
    ) : (
      <button
        id={id}
        type="button"
        className={className}
        onClick={handleClick}
        aria-label={accessibilityLabel}
        onMouseUp={handleMouseUpByBlurring}
      >
        <span className={styles.Title}>{children}</span>
      </button>
    );

    return <li className={styles.TabContainer}>{markup}</li>;
  }
}

export default withAppProvider<Props>()(Tab);
